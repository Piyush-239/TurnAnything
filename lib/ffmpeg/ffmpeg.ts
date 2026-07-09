import type { FFmpeg } from "@ffmpeg/ffmpeg"


export type FFmpegLoadState = "idle" | "loading" | "ready" | "error"

interface FFmpegCache {
  instance: FFmpeg | null
  loadPromise: Promise<FFmpeg> | null
  loadState: FFmpegLoadState
  error: Error | null
}

const FFMPEG_CORE_VERSION = "0.12.10"
const FFMPEG_BASE_URL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/umd`

declare global {
  var __turnanythingFFmpegCache: FFmpegCache | undefined
}

const defaultCache: FFmpegCache = {
  instance: null,
  loadPromise: null,
  loadState: "idle",
  error: null,
}

const ffmpegCache = globalThis.__turnanythingFFmpegCache ?? defaultCache

if (!globalThis.__turnanythingFFmpegCache) {
  globalThis.__turnanythingFFmpegCache = ffmpegCache
}

function createInitializationError(reason: unknown): Error {
  if (reason instanceof Error) {
    return new Error(`Failed to initialize FFmpeg: ${reason.message}`)
  }

  return new Error(`Failed to initialize FFmpeg: ${String(reason)}`)
}

async function initializeFFmpeg(): Promise<FFmpeg> {
  if (typeof window === "undefined") {
    throw new Error("FFmpeg can only be initialized in the browser.")
  }

  const [{ FFmpeg }, { toBlobURL: loadBlobURL }] = await Promise.all([
    import("@ffmpeg/ffmpeg"),
    import("@ffmpeg/util"),
  ])

  const ffmpeg = new FFmpeg()

  await ffmpeg.load({
    coreURL: await loadBlobURL(`${FFMPEG_BASE_URL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await loadBlobURL(`${FFMPEG_BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
  })

  return ffmpeg
}

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegCache.instance) {
    return ffmpegCache.instance
  }

  if (ffmpegCache.loadPromise) {
    return ffmpegCache.loadPromise
  }

  ffmpegCache.loadState = "loading"
  ffmpegCache.error = null

  ffmpegCache.loadPromise = initializeFFmpeg()
    .then((instance) => {
      ffmpegCache.instance = instance
      ffmpegCache.loadState = "ready"
      ffmpegCache.error = null

      return instance
    })
    .catch((reason) => {
      ffmpegCache.instance = null
      ffmpegCache.loadState = "error"
      ffmpegCache.error = createInitializationError(reason)

      throw ffmpegCache.error
    })
    .finally(() => {
      ffmpegCache.loadPromise = null
    })

  return ffmpegCache.loadPromise
}

export function getFFmpegLoadState(): FFmpegLoadState {
  return ffmpegCache.loadState
}

export function getFFmpegLoadError(): Error | null {
  return ffmpegCache.error
}

export function isFFmpegLoading(): boolean {
  return ffmpegCache.loadState === "loading"
}

export function isFFmpegReady(): boolean {
  return ffmpegCache.loadState === "ready"
}
