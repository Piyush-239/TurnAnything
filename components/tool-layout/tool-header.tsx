import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ToolHeaderProps = {
  title: string
  description: string
  category: string
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

export function ToolHeader({ title, description, category, className }: ToolHeaderProps) {
  const normalizedCategory = formatCategory(category)

  return (
    <header className={cn("space-y-3 sm:space-y-4", className)}>
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

      <Badge variant="outline" className="w-fit rounded-full px-3 py-1">
        {normalizedCategory}
      </Badge>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {description}
        </p>
      </div>
    </header>
  )
}
