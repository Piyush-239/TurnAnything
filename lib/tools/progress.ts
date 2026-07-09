export type ToolProgressState = {
  status: string
  progress: number
}

export const COMPLETION_PREVIEW_MS = 700

export function waitFor(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}
