"use client"

import * as React from "react"
import { Download, Loader2 } from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { Button } from "@/components/ui/button"
import { generateImagesPdf } from "@/lib/utils/pdf"

// This component stays page-agnostic so the registry can mount it from the dynamic tool route.
// Keeping the upload, preview, and conversion UI here lets the route own chrome while the tool owns behavior.
export default function ImageToPdfTool() {
  const [images, setImages] = React.useState<File[]>([])
  const [isConverting, setIsConverting] = React.useState(false)
  const [conversionError, setConversionError] = React.useState<string | null>(null)

  const handleConvertToPdf = React.useCallback(async () => {
    setIsConverting(true)
    setConversionError(null)

    try {
      await generateImagesPdf({
        files: images,
        fileName: "turnanything-images.pdf",
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to convert images to PDF."
      setConversionError(message)
    } finally {
      setIsConverting(false)
    }
  }, [images])

  return (
    <div className="grid gap-6">
      <FileDropzone
        acceptedFileTypes={["image/*"]}
        multiple
        maxFileSize={10 * 1024 * 1024}
        value={images}
        onFilesSelected={setImages}
        title="Upload images"
        description="Add one or more images to prepare the future PDF conversion flow."
        emptyStateTitle="Drop images here"
        emptyStateDescription="PNG, JPG, WEBP, and GIF files are supported for now."
      />

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Ready to convert</p>
          <p className="text-sm text-muted-foreground">
            Your images stay in the browser and will be exported in the same order they were added.
          </p>
        </div>

        <Button
          type="button"
          size="lg"
          className="w-full sm:w-auto"
          disabled={images.length === 0 || isConverting}
          onClick={handleConvertToPdf}
        >
          {isConverting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <Download className="size-4" />
              Convert to PDF
            </>
          )}
        </Button>
      </div>

      {conversionError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {conversionError}
        </div>
      ) : null}
    </div>
  )
}