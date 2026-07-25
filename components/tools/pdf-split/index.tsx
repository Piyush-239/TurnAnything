"use client"

import * as React from "react"
import { Download, Loader2 } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { splitPdf } from "@/lib/utils/pdf-split"
import {
  COMPLETION_PREVIEW_MS,
  waitFor,
  type ToolProgressState,
} from "@/lib/tools/progress"

export default function PdfSplitTool() {
  const [files, setFiles] = React.useState<File[]>([])
  const [pageRanges, setPageRanges] = React.useState("")
  const [splitEveryPage, setSplitEveryPage] = React.useState(true)

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progressState, setProgressState] =
    React.useState<ToolProgressState | null>(null)

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const selectedFile = files[0] ?? null

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

  const handleSplit = React.useCallback(async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a PDF.")
      return
    }

    setErrorMessage(null)
    setIsProcessing(true)

    try {
      const blob = await splitPdf({
        file: selectedFile,
        splitEveryPage,
        pageRanges: splitEveryPage ? undefined : pageRanges,
        onProgress(update) {
          setProgressState(update)
        },
      })

      setProgressState({
        status: "Completed",
        progress: 100,
      })

      await waitFor(COMPLETION_PREVIEW_MS)

      triggerDownload(
        blob,
        splitEveryPage ? "split-pages.zip" : "split-document.pdf",
      )
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to split the PDF.",
      )
    } finally {
      setProgressState(null)
      setIsProcessing(false)
    }
  }, [
    selectedFile,
    splitEveryPage,
    pageRanges,
    triggerDownload,
  ])

  return (
    <div className="grid gap-6">

      <FileDropzone
        acceptedFileTypes={["application/pdf", ".pdf"]}
        multiple={false}
        value={files}
        onFilesSelected={setFiles}
        title="Upload PDF"
        description="Choose a PDF to split."
        emptyStateTitle="Drop PDF here"
        emptyStateDescription="Only PDF files are supported."
      />

      <div className="rounded-xl border p-5 space-y-5">

        <div className="space-y-3">

          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={splitEveryPage}
              onChange={() => setSplitEveryPage(true)}
            />

            <span>Split every page into separate PDFs (ZIP)</span>

          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={!splitEveryPage}
              onChange={() => setSplitEveryPage(false)}
            />

            <span>Extract specific pages</span>

          </label>

        </div>

        {!splitEveryPage && (
          <Input
            value={pageRanges}
            onChange={(e) => setPageRanges(e.target.value)}
            placeholder="Example: 1-3,5,8-10"
          />
        )}

      </div>

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="font-medium">
            Ready to split
          </p>

          <p className="text-sm text-muted-foreground">
            Your PDF never leaves your browser.
          </p>

          {errorMessage && (
            <p className="mt-2 text-sm text-destructive">
              {errorMessage}
            </p>
          )}

        </div>

        <Button
          size="lg"
          disabled={!selectedFile || isProcessing}
          onClick={handleSplit}
        >
          {isProcessing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="size-4" />
              Split PDF
            </>
          )}
        </Button>

      </div>

      {progressState && (
        <ProgressCard
          status={progressState.status}
          progress={progressState.progress}
        />
      )}

    </div>
  )
}