"use client"

import * as React from "react"
import { Download } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard, ToolActionCard, ToolUploadSection } from "@/components/tool-layout"

import { createZipBlob } from "@/lib/utils/zip"

import {
  COMPLETION_PREVIEW_MS,
  waitFor,
  type ToolProgressState,
} from "@/lib/tools/progress"

export default function ZipCreatorTool() {
  const [files, setFiles] = React.useState<File[]>([])
  const [isCreating, setIsCreating] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] =
    React.useState<ToolProgressState | null>(null)

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

  const handleCreateZip = React.useCallback(async () => {
    if (files.length === 0) {
      setErrorMessage("Please choose at least one file.")
      return
    }

    setErrorMessage(null)
    setIsCreating(true)

    setProgressState({
      status: "Preparing ZIP",
      progress: 5,
    })

    try {
      const zipBlob = await createZipBlob({
        entries: files.map((file) => ({
          filename: file.name,
          data: file,
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

      triggerDownload(zipBlob, "turnanything-files.zip")
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to create ZIP."
      )
    } finally {
      setProgressState(null)
      setIsCreating(false)
    }
  }, [files, triggerDownload])

  return (
    <div className="grid gap-6">
        <ToolUploadSection>
          <FileDropzone
            acceptedFileTypes={[]}
            multiple
            value={files}
            onFilesSelected={setFiles}
            title="Upload files"
            description="Choose one or more files to compress."
            emptyStateTitle="Drop files here"
            emptyStateDescription="Any file type is supported."
          />
        </ToolUploadSection>

        <ToolActionCard
          title="Ready to compress"
          description="Files are compressed locally in your browser."
          buttonText="Create ZIP"
          loadingText="Compressing..."
          loading={isCreating}
          disabled={files.length === 0}
          error={errorMessage}
          onAction={handleCreateZip}
          icon={<Download className="size-4" />}
        />

        {progressState && (
          <ProgressCard
            status={progressState.status}
            progress={progressState.progress}
          />
        )}
      </div>
  )
}