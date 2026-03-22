import { useMemo } from 'react'

type Lang = 'js' | 'cpp' | 'cmake' | 'shell' | 'bytecode' | 'plain'

interface Props {
  title: string
  lang?: Lang
  children: string
}

// One Dark Pro inspired palette
const T = {
  keyword:  '#c678dd',  // purple
  string:   '#98c379',  // green
  number:   '#d19a66',  // orange
  comment:  '#5c6370',  // gray
  func:     '#61afef',  // blue
  variable: '#e06c75',  // red
  property: '#e5c07b',  // yellow
  operator: '#56b6c2',  // cyan
  type:     '#e5c07b',  // yellow
  punct:    '#abb2bf',  // light gray
  plain:    '#abb2bf',  // light gray
  accent:   '#00d4aa',  // teal (ata brand)
} as const

interface Token {
  text: string
  color: string
}

function tokenizeJS(code: string): Token[] {
  const tokens: Token[] = []
  const keywords = /^(const|let|var|function|return|if|else|for|while|new|import|export|from|require|class|extends|typeof|instanceof|true|false|null|undefined|async|await)\b/
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\d+\.?\d*)|([a-zA-Z_$][\w$]*)|([{}()\[\];:,.])|(\s+)|(=>|\.\.\.|\?\.|&&|\|\||[+\-*/%=<>!&|^~?]+)|(.)/gm
  let m: RegExpExecArray | null

  while ((m = re.exec(code)) !== null) {
    const [full, str, lineComment, blockComment, num, ident, punct, ws, op, other] = m
    if (str) {
      tokens.push({ text: str, color: T.string })
    } else if (lineComment || blockComment) {
      tokens.push({ text: full, color: T.comment })
    } else if (num) {
      tokens.push({ text: num, color: T.number })
    } else if (ident) {
      if (keywords.test(ident)) {
        tokens.push({ text: ident, color: T.keyword })
      } else if (/^(console|JSON|Math|Object|Array|String|Number|Boolean|Error|Promise|require)$/.test(ident)) {
        tokens.push({ text: ident, color: T.variable })
      } else if (re.source && code[m.index + ident.length] === '(') {
        tokens.push({ text: ident, color: T.func })
      } else if (code[m.index - 1] === '.') {
        tokens.push({ text: ident, color: T.func })
      } else if (/^[A-Z]/.test(ident)) {
        tokens.push({ text: ident, color: T.type })
      } else {
        // Check if it's a property key (followed by :)
        const after = code.slice(m.index + ident.length).match(/^\s*:/)
        if (after) {
          tokens.push({ text: ident, color: T.property })
        } else {
          tokens.push({ text: ident, color: T.plain })
        }
      }
    } else if (punct) {
      tokens.push({ text: punct, color: T.punct })
    } else if (ws) {
      tokens.push({ text: ws, color: T.plain })
    } else if (op) {
      tokens.push({ text: op, color: T.operator })
    } else if (other) {
      tokens.push({ text: other, color: T.plain })
    }
  }
  return tokens
}

