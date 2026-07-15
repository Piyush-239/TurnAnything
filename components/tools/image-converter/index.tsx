"use client"

import * as React from "react"
import { Download, Loader2 } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import {
  convertImageFile,
  detectImageInputFormat,
  getAvailableImageOutputFormats,
  getImageInputFormatLabel,
  getImageOutputFormatLabel,
  type ImageInputFormat,
  type ImageOutputFormat,
  type ImageConversionProgress,
} from "@/lib/utils/image-converter"
import { COMPLETION_PREVIEW_MS, type ToolProgressState, waitFor } from "@/lib/tools/progress"

const acceptedImageFileTypes = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/x-ms-bmp",
]

const outputFormatPlaceholder = "Choose an output format"

// The tool keeps all conversion work in the browser so the route layer only needs to mount the reusable upload and conversion UI.
export default function ImageConverterTool() {
  const [images, setImages] = React.useState<File[]>([])
  const [inputFormat, setInputFormat] = React.useState<ImageInputFormat | null>(null)
  const [selectedOutputFormat, setSelectedOutputFormat] = React.useState<ImageOutputFormat | null>(null)
  const [isDetectingFormat, setIsDetectingFormat] = React.useState(false)
  const [isConverting, setIsConverting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)

  const selectedImage = images[0] ?? null
  const availableOutputFormats = React.useMemo(
    () => (inputFormat ? getAvailableImageOutputFormats(inputFormat) : []),
    [inputFormat],
  )
  const resolvedOutputFormat = React.useMemo<ImageOutputFormat | null>(() => {
    if (availableOutputFormats.length === 0) {
      return null
    }

    if (selectedOutputFormat && availableOutputFormats.some((format) => format.id === selectedOutputFormat)) {
      return selectedOutputFormat
    }

    return availableOutputFormats[0].id
  }, [availableOutputFormats, selectedOutputFormat])

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

  const handleProgressUpdate = React.useCallback((update: ImageConversionProgress) => {
    setProgressState({
      status: update.status,
      progress: update.progress,
    })
  }, [])

  React.useEffect(() => {
    let isActive = true

    if (!selectedImage) {
      return () => {
        isActive = false
      }
    }

    detectImageInputFormat(selectedImage)
      .then((detectedFormat) => {
        if (isActive) {
          setInputFormat(detectedFormat)
        }
      })
      .catch((error) => {
        if (isActive) {
          setInputFormat(null)
          setErrorMessage(error instanceof Error ? error.message : "We could not detect the image format.")
        }
      })
      .finally(() => {
        if (isActive) {
          setIsDetectingFormat(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [selectedImage])

  const handleConvertImage = React.useCallback(async () => {
    if (!selectedImage) {
      setErrorMessage("Please upload an image before converting it.")
      return
    }

    if (!resolvedOutputFormat) {
      setErrorMessage("Please choose an output format before converting.")
      return
    }

    setIsConverting(true)
    setErrorMessage(null)
    setProgressState({ status: "Preparing image", progress: 5 })

    try {
      const result = await convertImageFile({
        file: selectedImage,
        inputFormat,
        outputFormat: resolvedOutputFormat,
        onProgress: handleProgressUpdate,
      })

      setProgressState({ status: "Completed", progress: 100 })
      await waitFor(COMPLETION_PREVIEW_MS)
      triggerDownload(result.blob, result.fileName)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)

      setErrorMessage(
        message.includes("canvas")
          ? "Your browser cannot convert this image right now. Please try another browser or format."
          : message,
      )
    } finally {
      setIsConverting(false)
      setProgressState(null)
    }
  }, [handleProgressUpdate, inputFormat, resolvedOutputFormat, selectedImage, triggerDownload])

  const inputFormatLabel = isDetectingFormat
    ? "Detecting format..."
    : getImageInputFormatLabel(inputFormat)

  return (
    <div className="grid gap-6">
      <FileDropzone
        acceptedFileTypes={acceptedImageFileTypes}
        multiple={false}
        maxFileSize={10 * 1024 * 1024}
        value={images}
        onFilesSelected={(nextFiles) => {
          setImages(nextFiles)
          setErrorMessage(null)
          setInputFormat(null)

          if (nextFiles.length === 0) {
            setIsDetectingFormat(false)
            setSelectedOutputFormat(null)
            return
          }

          setIsDetectingFormat(true)
          setSelectedOutputFormat(null)
        }}
        title="Upload image"
        description="Add one image to convert it between JPG, PNG, and WEBP in your browser."
        emptyStateTitle="Drop an image here"
        emptyStateDescription="JPG, JPEG, PNG, WEBP, GIF, and BMP files are supported."
      />

      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Input Format</p>
            <p className="text-sm text-muted-foreground">
              {selectedImage ? inputFormatLabel : "Upload an image to detect its format."}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="image-converter-output-format" className="text-sm font-medium">
              Convert To
            </label>
            <select
              id="image-converter-output-format"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
              value={resolvedOutputFormat ?? ""}
              disabled={!selectedImage || isDetectingFormat || availableOutputFormats.length === 0 || isConverting}
              onChange={(event) => {
                setSelectedOutputFormat(event.target.value as ImageOutputFormat)
                setErrorMessage(null)
              }}
            >
              {!selectedImage ? <option value="">{outputFormatPlaceholder}</option> : null}
              {availableOutputFormats.length > 0 ? (
                availableOutputFormats.map((format) => (
                  <option key={format.id} value={format.id}>
                    {getImageOutputFormatLabel(format.id)}
                  </option>
                ))
              ) : (
                <option value="">{outputFormatPlaceholder}</option>
              )}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Ready to convert</p>
            <p className="text-sm text-muted-foreground">
              Your image stays in the browser. Nothing is uploaded.
            </p>
            {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
          </div>

          <Button
            type="button"
            size="lg"
            className="w-full sm:w-auto"
            disabled={!selectedImage || !resolvedOutputFormat || isConverting || isDetectingFormat}
            onClick={handleConvertImage}
          >
            {isConverting ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            {isConverting ? "Converting..." : "Download converted image"}
          </Button>
        </div>
      </div>

      {progressState ? <ProgressCard status={progressState.status} progress={progressState.progress} /> : null}
    </div>
  )
}