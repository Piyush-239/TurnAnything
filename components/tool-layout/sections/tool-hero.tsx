import * as React from "react"
import Link from "next/link"
import { ShieldCheck, Cpu } from "lucide-react"
import { ToolDefinition } from "@/lib/tools/registry"

interface ToolHeroProps {
  tool: ToolDefinition
  heroTitle?: string
  heroDescription?: string
}

function formatCategory(category: string): string {
  return category
    .trim()
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

export function ToolHero({ tool, heroTitle, heroDescription }: ToolHeroProps) {
  const normalizedCategory = formatCategory(tool.category)
  const displayTitle = heroTitle || tool.title
  const displayDescription = heroDescription || tool.description

  return (
    <section className="relative w-full pt-8 pb-4">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 text-[11px] font-medium text-muted-foreground/50">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-[#E8400C]">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/30">›</li>
          <li>
            <Link href="/tools" className="transition-colors hover:text-[#E8400C]">
              Tools
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/30">›</li>
          <li className="font-semibold text-foreground/70">{normalizedCategory}</li>
        </ol>
      </nav>

      {/* 2. Headline & Badges */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            {/* Category tag */}
            <span className="inline-flex items-center rounded-sm border border-border/70 bg-secondary/50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/75">
              {normalizedCategory}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-[1.1]">
              {displayTitle}
            </h1>
          </div>

          {/* Premium trust badges */}
          <div className="flex flex-wrap gap-2 pt-1 md:shrink-0">
            <span className="inline-flex items-center gap-1 border border-[#E8400C]/25 bg-[#E8400C]/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#E8400C] rounded-sm shadow-glow-sm">
              <Cpu className="size-3" />
              100% Browser Local
            </span>
            <span className="inline-flex items-center gap-1 border border-border/70 bg-card px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/70 rounded-sm">
              <ShieldCheck className="size-3 text-[#E8400C]" />
              Privacy Secured
            </span>
          </div>
        </div>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground font-normal">
          {displayDescription}
        </p>
      </div>
    </section>
  )
}
