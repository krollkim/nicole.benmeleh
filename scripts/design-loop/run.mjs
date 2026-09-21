/**
 * The design loop's runner.
 *
 * node scripts/design-loop/run.mjs [url] [--json]
 *
 * It launches headless Chrome over raw CDP (Node's global WebSocket; nothing
 * to install), loads the page at desktop and phone width, runs the probe, and
 * judges the evidence against rules.mjs.
 *
 * IT NEVER EDITS A FILE. The loop reports; the decision is the human's. That
 * constraint is deliberate — a loop that both judges and fixes will always
 * converge on whatever it finds easiest to fix, not on what the page needs.
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectEvidence } from './probe.mjs'
import { RULES } from './rules.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..', '..')
const URL_ = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3000'
const AS_JSON = process.argv.includes('--json')
const PORT = 9411
/** Forward slashes on purpose: Windows accepts them and they survive quoting. */
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  `${process.env.LOCALAPPDATA ?? ''}/Google/Chrome/Application/chrome.exe`,
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)
const CHROME = CHROME_CANDIDATES.find((c) => existsSync(c))
if (!CHROME) {
  console.error('No Chrome found. Set CHROME_PATH. Tried: ' + CHROME_CANDIDATES.join(' | '))
  process.exit(2)
}

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900, mobile: false },
  { name: '360', width: 360, height: 740, mobile: true },
]

/** The allowed palette is read from the stylesheet, not hardcoded here. */
function readPalette() {
  const css = readFileSync(join(ROOT, 'src', 'app', 'globals.css'), 'utf8')
  return [...css.matchAll(/--color-[a-z0-9-]+:\s*(#[0-9a-fA-F]{6})/g)].map((m) => m[1])
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function targetWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const page = (await r.json()).find((t) => t.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {}
    await sleep(250)
  }
  throw new Error('Chrome CDP never came up')
}

function cdp(ws) {
  let id = 0
  const pending = new Map()
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
    }
  })
  return (method, params = {}) =>
    new Promise((resolve, reject) => {
      const myId = ++id
      pending.set(myId, { resolve, reject })
      ws.send(JSON.stringify({ id: myId, method, params }))
    })
}

const palette = readPalette()
const profile = mkdtempSync(join(tmpdir(), 'design-loop-'))
const chrome = spawn(
  CHROME,
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ],
  { stdio: 'ignore' }
)

const ws = new WebSocket(await targetWs())
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
const send = cdp(ws)
await send('Page.enable')
await send('Runtime.enable')

const results = {}
for (const vp of VIEWPORTS) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: vp.mobile,
  })
  await send('Page.navigate', { url: URL_ })
  await sleep(5000)
  // Settle scroll-driven state, then return to the top so measurements are
  // taken in the state a visitor actually arrives in.
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' })
  await sleep(1200)
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
  await sleep(800)

  const expr = `(${collectEvidence.toString()})(${JSON.stringify(palette)})`
  const { result, exceptionDetails } = await send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
    awaitPromise: false,
  })
  if (exceptionDetails) throw new Error(`probe threw at ${vp.name}: ${JSON.stringify(exceptionDetails).slice(0, 300)}`)
  results[vp.name] = { evidence: result.value, verdicts: RULES.map((r) => ({ id: r.id, doc: r.doc, ...r.judge(result.value) })) }
}

ws.close()
chrome.kill()

if (AS_JSON) {
  console.log(JSON.stringify(results, null, 2))
} else {
  const MARK = { PASS: 'PASS   ', FAIL: 'FAIL   ', BLOCKED: 'BLOCKED', ASK: 'ASK    ' }
  for (const [name, { evidence, verdicts }] of Object.entries(results)) {
    console.log(`\n${'='.repeat(78)}\n  ${URL_}  @  ${evidence.viewport.w}×${evidence.viewport.h}   (doc ${evidence.docHeight}px)\n${'='.repeat(78)}`)
    for (const v of verdicts) {
      console.log(`${MARK[v.verdict]}  ${v.id.padEnd(26)}  ${v.detail}`)
      if (v.verdict !== 'PASS') console.log(`${' '.repeat(11)}${v.doc}`)
    }
    const modes = evidence.sections.map((s) => `${s.id}=${s.mode}`).join(' ')
    console.log(`\n  sections: ${modes}`)
  }
  const tally = (k) => Object.values(results).flatMap((r) => r.verdicts).filter((v) => v.verdict === k).length
  console.log(`\n${'-'.repeat(78)}\n  PASS ${tally('PASS')}   FAIL ${tally('FAIL')}   BLOCKED ${tally('BLOCKED')}   ASK ${tally('ASK')}   (across ${VIEWPORTS.length} viewports)\n`)
}

process.exit(Object.values(results).flatMap((r) => r.verdicts).some((v) => v.verdict === 'FAIL') ? 1 : 0)
