import type { BodyPix } from "@tensorflow-models/body-pix"

export interface BackgroundRemoverProgress {
  status: string
  progress: number
}

export interface RemoveBackgroundOptions {
  file: File
  onProgress?: (update: BackgroundRemoverProgress) => void
}

export interface RemoveBackgroundResult {
  blob: Blob
}

let netInstance: BodyPix | null = null

async function getBodyPixModel(onProgress: RemoveBackgroundOptions["onProgress"]) {
  if (netInstance) {
    return netInstance
  }

  // Load TensorFlow and BodyPix dynamically inside functions to prevent Next.js SSR crashes
  const tf = await import("@tensorflow/tfjs")
  const bodyPix = await import("@tensorflow-models/body-pix")

  onProgress?.({ status: "Preparing...", progress: 5 })
  await tf.ready()

  onProgress?.({ status: "Loading AI model...", progress: 15 })
  netInstance = await bodyPix.load({
    architecture: "MobileNetV1",
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2,
  })

  return netInstance
}

export async function removeBackground({
  file,
  onProgress,
}: RemoveBackgroundOptions): Promise<RemoveBackgroundResult> {
  if (typeof window === "undefined") {
    throw new Error("Background removal is only available in the browser.")
  }

  onProgress?.({ status: "Preparing...", progress: 5 })

  const net = await getBodyPixModel(onProgress)

  onProgress?.({ status: "Preparing...", progress: 35 })

  // Load the image
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imgEl = new Image()
      imgEl.onload = () => resolve(imgEl)
      imgEl.onerror = () => reject(new Error("Invalid or corrupted image file."))
      imgEl.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error("Failed to read image file."))
    reader.readAsDataURL(file)
  })

  onProgress?.({ status: "Removing background...", progress: 50 })

  const segmentation = await net.segmentPerson(img, {
    internalResolution: "medium",
    segmentationThreshold: 0.7,
  })

  // Check if subject detected
  const hasPerson = segmentation.data.some((pixel: number) => pixel === 1)
  if (!hasPerson) {
    throw new Error("No subject could be detected in this image. Please upload a clear photo.")
  }

  onProgress?.({ status: "Generating PNG...", progress: 80 })

  const canvas = document.createElement("canvas")
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight

  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("Failed to get 2D context from canvas.")
  }

  // Draw original image
  ctx.drawImage(img, 0, 0)

  // Get image pixels
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixelData = imgData.data

  // Apply transparent background
  for (let i = 0; i < segmentation.data.length; i++) {
    const isPerson = segmentation.data[i] === 1
    if (!isPerson) {
      pixelData[i * 4 + 3] = 0 // set alpha to 0
    }
  }

  // Put transparent pixels back to canvas
  ctx.putImageData(imgData, 0, 0)

  // Convert output to transparent PNG blob
  const resultBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error("Failed to generate transparent output image."))
      }
    }, "image/png")
  })

  onProgress?.({ status: "Completed", progress: 100 })

  return {
    blob: resultBlob,
  }
}
