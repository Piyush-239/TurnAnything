import Tesseract, { createWorker } from "tesseract.js"

export interface OcrProgress {
  status: string
  progress: number
}

export interface ExtractTextOptions {
  file: File
  lang?: string
  onProgress?: (update: OcrProgress) => void
}

export interface OcrResult {
  text: string
  charactersCount: number
  wordsCount: number
  linesCount: number
}

export async function extractTextFromImage({
  file,
  lang = "eng",
  onProgress,
}: ExtractTextOptions): Promise<OcrResult> {
  if (typeof window === "undefined") {
    throw new Error("OCR is only available in the browser.")
  }

  onProgress?.({ status: "Loading OCR engine", progress: 5 })

  const worker = await createWorker(lang, undefined, {
    logger: (m: Tesseract.LoggerMessage) => {
      if (m && typeof m === "object" && "status" in m) {
        const rawStatus = String(m.status)
        const rawProgress = typeof m.progress === "number" ? m.progress : 0

        let displayStatus = "Recognizing text"
        let percent = 50

        if (rawStatus.includes("load") || rawStatus.includes("init")) {
          displayStatus = "Loading OCR engine"
          percent = 10 + Math.round(rawProgress * 20)
        } else if (rawStatus.includes("recogniz")) {
          displayStatus = "Recognizing text"
          percent = 30 + Math.round(rawProgress * 65)
        }

        onProgress?.({ status: displayStatus, progress: percent })
      }
    },
  })

  try {
    onProgress?.({ status: "Preparing image", progress: 25 })
    
    const { data } = await worker.recognize(file)

    onProgress?.({ status: "Finalizing", progress: 95 })

    const text = data.text || ""
    const blocks = data.blocks || []
    let linesCount = 0
    let wordsCount = 0

    for (const block of blocks) {
      if (block.paragraphs) {
        for (const paragraph of block.paragraphs) {
          if (paragraph.lines) {
            linesCount += paragraph.lines.length
            for (const line of paragraph.lines) {
              if (line.words) {
                wordsCount += line.words.length
              }
            }
          }
        }
      }
    }

    return {
      text,
      charactersCount: text.length,
      wordsCount,
      linesCount,
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `OCR processing failed: ${error.message}`
        : "OCR processing failed."
    )
  } finally {
    await worker.terminate()
  }
}
