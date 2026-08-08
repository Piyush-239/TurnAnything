"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileText,
  Files,
  ImageIcon,
  Music2,
  Scissors,
  Archive,
  Wand2,
  ArrowUpRight,
  Search,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"

type SerializableTool = {
  slug: string
  title: string
  description: string
  category: string
  keywords: string[]
  iconName: string
}

type ToolsDirectoryClientProps = {
  initialTools: SerializableTool[]
}

const IconComponents: Record<string, any> = {
  "file-text": FileText,
  "files": Files,
  "image": ImageIcon,
  "music": Music2,
  "scissors": Scissors,
  "archive": Archive,
  "wand": Wand2,
}

const CATEGORIES = [
  "All",
  "PDF",
  "Images",
  "Video",
  "Audio",
  "Documents",
  "AI",
  "Utilities",
]

function formatCategoryLabel(category: string) {
  return category === "ai" ? "AI" : "Utility"
}

// A helper function to assign categories to each tool based on its properties
function getToolCategories(tool: SerializableTool): string[] {
  const categories: string[] = ["All"]
  const title = tool.title.toLowerCase()
  const desc = tool.description.toLowerCase()
  const keywords = tool.keywords.map((k) => k.toLowerCase())

  const hasKeyword = (words: string[]) =>
    words.some(
      (word) =>
        title.includes(word) ||
        desc.includes(word) ||
        keywords.some((k) => k.includes(word))
    )

  if (hasKeyword(["pdf"])) {
    categories.push("PDF")
  }
  if (hasKeyword(["image", "png", "jpg", "jpeg", "webp", "gif", "bmp", "ocr"])) {
    categories.push("Images")
  }
  if (hasKeyword(["video", "mp4", "mov", "webm", "avi", "mkv"])) {
    categories.push("Video")
  }
  if (hasKeyword(["audio", "mp3", "wav", "m4a", "extract audio"])) {
    categories.push("Audio")
  }
  if (hasKeyword(["zip", "archive"])) {
    categories.push("Utilities")
  }
  if (tool.category === "ai" || hasKeyword(["ocr", "background-remover", "remover"])) {
    categories.push("AI")
  }
  if (tool.category === "utility") {
    categories.push("Utilities")
  }
  if (hasKeyword(["pdf", "text", "ocr", "zip"])) {
    categories.push("Documents")
  }

  return Array.from(new Set(categories))
}

export default function ToolsDirectoryClient({ initialTools }: ToolsDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter tools based on selectedCategory + searchQuery intersection
  const filteredTools = initialTools.filter((tool) => {
    // 1. Category check
    const categories = getToolCategories(tool)
    const matchesCategory =
      selectedCategory === "All" || categories.includes(selectedCategory)

    // 2. Search check
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      query.length === 0 ||
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.keywords.some((k) => k.toLowerCase().includes(query))

    return matchesCategory && matchesSearch
  })

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 select-none">
      {/* Header Section */}
      <div className="space-y-4 max-w-3xl mb-12 animate-in fade-in slide-in-from-top-3 duration-500">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E8400C]">
          <span className="size-1.5 rounded-full bg-[#E8400C]" aria-hidden="true" />
          Tool Directory
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Every tool. One place.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Browse or search all our client-side file transformation tools. Everything runs locally inside your browser—no files are uploaded to our servers.
        </p>
      </div>

      {/* Search & Filters Controls */}
      <div className="flex flex-col gap-6 border-b border-border/60 pb-8 mb-8 sm:flex-row sm:items-center sm:justify-between animate-in fade-in slide-in-from-top-2 duration-400">
        {/* Search Input Box */}
        <div className="relative flex h-12 w-full max-w-md items-center gap-2 rounded-full border border-border/80 bg-card pl-4 pr-2 shadow-sm focus-within:border-[#E8400C]/40 focus-within:shadow-[0_0_0_1px_rgba(232,64,12,0.15)] transition-all duration-150">
          <Search className="size-4 shrink-0 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Search tools (e.g. PDF, compress, OCR...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-full flex-1 border-none bg-transparent px-0 py-0 text-sm font-medium placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 text-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-semibold text-muted-foreground hover:text-[#E8400C] px-2 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Counter */}
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
          Showing {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
        </div>
      </div>

      {/* Category Filter Wrap Row */}
      <div className="mb-10 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer",
                isActive
                  ? "bg-foreground text-background border-foreground shadow-sm"
                  : "bg-card text-muted-foreground/80 border-border/80 hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Tool Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
          {filteredTools.map((tool) => {
            const IconComponent = IconComponents[tool.iconName] || FileText
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group relative flex flex-col justify-between rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-[#E8400C]/30 hover:shadow-sm hover:translate-y-[-2px]"
              >
                <div className="space-y-4">
                  {/* Icon + category */}
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-secondary/50 p-2 text-foreground group-hover:bg-[#E8400C]/5 group-hover:text-[#E8400C] transition-colors duration-200">
                      <IconComponent className="size-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                      {formatCategoryLabel(tool.category)}
                    </span>
                  </div>

                  {/* Title + Description */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-[#E8400C] transition-colors duration-150">
                      {tool.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                    Open tool
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground/30 transition-all duration-150 group-hover:text-[#E8400C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center border border-dashed border-border/60 rounded-xl bg-card py-16 px-6 text-center animate-in fade-in duration-300">
          <div className="rounded-full bg-secondary/50 p-3 text-muted-foreground/60 mb-4">
            <Search className="size-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">No tools found</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            We couldn&apos;t find any tools matching &ldquo;{searchQuery}&rdquo; in the {selectedCategory} category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-95 transition-opacity cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
