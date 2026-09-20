#!/usr/bin/env node
/**
 * PreToolUse hook: blocks git commit / push / tag / reset --hard.
 * Kim commits by hand. Claude builds, Claude does not publish.
 * Exit 2 = block the tool call and show the message to Claude.
 */

let raw = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (c) => (raw += c))
process.stdin.on('end', () => {
  let cmd = ''
  try {
    cmd = JSON.parse(raw)?.tool_input?.command ?? ''
  } catch {
    process.exit(0) // can't parse, don't block
  }

  // split on shell separators so "npm test && git push" is caught
  const segments = cmd.split(/&&|\|\||;|\||\n/)

  // git, optional flags/subpaths, then the verb
  const BLOCKED = /\bgit\s+(?:(?:-[cC]\s+\S+|--\S+(?:=\S+)?|-\S+)\s+)*(commit|push|tag)\b/i
  const HARD_RESET = /\bgit\s+reset\s+.*--hard\b/i

  for (const seg of segments) {
    if (BLOCKED.test(seg) || HARD_RESET.test(seg)) {
      console.error(
        [
          'חסום: git commit / push / tag / reset --hard מנוהלים ידנית בפרויקט הזה.',
          '',
          'מה כן לעשות:',
          '  1. סיים את השינוי ואמת אותו (build, צילום, בדיקת HTML).',
          '  2. הרץ `git status` ו-`git diff` והצג לי מה השתנה.',
          '  3. הצע הודעת commit ותן לי לבצע אותו.',
          '',
          'אל תנסה לעקוף את זה בסקריפט, ב-alias או ב-git אחר.',
        ].join('\n')
      )
      process.exit(2)
    }
  }

  process.exit(0)
})