function tokenizeCpp(code: string): Token[] {
  const tokens: Token[] = []
  const keywords = /^(auto|bool|break|case|catch|char|class|const|continue|default|delete|do|double|else|enum|explicit|extern|false|float|for|friend|goto|if|inline|int|long|namespace|new|nullptr|operator|private|protected|public|register|return|short|signed|sizeof|static|struct|switch|template|this|throw|true|try|typedef|typename|union|unsigned|using|virtual|void|volatile|while|int64_t|uint64_t|uint32_t|uint8_t|size_t|string|string_view|shared_ptr|optional|vector|unordered_map)\b/
  const re = /("(?:[^"\\]|\\.)*"|R"(\([\s\S]*?\)\2)")|(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(#\w+)|(\d+\.?\d*[fFlLuU]?)|([a-zA-Z_][\w]*)|([{}()\[\];:,.<>])|(\s+)|([+\-*/%=!&|^~?]+)|(.)/gm
  let m: RegExpExecArray | null

  while ((m = re.exec(code)) !== null) {
    const [full, str, , lineComment, blockComment, preproc, num, ident, punct, ws, op, other] = m
    if (str) {
      tokens.push({ text: str, color: T.string })
    } else if (lineComment || blockComment) {
      tokens.push({ text: full, color: T.comment })
    } else if (preproc) {
      tokens.push({ text: preproc, color: T.keyword })
    } else if (num) {
      tokens.push({ text: num, color: T.number })
    } else if (ident) {
      if (keywords.test(ident)) {
        tokens.push({ text: ident, color: T.keyword })
      } else if (/^(std|ata|dom|simdjson|re2)$/.test(ident)) {
        tokens.push({ text: ident, color: T.variable })
      } else if (code[m.index + ident.length] === '(') {
        tokens.push({ text: ident, color: T.func })
      } else if (code[m.index - 1] === ':' && code[m.index - 2] === ':') {
        tokens.push({ text: ident, color: T.func })
      } else {
        tokens.push({ text: ident, color: T.plain })
      }
    } else if (punct) {
      tokens.push({ text: punct, color: T.punct })
    } else if (ws) {
      tokens.push({ text: ws, color: T.plain })
    } else if (op) {
      tokens.push({ text: op, color: T.operator })
    } else if (other) {
      tokens.push({ text: other, color: T.plain })
    }
  }
  return tokens
}

function tokenizeCMake(code: string): Token[] {
  const tokens: Token[] = []
  const re = /(#.*$)|("(?:[^"\\]|\\.)*")|([a-zA-Z_][\w]*)|([()])|(\s+)|(.)/gm
  let m: RegExpExecArray | null
  const cmds = /^(FetchContent_Declare|FetchContent_MakeAvailable|target_link_libraries|add_library|set|option|project|cmake_minimum_required|GIT_REPOSITORY|GIT_TAG|GIT_SHALLOW)$/

  while ((m = re.exec(code)) !== null) {
    const [, comment, str, ident, punct, ws, other] = m
    if (comment) tokens.push({ text: comment, color: T.comment })
    else if (str) tokens.push({ text: str, color: T.string })
    else if (ident) {
      if (cmds.test(ident)) tokens.push({ text: ident, color: T.func })
      else if (/^(TRUE|FALSE|ON|OFF)$/.test(ident)) tokens.push({ text: ident, color: T.keyword })
      else tokens.push({ text: ident, color: T.plain })
    }
    else if (punct) tokens.push({ text: punct, color: T.punct })
    else if (ws) tokens.push({ text: ws, color: T.plain })
    else if (other) tokens.push({ text: other, color: T.plain })
  }
  return tokens
}

function tokenizeShell(code: string): Token[] {
  const tokens: Token[] = []
  const re = /(\$\s*)|([a-zA-Z][\w-]*)|("(?:[^"\\]|\\.)*")|(\s+)|(.)/gm
  let m: RegExpExecArray | null

  while ((m = re.exec(code)) !== null) {
    const [, dollar, ident, str, ws, other] = m
    if (dollar) tokens.push({ text: dollar, color: T.accent })
    else if (str) tokens.push({ text: str, color: T.string })
    else if (ident) {
      if (/^(npm|node|git|cd|mkdir)$/.test(ident)) tokens.push({ text: ident, color: T.func })
      else if (/^(install|run|build|dev|test)$/.test(ident)) tokens.push({ text: ident, color: T.keyword })
      else tokens.push({ text: ident, color: T.plain })
    }
    else if (ws) tokens.push({ text: ws, color: T.plain })
    else if (other) tokens.push({ text: other, color: T.plain })
  }
  return tokens
}

