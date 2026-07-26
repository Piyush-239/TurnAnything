"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  FileText, 
  Maximize2, 
  X, 
  ArrowRight 
} from "lucide-react"

import { getToolBySlug } from "@/lib/tools/registry"
import { DesktopMiddleAd } from "@/components/blog/ad-placeholder"

// ==========================================
// 1. INLINE ELEMENTS PARSER
// ==========================================
export function renderInlineElements(text: string): React.ReactNode {
  // Regex to split bold, inline code, and links.
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g
  const parts = text.split(regex)

  if (parts.length === 1) return text

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code 
          key={idx} 
          className="px-1.5 py-0.5 rounded bg-muted/70 font-mono text-[0.85em] text-foreground border border-border/45"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      let href = linkMatch[2]
      if (href.startsWith("file:///tools/")) {
        href = href.replace("file:///tools/", "/tools/")
      }
      return (
        <Link 
          key={idx} 
          href={href} 
          className="text-primary font-semibold underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
        >
          {linkMatch[1]}
        </Link>
      )
    }
    return part
  })
}

// ==========================================
// 2. ARTICLE IMAGE COMPONENT (ZOOMABLE)
// ==========================================
interface ArticleImageProps {
  src: string
  caption?: string
  alt?: string
}

export function ArticleImage({ src, caption, alt }: ArticleImageProps) {
  const [isZoomed, setIsZoomed] = React.useState(false)

  // Block background scrolling when zoomed
  React.useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isZoomed])

  return (
    <div className="my-8 space-y-3 group">
      <div 
        onClick={() => setIsZoomed(true)}
        className="relative overflow-hidden rounded-2xl border bg-muted shadow-sm cursor-zoom-in transition-all duration-300 hover:shadow-md hover:border-foreground/20"
      >
        <img
          src={src}
          alt={alt || caption || "Article Image"}
          className="w-full h-auto object-cover max-h-[500px]"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 p-2 rounded-xl bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border shadow-sm">
          <Maximize2 className="size-4 text-muted-foreground group-hover:text-foreground" />
        </div>
      </div>
      {caption && (
        <p className="text-xs text-center text-muted-foreground font-medium italic">
          {caption}
        </p>
      )}

      {/* Lightbox Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 transition-colors"
          >
            <X className="size-5" />
          </button>
          <div className="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-2xl border bg-card shadow-2xl animate-in zoom-in-95 duration-200">
            <img
              src={src}
              alt={alt || caption || "Zoomed Article Image"}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            {caption && (
              <div className="p-4 border-t bg-muted/30 text-xs text-center text-muted-foreground font-semibold">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 3. CALLOUT COMPONENT
// ==========================================
interface ArticleCalloutProps {
  type: "tip" | "warning" | "success" | "info" | "note"
  title?: string
  children: React.ReactNode
}

export function ArticleCallout({ type, title, children }: ArticleCalloutProps) {
  const iconMap = {
    tip: { 
      icon: Lightbulb, 
      color: "text-white bg-[#E8400C] border-[#E8400C]/20", 
      bg: "bg-[#E8400C]/5 border-[#E8400C]/10 dark:bg-[#E8400C]/5 dark:border-[#E8400C]/25", 
      defaultTitle: "Quick Tip" 
    },
    warning: { 
      icon: AlertTriangle, 
      color: "text-white bg-amber-600 border-amber-600/20", 
      bg: "bg-amber-600/5 border-amber-600/10 dark:bg-amber-600/5 dark:border-amber-600/25", 
      defaultTitle: "Warning" 
    },
    success: { 
      icon: CheckCircle2, 
      color: "text-white bg-emerald-600 border-emerald-600/20", 
      bg: "bg-emerald-600/5 border-emerald-600/10 dark:bg-emerald-600/5 dark:border-emerald-600/25", 
      defaultTitle: "Best Practice" 
    },
    info: { 
      icon: Info, 
      color: "text-white bg-blue-600 border-blue-600/20", 
      bg: "bg-blue-600/5 border-blue-600/10 dark:bg-blue-600/5 dark:border-blue-600/25", 
      defaultTitle: "Note" 
    },
    note: { 
      icon: FileText, 
      color: "text-white bg-neutral-600 border-neutral-600/20", 
      bg: "bg-secondary border border-black/[0.06] dark:border-white/[0.08] dark:bg-card", 
      defaultTitle: "Quick Note" 
    },
  }

  const config = iconMap[type] || iconMap.note
  const Icon = config.icon

  return (
    <div className={`my-8 flex gap-4 p-6 rounded-[1.75rem] border ${config.bg} shadow-premium transition-all duration-300`}>
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ${config.color}`}>
        <Icon className="size-4.5" />
      </div>
      <div className="space-y-1.5 flex-1 min-w-0">
        <h4 className="text-[10px] font-extrabold text-foreground tracking-widest uppercase">
          {title || config.defaultTitle}
        </h4>
        <div className="text-sm text-muted-foreground/90 leading-relaxed font-normal">
          {children}
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 4. COMPARISON TABLE COMPONENT
// ==========================================
export function ComparisonTable({ content }: { content: string }) {
  const lines = content.split("\n").map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return null

  // Helper to split line by pipe and clean
  const splitRow = (line: string) => {
    return line
      .split("|")
      .map(c => c.trim())
      .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
  }

  const headers = splitRow(lines[0])
  const rows = lines.slice(2).map(splitRow)

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-border bg-card shadow-premium p-1">
      <div className="overflow-x-auto rounded-[calc(1.5rem-1px)]">
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <thead className="bg-secondary/80 border-b border-border/80 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-4 border-r last:border-r-0 border-border/40 font-extrabold tracking-widest">
                  {renderInlineElements(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {rows.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className="transition-colors hover:bg-secondary/40 odd:bg-secondary/15 even:bg-card/30"
              >
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-6 py-4 text-foreground/90 border-r last:border-r-0 border-border/30 font-medium">
                    {renderInlineElements(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==========================================
// 5. TOOL RECOMMENDATION CARD
// ==========================================
export function ArticleToolCard({ slug }: { slug: string }) {
  const tool = getToolBySlug(slug)
  if (!tool) return null

  const Icon = tool.icon

  return (
    <div className="my-8 relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-premium transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-20 pointer-events-none" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary border border-border/60 text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent shadow-sm">
            <Icon className="size-6" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-base font-extrabold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">
              {tool.title}
            </h4>
            <p className="text-sm text-muted-foreground/90 max-w-lg leading-relaxed font-normal">
              {tool.description}
            </p>
          </div>
        </div>
        <Link
          href={`/tools/${tool.slug}`}
          className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:opacity-90 active:scale-98 shrink-0"
        >
          Open Tool
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

// ==========================================
// 6. TIMELINE STEP COMPONENT
// ==========================================
export function StepComponent({ content }: { content: string }) {
  const steps: { title: string; body: string }[] = []
  let currentStep: { title: string; body: string } | null = null

  content.split("\n").forEach((line) => {
    const trimmed = line.trim()
    if (trimmed.startsWith("### ")) {
      if (currentStep) steps.push(currentStep)
      const title = trimmed.slice(4).replace(/^\d+\.\s*/, "")
      currentStep = { title, body: "" }
    } else if (currentStep) {
      currentStep.body += line + "\n"
    }
  })
  if (currentStep) steps.push(currentStep)

  if (steps.length === 0) return null

  return (
    <div className="my-8 relative pl-6 sm:pl-8 border-l-2 border-black/[0.06] dark:border-white/[0.08] space-y-10">
      {steps.map((step, idx) => {
        const stepNum = String(idx + 1).padStart(2, "0")
        return (
          <div key={idx} className="relative group">
            {/* Step circle */}
            <div className="absolute -left-[43px] sm:-left-[51px] top-0 flex size-9 items-center justify-center rounded-sm bg-card border border-black/[0.06] text-[#E8400C] font-extrabold text-xs shadow-sm group-hover:bg-[#1A1A1A] group-hover:text-[#F8F7F4] group-hover:border-transparent transition-all duration-300 dark:border-white/[0.08]">
              {stepNum}
            </div>
            
            <div className="rounded-sm border border-black/[0.06] bg-card p-6 shadow-premium transition-all duration-300 hover:border-[#E8400C]/20 dark:border-white/[0.08] space-y-2.5">
              <h4 className="text-base font-extrabold text-foreground leading-tight tracking-tight">
                {step.title}
              </h4>
              <div className="text-sm text-muted-foreground/90 leading-relaxed font-normal">
                {parseMarkdownBlocks(step.body)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ==========================================
// 7. BLOCK LEVEL PARSER (MAIN)
// ==========================================
interface Block {
  type: "p" | "h2" | "h3" | "h4" | "ul" | "ol" | "blockquote" | "code" | "table" | "custom"
  content: string
  metadata?: {
    customType?: string
    arg?: string
    lang?: string
  }
}

export function parseArticleMarkdown(content: string): Block[] {
  const lines = content.split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // Custom blocks :::
    if (trimmed.startsWith(":::")) {
      const blockHeader = trimmed.slice(3).trim()
      const typeParts = blockHeader.split(" ")
      const blockType = typeParts[0]
      const blockArg = typeParts.slice(1).join(" ")

      const blockContentLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        blockContentLines.push(lines[i])
        i++
      }
      i++ // Skip closing :::

      blocks.push({
        type: "custom",
        content: blockContentLines.join("\n"),
        metadata: {
          customType: blockType,
          arg: blockArg,
        }
      })
      continue
    }

    // Code blocks ```
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      blocks.push({
        type: "code",
        content: codeLines.join("\n"),
        metadata: { lang }
      })
      continue
    }

    // Headings
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", content: trimmed.slice(3) })
      i++
      continue
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", content: trimmed.slice(4) })
      i++
      continue
    }
    if (trimmed.startsWith("#### ")) {
      blocks.push({ type: "h4", content: trimmed.slice(5) })
      i++
      continue
    }

    // Blockquotes (e.g. > text)
    if (trimmed.startsWith(">")) {
      const bqLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        const l = lines[i].trim()
        bqLines.push(l.slice(1).replace(/^\s/, ""))
        i++
      }
      blocks.push({
        type: "blockquote",
        content: bqLines.join("\n")
      })
      continue
    }

    // Lists (unordered)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listLines: string[] = []
      while (i < lines.length) {
        const nextTrimmed = lines[i].trim()
        if (nextTrimmed.startsWith("- ") || nextTrimmed.startsWith("* ")) {
          listLines.push(nextTrimmed.slice(2))
          i++
        } else if (nextTrimmed === "" && i + 1 < lines.length && (lines[i+1].trim().startsWith("- ") || lines[i+1].trim().startsWith("* "))) {
          i++
        } else {
          break
        }
      }
      blocks.push({
        type: "ul",
        content: listLines.join("\n")
      })
      continue
    }

    // Lists (ordered)
    const orderedMatch = trimmed.match(/^(\d+)\.\s(.*)/)
    if (orderedMatch) {
      const listLines: string[] = []
      while (i < lines.length) {
        const nextTrimmed = lines[i].trim()
        const match = nextTrimmed.match(/^(\d+)\.\s(.*)/)
        if (match) {
          listLines.push(match[2])
          i++
        } else if (nextTrimmed === "" && i + 1 < lines.length && lines[i+1].trim().match(/^(\d+)\.\s(.*)/)) {
          i++
        } else {
          break
        }
      }
      blocks.push({
        type: "ol",
        content: listLines.join("\n")
      })
      continue
    }

    // Table
    if (trimmed.startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim())
        i++
      }
      blocks.push({
        type: "table",
        content: tableLines.join("\n")
      })
      continue
    }

    // Empty space
    if (trimmed === "") {
      i++
      continue
    }

    // Paragraph
    const paragraphLines: string[] = []
    while (i < lines.length) {
      const nextTrimmed = lines[i].trim()
      if (
        nextTrimmed === "" ||
        nextTrimmed.startsWith(":::") ||
        nextTrimmed.startsWith("```") ||
        nextTrimmed.startsWith("##") ||
        nextTrimmed.startsWith(">") ||
        nextTrimmed.startsWith("- ") ||
        nextTrimmed.startsWith("* ") ||
        nextTrimmed.match(/^(\d+)\.\s/) ||
        nextTrimmed.startsWith("|")
      ) {
        break
      }
      paragraphLines.push(lines[i])
      i++
    }
    blocks.push({
      type: "p",
      content: paragraphLines.join("\n")
    })
  }

  return blocks
}

