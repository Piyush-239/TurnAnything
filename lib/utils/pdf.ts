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
export async function generateImagesPdf({
  files,
  fileName = "turnanything-images.pdf",
  pageMarginMm = 10,
}: GenerateImagesPdfOptions): Promise<void> {
  if (files.length === 0) {
    throw new Error("Select at least one image before generating a PDF.")
  }

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
  }

  pdf.save(fileName)
}
