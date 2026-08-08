"use client"

import * as React from "react"
import {
  Download,
  ImageIcon,
  RefreshCw,
  Minimize,
  Repeat,
  Search,
  Wand2,
  Zap,
  Shield,
  Sparkles,
  Cpu,
  Lock,
  WifiOff,
  Eye,
  GraduationCap,
  FileText,
  Upload,
  Sliders,
  Globe,
  Mail,
  Camera,
  Code,
  BookOpen
} from "lucide-react"

import { FileDropzone } from "@/components/shared/file-dropzone"
import { ProgressCard, ToolActionCard, ToolResultCard, ToolUploadSection } from "@/components/tool-layout"
import { Button } from "@/components/ui/button"

import { compressImage, type CompressImageResult } from "@/lib/utils/image-compressor"

import {
  COMPLETION_PREVIEW_MS,
  waitFor,
  type ToolProgressState,
} from "@/lib/tools/progress"

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ImageCompressorTool() {
  const [images, setImages] = React.useState<File[]>([])
  const [originalPreviewUrl, setOriginalPreviewUrl] = React.useState<string | null>(null)
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null)
  const [quality, setQuality] = React.useState(80) // 10 to 100
  const [format, setFormat] = React.useState<"auto" | "jpeg" | "png" | "webp">("auto")
  const [isCompressing, setIsCompressing] = React.useState(false)
  const [compressedResult, setCompressedResult] = React.useState<CompressImageResult | null>(null)
  const [compressedPreviewUrl, setCompressedPreviewUrl] = React.useState<string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [progressState, setProgressState] = React.useState<ToolProgressState | null>(null)

  const handleFilesSelected = React.useCallback((selectedFiles: File[]) => {
    setImages(selectedFiles)
    setCompressedResult(null)
    setCompressedPreviewUrl(null)
    setErrorMessage(null)
    if (selectedFiles.length === 0) {
      setOriginalPreviewUrl(null)
      setDimensions(null)
    }
  }, [])

  React.useEffect(() => {
    if (images.length === 0) {
      return
    }
    const url = URL.createObjectURL(images[0])
    const timer = setTimeout(() => {
      setOriginalPreviewUrl(url)
    }, 0)

    const img = new Image()
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.src = url

    return () => {
      clearTimeout(timer)
      URL.revokeObjectURL(url)
    }
  }, [images])

  React.useEffect(() => {
    if (!compressedResult) {
      return
    }
    const url = URL.createObjectURL(compressedResult.blob)
    const timer = setTimeout(() => {
      setCompressedPreviewUrl(url)
    }, 0)

    return () => {
      clearTimeout(timer)
      URL.revokeObjectURL(url)
    }
  }, [compressedResult])

  const selectedImage = images[0] ?? null

  const handleCompress = React.useCallback(async () => {
    if (!selectedImage) {
      setErrorMessage("Please upload an image first.")
      return
    }

    setErrorMessage(null)
    setIsCompressing(true)
    setCompressedResult(null)

    setProgressState({
      status: "Preparing image",
      progress: 10,
    })

    try {
      const result = await compressImage({
        file: selectedImage,
        quality: quality / 100,
        format,
        onProgress(update) {
          setProgressState(update)
        },
      })

      setProgressState({
        status: "Completed",
        progress: 100,
      })

      await waitFor(COMPLETION_PREVIEW_MS)

      setCompressedResult(result)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Compression failed."
      )
    } finally {
      setProgressState(null)
      setIsCompressing(false)
    }
  }, [selectedImage, quality, format])

  const triggerDownload = React.useCallback(() => {
    if (!compressedResult || !selectedImage) return
    const url = compressedPreviewUrl
    if (!url) return

    const anchor = document.createElement("a")
    anchor.href = url

    const originalName = selectedImage.name
    const lastDotIndex = originalName.lastIndexOf(".")
    const baseName = lastDotIndex > 0 ? originalName.slice(0, lastDotIndex) : originalName
    
    // Determine output file extension
    let extension = lastDotIndex > 0 ? originalName.slice(lastDotIndex + 1) : "jpg"
    if (format !== "auto") {
      extension = format === "jpeg" ? "jpg" : format
    }

    anchor.download = `${baseName}-compressed.${extension}`
    anchor.style.display = "none"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }, [compressedResult, selectedImage, format, compressedPreviewUrl])

  const handleReset = React.useCallback(() => {
    setImages([])
    setQuality(80)
    setFormat("auto")
    setCompressedResult(null)
    setErrorMessage(null)
  }, [])

  const estimatedSize = React.useMemo(() => {
    if (!selectedImage) return 0
    let multiplier = 0.8
    const selectedFormat = format === "auto" ? selectedImage.type.split("/")[1] : format
    if (selectedFormat === "png") {
      multiplier = 0.95
    } else if (selectedFormat === "webp") {
      multiplier = 0.55
    } else if (selectedFormat === "jpeg" || selectedFormat === "jpg") {
      multiplier = 0.65
    }
    return Math.round(selectedImage.size * (quality / 100) * multiplier)
  }, [selectedImage, quality, format])

  const compressorTrustItems = [
    {
      icon: Lock,
      title: "Files never leave your browser",
      description: "All document processing scripts execute 100% locally inside your device memory sandbox.",
    },
    {
      icon: Zap,
      title: "Instant local processing",
      description: "Skip upload pipelines. Image optimization initiates the microsecond you choose settings.",
    },
    {
      icon: WifiOff,
      title: "Works offline after loading",
      description: "Disconnect from the internet once loaded and continue compressing images in private.",
    },
    {
      icon: Shield,
      title: "No accounts or fees required",
      description: "Start optimizing files immediately. No registration, limits, or subscriptions.",
    },
  ]

  const compressorBenefits = [
    {
      icon: Shield,
      title: "Compress Below 100KB",
      description: "Set quality precisely to hit strict government, academic, and corporate portal upload limits.",
    },
    {
      icon: Zap,
      title: "Batch Compression Ready",
      description: "Optimize and compress multiple images sequentially inside a single private session.",
    },
    {
      icon: Cpu,
      title: "Instant Local Execution",
      description: "Skip queue wait times. Computations run locally on your device's processor using WebAssembly.",
    },
    {
      icon: Eye,
      title: "Side-by-Side Live Preview",
      description: "Inspect output quality side-by-side and check estimated sizes before exporting.",
    },
    {
      icon: WifiOff,
      title: "100% Offline Support",
      description: "No active internet needed. The tool runs completely client-side in sandboxed memory.",
    },
    {
      icon: Lock,
      title: "No Server Uploads",
      description: "Complete confidentiality. Your photos, scans, and documents never contact any external server.",
    },
  ]

  const compressorAudience = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Quickly compress homework sheets, portal uploads, and assignments under strict size caps.",
    },
    {
      icon: FileText,
      title: "Government Forms",
      description: "Fit passport photos, ID scans, and tax attachments under strict 50KB or 100KB document limits.",
    },
    {
      icon: Code,
      title: "Web Developers",
      description: "Convert bulky PNG directories to WebP vectors to boost page speed scores and rankings.",
    },
    {
      icon: BookOpen,
      title: "Content Bloggers",
      description: "Optimize article covers and graphic attachments to provide instantaneous reader load speeds.",
    },
  ]

  const compressorTimeline = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Select or drag any PNG, JPG, or WEBP file directly into the local browser uploader workspace.",
    },
    {
      icon: Sliders,
      title: "Adjust Settings",
      description: "Fine-tune the output quality percentage and select your preferred file target format.",
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "Inspect original vs compressed quality differences and compare exact byte changes.",
    },
    {
      icon: Download,
      title: "Export & Save",
      description: "Save your optimized, privacy-safe image file instantly to your local downloads directory.",
    },
  ]

  const compressorUseCases = [
    {
      icon: Globe,
      title: "Online Form Portals",
      description: "Compress applications requiring photo attachments with specific KB file constraints.",
    },
    {
      icon: Mail,
      title: "Email Attachments",
      description: "Shrink massive high-resolution camera assets to fit under default email client limits.",
    },
    {
      icon: Sparkles,
      title: "Website Assets",
      description: "Drastically reduce media payload sizes on Shopify, WordPress, or custom web pages.",
    },
    {
      icon: Camera,
      title: "Social Media Uploads",
      description: "Quickly resize high-res creative portfolio snapshots before uploading online.",
    },
  ]

  const compressorFaqs = [
    {
      q: "How do I compress an image to under 100KB?",
      a: "Drag your file in, slide the quality scale down (typically to 50-70%), and check the 'Estimated Output' indicator at the bottom. Once it estimates less than 100KB, click 'Compress Image' and save your file.",
    },
    {
      q: "Will my image lose quality during compression?",
      a: "The tool utilizes advanced lossy compression scripts. At the default 80% quality setting, files are shrunk up to 70% in size with virtually zero human-visible differences in clarity.",
    },
    {
      q: "Are my photos uploaded to a third-party server?",
      a: "No. The entire optimization and format conversion executes inside your local browser memory space. No logs, analytics, or files are uploaded to any external server.",
    },
    {
      q: "What image formats are supported by TurnAnything?",
      a: "Our Image Compressor supports PNG, JPG, JPEG, WEBP, and BMP formats for both uploading and exporting compressed files.",
    },
    {
      q: "Can I use the Image Compressor offline?",
      a: "Yes. Once the page loads, the WebAssembly and JS logic remains cached in your browser. You can disconnect from the internet and continue compressing images without issues.",
    },
  ]

  const compressorWorkflow = [
    {
      title: "1. Compress Image",
      slug: "image-compressor",
      description: "Reduce image file size instantly.",
      icon: Minimize,
      active: true,
    },
    {
      title: "2. Convert Image",
      slug: "image-converter",
      description: "Convert format (JPG, PNG, WEBP).",
      icon: Repeat,
    },
    {
      title: "3. Image to PDF",
      slug: "image-to-pdf",
      description: "Compile images into PDF documents.",
      icon: FileText,
    },
    {
      title: "4. Extract Text (OCR)",
      slug: "ocr",
      description: "Scan text from compiled documents.",
      icon: Search,
    },
    {
      title: "5. Background Removal",
      slug: "background-remover",
      description: "Isolate subject using local AI models.",
      icon: Wand2,
    },
  ]

  return (
    <div className="grid gap-6">
      {images.length === 0 ? (
        <ToolUploadSection>
          <FileDropzone
            acceptedFileTypes={[
              ".png",
              ".jpg",
              ".jpeg",
              ".webp",
              ".bmp",
              "image/png",
              "image/jpeg",
              "image/webp",
              "image/bmp",
            ]}
            multiple={false}
            value={images}
            onFilesSelected={handleFilesSelected}
            title="Upload image"
            description="Choose an image file to compress locally."
            emptyStateTitle="Drop image here"
            emptyStateDescription="PNG, JPG, JPEG, WEBP, and BMP files are supported."
          />
        </ToolUploadSection>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative size-16 rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center shrink-0">
                {originalPreviewUrl ? (
                  <img src={originalPreviewUrl} alt="Original thumbnail" className="size-full object-cover" />
                ) : (
                  <ImageIcon className="size-6 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{selectedImage.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatBytes(selectedImage.size)}</p>
                {dimensions && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Dimensions: {dimensions.width} × {dimensions.height}
                  </p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="self-start sm:self-center shrink-0" onClick={handleReset}>
              Change image
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 border-t pt-5 border-border/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="compressor-quality" className="text-sm font-semibold text-foreground">
                  Quality: <span className="text-[#E8400C] font-extrabold">{quality}%</span>
                </label>
              </div>
              <input
                id="compressor-quality"
                type="range"
                min="10"
                max="100"
                value={quality}
                disabled={isCompressing || compressedResult !== null}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#E8400C] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="compressor-format" className="text-sm font-semibold text-foreground">
                Output Format
              </label>
              <select
                id="compressor-format"
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                value={format}
                disabled={isCompressing || compressedResult !== null}
                onChange={(event) => setFormat(event.target.value as typeof format)}
              >
                <option value="auto">Auto (Keep original)</option>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
          </div>

          {compressedResult === null && (
            <div className="text-xs text-muted-foreground flex justify-between border-t pt-4 border-border/50">
              <span>Original Size: {formatBytes(selectedImage.size)}</span>
              <span className="font-semibold text-foreground">Estimated Output: ~{formatBytes(estimatedSize)}</span>
            </div>
          )}
        </div>
      )}

      {images.length > 0 && compressedResult === null && (
        <ToolActionCard
          title="Ready to compress"
          description="Your image stays in the browser. Nothing is uploaded."
          buttonText="Compress Image"
          loadingText="Compressing..."
          loading={isCompressing}
          disabled={images.length === 0}
          error={errorMessage}
          onAction={handleCompress}
          icon={<Download className="size-4" />}
        />
      )}

      {progressState && (
        <ProgressCard
          status={progressState.status}
          progress={progressState.progress}
        />
      )}

      {compressedResult && (
        <ToolResultCard
          title="Compression Result"
          successMessage={`Saved ${compressedResult.reducedPercent}% of original size (${formatBytes(selectedImage.size - compressedResult.compressedSize)} saved)`}
          downloadArea={
            <div className="flex items-center gap-2.5">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="mr-2 size-4" />
                Compress Another
              </Button>
              <Button variant="default" size="sm" className="bg-[#E8400C] hover:bg-[#CF3507] text-white transition-colors" onClick={triggerDownload}>
                <Download className="mr-2 size-4" />
                Download Image
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#E8400C]/5 border border-[#E8400C]/15 mb-2">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-sm font-semibold text-foreground">Compression completed successfully!</p>
                <p className="text-xs text-muted-foreground">Processed entirely in your browser. Nothing uploaded.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-[#E8400C] px-3.5 py-1 text-xs font-bold text-white shadow-glow-sm">
                {compressedResult.reducedPercent}% Saved
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Original ({formatBytes(selectedImage.size)})</p>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center p-2 shadow-sm">
                  {originalPreviewUrl && (
                    <img src={originalPreviewUrl} alt="Original preview" className="max-h-full object-contain rounded-lg" />
                  )}
                </div>
              </div>
              <div className="space-y-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Compressed ({formatBytes(compressedResult.compressedSize)})</p>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E8400C]/20 bg-muted flex items-center justify-center p-2 shadow-sm">
                  {compressedPreviewUrl && (
                    <img src={compressedPreviewUrl} alt="Compressed preview" className="max-h-full object-contain rounded-lg" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </ToolResultCard>
      )}
    </div>
  )
}
