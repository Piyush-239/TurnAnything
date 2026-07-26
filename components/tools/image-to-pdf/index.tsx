"use client"

import * as React from "react"
import { Download } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { createImagesPdfBlob, type PdfGenerationProgress } from "@/lib/utils/pdf"
import { ProgressCard, StandardToolLayout, ToolActionCard, ToolUploadSection } from "@/components/tool-layout"
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
    <StandardToolLayout
      title="Image to PDF"
      description="Combine images into a single PDF file in the browser."
      category="utility"
    >
      <div className="grid gap-6">
        <ToolUploadSection>
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
        </ToolUploadSection>

        <ToolActionCard
          title="Ready to convert"
          description="Your images stay in the browser and will be exported in the same order they were added."
          buttonText="Convert to PDF"
          loadingText="Converting..."
          loading={isConverting}
          disabled={images.length === 0}
          error={conversionError}
          onAction={handleConvertToPdf}
          icon={<Download className="size-4" />}
        />

        {progressState ? (
          <ProgressCard status={progressState.status} progress={progressState.progress} />
        ) : null}
      </div>
    </StandardToolLayout>
  )
}