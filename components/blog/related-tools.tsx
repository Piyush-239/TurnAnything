import * as React from "react"
import Link from "next/link"
import { ArrowRight, Wrench } from "lucide-react"
import { getToolBySlug } from "@/lib/tools/registry"

interface RelatedToolsProps {
  toolSlugs: string[]
}

export default function RelatedTools({ toolSlugs }: RelatedToolsProps) {
  const tools = (toolSlugs || []).map((slug) => getToolBySlug(slug)).filter(Boolean)

  if (tools.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b pb-3">
        <Wrench className="size-4.5 text-primary" />
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          Recommended Tools
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => {
          if (!tool) return null
          const Icon = tool.icon
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group relative flex items-center gap-3 p-4 rounded-xl border bg-card hover:bg-muted/40 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-background">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
