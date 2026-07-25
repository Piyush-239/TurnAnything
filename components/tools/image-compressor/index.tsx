"use client"

import * as React from "react"
import { Download, ImageIcon, RefreshCw } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard, StandardToolLayout, ToolActionCard, ToolResultCard, ToolUploadSection } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"

import { compressImage, type CompressImageResult } from "@/lib/utils/image-compressor"

import {
  COMPLETION_PREVIEW_MS,
  waitFor,
  type ToolProgressState,
} from "@/lib/tools/progress"

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ImageCompressorTool() {
  const [images, setImages] = React.useState<File[]>([])
  const [originalPreviewUrl, setOriginalPreviewUrl] = React.useState<string | null>(null)
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null)
  const [quality, setQuality] = React.useState(80) // 10 to 100
  const [format, setFormat] = React.useState<"auto" | "jpeg" | "png" | "webp">("auto")
  const [isCompressing, setIsCompressing] = React.useState(false)
  const [compressedResult, setCompressedResult] = React.useState<CompressImageResult | null>(null)
  const [compressedPreviewUrl, setCompressedPreviewUrl] = React.useState<string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)

  React.useEffect(() => {
    if (images.length === 0) {
      setOriginalPreviewUrl(null)
      setDimensions(null)
      setCompressedResult(null)
      setErrorMessage(null)
      return
    }
    const url = URL.createObjectURL(images[0])
    setOriginalPreviewUrl(url)

    const img = new Image()
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.src = url

    setCompressedResult(null)
    setErrorMessage(null)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [images])

  React.useEffect(() => {
    if (!compressedResult) {
      setCompressedPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(compressedResult.blob)
    setCompressedPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [compressedResult])

  const selectedImage = images[0] ?? null

  const handleCompress = React.useCallback(async () => {
    if (!selectedImage) {
      setErrorMessage("Please upload an image first.")
      return
    }

    setErrorMessage(null)
    setIsCompressing(true)
    setCompressedResult(null)

    setProgressState({
      status: "Preparing image",
      progress: 10,
    })

    try {
      const result = await compressImage({
        file: selectedImage,
        quality: quality / 100,
        format,
        onProgress(update) {
          setProgressState(update)
        },
      })

      setProgressState({
        status: "Completed",
        progress: 100,
      })

      await waitFor(COMPLETION_PREVIEW_MS)

      setCompressedResult(result)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Compression failed."
      )
    } finally {
      setProgressState(null)
      setIsCompressing(false)
    }
  }, [selectedImage, quality, format])

  const triggerDownload = React.useCallback(() => {
    if (!compressedResult || !selectedImage) return
    const url = compressedPreviewUrl
    if (!url) return

    const anchor = document.createElement("a")
    anchor.href = url

    const originalName = selectedImage.name
    const lastDotIndex = originalName.lastIndexOf(".")
    const baseName = lastDotIndex > 0 ? originalName.slice(0, lastDotIndex) : originalName
    
    // Determine output file extension
    let extension = lastDotIndex > 0 ? originalName.slice(lastDotIndex + 1) : "jpg"
    if (format !== "auto") {
      extension = format === "jpeg" ? "jpg" : format
    }

    anchor.download = `${baseName}-compressed.${extension}`
    anchor.style.display = "none"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }, [compressedResult, selectedImage, format, compressedPreviewUrl])

  const handleReset = React.useCallback(() => {
    setImages([])
    setQuality(80)
    setFormat("auto")
    setCompressedResult(null)
    setErrorMessage(null)
  }, [])

  const estimatedSize = React.useMemo(() => {
    if (!selectedImage) return 0
    let multiplier = 0.8
    const selectedFormat = format === "auto" ? selectedImage.type.split("/")[1] : format
    if (selectedFormat === "png") {
      multiplier = 0.95
    } else if (selectedFormat === "webp") {
      multiplier = 0.55
    } else if (selectedFormat === "jpeg" || selectedFormat === "jpg") {
      multiplier = 0.65
    }
    return Math.round(selectedImage.size * (quality / 100) * multiplier)
  }, [selectedImage, quality, format])

  return (
    <StandardToolLayout
      title="Image Compressor"
      description="Compress images without uploading them."
      category="utility"
    >
      <div className="grid gap-6">
        {images.length === 0 ? (
          <ToolUploadSection>
            <FileDropzone
              acceptedFileTypes={[
                ".png",
                ".jpg",
                ".jpeg",
                ".webp",
                ".bmp",
                "image/png",
                "image/jpeg",
                "image/webp",
                "image/bmp",
              ]}
              multiple={false}
              value={images}
              onFilesSelected={setImages}
              title="Upload image"
              description="Choose an image file to compress locally."
              emptyStateTitle="Drop image here"
              emptyStateDescription="PNG, JPG, JPEG, WEBP, and BMP files are supported."
            />
          </ToolUploadSection>
        ) : (
          <div className="rounded-2xl border bg-card p-4 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative size-20 rounded-lg overflow-hidden border bg-muted flex items-center justify-center shrink-0">
                {originalPreviewUrl ? (
                  <img src={originalPreviewUrl} alt="Original thumbnail" className="size-full object-cover" />
                ) : (
                  <ImageIcon className="size-8 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{selectedImage.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatBytes(selectedImage.size)}</p>
                {dimensions && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Dimensions: {dimensions.width} × {dimensions.height}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change image
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 border-t pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="compressor-quality" className="text-sm font-medium">
                    Quality: {quality}%
                  </label>
                </div>
                <input
                  id="compressor-quality"
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  disabled={isCompressing || compressedResult !== null}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="compressor-format" className="text-sm font-medium">
                  Output Format
                </label>
                <select
                  id="compressor-format"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                  value={format}
                  disabled={isCompressing || compressedResult !== null}
                  onChange={(event) => setFormat(event.target.value as any)}
                >
                  <option value="auto">Auto (Keep original)</option>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WEBP</option>
                </select>
              </div>
            </div>

            {compressedResult === null && (
              <div className="text-xs text-muted-foreground flex justify-between border-t pt-3">
                <span>Original Size: {formatBytes(selectedImage.size)}</span>
                <span>Estimated Output: ~{formatBytes(estimatedSize)}</span>
              </div>
            )}
          </div>
        )}

        {images.length > 0 && compressedResult === null && (
          <ToolActionCard
            title="Ready to compress"
            description="Your image stays in the browser. Nothing is uploaded."
            buttonText="Compress Image"
            loadingText="Compressing..."
            loading={isCompressing}
            disabled={images.length === 0}
            error={errorMessage}
            onAction={handleCompress}
            icon={<Download className="size-4" />}
          />
        )}

        {progressState && (
          <ProgressCard
            status={progressState.status}
            progress={progressState.progress}
          />
        )}

        {compressedResult && (
          <ToolResultCard
            title="Compression Result"
            successMessage={`Saved ${compressedResult.reducedPercent}% of original size (${formatBytes(selectedImage.size - compressedResult.compressedSize)} saved)`}
            downloadArea={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCw className="mr-2 size-4" />
                  Compress Another
                </Button>
                <Button variant="default" size="sm" onClick={triggerDownload}>
                  <Download className="mr-2 size-4" />
                  Download Image
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 text-center">
                  <p className="text-xs font-medium text-muted-foreground">Original ({formatBytes(selectedImage.size)})</p>
                  <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted flex items-center justify-center">
                    {originalPreviewUrl && (
                      <img src={originalPreviewUrl} alt="Original preview" className="max-h-full object-contain" />
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-xs font-medium text-muted-foreground">Compressed ({formatBytes(compressedResult.compressedSize)})</p>
                  <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted flex items-center justify-center">
                    {compressedPreviewUrl && (
                      <img src={compressedPreviewUrl} alt="Compressed preview" className="max-h-full object-contain" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ToolResultCard>
        )}
      </div>
    </StandardToolLayout>
  )
}
