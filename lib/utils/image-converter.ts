export type ImageInputFormat = "jpg" | "png" | "webp" | "gif" | "bmp"

export type ImageOutputFormat = "jpg" | "png" | "webp"

export type ImageConversionProgress = {
  status: string
  progress: number
}

export type ImageFormatDefinition = {
  id: ImageOutputFormat
  label: string
  extension: string
  mimeType: string
  quality?: number
  encode?: (canvas: HTMLCanvasElement) => Promise<Blob>
}

export type ImageConversionResult = {
  blob: Blob
  fileName: string
  inputFormat: ImageInputFormat
  outputFormat: ImageOutputFormat
}

export type ConvertImageFileOptions = {
  file: File
  outputFormat: ImageOutputFormat
  inputFormat?: ImageInputFormat | null
  onProgress?: (progress: ImageConversionProgress) => void
}

const INPUT_FORMAT_LABELS: Record<ImageInputFormat, string> = {
  jpg: "JPG",
  png: "PNG",
  webp: "WEBP",
  gif: "GIF",
  bmp: "BMP",
}

const OUTPUT_FORMATS: Record<ImageOutputFormat, ImageFormatDefinition> = {
  jpg: {
    id: "jpg",
    label: "JPG",
    extension: "jpg",
    mimeType: "image/jpeg",
    quality: 1,
  },
  png: {
    id: "png",
    label: "PNG",
    extension: "png",
    mimeType: "image/png",
  },
  webp: {
    id: "webp",
    label: "WEBP",
    extension: "webp",
    mimeType: "image/webp",
    quality: 1,
  },
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
  onProgress: ConvertImageFileOptions["onProgress"],
  status: string,
  progress: number,
): void {
  onProgress?.({
    status,
    progress: clampProgress(progress),
  })
}

function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".")

  if (lastDotIndex <= 0) {
    return ""
  }

  return fileName.slice(lastDotIndex + 1).toLowerCase()
}

function getImageInputFormatFromBytes(bytes: Uint8Array): ImageInputFormat | null {
  if (bytes.length >= 8) {
    const isPng =
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a

    if (isPng) {
      return "png"
    }
  }

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg"
  }

  if (bytes.length >= 6) {
    const header = String.fromCharCode(
      bytes[0],
      bytes[1],
      bytes[2],
      bytes[3],
      bytes[4],
      bytes[5],
    )

    if (header === "GIF87a" || header === "GIF89a") {
      return "gif"
    }
  }

  if (bytes.length >= 12) {
    const isWebp =
      String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) === "RIFF" &&
      String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]) === "WEBP"

    if (isWebp) {
      return "webp"
    }
  }

  if (bytes.length >= 2 && bytes[0] === 0x42 && bytes[1] === 0x4d) {
    return "bmp"
  }

  return null
}

function getImageInputFormatFromMimeType(fileType: string): ImageInputFormat | null {
  switch (fileType.toLowerCase()) {
    case "image/jpeg":
    case "image/jpg":
      return "jpg"
    case "image/png":
      return "png"
    case "image/webp":
      return "webp"
    case "image/gif":
      return "gif"
    case "image/bmp":
    case "image/x-ms-bmp":
      return "bmp"
    default:
      return null
  }
}

function getImageInputFormatFromExtension(fileName: string): ImageInputFormat | null {
  switch (getFileExtension(fileName)) {
    case "jpg":
    case "jpeg":
      return "jpg"
    case "png":
      return "png"
    case "webp":
      return "webp"
    case "gif":
      return "gif"
    case "bmp":
      return "bmp"
    default:
      return null
  }
}

function loadImage(objectUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("We could not read that image. Please try another file."))
    image.src = objectUrl
  })
}

function encodeCanvas(canvas: HTMLCanvasElement, format: ImageFormatDefinition): Promise<Blob> {
  if (format.encode) {
    return format.encode(canvas)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
          return
        }

        reject(new Error(`The browser could not export this image as ${format.label}.`))
      },
      format.mimeType,
      format.quality,
    )
  })
}

function stripFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".")

  if (lastDotIndex <= 0) {
    return fileName.trim()
  }

  return fileName.slice(0, lastDotIndex).trim()
}

export function getImageInputFormatLabel(format: ImageInputFormat | null): string {
  if (!format) {
    return "Unknown"
  }

  return INPUT_FORMAT_LABELS[format]
}

export function getImageOutputFormatLabel(format: ImageOutputFormat): string {
  return OUTPUT_FORMATS[format].label
}

export function getAvailableImageOutputFormats(inputFormat: ImageInputFormat | null): ImageFormatDefinition[] {
  return Object.values(OUTPUT_FORMATS).filter((format) => format.id !== inputFormat)
}

export function buildImageOutputFileName(inputFileName: string, outputFormat: ImageOutputFormat): string {
  const baseName = stripFileExtension(inputFileName) || "turnanything-image"

  return `${baseName}.${OUTPUT_FORMATS[outputFormat].extension}`
}

export async function detectImageInputFormat(file: File): Promise<ImageInputFormat> {
  const mimeTypeFormat = getImageInputFormatFromMimeType(file.type)

  if (mimeTypeFormat) {
    return mimeTypeFormat
  }

  const byteSample = new Uint8Array(await file.slice(0, 16).arrayBuffer())
  const detectedFromBytes = getImageInputFormatFromBytes(byteSample)

  if (detectedFromBytes) {
    return detectedFromBytes
  }

  const detectedFromExtension = getImageInputFormatFromExtension(file.name)

  if (detectedFromExtension) {
    return detectedFromExtension
  }

  throw new Error("Unsupported image file. Please upload a JPG, JPEG, PNG, WEBP, GIF, or BMP image.")
}

// This stays browser-only so the UI can convert images with canvas without sending files anywhere.
export async function convertImageFile({
  file,
  outputFormat,
  inputFormat,
  onProgress,
}: ConvertImageFileOptions): Promise<ImageConversionResult> {
  if (!file) {
    throw new Error("Please choose an image before converting it.")
  }

  const detectedInputFormat = inputFormat ?? (await detectImageInputFormat(file))
  const outputDefinition = OUTPUT_FORMATS[outputFormat]

  reportProgress(onProgress, "Loading image", 15)

  const objectUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(objectUrl)

    if (!image.naturalWidth || !image.naturalHeight) {
      throw new Error("We could not read the image dimensions.")
    }

    reportProgress(onProgress, "Rendering image", 45)

    const canvas = document.createElement("canvas")
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    const context = canvas.getContext("2d")

    if (!context) {
      throw new Error("This browser does not support canvas rendering.")
    }

    if (outputFormat === "jpg") {
      context.fillStyle = "#ffffff"
      context.fillRect(0, 0, canvas.width, canvas.height)
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    reportProgress(onProgress, "Encoding image", 75)

    const blob = await encodeCanvas(canvas, outputDefinition)

    reportProgress(onProgress, "Preparing download", 95)

    return {
      blob,
      fileName: buildImageOutputFileName(file.name, outputFormat),
      inputFormat: detectedInputFormat,
      outputFormat,
    }
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}