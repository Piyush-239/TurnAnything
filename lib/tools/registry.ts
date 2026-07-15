import type { ComponentType, SVGProps } from "react"
import { FileText, Files, ImageIcon, Music2 } from "lucide-react"

import ImageConverterTool from "@/components/tools/image-converter"
import ImageToPdfTool from "@/components/tools/image-to-pdf"
import PdfMergeTool from "@/components/tools/pdf-merge"
import VideoToAudioTool from "@/components/tools/video-to-audio"

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
]

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolRegistry.find((tool) => tool.slug === slug)
}

export function getEnabledTools(): ToolDefinition[] {
  return toolRegistry.filter((tool) => tool.enabled)
}
