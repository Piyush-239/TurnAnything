"use client"

import * as React from "react"
import { Download } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { getFFmpeg } from "@/lib/ffmpeg/ffmpeg"
import { COMPLETION_PREVIEW_MS, type ToolProgressState, waitFor } from "@/lib/tools/progress"

const acceptedVideoFileTypes = [
  ".mp4",
  ".mov",
  ".webm",
  ".avi",
  ".mkv",
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  "video/x-matroska",
]

// This component stays reusable so the route layer can mount it without knowing anything about upload handling or future conversion logic.
// The tool only owns the video selection state and convert action, which keeps it easy to reuse for additional browser-based media tools.
export default function VideoToAudioTool() {
  const [videos, setVideos] = React.useState<File[]>([])
  const [isConverting, setIsConverting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)

  const selectedVideo = videos[0] ?? null

  const triggerDownload = React.useCallback((blob: Blob, downloadName: string) => {
    const downloadUrl = URL.createObjectURL(blob)
    const anchor = document.createElement("a")

    anchor.href = downloadUrl
    anchor.download = downloadName
    anchor.rel = "noreferrer"
    anchor.style.display = "none"

    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()

    window.setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 0)
  }, [])

  const buildOutputFileName = React.useCallback((inputFileName: string) => {
    const lastDotIndex = inputFileName.lastIndexOf(".")

    if (lastDotIndex <= 0) {
      return `${inputFileName}.mp3`
    }

    return `${inputFileName.slice(0, lastDotIndex)}.mp3`
  }, [])

  const handleConvertToMp3 = React.useCallback(async () => {
    if (!selectedVideo) {
      setErrorMessage("Please choose a video file before converting it to MP3.")
      return
    }

    setIsConverting(true)
    setErrorMessage(null)
    setProgressState({ status: "Loading FFmpeg", progress: 10 })

    const inputFileName = selectedVideo.name || `input-${Date.now()}.mp4`
    const outputFileName = buildOutputFileName(inputFileName)
    let ffmpeg: Awaited<ReturnType<typeof getFFmpeg>> | null = null

    try {
      ffmpeg = await getFFmpeg()
      setProgressState({ status: "Preparing video", progress: 30 })

      const inputBytes = new Uint8Array(await selectedVideo.arrayBuffer())

      await ffmpeg.writeFile(inputFileName, inputBytes)

      setProgressState({ status: "Converting to MP3", progress: 65 })

      await ffmpeg.exec([
        "-i",
        inputFileName,
        "-vn",
        "-codec:a",
        "libmp3lame",
        "-b:a",
        "192k",
        outputFileName,
      ])

      setProgressState({ status: "Preparing download", progress: 90 })

      const outputData = await ffmpeg.readFile(outputFileName)

      if (!(outputData instanceof Uint8Array)) {
        throw new Error("Unexpected FFmpeg output format.")
      }

      const outputBytes = new Uint8Array(outputData.slice())

      const outputBlob = new Blob([outputBytes], {
        type: "audio/mpeg",
      })

      setProgressState({ status: "Completed", progress: 100 })
      await waitFor(COMPLETION_PREVIEW_MS)
      triggerDownload(outputBlob, outputFileName)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)

      setErrorMessage(
        message.includes("Failed to initialize FFmpeg")
          ? "FFmpeg could not start in this browser. Please try again or use a supported browser."
          : "We could not convert this video to MP3. Please try another file or try again."
      )
    } finally {
      if (ffmpeg) {
        await Promise.allSettled([ffmpeg.deleteFile(inputFileName), ffmpeg.deleteFile(outputFileName)])
      }

      setIsConverting(false)
      setProgressState(null)
    }
  }, [buildOutputFileName, selectedVideo, triggerDownload])

  return (
    <div className="grid gap-6">
      <FileDropzone
        acceptedFileTypes={acceptedVideoFileTypes}
        multiple={false}
        value={videos}
        onFilesSelected={setVideos}
        title="Upload video"
        description="Select a video file to prepare a future browser-based MP3 conversion flow."
        emptyStateTitle="Drop a video here"
        emptyStateDescription="MP4, MOV, WEBM, AVI, and MKV files are supported."
      />

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Ready to convert</p>
          <p className="text-sm text-muted-foreground">
            Your video is processed locally in your browser. Nothing is uploaded.
          </p>
          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        </div>

        <Button
          type="button"
          size="lg"
          className="w-full sm:w-auto"
          disabled={!selectedVideo || isConverting}
          onClick={handleConvertToMp3}
        >
          <Download className="size-4" />
          {isConverting ? "Converting..." : "Convert to MP3"}
        </Button>
      </div>

      {progressState ? (
        <ProgressCard status={progressState.status} progress={progressState.progress} />
      ) : null}
    </div>
  )
}
