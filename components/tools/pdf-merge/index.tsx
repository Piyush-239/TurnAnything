"use client"

import * as React from "react"
import { Download, GripVertical, Loader2, MoveDown, MoveUp, Trash2 } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mergePdfFiles, getMergedPdfFileName, type PdfMergeProgress, type PdfFileEntry } from "@/lib/utils/pdf-merge"
import { COMPLETION_PREVIEW_MS, type ToolProgressState, waitFor } from "@/lib/tools/progress"

type DragState = {
  draggedId: string | null
  dragOverId: string | null
}

function buildPdfEntry(file: File): PdfFileEntry {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${file.type}`,
    file,
  }
}

function moveEntry(entries: PdfFileEntry[], fromId: string, toId: string): PdfFileEntry[] {
  const fromIndex = entries.findIndex((entry) => entry.id === fromId)
  const toIndex = entries.findIndex((entry) => entry.id === toId)

  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return entries
  }

  const nextEntries = [...entries]
  const [movedEntry] = nextEntries.splice(fromIndex, 1)
  nextEntries.splice(toIndex, 0, movedEntry)

  return nextEntries
}

// The tool keeps the PDF merge workflow local and modular so split/rotate tools can reuse the same PDF utilities later.
export default function PdfMergeTool() {
  const [pdfEntries, setPdfEntries] = React.useState<PdfFileEntry[]>([])
  const [outputFileName, setOutputFileName] = React.useState("turnanything-merged.pdf")
  const [isMerging, setIsMerging] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)
  const [dragState, setDragState] = React.useState<DragState>({ draggedId: null, dragOverId: null })

  const pdfFiles = React.useMemo(() => pdfEntries.map((entry) => entry.file), [pdfEntries])
  const resolvedOutputFileName = React.useMemo(() => {
    if (pdfEntries.length === 0) {
      return "turnanything-merged.pdf"
    }

    return outputFileName.trim() || getMergedPdfFileName(pdfFiles)
  }, [outputFileName, pdfEntries.length, pdfFiles])

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

  const handleProgressUpdate = React.useCallback((update: PdfMergeProgress) => {
    setProgressState({
      status: update.status,
      progress: update.progress,
    })
  }, [])

  const handleFilesSelected = React.useCallback((files: File[]) => {
    setErrorMessage(null)
    setPdfEntries(files.map(buildPdfEntry))
    setDragState({ draggedId: null, dragOverId: null })
  }, [])

  const handleMergePdfs = React.useCallback(async () => {
    if (pdfFiles.length === 0) {
      setErrorMessage("Please upload at least one PDF before merging.")
      return
    }

    setIsMerging(true)
    setErrorMessage(null)
    setProgressState({ status: "Preparing PDF merge", progress: 5 })

    try {
      const mergedBlob = await mergePdfFiles({
        files: pdfFiles,
        onProgress: handleProgressUpdate,
      })

      setProgressState({ status: "Completed", progress: 100 })
      await waitFor(COMPLETION_PREVIEW_MS)
      triggerDownload(mergedBlob, resolvedOutputFileName)
    } catch (error) {
      const message = error instanceof Error ? error.message : "We could not merge those PDFs."
      setErrorMessage(message)
    } finally {
      setIsMerging(false)
      setProgressState(null)
    }
  }, [handleProgressUpdate, pdfFiles, resolvedOutputFileName, triggerDownload])

  const handleDropReorder = React.useCallback((fromId: string, toId: string) => {
    setPdfEntries((currentEntries) => moveEntry(currentEntries, fromId, toId))
    setDragState({ draggedId: null, dragOverId: null })
  }, [])

  return (
    <div className="grid gap-6">
      <FileDropzone
        acceptedFileTypes={[".pdf", "application/pdf"]}
        multiple
        value={pdfEntries.map((entry) => entry.file)}
        onFilesSelected={handleFilesSelected}
        title="Upload PDFs"
        description="Add multiple PDF files to merge them locally in your browser."
        emptyStateTitle="Drop PDF files here"
        emptyStateDescription="PDF files stay on your device and will be merged in the order you choose."
      />

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Output file name</p>
            <p className="text-sm text-muted-foreground">You can rename the merged file before downloading it.</p>
          </div>

          <Input value={outputFileName} onChange={(event) => setOutputFileName(event.target.value)} />
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">PDF order</p>
            <p className="text-sm text-muted-foreground">Drag to reorder before merging.</p>
          </div>
          <p className="text-xs text-muted-foreground">{pdfEntries.length} selected</p>
        </div>

        {pdfEntries.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {pdfEntries.map((entry, index) => {
              const isFirst = index === 0
              const isLast = index === pdfEntries.length - 1
              const isActiveDropTarget = dragState.dragOverId === entry.id && dragState.draggedId !== entry.id

              return (
                <div
                  key={entry.id}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "move"
                    event.dataTransfer.setData("text/plain", entry.id)
                    setDragState({ draggedId: entry.id, dragOverId: entry.id })
                  }}
                  onDragOver={(event) => {
                    event.preventDefault()
                    if (dragState.draggedId && dragState.draggedId !== entry.id) {
                      setDragState((currentState) => ({
                        ...currentState,
                        dragOverId: entry.id,
                      }))
                    }
                  }}
                  onDrop={(event) => {
                    event.preventDefault()
                    const draggedId = event.dataTransfer.getData("text/plain") || dragState.draggedId
                    if (draggedId) {
                      handleDropReorder(draggedId, entry.id)
                    }
                  }}
                  onDragEnd={() => setDragState({ draggedId: null, dragOverId: null })}
                  className={[
                    "flex items-center gap-3 rounded-xl border bg-background/70 p-3 transition-all",
                    isActiveDropTarget ? "border-primary ring-2 ring-primary/20" : "border-border/70",
                  ].join(" ")}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <GripVertical className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{entry.file.name}</p>
                    <p className="text-xs text-muted-foreground">{index + 1} of {pdfEntries.length}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={isFirst}
                      aria-label={`Move ${entry.file.name} up`}
                      onClick={() => {
                        const previousEntry = pdfEntries[index - 1]
                        if (previousEntry) {
                          setPdfEntries((currentEntries) => moveEntry(currentEntries, entry.id, previousEntry.id))
                        }
                      }}
                    >
                      <MoveUp className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      disabled={isLast}
                      aria-label={`Move ${entry.file.name} down`}
                      onClick={() => {
                        const nextEntry = pdfEntries[index + 1]
                        if (nextEntry) {
                          setPdfEntries((currentEntries) => moveEntry(currentEntries, entry.id, nextEntry.id))
                        }
                      }}
                    >
                      <MoveDown className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove ${entry.file.name}`}
                      onClick={() => {
                        setPdfEntries((currentEntries) => currentEntries.filter((current) => current.id !== entry.id))
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-border/70 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            Upload PDF files to see them here.
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Ready to merge</p>
          <p className="text-sm text-muted-foreground">All PDFs are merged locally in your browser. Nothing is uploaded.</p>
          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        </div>

        <Button
          type="button"
          size="lg"
          className="w-full sm:w-auto"
          disabled={pdfEntries.length === 0 || isMerging}
          onClick={handleMergePdfs}
        >
          {isMerging ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
          {isMerging ? "Merging..." : "Merge PDFs"}
        </Button>
      </div>

      {progressState ? <ProgressCard status={progressState.status} progress={progressState.progress} /> : null}
    </div>
  )
}