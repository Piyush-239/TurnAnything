import Link from "next/link"
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
    <header className={cn("space-y-4", className)}>
      <nav aria-label="Breadcrumb" className="text-[11px] font-medium text-muted-foreground/50">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-[#E8400C]">Home</Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/30">›</li>
          <li>
            <Link href="/tools" className="transition-colors hover:text-[#E8400C]">Tools</Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/30">›</li>
          <li className="font-semibold text-foreground/70">{normalizedCategory}</li>
        </ol>
      </nav>

      <span className="inline-flex items-center border border-border/70 px-3 py-0.5 text-[11px] font-semibold text-muted-foreground/60 rounded-sm">
        {normalizedCategory}
      </span>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl leading-[1.1]">{title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground leading-relaxed sm:text-base">
          {description}
        </p>
      </div>
    </header>
  )
}