function tokenizeBytecode(code: string): Token[] {
  const tokens: Token[] = []
  const re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(\b(?:EXPECT_OBJECT|EXPECT_ARRAY|EXPECT_STRING|EXPECT_NUMBER|EXPECT_INTEGER|EXPECT_BOOLEAN|EXPECT_NULL|CHECK_REQUIRED|CHECK_MIN_LENGTH|CHECK_MAX_LENGTH|CHECK_PATTERN|CHECK_FORMAT|CHECK_MINIMUM|CHECK_MAXIMUM|CHECK_NO_ADDITIONAL|CHECK_UNIQUE_ITEMS|OBJ_PROPS_START|OBJ_PROPS_END|OBJ_PROP|ARRAY_ITEMS|END)\b)|(\b\d+\b)|(->)|([a-zA-Z_][\w[\]]*)|(\s+)|(.)/gm
  let m: RegExpExecArray | null

  while ((m = re.exec(code)) !== null) {
    const [, comment, str, opcode, num, arrow, ident, ws, other] = m
    if (comment) tokens.push({ text: comment, color: T.comment })
    else if (str) tokens.push({ text: str, color: T.string })
    else if (opcode) tokens.push({ text: opcode, color: T.func })
    else if (num) tokens.push({ text: num, color: T.number })
    else if (arrow) tokens.push({ text: arrow, color: T.operator })
    else if (ident) tokens.push({ text: ident, color: T.plain })
    else if (ws) tokens.push({ text: ws, color: T.plain })
    else if (other) tokens.push({ text: other, color: T.plain })
  }
  return tokens
}

function tokenizePlain(code: string): Token[] {
  const tokens: Token[] = []
  const re = /(\d[\d,]*\.?\d*)|([a-zA-Z][\w.]*:)|(===.*$)|(Speedup:.*$)|([a-zA-Z][\w/.]*)|(\s+)|(.)/gm
  let m: RegExpExecArray | null

  while ((m = re.exec(code)) !== null) {
    const [, num, label, header, speedup, ident, ws, other] = m
    if (num) tokens.push({ text: num, color: T.number })
    else if (label) tokens.push({ text: label, color: T.property })
    else if (header) tokens.push({ text: header, color: T.comment })
    else if (speedup) tokens.push({ text: speedup, color: T.accent })
    else if (ident) tokens.push({ text: ident, color: T.plain })
    else if (ws) tokens.push({ text: ws, color: T.plain })
    else if (other) tokens.push({ text: other, color: T.plain })
  }
  return tokens
}

function detectLang(title: string): Lang {
  if (/\.(js|ts|mjs)$/.test(title) || title.includes('example') || title.includes('pattern') || title.includes('app')) return 'js'
  if (/\.(cpp|h|cc)$/.test(title) || title.includes('main.cpp')) return 'cpp'
  if (/cmake/i.test(title)) return 'cmake'
  if (title === 'terminal' || title === 'shell') return 'shell'
  if (title.includes('bytecode')) return 'bytecode'
  if (title.includes('on demand')) return 'plain'
  if (title.includes('bench')) return 'plain'
  return 'js'
}

function highlight(code: string, lang: Lang): Token[] {
  switch (lang) {
    case 'js': return tokenizeJS(code)
    case 'cpp': return tokenizeCpp(code)
    case 'cmake': return tokenizeCMake(code)
    case 'shell': return tokenizeShell(code)
    case 'bytecode': return tokenizeBytecode(code)
    case 'plain': return tokenizePlain(code)
  }
}

export function CodeWindow({ title, lang, children }: Props) {
  const resolvedLang = lang ?? detectLang(title)
  const tokens = useMemo(() => highlight(children, resolvedLang), [children, resolvedLang])

  return (
    <div className="code-window">
      <div className="code-header">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="code-title">{title}</span>
      </div>
      <pre className="code-body">
        <code>
          {tokens.map((t, i) => (
            <span key={i} style={{ color: t.color }}>{t.text}</span>
          ))}
        </code>
      </pre>
    </div>
  )
}
