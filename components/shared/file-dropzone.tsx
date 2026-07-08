"use client"

import * as React from "react"
import Image from "next/image"
import { ImageIcon, Upload, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type FileDropzoneProps = {
  acceptedFileTypes: string[]
  multiple?: boolean
  maxFileSize?: number
  value?: File[]
  onFilesSelected: (files: File[]) => void
  className?: string
  title?: string
  description?: string
  emptyStateTitle?: string
  emptyStateDescription?: string
}

type FileValidationIssue = {
  name: string
  message: string
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileMatchesAcceptedTypes(file: File, acceptedFileTypes: string[]) {
  if (acceptedFileTypes.length === 0) {
    return true
  }

  const lowerName = file.name.toLowerCase()

  return acceptedFileTypes.some((acceptedType) => {
    const lowerAcceptedType = acceptedType.toLowerCase()

    if (lowerAcceptedType.startsWith(".")) {
      return lowerName.endsWith(lowerAcceptedType)
    }

    if (lowerAcceptedType.endsWith("/*")) {
      return file.type.toLowerCase().startsWith(lowerAcceptedType.slice(0, -1))
    }

    return file.type.toLowerCase() === lowerAcceptedType || lowerName.endsWith(lowerAcceptedType)
  })
}

function getFileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}-${file.type}`
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const previewUrl = React.useMemo(() => {
    if (!file.type.startsWith("image/")) {
      return null
    }

    return URL.createObjectURL(file)
  }, [file])

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-background/70 p-3">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
        {previewUrl ? (
          // The preview is intentionally limited to images so the component stays generic for future tools.
          <Image src={previewUrl} alt={file.name} width={64} height={64} unoptimized className="size-full object-cover" />
        ) : (
          <ImageIcon className="size-5 text-muted-foreground" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}

export function FileDropzone({
  acceptedFileTypes,
  multiple = true,
  maxFileSize,
  value,
  onFilesSelected,
  className,
  title = "Upload files",
  description = "Drag and drop files here or click to browse.",
  emptyStateTitle = "Drop files here",
  emptyStateDescription = "Or click to choose files from your device.",
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [internalFiles, setInternalFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [validationIssues, setValidationIssues] = React.useState<FileValidationIssue[]>([])

  const files = value ?? internalFiles
  const acceptAttribute = acceptedFileTypes.join(",")

  const updateFiles = React.useCallback(
    (nextFiles: File[]) => {
      if (value === undefined) {
        setInternalFiles(nextFiles)
      }

      onFilesSelected(nextFiles)
    },
    [onFilesSelected, value]
  )

  const handleIncomingFiles = React.useCallback(
    (incomingFiles: FileList | File[]) => {
      const nextInputFiles = Array.from(incomingFiles)
      const existingFiles = multiple ? files : []
      const existingKeys = new Set(existingFiles.map(getFileKey))

      const acceptedFiles: File[] = []
      const nextIssues: FileValidationIssue[] = []

      for (const file of nextInputFiles) {
        if (!fileMatchesAcceptedTypes(file, acceptedFileTypes)) {
          nextIssues.push({
            name: file.name,
            message: `Unsupported file type. Accepted types: ${acceptedFileTypes.join(", ")}`,
          })
          continue
        }

        if (maxFileSize !== undefined && file.size > maxFileSize) {
          nextIssues.push({
            name: file.name,
            message: `File is too large. Maximum size: ${formatBytes(maxFileSize)}`,
          })
          continue
        }

        const key = getFileKey(file)

        if (existingKeys.has(key)) {
          continue
        }

        existingKeys.add(key)
        acceptedFiles.push(file)
      }

      const nextFiles = multiple ? [...existingFiles, ...acceptedFiles] : acceptedFiles.slice(0, 1)

      setValidationIssues(nextIssues)
      updateFiles(nextFiles)
    },
    [acceptedFileTypes, files, maxFileSize, multiple, updateFiles]
  )

  const handleRemoveFile = React.useCallback(
    (fileToRemove: File) => {
      const nextFiles = files.filter((file) => getFileKey(file) !== getFileKey(fileToRemove))

      updateFiles(nextFiles)
    },
    [files, updateFiles]
  )

  const openFilePicker = React.useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <Card
      className={cn(
        "border-dashed bg-card/70 shadow-sm backdrop-blur-sm",
        isDragging && "border-primary ring-2 ring-primary/20",
        className
      )}
    >
      <CardHeader className="space-y-1 border-b px-4 py-4 sm:px-6">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-4 py-4 sm:px-6">
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={acceptAttribute}
          multiple={multiple}
          onChange={(event) => {
            if (event.target.files) {
              handleIncomingFiles(event.target.files)
            }

            event.target.value = ""
          }}
        />

        <div
          role="button"
          tabIndex={0}
          aria-label={title}
          onClick={openFilePicker}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              openFilePicker()
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={(event) => {
            event.preventDefault()
            setIsDragging(false)
          }}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            if (event.dataTransfer.files.length > 0) {
              handleIncomingFiles(event.dataTransfer.files)
            }
          }}
          className={cn(
            "flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/30 p-6 text-center transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            isDragging && "border-primary bg-primary/5"
          )}
        >
          <Upload className="mb-3 size-8 text-muted-foreground" />
          <p className="text-sm font-medium">{emptyStateTitle}</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">{emptyStateDescription}</p>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={(event) => {
              event.stopPropagation()
              openFilePicker()
            }}
          >
            Browse files
          </Button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>{multiple ? "Multiple files supported" : "Single file only"}</span>
            {maxFileSize ? <span>Max size {formatBytes(maxFileSize)}</span> : null}
          </div>
        </div>

        {files.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">Uploaded files</p>
              <p className="text-xs text-muted-foreground">{files.length} selected</p>
            </div>

            <div className="grid gap-3">
              {files.map((file) => (
                <FilePreview key={getFileKey(file)} file={file} onRemove={() => handleRemoveFile(file)} />
              ))}
            </div>
          </div>
        ) : null}

        {validationIssues.length > 0 ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
            <p className="font-medium">Some files were skipped</p>
            <ul className="mt-2 space-y-1">
              {validationIssues.map((issue) => (
                <li key={`${issue.name}-${issue.message}`}>
                  {issue.name}: {issue.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}