import { jsPDF } from "jspdf"

type PDFImageSource = {
  dataUrl: string
  width: number
  height: number
}

export type GenerateImagesPdfOptions = {
  files: File[]
  fileName?: string
  pageMarginMm?: number
  onProgress?: (progress: PdfGenerationProgress) => void
}

export type PdfGenerationProgress = {
  status: string
  progress: number
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
  onProgress: GenerateImagesPdfOptions["onProgress"],
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

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
        return
      }

      reject(new Error(`Unable to read file "${file.name}".`))
    }

    reader.onerror = () => reject(new Error(`Unable to read file "${file.name}".`))
    reader.readAsDataURL(file)
  })
}

function loadImageMetadata(file: File): Promise<PDFImageSource> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = async () => {
      const dataUrl = await fileToDataUrl(file)

      URL.revokeObjectURL(objectUrl)

      resolve({
        dataUrl,
        width: image.naturalWidth,
        height: image.naturalHeight,
      })
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error(`Unsupported or corrupted image: ${file.name}`))
    }

    image.src = objectUrl
  })
}

function getFitDimensions(
  sourceWidth: number,
  sourceHeight: number,
  maxWidth: number,
  maxHeight: number,
) {
  const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight)

  return {
    width: sourceWidth * scale,
    height: sourceHeight * scale,
  }
}

// This utility keeps PDF creation browser-only and reusable so future tools can generate other image-based documents without duplicating jsPDF logic.
export async function createImagesPdfBlob({
  files,
  pageMarginMm = 10,
  onProgress,
}: GenerateImagesPdfOptions): Promise<Blob> {
  if (files.length === 0) {
    throw new Error("Select at least one image before generating a PDF.")
  }

  reportProgress(onProgress, "Preparing PDF", 5)

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const maxWidth = pageWidth - pageMarginMm * 2
  const maxHeight = pageHeight - pageMarginMm * 2

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index]
    const image = await loadImageMetadata(file)
    const fit = getFitDimensions(image.width, image.height, maxWidth, maxHeight)
    const x = (pageWidth - fit.width) / 2
    const y = (pageHeight - fit.height) / 2

    if (index > 0) {
      pdf.addPage()
    }

    pdf.addImage(image.dataUrl, file.type.toLowerCase().includes("png") ? "PNG" : "JPEG", x, y, fit.width, fit.height)

    const fileProgress = 10 + ((index + 1) / files.length) * 80
    reportProgress(onProgress, "Adding images to PDF", fileProgress)
  }

  reportProgress(onProgress, "Preparing download", 95)

  return pdf.output("blob")
}

export async function generateImagesPdf({
  files,
  fileName = "turnanything-images.pdf",
  pageMarginMm = 10,
  onProgress,
}: GenerateImagesPdfOptions): Promise<void> {
  const pdfBlob = await createImagesPdfBlob({
    files,
    pageMarginMm,
    onProgress,
  })

  reportProgress(onProgress, "Completed", 100)

  downloadBlob(pdfBlob, fileName)
}
