"use client"

import * as React from "react"
import { Download, ImageIcon, RefreshCw, Wand2, Sparkles } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard, StandardToolLayout, ToolActionCard, ToolResultCard, ToolUploadSection } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"

import { removeBackground } from "@/lib/utils/background-remover"

import {
  COMPLETION_PREVIEW_MS,
  waitFor,
  type ToolProgressState,
} from "@/lib/tools/progress"

export default function BackgroundRemoverTool() {
  const [images, setImages] = React.useState<File[]>([])
  const [originalPreviewUrl, setOriginalPreviewUrl] = React.useState<string | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null)
  const [resultPreviewUrl, setResultPreviewUrl] = React.useState<string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)
  const [showHdModal, setShowHdModal] = React.useState(false)

  React.useEffect(() => {
    if (images.length === 0) {
      setOriginalPreviewUrl(null)
      setResultBlob(null)
      setErrorMessage(null)
      return
    }
    const url = URL.createObjectURL(images[0])
    setOriginalPreviewUrl(url)
    setResultBlob(null)
    setErrorMessage(null)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [images])

  React.useEffect(() => {
    if (!resultBlob) {
      setResultPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(resultBlob)
    setResultPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [resultBlob])

  const selectedImage = images[0] ?? null

  const handleRemoveBackground = React.useCallback(async () => {
    if (!selectedImage) {
      setErrorMessage("Please upload an image first.")
      return
    }

    setErrorMessage(null)
    setIsProcessing(true)
    setResultBlob(null)

    setProgressState({
      status: "Preparing...",
      progress: 5,
    })

    try {
      const result = await removeBackground({
        file: selectedImage,
        onProgress(update) {
          setProgressState(update)
        },
      })

      setProgressState({
        status: "Completed",
        progress: 100,
      })

      await waitFor(COMPLETION_PREVIEW_MS)

      setResultBlob(result.blob)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to remove background."
      )
    } finally {
      setProgressState(null)
      setIsProcessing(false)
    }
  }, [selectedImage])

  const triggerDownload = React.useCallback(() => {
    if (!resultBlob || !selectedImage) return
    const url = resultPreviewUrl
    if (!url) return

    const anchor = document.createElement("a")
    anchor.href = url

    const originalName = selectedImage.name
    const lastDotIndex = originalName.lastIndexOf(".")
    const baseName = lastDotIndex > 0 ? originalName.slice(0, lastDotIndex) : originalName

    anchor.download = `${baseName}-no-bg.png`
    anchor.style.display = "none"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }, [resultBlob, selectedImage, resultPreviewUrl])

  const handleReset = React.useCallback(() => {
    setImages([])
    setResultBlob(null)
    setErrorMessage(null)
  }, [])

  return (
    <StandardToolLayout
      title="Background Remover"
      description="Remove image backgrounds locally in your browser."
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
              description="Choose an image file to extract the subject."
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
                <p className="text-xs text-muted-foreground mt-0.5">
                  Ready to remove background.
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change image
              </Button>
            </div>
          </div>
        )}

        {images.length > 0 && resultBlob === null && (
          <ToolActionCard
            title="Ready to remove background"
            description="Our local AI model will segment the subject on your device."
            buttonText="Remove Background"
            loadingText="Processing..."
            loading={isProcessing}
            disabled={images.length === 0}
            error={errorMessage}
            onAction={handleRemoveBackground}
            icon={<Wand2 className="size-4" />}
          />
        )}

        {progressState && (
          <ProgressCard
            status={progressState.status}
            progress={progressState.progress}
          />
        )}

        {resultBlob && (
          <ToolResultCard
            title="Background Removed"
            successMessage="Subject extracted successfully into a transparent PNG"
            downloadArea={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCw className="mr-2 size-4" />
                  Compress Another
                </Button>
                <Button variant="default" size="sm" onClick={triggerDownload}>
                  <Download className="mr-2 size-4" />
                  Download PNG
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 text-center">
                  <p className="text-xs font-medium text-muted-foreground">Original</p>
                  <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted flex items-center justify-center">
                    {originalPreviewUrl && (
                      <img src={originalPreviewUrl} alt="Original preview" className="max-h-full object-contain" />
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-xs font-medium text-muted-foreground">Transparent Output</p>
                  <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted flex items-center justify-center pattern-grid bg-opacity-20">
                    <div className="absolute inset-0 size-full bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,8px_0px] opacity-15" />
                    {resultPreviewUrl && (
                      <img src={resultPreviewUrl} alt="Transparent preview" className="max-h-full object-contain relative z-10" />
                    )}
                  </div>
                </div>
              </div>

              {/* HD AI Promotional Card */}
              <div className="mt-6 rounded-2xl border bg-muted/40 p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="size-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">✨ Need even cleaner results?</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Upgrade to HD AI Background Remover.
                    </p>
                  </div>
                </div>

                <ul className="text-xs text-muted-foreground space-y-1.5 pl-8 list-disc">
                  <li>Cleaner hair extraction</li>
                  <li>Better edge detection</li>
                  <li>Transparent objects</li>
                  <li>Higher-resolution output</li>
                </ul>

                <div className="pl-8 pt-1">
                  <Button size="sm" variant="default" onClick={() => setShowHdModal(true)}>
                    Try HD AI
                  </Button>
                </div>
              </div>
            </div>
          </ToolResultCard>
        )}

        {/* Coming Soon Modal */}
        {showHdModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 font-medium">
                  <Sparkles className="size-5 text-amber-500 animate-pulse" />
                  <span>HD AI Background Remover</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  HD AI Background Remover is coming soon.
                </p>
                <p className="text-sm text-muted-foreground">
                  It will provide significantly cleaner results using our cloud AI model.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setShowHdModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StandardToolLayout>
  )
}
