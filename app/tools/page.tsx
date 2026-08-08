import type { Metadata } from "next"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { getEnabledTools } from "@/lib/tools/registry"
import ToolsDirectoryClient from "./tools-directory-client"
import { FileText, Files, ImageIcon, Music2, Scissors, Archive, Wand2 } from "lucide-react"

export const metadata: Metadata = {
  title: "All Tools | TurnAnything.xyz",
  description: "Browse and search all available local file conversion, PDF, image, and utility tools on TurnAnything.xyz. Fast, private, and runs entirely in your browser.",
}

// Convert Lucide Icon component reference to a serializable string identifier
// so we don't pass non-serializable component objects across the Server-Client boundary.
function getIconName(icon: any): string {
  if (icon === FileText) return "file-text"
  if (icon === Files) return "files"
  if (icon === ImageIcon) return "image"
  if (icon === Music2) return "music"
  if (icon === Scissors) return "scissors"
  if (icon === Archive) return "archive"
  if (icon === Wand2) return "wand"
  return "file-text"
}

export default function ToolsPage() {
  const allTools = getEnabledTools()

  // Map tools to lightweight serializable metadata to optimize package bundle size
  const serializableTools = allTools.map((tool) => ({
    slug: tool.slug,
    title: tool.title,
    description: tool.description,
    category: tool.category,
    keywords: tool.keywords || [],
    iconName: getIconName(tool.icon),
  }))

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <ToolsDirectoryClient initialTools={serializableTools} />
      </main>
      <Footer />
    </div>
  )
}
