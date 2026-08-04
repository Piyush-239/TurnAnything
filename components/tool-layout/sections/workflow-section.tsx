import * as React from "react"
import Link from "next/link"
import { ArrowRight, Minimize, Repeat, FileText, Search, Wand2 } from "lucide-react"

export interface WorkflowChainNode {
  title: string
  slug: string
  description: string
  icon: React.ElementType
  active?: boolean
}

interface WorkflowSectionProps {
  toolWorkflow?: WorkflowChainNode[]
}

export function WorkflowSection({ toolWorkflow }: WorkflowSectionProps) {
  // Default workflow chain links if not overridden
  const nodes: WorkflowChainNode[] = toolWorkflow || [
    {
      title: "1. Compress Image",
      slug: "image-compressor",
      description: "Reduce image file size instantly.",
      icon: Minimize,
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
    <section className="w-full py-8 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-[1.2]">
          Unified Media Workflow
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Chain utilities together to complete your production workflow in a single private session.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 relative">
        {nodes.map((node, index) => {
          const Icon = node.icon
          const isActive = node.active
          const isLast = index === nodes.length - 1

          return (
            <div key={node.slug} className="relative flex flex-col items-center">
              <Link
                href={`/tools/${node.slug}`}
                className={[
                  "flex flex-col items-center text-center p-5 rounded-2xl border w-full h-full shadow-sm transition-all duration-200 hover:-translate-y-0.5",
                  isActive
                    ? "border-[#E8400C] bg-[#E8400C]/5 ring-2 ring-[#E8400C]/10 shadow-glow-sm"
                    : "border-border bg-card hover:shadow-premium hover:border-border/60",
                ].join(" ")}
              >
                {/* Node icon wrapper */}
                <div
                  className={[
                    "flex size-10 items-center justify-center rounded-xl border mb-3 transition-colors duration-200",
                    isActive
                      ? "bg-[#E8400C] text-white border-transparent"
                      : "bg-secondary/50 border-border/50 text-[#E8400C] group-hover:bg-[#E8400C] group-hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="size-5" />
                </div>

                <div className="space-y-1">
                  <h3
                    className={[
                      "text-xs font-bold tracking-tight uppercase",
                      isActive ? "text-[#E8400C]" : "text-foreground",
                    ].join(" ")}
                  >
                    {node.title}
                  </h3>
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    {node.description}
                  </p>
                </div>
              </Link>

              {/* Connecting arrow (horizontal on desktop, none on mobile/tablet) */}
              {!isLast && (
                <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 z-10 size-7 items-center justify-center rounded-full bg-background border border-border shadow-sm text-muted-foreground/40">
                  <ArrowRight className="size-3.5" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
