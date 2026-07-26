"use client"

import * as React from "react"
import Image from "next/image"
import { ImageIcon, Upload, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileMatchesAcceptedTypes(file: File, acceptedFileTypes: string[]) {
  if (acceptedFileTypes.length === 0 || acceptedFileTypes.some((type) => type.trim() === "*/*")) {
    return true
  }
  const lowerName = file.name.toLowerCase()
  return acceptedFileTypes.some((acceptedType) => {
    const lowerAcceptedType = acceptedType.toLowerCase()
    if (lowerAcceptedType.startsWith(".")) return lowerName.endsWith(lowerAcceptedType)
    if (lowerAcceptedType.endsWith("/*")) return file.type.toLowerCase().startsWith(lowerAcceptedType.slice(0, -1))
    return file.type.toLowerCase() === lowerAcceptedType || lowerName.endsWith(lowerAcceptedType)
  })
}

function getFileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}-${file.type}`
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const previewUrl = React.useMemo(() => {
    if (!file.type.startsWith("image/")) return null
    return URL.createObjectURL(file)
  }, [file])

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className="flex items-center gap-3 border border-border/60 bg-secondary/30 p-3 transition-colors hover:bg-secondary/50">
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden border border-border/60 bg-card">
        {previewUrl ? (
          // The preview is intentionally limited to images so the component stays generic for future tools.
          <Image src={previewUrl} alt={file.name} width={48} height={48} unoptimized className="size-full object-cover" />
        ) : (
          <ImageIcon className="size-4.5 text-muted-foreground/50" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{formatBytes(file.size)}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="rounded-full hover:bg-destructive/8 hover:text-[#E8400C] active:scale-95 transition-all duration-150"
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
  const isAcceptAll = acceptedFileTypes.length === 0 || acceptedFileTypes.some((type) => type.trim() === "*/*")
  const acceptAttribute = isAcceptAll ? undefined : acceptedFileTypes.join(",")

  const updateFiles = React.useCallback(
    (nextFiles: File[]) => {
      if (value === undefined) setInternalFiles(nextFiles)
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
          nextIssues.push({ name: file.name, message: `Unsupported file type. Accepted types: ${acceptedFileTypes.join(", ")}` })
          continue
        }
        if (maxFileSize !== undefined && file.size > maxFileSize) {
          nextIssues.push({ name: file.name, message: `File is too large. Maximum size: ${formatBytes(maxFileSize)}` })
          continue
        }
        const key = getFileKey(file)
        if (existingKeys.has(key)) continue
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
    <div className={cn("border border-border/60 bg-card", isDragging && "border-[#E8400C]/50", className)}>
      <div className="space-y-1.5 px-5 pt-5 pb-2">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-5 px-5 pb-5 pt-3">
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={acceptAttribute}
          multiple={multiple}
          onChange={(event) => {
            if (event.target.files) handleIncomingFiles(event.target.files)
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
          onDragEnter={(event) => { event.preventDefault(); setIsDragging(true) }}
          onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
          onDragLeave={(event) => { event.preventDefault(); setIsDragging(false) }}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            if (event.dataTransfer.files.length > 0) handleIncomingFiles(event.dataTransfer.files)
          }}
          className={cn(
            "flex min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border/50 bg-secondary/20 p-6 text-center transition-all duration-200",
            "hover:bg-secondary/40 hover:border-foreground/20",
            isDragging && "border-[#E8400C]/60 bg-[#E8400C]/3"
          )}
        >
          <div className={cn(
            "mb-4 flex size-11 items-center justify-center border border-border/60 bg-card transition-all duration-200",
            isDragging && "border-[#E8400C]/40 text-[#E8400C]"
          )}>
            <Upload className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground">{emptyStateTitle}</p>
          <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">{emptyStateDescription}</p>

          <button
            type="button"
            className="mt-5 inline-flex h-9 items-center gap-2 border border-border/70 bg-card px-5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary hover:border-foreground/20"
            onClick={(event) => {
              event.stopPropagation()
              openFilePicker()
            }}
          >
            Browse files
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] text-muted-foreground/50">
            <span>{multiple ? "Multiple files supported" : "Single file only"}</span>
            {maxFileSize ? (
              <>
                <span>·</span>
                <span>Max {formatBytes(maxFileSize)}</span>
              </>
            ) : null}
          </div>
        </div>

        {files.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-muted-foreground/60">Uploaded files</p>
              <p className="text-xs text-muted-foreground/50">{files.length} {files.length === 1 ? "file" : "files"}</p>
            </div>
            <div className="grid gap-2">
              {files.map((file) => (
                <FilePreview key={getFileKey(file)} file={file} onRemove={() => handleRemoveFile(file)} />
              ))}
            </div>
          </div>
        ) : null}

        {validationIssues.length > 0 ? (
          <div className="border border-[#E8400C]/20 bg-[#E8400C]/5 p-4 text-sm text-[#E8400C]">
            <p className="font-semibold text-xs mb-2">Some files were skipped</p>
            <ul className="space-y-1 text-xs">
              {validationIssues.map((issue) => (
                <li key={`${issue.name}-${issue.message}`}>{issue.name}: {issue.message}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
