"use client"

import * as React from "react"
import { Download, Loader2 } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { createImagesPdfBlob, type PdfGenerationProgress } from "@/lib/utils/pdf"
import { COMPLETION_PREVIEW_MS, type ToolProgressState, waitFor } from "@/lib/tools/progress"

// This component stays page-agnostic so the registry can mount it from the dynamic tool route.
// Keeping the upload, preview, and conversion UI here lets the route own chrome while the tool owns behavior.
export default function ImageToPdfTool() {
  const [images, setImages] = React.useState<File[]>([])
  const [isConverting, setIsConverting] = React.useState(false)
  const [conversionError, setConversionError] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)

  const triggerDownload = React.useCallback((blob: Blob, fileName: string) => {
    const downloadUrl = URL.createObjectURL(blob)
    const anchor = document.createElement("a")

    anchor.href = downloadUrl
    anchor.download = fileName
    anchor.rel = "noreferrer"
    anchor.style.display = "none"

    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()

    window.setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 0)
  }, [])

  const handleProgressUpdate = React.useCallback((update: PdfGenerationProgress) => {
    setProgressState({
      status: update.status,
      progress: update.progress,
    })
  }, [])

  const handleConvertToPdf = React.useCallback(async () => {
    setIsConverting(true)
    setConversionError(null)
    setProgressState({ status: "Preparing PDF", progress: 5 })

    const outputFileName = "turnanything-images.pdf"

    try {
      const pdfBlob = await createImagesPdfBlob({
        files: images,
        fileName: outputFileName,
        onProgress: handleProgressUpdate,
      })

      setProgressState({ status: "Completed", progress: 100 })
      await waitFor(COMPLETION_PREVIEW_MS)
      triggerDownload(pdfBlob, outputFileName)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to convert images to PDF."
      setConversionError(message)
    } finally {
      setIsConverting(false)
      setProgressState(null)
    }
  }, [handleProgressUpdate, images, triggerDownload])

  return (
    <div className="grid gap-6">
      <FileDropzone
        acceptedFileTypes={["image/*"]}
        multiple
        maxFileSize={10 * 1024 * 1024}
        value={images}
        onFilesSelected={setImages}
        title="Upload images"
        description="Add one or more images to prepare the future PDF conversion flow."
        emptyStateTitle="Drop images here"
        emptyStateDescription="PNG, JPG, WEBP, and GIF files are supported for now."
      />

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Ready to convert</p>
          <p className="text-sm text-muted-foreground">
            Your images stay in the browser and will be exported in the same order they were added.
          </p>
        </div>

        <Button
          type="button"
          size="lg"
          className="w-full sm:w-auto"
          disabled={images.length === 0 || isConverting}
          onClick={handleConvertToPdf}
        >
          {isConverting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Download className="size-4" />
              Convert to PDF
            </>
          )}
        </Button>
      </div>

      {progressState ? (
        <ProgressCard status={progressState.status} progress={progressState.progress} />
      ) : null}

      {conversionError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {conversionError}
        </div>
      ) : null}
    </div>
  )
}