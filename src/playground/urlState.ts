export interface PlaygroundState {
  schema: string
  data: string
}

export function encodeState(state: PlaygroundState): string {
  return btoa(encodeURIComponent(JSON.stringify(state)))
}

export function decodeState(hash: string): PlaygroundState | null {
  if (!hash) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(atob(hash)))
    if (typeof parsed?.schema === 'string' && typeof parsed?.data === 'string') {
      return { schema: parsed.schema, data: parsed.data }
    }
    return null
  } catch {
    return null
  }
}
