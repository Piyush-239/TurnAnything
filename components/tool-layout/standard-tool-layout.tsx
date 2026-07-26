import * as React from "react"
import Link from "next/link"
import { PrivacyCard } from "./privacy-card"
import { cn } from "@/lib/utils"

type StandardToolLayoutProps = {
  title: string
  description: string
  category: string
  children: React.ReactNode
  className?: string
}

function formatCategory(category: string): string {
  return category
    .trim()
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}

export function StandardToolLayout({
  title,
  description,
  category,
  children,
  className,
}: StandardToolLayoutProps) {
  const normalizedCategory = formatCategory(category)

  return (
    <main className={cn("mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-4 py-12 sm:gap-12 sm:px-6 lg:px-8 select-none", className)}>
      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-[11px] font-medium text-muted-foreground/50">
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

      {/* 2. Title area */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl leading-[1.1]">
            {title}
          </h1>
          <div className="flex flex-wrap gap-2 sm:shrink-0">
            <span className="inline-flex items-center border border-border/70 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 rounded-sm">
              {normalizedCategory}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#E8400C]/20 bg-[#E8400C]/5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#E8400C] rounded-sm">
              <span className="size-1.5 rounded-full bg-[#E8400C]" />
              Local Processing
            </span>
          </div>
        </div>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* 3. Main Tool Area */}
      <section className="grid gap-8">
        {children}

        {/* PrivacyCard automatically included below tool area */}
        <PrivacyCard />
      </section>

      {/* Placeholder for future sections */}
      <section className="min-h-[20px]" />
    </main>
  )
}