// Sub-parser to render content inside step components or smaller scopes
export function parseMarkdownBlocks(content: string): React.ReactNode[] {
  const blocks = parseArticleMarkdown(content)
  return renderParsedBlocks(blocks, false)
}

// Helper to render individual blocks without ad insertion logic
function renderBlockNode(block: Block, idx: number): React.ReactNode {
  switch (block.type) {
    case "h2": {
      const id = block.content.toLowerCase().replace(/[^\w]+/g, "-")
      return (
        <h2
          key={idx}
          id={id}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-12 mb-5 text-foreground scroll-mt-24 border-b pb-2.5 border-border/40"
        >
          {renderInlineElements(block.content)}
        </h2>
      )
    }
    case "h3":
      return (
        <h3 key={idx} className="text-xl sm:text-2xl font-extrabold mt-10 mb-4 text-foreground tracking-tight">
          {renderInlineElements(block.content)}
        </h3>
      )
    case "h4":
      return (
        <h4 key={idx} className="text-lg font-extrabold mt-8 mb-3 text-foreground tracking-tight">
          {renderInlineElements(block.content)}
        </h4>
      )
    case "p":
      return (
        <p key={idx} className="text-base text-muted-foreground/90 leading-relaxed mb-6 font-normal">
          {renderInlineElements(block.content)}
        </p>
      )
    case "ul": {
      const items = block.content.split("\n")
      return (
        <ul key={idx} className="list-disc pl-6 mb-6 space-y-3 text-base text-muted-foreground/90 font-normal">
          {items.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInlineElements(item)}</li>
          ))}
        </ul>
      )
    }
    case "ol": {
      const items = block.content.split("\n")
      return (
        <ol key={idx} className="list-decimal pl-6 mb-6 space-y-3 text-base text-muted-foreground/90 font-normal">
          {items.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInlineElements(item)}</li>
          ))}
        </ol>
      )
    }
    case "blockquote":
      return (
        <blockquote 
          key={idx} 
          className="border-l-4 border-primary/40 pl-4 py-1.5 my-6 italic text-muted-foreground text-base bg-secondary/60 rounded-r-xl pr-4"
        >
          {renderInlineElements(block.content)}
        </blockquote>
      )
    case "code":
      return (
        <div key={idx} className="my-8 overflow-hidden rounded-3xl border border-border shadow-premium bg-[#1C1917] text-[#FFFDF8] dark:bg-[#141211]">
          <div className="bg-[#262220] border-b border-[#262220]/20 px-5 py-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] font-mono">
            <span>{block.metadata?.lang || "code"}</span>
          </div>
          <pre className="p-5 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed select-all">
            <code>{block.content}</code>
          </pre>
        </div>
      )
    case "table":
      return <ComparisonTable key={idx} content={block.content} />
    case "custom": {
      const { customType, arg } = block.metadata || {}
      if (customType === "tip" || customType === "warning" || customType === "success" || customType === "info" || customType === "note") {
        let content = block.content
        let parsedTitle = arg || undefined
        if (content.startsWith("Title:")) {
          const titleLineEnd = content.indexOf("\n")
          if (titleLineEnd !== -1) {
            parsedTitle = content.slice(6, titleLineEnd).trim()
            content = content.slice(titleLineEnd + 1)
          }
        }
        return (
          <ArticleCallout key={idx} type={customType} title={parsedTitle}>
            {parseMarkdownBlocks(content)}
          </ArticleCallout>
        )
      }
      if (customType === "image") {
        const props: Record<string, string> = {}
        block.content.split("\n").forEach(line => {
          const colonIndex = line.indexOf(":")
          if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim()
            const value = line.slice(colonIndex + 1).trim()
            props[key] = value
          }
        })
        return (
          <ArticleImage 
            key={idx} 
            src={props.src || ""} 
            caption={props.caption} 
            alt={props.alt || props.caption} 
          />
        )
      }
      if (customType === "tool") {
        return <ArticleToolCard key={idx} slug={arg || ""} />
      }
      if (customType === "comparison") {
        return <ComparisonTable key={idx} content={block.content} />
      }
      if (customType === "steps") {
        return <StepComponent key={idx} content={block.content} />
      }
      return null
    }
    default:
      return null
  }
}

// Renders lists, headers, callouts, and other structural blocks with optional ads
export function renderParsedBlocks(blocks: Block[], insertAds: boolean = false): React.ReactNode[] {
  let h2Count = 0
  const nodes: React.ReactNode[] = []

  blocks.forEach((block, idx) => {
    if (block.type === "h2") {
      h2Count++
      if (insertAds && h2Count === 4) {
        nodes.push(<DesktopMiddleAd key={`middle-ad`} />)
      }
    }
    const node = renderBlockNode(block, idx)
    if (node) {
      nodes.push(node)
    }
  })

  return nodes
}

// Main component that takes markdown content and renders it beautifully
interface ArticleRendererProps {
  content: string
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  const blocks = React.useMemo(() => parseArticleMarkdown(content), [content])
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground font-sans">
      {renderParsedBlocks(blocks, true)}
    </div>
  )
}

