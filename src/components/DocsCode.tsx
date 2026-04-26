import { useMemo } from 'react'

type Lang = 'js' | 'shell' | 'plain'

interface Props {
  lang?: Lang
  children: string
}

// GitHub Light IDE palette
const T = {
  keyword:  '#cf222e',
  string:   '#0a3069',
  number:   '#0550ae',
  comment:  '#6e7781',
  func:     '#8250df',
  variable: '#953800',
  property: '#116329',
  type:     '#8250df',
  punct:    '#24292f',
  operator: '#cf222e',
  plain:    '#24292f',
  accent:   '#0550ae',
} as const

interface Token { text: string; color: string }

function tokenizeJS(code: string): Token[] {
  const tokens: Token[] = []
  const keywords = /^(const|let|var|function|return|if|else|for|while|new|import|export|from|require|class|extends|typeof|instanceof|true|false|null|undefined|async|await|try|catch|throw)\b/
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\d+\.?\d*)|([a-zA-Z_$][\w$]*)|([{}()\[\];:,.])|(\s+)|(=>|\.\.\.|\?\.|&&|\|\||[+\-*/%=<>!&|^~?]+)|(.)/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(code)) !== null) {
    const [, str, lineComment, blockComment, num, ident, punct, ws, op, other] = m
    if (str) tokens.push({ text: str, color: T.string })
    else if (lineComment) tokens.push({ text: lineComment, color: T.comment })
    else if (blockComment) tokens.push({ text: blockComment, color: T.comment })
    else if (num) tokens.push({ text: num, color: T.number })
    else if (ident) {
      if (keywords.test(ident)) tokens.push({ text: ident, color: T.keyword })
      else if (/^(console|JSON|Math|Object|Array|String|Number|Boolean|Error|Promise|Fastify)$/.test(ident)) tokens.push({ text: ident, color: T.variable })
      else if (code[m.index + ident.length] === '(') tokens.push({ text: ident, color: T.func })
      else if (code[m.index - 1] === '.') tokens.push({ text: ident, color: T.func })
      else if (/^[A-Z]/.test(ident)) tokens.push({ text: ident, color: T.type })
      else {
        const after = code.slice(m.index + ident.length).match(/^\s*:/)
        if (after) tokens.push({ text: ident, color: T.property })
        else tokens.push({ text: ident, color: T.plain })
      }
    }
    else if (punct) tokens.push({ text: punct, color: T.punct })
    else if (ws) tokens.push({ text: ws, color: T.plain })
    else if (op) tokens.push({ text: op, color: T.operator })
    else if (other) tokens.push({ text: other, color: T.plain })
  }
  return tokens
}

function tokenizeShell(code: string): Token[] {
  const tokens: Token[] = []
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(#.*$)|(\$\w+)|([A-Z_][A-Z0-9_]*=\S+)|([a-zA-Z][\w-]*)|(\s+)|(.)/gm
  let m: RegExpExecArray | null
  let firstIdentOnLine = true
  while ((m = re.exec(code)) !== null) {
    const [, str, comment, varRef, envAssign, ident, ws, other] = m
    if (str) { tokens.push({ text: str, color: T.string }); firstIdentOnLine = false }
    else if (comment) { tokens.push({ text: comment, color: T.comment }); firstIdentOnLine = false }
    else if (varRef) { tokens.push({ text: varRef, color: T.variable }); firstIdentOnLine = false }
    else if (envAssign) {
      const eq = envAssign.indexOf('=')
      tokens.push({ text: envAssign.slice(0, eq), color: T.variable })
      tokens.push({ text: '=', color: T.operator })
      tokens.push({ text: envAssign.slice(eq + 1), color: T.string })
    }
    else if (ident) {
      if (firstIdentOnLine && /^(npm|node|git|cd|mkdir|curl|wget|bash|sh|docker|yarn|pnpm)$/.test(ident)) {
        tokens.push({ text: ident, color: T.func })
      } else if (/^(install|run|build|dev|test|start|ci|add|remove|update)$/.test(ident)) {
        tokens.push({ text: ident, color: T.keyword })
      } else {
        tokens.push({ text: ident, color: T.plain })
      }
      firstIdentOnLine = false
    }
    else if (ws) { tokens.push({ text: ws, color: T.plain }); if (ws.includes('\n')) firstIdentOnLine = true }
    else if (other) { tokens.push({ text: other, color: T.plain }); firstIdentOnLine = false }
  }
  return tokens
}

function tokenizePlain(code: string): Token[] {
  return [{ text: code, color: T.plain }]
}

function highlight(code: string, lang: Lang): Token[] {
  switch (lang) {
    case 'js': return tokenizeJS(code)
    case 'shell': return tokenizeShell(code)
    case 'plain': return tokenizePlain(code)
  }
}

export function DocsCode({ lang = 'js', children }: Props) {
  const tokens = useMemo(() => highlight(children, lang), [children, lang])
  return (
    <pre className="docs-code">
      <code>
        {tokens.map((t, i) => {
          const cls = t.color === T.comment ? 'tk-cm' : undefined
          return (
            <span key={i} className={cls} style={{ color: t.color }}>{t.text}</span>
          )
        })}
      </code>
    </pre>
  )
}
