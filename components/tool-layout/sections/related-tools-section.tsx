import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getEnabledTools, ToolDefinition } from "@/lib/tools/registry"

interface RelatedToolsSectionProps {
  tool: ToolDefinition
}

export function RelatedToolsSection({ tool }: RelatedToolsSectionProps) {
  const allTools = getEnabledTools()
  // Filter out the current tool and take up to 3 related tools in the same category
  const relatedTools = allTools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 3)

  // If there are less than 3 tools in the same category, fill up with other categories
  if (relatedTools.length < 3) {
    const extraTools = allTools.filter(
      (t) => t.slug !== tool.slug && t.category !== tool.category
    )
    for (const extra of extraTools) {
      if (relatedTools.length >= 3) break
      if (!relatedTools.some((t) => t.slug === extra.slug)) {
        relatedTools.push(extra)
      }
    }
  }

  if (relatedTools.length === 0) return null

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Explore Other Utilities
          </h2>
          <p className="text-sm text-muted-foreground">
            More browser-based local tools to accelerate your workflow.
          </p>
        </div>
        <Link
          href="/tools"
          className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8400C] hover:underline"
        >
          View all tools
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {relatedTools.map((t) => {
          const Icon = t.icon
          return (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-premium hover:-translate-y-0.5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-[#E8400C] transition-all duration-200 group-hover:bg-[#E8400C] group-hover:text-white group-hover:border-transparent">
                <Icon className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground transition-colors group-hover:text-[#E8400C]">
                  {t.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
