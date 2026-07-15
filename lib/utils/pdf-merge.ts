import { PDFDocument } from "pdf-lib"

export type PdfMergeProgress = {
  status: string
  progress: number
}

export type MergePdfFilesOptions = {
  files: File[]
  onProgress?: (progress: PdfMergeProgress) => void
}

export type MergeAndDownloadPdfFilesOptions = MergePdfFilesOptions & {
  fileName?: string
}

export type PdfFileEntry = {
  id: string
  file: File
}

function clampProgress(progress: number): number {
  if (!Number.isFinite(progress)) {
    return 0
  }

  if (progress < 0) {
    return 0
  }

  if (progress > 100) {
    return 100
  }

  return Math.round(progress)
}

function reportProgress(
  onProgress: MergePdfFilesOptions["onProgress"],
  status: string,
  progress: number,
): void {
  onProgress?.({
    status,
    progress: clampProgress(progress),
  })
}

function downloadBlob(blob: Blob, fileName: string): void {
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
}

function stripPdfExtension(fileName: string): string {
  const lowerName = fileName.toLowerCase()

  if (lowerName.endsWith(".pdf")) {
    return fileName.slice(0, -4).trim()
  }

  return fileName.trim()
}

function buildMergedFileName(files: File[]): string {
  if (files.length === 0) {
    return "turnanything-merged.pdf"
  }

  const firstBaseName = stripPdfExtension(files[0].name) || "turnanything"

  return `${firstBaseName}-merged.pdf`
}

async function loadPdfBytes(file: File): Promise<Uint8Array> {
  const bytes = await file.arrayBuffer()

  return new Uint8Array(bytes)
}

// Shared PDF utilities live here so merge, split, and rotation tools can reuse the same browser-only PDF helpers later.
export async function mergePdfFiles({
  files,
  onProgress,
}: MergePdfFilesOptions): Promise<Blob> {
  if (files.length === 0) {
    throw new Error("Select at least one PDF before merging.")
  }

  reportProgress(onProgress, "Preparing PDF merge", 5)

  const mergedPdf = await PDFDocument.create()

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index]
    const sourcePdf = await PDFDocument.load(await loadPdfBytes(file), {
      ignoreEncryption: false,
    })
    const pageIndices = sourcePdf.getPageIndices()
    const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices)

    copiedPages.forEach((page) => {
      mergedPdf.addPage(page)
    })

    reportProgress(onProgress, `Adding ${file.name}`, 10 + ((index + 1) / files.length) * 80)
  }

  reportProgress(onProgress, "Preparing download", 95)

  const mergedPdfBytes = await mergedPdf.save()

  const arrayBuffer = new ArrayBuffer(mergedPdfBytes.byteLength)
  const view = new Uint8Array(arrayBuffer)
  view.set(mergedPdfBytes)
  
  return new Blob([arrayBuffer], {
    type: "application/pdf",
  })
}

export async function mergeAndDownloadPdfFiles({
  files,
  fileName = buildMergedFileName(files),
  onProgress,
}: MergeAndDownloadPdfFilesOptions): Promise<void> {
  const pdfBlob = await mergePdfFiles({
    files,
    onProgress,
  })

  reportProgress(onProgress, "Completed", 100)

  downloadBlob(pdfBlob, fileName)
}

export function getMergedPdfFileName(files: File[]): string {
  return buildMergedFileName(files)
}