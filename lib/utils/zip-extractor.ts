import JSZip from "jszip"

export interface ExtractedEntry {
  filename: string
  blob: Blob
}

export interface ZipExtractorProgress {
  status: string
  progress: number
}

export interface ExtractZipOptions {
  file: File
  onProgress?: (update: ZipExtractorProgress) => void
}

function reportProgress(
  onProgress: ExtractZipOptions["onProgress"],
  status: string,
  progress: number
) {
  onProgress?.({
    status,
    progress,
  })
}

export async function extractZip({
  file,
  onProgress,
}: ExtractZipOptions): Promise<ExtractedEntry[]> {
  if (typeof window === "undefined") {
    throw new Error("ZIP extraction is only available in the browser.")
  }

  reportProgress(onProgress, "Preparing ZIP", 5)

  let zip: JSZip
  try {
    zip = await JSZip.loadAsync(file)
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Invalid or corrupted ZIP archive: ${error.message}`
        : "Invalid or corrupted ZIP archive."
    )
  }

  reportProgress(onProgress, "Reading archive", 15)

  const entries = Object.keys(zip.files)
  const filteredEntries = entries.filter((name) => {
    const isMacMetadata =
      name.includes("__MACOSX") || name.split("/").includes(".DS_Store")
    const isDirectory = zip.files[name].dir
    return !isMacMetadata && !isDirectory
  })

  if (filteredEntries.length === 0) {
    throw new Error("The archive is empty or contains unsupported files.")
  }

  reportProgress(onProgress, "Extracting files", 30)

  const extractedEntries: ExtractedEntry[] = []

  for (let i = 0; i < filteredEntries.length; i++) {
    const name = filteredEntries[i]
    const zipEntry = zip.files[name]

    try {
      const blob = await zipEntry.async("blob")
      extractedEntries.push({
        filename: name,
        blob,
      })
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? `Failed to extract file "${name}": ${error.message}`
          : `Failed to extract file "${name}".`
      )
    }

    const progressPercent = 30 + Math.round(((i + 1) / filteredEntries.length) * 65)
    reportProgress(
      onProgress,
      `Extracting files (${i + 1}/${filteredEntries.length})`,
      progressPercent
    )
  }

  reportProgress(onProgress, "Completed", 100)

  return extractedEntries
}
