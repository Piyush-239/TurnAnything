"use client"

import * as React from "react"
import { Download, Loader2 } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard, StandardToolLayout, ToolActionCard, ToolResultCard, ToolUploadSection } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"

import { extractZip, type ExtractedEntry } from "@/lib/utils/zip-extractor"

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

export default function ZipExtractorTool() {
  const [files, setFiles] = React.useState<File[]>([])
  const [extractedFiles, setExtractedFiles] = React.useState<ExtractedEntry[]>([])
  const [isExtracting, setIsExtracting] = React.useState(false)
  const [isDownloadingAll, setIsDownloadingAll] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] =
    React.useState<ToolProgressState | null>(null)

  const handleFilesSelected = React.useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setExtractedFiles([])
    setErrorMessage(null)
  }, [])

  const triggerDownload = React.useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)

    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = filename
    anchor.style.display = "none"

    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()

    setTimeout(() => URL.revokeObjectURL(url), 0)
  }, [])

  const handleExtractZip = React.useCallback(async () => {
    if (files.length === 0) {
      setErrorMessage("Please upload a ZIP file first.")
      return
    }

    setErrorMessage(null)
    setIsExtracting(true)
    setExtractedFiles([])

    setProgressState({
      status: "Preparing ZIP",
      progress: 5,
    })

    try {
      const results = await extractZip({
        file: files[0],
        onProgress(update) {
          setProgressState(update)
        },
      })

      setProgressState({
        status: "Completed",
        progress: 100,
      })

      await waitFor(COMPLETION_PREVIEW_MS)

      setExtractedFiles(results)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to extract ZIP."
      )
    } finally {
      setProgressState(null)
      setIsExtracting(false)
    }
  }, [files])

  const handleDownloadAll = React.useCallback(async () => {
    if (extractedFiles.length === 0) return

    setErrorMessage(null)
    setIsDownloadingAll(true)

    setProgressState({
      status: "Recreating ZIP",
      progress: 10,
    })

    try {
      const { createZipBlob } = await import("@/lib/utils/zip")
      const zipBlob = await createZipBlob({
        entries: extractedFiles.map((f) => ({
          filename: f.filename,
          data: f.blob,
        })),
        onProgress(update) {
          setProgressState(update)
        },
      })

      setProgressState({
        status: "Completed",
        progress: 100,
      })

      await waitFor(COMPLETION_PREVIEW_MS)

      const zipName = files[0]?.name || "extracted-files.zip"
      const downloadName = zipName.toLowerCase().endsWith(".zip")
        ? `${zipName.slice(0, -4)}-extracted.zip`
        : `${zipName}-extracted.zip`

      triggerDownload(zipBlob, downloadName)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to download all files as ZIP."
      )
    } finally {
      setProgressState(null)
      setIsDownloadingAll(false)
    }
  }, [extractedFiles, files, triggerDownload])

  return (
    <StandardToolLayout
      title="ZIP Extractor"
      description="Extract ZIP archives directly in your browser."
      category="utility"
    >
      <div className="grid gap-6">
        <ToolUploadSection>
          <FileDropzone
            acceptedFileTypes={[".zip", "application/zip", "application/x-zip-compressed"]}
            multiple={false}
            value={files}
            onFilesSelected={handleFilesSelected}
            title="Upload ZIP file"
            description="Choose a ZIP archive to extract its contents."
            emptyStateTitle="Drop ZIP file here"
            emptyStateDescription="Supports standard ZIP files."
          />
        </ToolUploadSection>

        <ToolActionCard
          title="Ready to extract"
          description="Archives are extracted locally in your browser."
          buttonText="Extract ZIP"
          loadingText="Extracting..."
          loading={isExtracting}
          disabled={files.length === 0 || isDownloadingAll}
          error={errorMessage}
          onAction={handleExtractZip}
          icon={<Download className="size-4" />}
        />

        {progressState && (
          <ProgressCard
            status={progressState.status}
            progress={progressState.progress}
          />
        )}

        {extractedFiles.length > 0 && (
          <ToolResultCard
            title="Extracted Files"
            successMessage={`${extractedFiles.length} ${extractedFiles.length === 1 ? "file" : "files"} extracted`}
            downloadArea={
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAll}
                disabled={isExtracting || isDownloadingAll}
              >
                {isDownloadingAll ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating ZIP...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 size-4" />
                    Download All (.zip)
                  </>
                )}
              </Button>
            }
          >
            <div className="max-h-96 overflow-y-auto rounded-xl border bg-card/50 divide-y divide-border">
              {extractedFiles.map((file) => {
                const displayFilename = file.filename.split("/").pop() || file.filename
                return (
                  <div
                    key={file.filename}
                    className="flex items-center justify-between gap-4 p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium" title={file.filename}>
                        {file.filename}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatBytes(file.blob.size)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => triggerDownload(file.blob, displayFilename)}
                      aria-label={`Download ${displayFilename}`}
                    >
                      <Download className="size-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </ToolResultCard>
        )}
      </div>
    </StandardToolLayout>
  )
}
