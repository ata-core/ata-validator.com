export interface AtaFrame {
  file?: string
  line: number
  col: number
  text: string
}

export interface AtaDataFrame {
  byteOffset: number
  length: number
  line: number
  col: number
  text: string
}

export interface AtaError {
  code?: string
  message: string
  expected?: string
  received?: string
  docUrl?: string
  schemaSource?: AtaFrame
  dataFrame?: AtaDataFrame
  suggestion?: { text: string; kind: string }
}

export interface AjvError {
  instancePath: string
  schemaPath: string
  keyword: string
  params: Record<string, unknown>
  message?: string
}

export interface RunResult {
  schemaParseError: string | null
  dataParseError: string | null
  ataValid: boolean
  ataErrors: AtaError[]
  ajvValid: boolean
  ajvErrors: AjvError[]
}
