import JSZip from "jszip"

export interface ZipEntry {
  filename: string
  data: Blob | Uint8Array | ArrayBuffer
}

export interface ZipProgress {
  status: string
  progress: number
}

export interface CreateZipOptions {
  entries: ZipEntry[]
  onProgress?: (update: ZipProgress) => void
}

function reportProgress(
  onProgress: CreateZipOptions["onProgress"],
  status: string,
  progress: number,
) {
  onProgress?.({
    status,
    progress,
  })
}

export async function createZipBlob({
  entries,
  onProgress,
}: CreateZipOptions): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error("ZIP creation is only available in the browser.")
  }

  if (entries.length === 0) {
    throw new Error("There are no files to add to the ZIP.")
  }

  const zip = new JSZip()

  reportProgress(onProgress, "Preparing files", 5)

  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index]

    if (!entry.filename.trim()) {
      throw new Error("Every ZIP entry must have a filename.")
    }

    zip.file(entry.filename, entry.data)

    const progress = Math.round(((index + 1) / entries.length) * 75)

    reportProgress(
      onProgress,
      `Adding files (${index + 1}/${entries.length})`,
      progress,
    )
  }

  reportProgress(onProgress, "Compressing ZIP", 85)

  const zipBlob = await zip.generateAsync(
    {
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6,
      },
    },
    (metadata) => {
      reportProgress(
        onProgress,
        "Compressing ZIP",
        85 + Math.round(metadata.percent * 0.15),
      )
    },
  )

  reportProgress(onProgress, "Completed", 100)

  return zipBlob
}