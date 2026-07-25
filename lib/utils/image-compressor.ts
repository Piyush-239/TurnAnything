export interface CompressImageOptions {
  file: File
  quality: number // 0.1 to 1.0
  format: "auto" | "jpeg" | "png" | "webp"
  onProgress?: (progress: { status: string; progress: number }) => void
}

export interface CompressImageResult {
  blob: Blob
  originalSize: number
  compressedSize: number
  reducedPercent: number
}

export async function compressImage({
  file,
  quality,
  format,
  onProgress,
}: CompressImageOptions): Promise<CompressImageResult> {
  if (typeof window === "undefined") {
    throw new Error("Image compression is only available in the browser.")
  }

  onProgress?.({ status: "Preparing image", progress: 10 })

  // Load the image
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imgEl = new Image()
      imgEl.onload = () => resolve(imgEl)
      imgEl.onerror = () => reject(new Error("Corrupted or invalid image file."))
      imgEl.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error("Failed to read image file."))
    reader.readAsDataURL(file)
  })

  onProgress?.({ status: "Compressing", progress: 40 })

  const canvas = document.createElement("canvas")
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("Failed to get canvas context.")
  }

  // Draw image to canvas
  ctx.drawImage(img, 0, 0)

  onProgress?.({ status: "Optimizing", progress: 70 })

  // Determine output MIME type
  let mimeType = file.type
  if (format !== "auto") {
    mimeType = `image/${format}`
  }

  const compressedBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error("Failed to compress image."))
        }
      },
      mimeType,
      quality
    )
  })

  onProgress?.({ status: "Completed", progress: 100 })

  const originalSize = file.size
  const compressedSize = compressedBlob.size
  const reducedPercent = Math.max(
    0,
    Math.round(((originalSize - compressedSize) / originalSize) * 100)
  )

  return {
    blob: compressedBlob,
    originalSize,
    compressedSize,
    reducedPercent,
  }
}
