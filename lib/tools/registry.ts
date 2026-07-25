import type { ComponentType, SVGProps } from "react"
import { FileText, Files, ImageIcon, Music2, Scissors, Archive, Wand2 } from "lucide-react"

import ImageConverterTool from "@/components/tools/image-converter"
import ImageToPdfTool from "@/components/tools/image-to-pdf"
import PdfMergeTool from "@/components/tools/pdf-merge"
import VideoToAudioTool from "@/components/tools/video-to-audio"
import ZipCreatorTool from "@/components/tools/zip-creator"
import ZipExtractorTool from "@/components/tools/zip-extractor"
import OcrTool from "@/components/tools/ocr"
import ImageCompressorTool from "@/components/tools/image-compressor"
import BackgroundRemoverTool from "@/components/tools/background-remover"

import PdfSplitTool from "@/components/tools/pdf-split"

export type ToolCategory = "utility" | "ai"

export type ToolIcon = ComponentType<SVGProps<SVGSVGElement>>

export type ToolComponent = ComponentType



export interface ToolDefinition {
  slug: string
  title: string
  description: string
  category: ToolCategory
  enabled: boolean
  icon: ToolIcon
  component: ToolComponent
  seoTitle: string
  seoDescription: string
  keywords: string[]
}

// The registry stays declarative: it describes available tools, while routing and UI chrome live elsewhere.
// Keeping the component reference here lets the app discover tools centrally without scattering imports across pages.

export const toolRegistry: ToolDefinition[] = [
  {
    slug: "pdf-merge",
    title: "PDF Merge",
    description: "Merge multiple PDF files locally in your browser.",
    category: "utility",
    enabled: true,
    icon: Files,
    component: PdfMergeTool,
    seoTitle: "PDF Merge | TurnAnything.xyz",
    seoDescription: "Merge multiple PDF files locally in your browser with TurnAnything.xyz.",
    keywords: ["pdf merge", "merge pdf", "combine pdfs", "browser pdf merge"],
  },
  {
    slug: "image-converter",
    title: "Image Converter",
    description: "Convert JPG, JPEG, PNG, WEBP, GIF, and BMP images directly in your browser.",
    category: "utility",
    enabled: true,
    icon: ImageIcon,
    component: ImageConverterTool,
    seoTitle: "Image Converter | TurnAnything.xyz",
    seoDescription:
      "Convert JPG, JPEG, PNG, WEBP, GIF, and BMP images directly in your browser with TurnAnything.xyz.",
    keywords: ["image converter", "convert image", "jpg to png", "png to webp", "browser image converter"],
  },
  {
    slug: "image-to-pdf",
    title: "Image to PDF",
    description: "Combine images into a single PDF file in the browser.",
    category: "utility",
    enabled: true,
    icon: FileText,
    component: ImageToPdfTool,
    seoTitle: "Image to PDF | TurnAnything.xyz",
    seoDescription: "Convert images into a PDF directly in your browser with TurnAnything.xyz.",
    keywords: ["image to pdf", "convert images to pdf", "pdf tool", "browser pdf"],
  },
  {
    slug: "video-to-audio",
    title: "Video to Audio",
    description: "Extract audio from MP4, MOV, WEBM, AVI and MKV videos directly in your browser.",
    category: "utility",
    enabled: true,
    icon: Music2,
    component: VideoToAudioTool,
    seoTitle: "MP4 to MP3 Converter – Free Online Video to Audio Converter",
    seoDescription:
      "Convert MP4, MOV, WEBM, AVI and MKV videos into MP3 directly in your browser. Fast, private and free.",
    keywords: ["mp4 to mp3", "video to mp3", "video to audio", "extract audio"],
  },
  {
    slug: "pdf-split",
    title: "PDF Split",
    description: "Split PDF pages or extract selected page ranges directly in your browser.",
    category: "utility",
    enabled: true,
    icon: Scissors,
    component: PdfSplitTool,
    seoTitle: "Split PDF Online | TurnAnything.xyz",
    seoDescription:
      "Split PDF pages or extract selected page ranges for free directly in your browser.",
    keywords: [
      "split pdf",
      "extract pdf pages",
      "pdf splitter",
      "split pdf online",
    ],
  },
  {
    slug: "zip-creator",
    title: "ZIP Creator",
    description: "Compress multiple files into a ZIP archive directly in your browser.",
    category: "utility",
    enabled: true,
    icon: Archive,
    component: ZipCreatorTool,
    seoTitle: "Create ZIP Files Online | TurnAnything.xyz",
    seoDescription:
      "Compress multiple files into a ZIP archive directly in your browser for free.",
    keywords: [
      "zip creator",
      "compress files",
      "zip online",
      "archive files",
    ],
  },
  {
    slug: "zip-extractor",
    title: "ZIP Extractor",
    description: "Extract ZIP archives directly in your browser.",
    category: "utility",
    enabled: true,
    icon: Archive,
    component: ZipExtractorTool,
    seoTitle: "Free ZIP Extractor – Extract ZIP Files Online",
    seoDescription: "Extract ZIP files locally in your browser. Fast, private and free.",
    keywords: [
      "zip extractor",
      "extract zip",
      "unzip online",
      "open zip",
      "browser unzip",
    ],
  },
  {
    slug: "ocr",
    title: "Image to Text (OCR)",
    description: "Extract editable text from images directly in your browser.",
    category: "utility",
    enabled: true,
    icon: FileText,
    component: OcrTool,
    seoTitle: "Image to Text (OCR) | TurnAnything.xyz",
    seoDescription:
      "Extract text from JPG, PNG, WEBP and other images directly inside your browser. Fast, private and free.",
    keywords: [
      "ocr",
      "image to text",
      "extract text",
      "photo to text",
      "scan image",
      "text recognition",
    ],
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    description: "Compress images without uploading them.",
    category: "utility",
    enabled: true,
    icon: ImageIcon,
    component: ImageCompressorTool,
    seoTitle: "Image Compressor | TurnAnything.xyz",
    seoDescription:
      "Compress JPG, PNG and WEBP images directly inside your browser. Fast, private and free.",
    keywords: [
      "image compressor",
      "compress image",
      "reduce image size",
      "compress jpg",
      "compress png",
      "compress webp",
    ],
  },
  {
    slug: "background-remover",
    title: "Background Remover",
    description: "Remove image backgrounds locally in your browser.",
    category: "utility",
    enabled: true,
    icon: Wand2,
    component: BackgroundRemoverTool,
    seoTitle: "Background Remover | TurnAnything.xyz",
    seoDescription:
      "Remove backgrounds from JPG, PNG and WEBP images locally in your browser. Fast, private and free.",
    keywords: [
      "background remover",
      "remove background",
      "remove bg",
      "transparent png",
      "extract subject",
      "delete background",
    ],
  },
]

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolRegistry.find((tool) => tool.slug === slug)
}

export function getEnabledTools(): ToolDefinition[] {
  return toolRegistry.filter((tool) => tool.enabled)
}
