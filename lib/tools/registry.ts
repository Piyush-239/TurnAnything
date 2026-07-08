import type { ComponentType, SVGProps } from "react"
import { FileText } from "lucide-react"

import ImageToPdfTool from "@/components/tools/image-to-pdf"

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
]

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolRegistry.find((tool) => tool.slug === slug)
}

export function getEnabledTools(): ToolDefinition[] {
  return toolRegistry.filter((tool) => tool.enabled)
}
