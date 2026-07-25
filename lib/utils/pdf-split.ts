import { PDFDocument } from "pdf-lib"

import { createZipBlob } from "./zip"

export interface PdfSplitProgress {
  status: string
  progress: number
}

export interface SplitPdfOptions {
  file: File
  pageRanges?: string
  splitEveryPage?: boolean
  onProgress?: (update: PdfSplitProgress) => void
}

function reportProgress(
  onProgress: SplitPdfOptions["onProgress"],
  status: string,
  progress: number,
) {
  onProgress?.({
    status,
    progress,
  })
}

function parsePageRanges(pageRanges: string, totalPages: number): number[] {
  const pages = new Set<number>()

  for (const segment of pageRanges.split(",")) {
    const value = segment.trim()

    if (!value) continue

    if (value.includes("-")) {
      const [startText, endText] = value.split("-").map((item) => item.trim())

      const start = Number(startText)
      const end = Number(endText)

      if (
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start <= 0 ||
        end <= 0 ||
        start > end
      ) {
        throw new Error(`Invalid page range "${value}".`)
      }

      for (let page = start; page <= end; page++) {
        if (page > totalPages) {
          throw new Error(`Page ${page} does not exist.`)
        }

        pages.add(page - 1)
      }
    } else {
      const page = Number(value)

      if (!Number.isInteger(page) || page <= 0 || page > totalPages) {
        throw new Error(`Invalid page "${value}".`)
      }

      pages.add(page - 1)
    }
  }

  return [...pages].sort((a, b) => a - b)
}

export async function splitPdf({
  file,
  pageRanges,
  splitEveryPage = false,
  onProgress,
}: SplitPdfOptions): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error("PDF splitting is only available in the browser.")
  }

  reportProgress(onProgress, "Reading PDF", 5)

  const inputBytes = await file.arrayBuffer()

  const sourcePdf = await PDFDocument.load(inputBytes)

  const totalPages = sourcePdf.getPageCount()

  if (totalPages === 0) {
    throw new Error("The PDF contains no pages.")
  }

  if (splitEveryPage) {
    reportProgress(onProgress, "Splitting pages", 20)

    const entries: {
      filename: string
      data: Uint8Array
    }[] = []

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const newPdf = await PDFDocument.create()

      const [page] = await newPdf.copyPages(sourcePdf, [pageIndex])

      newPdf.addPage(page)

      const pdfBytes = await newPdf.save()

      entries.push({
        filename: `page-${pageIndex + 1}.pdf`,
        data: pdfBytes,
      })

      reportProgress(
        onProgress,
        `Creating page ${pageIndex + 1} of ${totalPages}`,
        20 + Math.round(((pageIndex + 1) / totalPages) * 55),
      )
    }

    reportProgress(onProgress, "Packaging ZIP", 80)

    return createZipBlob({
      entries,
      onProgress: (update) => {
        reportProgress(
          onProgress,
          update.status,
          80 + Math.round(update.progress * 0.2),
        )
      },
    })
  }

  if (!pageRanges?.trim()) {
    throw new Error("Please enter a page range.")
  }

  reportProgress(onProgress, "Parsing page ranges", 20)

  const pageIndexes = parsePageRanges(pageRanges, totalPages)

  if (pageIndexes.length === 0) {
    throw new Error("No valid pages were selected.")
  }

  reportProgress(onProgress, "Creating PDF", 45)

  const outputPdf = await PDFDocument.create()

  const copiedPages = await outputPdf.copyPages(sourcePdf, pageIndexes)

  for (const page of copiedPages) {
    outputPdf.addPage(page)
  }

  reportProgress(onProgress, "Saving PDF", 90)

  const outputBytes = await outputPdf.save()

  reportProgress(onProgress, "Completed", 100)

    const pdfBytes = new Uint8Array(outputBytes)

    return new Blob([pdfBytes], {
      type: "application/pdf",
    })
}