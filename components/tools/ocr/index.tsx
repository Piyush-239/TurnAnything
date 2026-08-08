"use client"

import * as React from "react"
import { Copy, Download, FileText, Trash2, Check } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard, ToolActionCard, ToolResultCard, ToolUploadSection } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"

import { extractTextFromImage } from "@/lib/utils/ocr"

import {
  COMPLETION_PREVIEW_MS,
  waitFor,
  type ToolProgressState,
} from "@/lib/tools/progress"

interface OcrMetrics {
  charactersCount: number
  wordsCount: number
  linesCount: number
}

export default function OcrTool() {
  const [images, setImages] = React.useState<File[]>([])
  const [resultText, setResultText] = React.useState("")
  const [metrics, setMetrics] = React.useState<OcrMetrics | null>(null)
  const [isExtracting, setIsExtracting] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)
  const [copied, setCopied] = React.useState(false)

  const handleFilesSelected = React.useCallback((selectedFiles: File[]) => {
    setImages(selectedFiles)
    setResultText("")
    setMetrics(null)
    setErrorMessage(null)
  }, [])

  const handleExtractText = React.useCallback(async () => {
    if (images.length === 0) {
      setErrorMessage("Please upload an image first.")
      return
    }

    setErrorMessage(null)
    setIsExtracting(true)
    setResultText("")
    setMetrics(null)

    setProgressState({
      status: "Loading OCR engine",
      progress: 5,
    })

    try {
      const result = await extractTextFromImage({
        file: images[0],
        onProgress(update) {
          setProgressState(update)
        },
      })

      if (!result.text.trim()) {
        throw new Error("No text could be recognized from the image.")
      }

      setProgressState({
        status: "Completed",
        progress: 100,
      })

      await waitFor(COMPLETION_PREVIEW_MS)

      setResultText(result.text)
      setMetrics({
        charactersCount: result.charactersCount,
        wordsCount: result.wordsCount,
        linesCount: result.linesCount,
      })
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "OCR processing failed."
      )
    } finally {
      setProgressState(null)
      setIsExtracting(false)
    }
  }, [images])

  const handleCopyText = React.useCallback(() => {
    if (!resultText) return
    navigator.clipboard.writeText(resultText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [resultText])

  const handleDownloadTxt = React.useCallback(() => {
    if (!resultText) return
    const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = downloadUrl
    
    const imageName = images[0]?.name || "extracted-text"
    const lastDotIndex = imageName.lastIndexOf(".")
    const baseName = lastDotIndex > 0 ? imageName.slice(0, lastDotIndex) : imageName
    
    anchor.download = `${baseName}-text.txt`
    anchor.style.display = "none"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(downloadUrl)
  }, [resultText, images])

  const handleClear = React.useCallback(() => {
    setImages([])
    setResultText("")
    setMetrics(null)
    setErrorMessage(null)
  }, [])

  return (
    <div className="grid gap-6">
        <ToolUploadSection>
          <FileDropzone
            acceptedFileTypes={[
              ".png",
              ".jpg",
              ".jpeg",
              ".webp",
              ".bmp",
              ".gif",
              "image/png",
              "image/jpeg",
              "image/webp",
              "image/bmp",
              "image/gif",
            ]}
            multiple={false}
            value={images}
            onFilesSelected={handleFilesSelected}
            title="Upload image"
            description="Choose an image containing text to extract."
            emptyStateTitle="Drop image here"
            emptyStateDescription="PNG, JPG, JPEG, WEBP, BMP, and GIF files are supported."
          />
        </ToolUploadSection>

        <ToolActionCard
          title="Ready to extract"
          description="Your image is processed locally on your device. Nothing is uploaded."
          buttonText="Extract Text"
          loadingText="Extracting..."
          loading={isExtracting}
          disabled={images.length === 0}
          error={errorMessage}
          onAction={handleExtractText}
          icon={<FileText className="size-4" />}
        />

        {progressState && (
          <ProgressCard
            status={progressState.status}
            progress={progressState.progress}
          />
        )}

        {resultText && (
          <ToolResultCard
            title="Recognized Text"
            downloadArea={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyText}>
                  {copied ? (
                    <>
                      <Check className="mr-2 size-4 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 size-4" />
                      Copy Text
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadTxt}>
                  <Download className="mr-2 size-4" />
                  Download TXT
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={handleClear} aria-label="Clear all">
                  <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <textarea
                className="min-h-60 w-full rounded-xl border border-input bg-background p-4 text-sm shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                value={resultText}
                onChange={(e) => setResultText(e.target.value)}
              />

              {metrics && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t pt-3">
                  <span>Characters: <strong className="text-foreground">{metrics.charactersCount}</strong></span>
                  <span>Words: <strong className="text-foreground">{metrics.wordsCount}</strong></span>
                  <span>Lines: <strong className="text-foreground">{metrics.linesCount}</strong></span>
                </div>
              )}
            </div>
          </ToolResultCard>
        )}
      </div>
  )
}
