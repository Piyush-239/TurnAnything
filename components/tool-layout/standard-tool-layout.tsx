import * as React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PrivacyCard } from "./privacy-card"
import { AdSlot } from "@/components/shared/ad-slot"
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
    <main className={cn("mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:gap-8 sm:px-6 lg:px-8", className)}>
      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground sm:text-sm">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/tools" className="transition-colors hover:text-foreground">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">{normalizedCategory}</li>
        </ol>
      </nav>

      {/* 2. Large Title & 3. Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {description}
        </p>
      </div>

      {/* 4. Category Badge */}
      <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
        {normalizedCategory}
      </Badge>

      {/* 5. Main Tool Area */}
      <section className="grid gap-6">
        {children}
        
        {/* PrivacyCard automatically included below tool area */}
        <PrivacyCard />
      </section>

      {/* Placeholders for future sections */}
      {/* FAQ Section */}
      <section className="min-h-[120px]" />

      {/* Related Tools */}
      <section className="min-h-[120px]" />

      {/* Blog Section */}
      <section className="min-h-[120px]" />

      {/* Advertisement Slot */}
      <section className="min-h-[120px]">
        <AdSlot />
      </section>
    </main>
  )
}
