import * as React from "react"
import { cn } from "@/lib/utils"

interface ArticleSectionProps {
  id?: string
  title?: string
  className?: string
  children: React.ReactNode
}

export default function ArticleSection({ id, title, className, children }: ArticleSectionProps) {
  return (
    <section id={id} className={cn("space-y-4 scroll-mt-24", className)}>
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
      )}
      <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  )
}
