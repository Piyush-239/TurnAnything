import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ToolDefinition } from "@/lib/tools/registry"
import type { Article } from "@/lib/learn/articles"

interface RelatedGuidesSectionProps {
  tool: ToolDefinition
}

export function RelatedGuidesSection({ tool }: RelatedGuidesSectionProps) {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data: Article[]) => {
        if (Array.isArray(data)) {
          // Find matching tags or category
          const normalizedKeywords = tool.keywords.map((kw) => kw.toLowerCase())
          
          const sorted = data
            .map((art: Article) => {
              // Calculate a simple match score based on keywords & category
              let score = 0
              if (art.category.toLowerCase() === tool.category.toLowerCase()) {
                score += 2
              }
              const tags = art.tags || []
              tags.forEach((tag) => {
                if (normalizedKeywords.includes(tag.toLowerCase())) {
                  score += 3
                }
              })
              if (art.title.toLowerCase().includes(tool.title.toLowerCase())) {
                score += 5
              }
              return { art, score }
            })
            .sort((a, b) => b.score - a.score)
            .map((item) => item.art)
            .slice(0, 2) // display up to 2 guides

          setArticles(sorted)
        }
      })
      .catch((err) => console.error("Error fetching articles:", err))
      .finally(() => setIsLoading(false))
  }, [tool])

  if (isLoading || articles.length === 0) return null

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Related Technical Guides
          </h2>
          <p className="text-sm text-muted-foreground">
            Learn more about standard browser optimization and processing.
          </p>
        </div>
        <Link
          href="/learn"
          className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8400C] hover:underline"
        >
          View all guides
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((art) => {
          return (
            <Link
              key={art.slug}
              href={`/learn/${art.slug}`}
              className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-premium hover:-translate-y-0.5"
            >
              {art.coverImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border">
                  <img
                    src={art.coverImage}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E8400C]">
                    {art.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground">• {art.readingTime}</span>
                </div>
                <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-[#E8400C]">
                  {art.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {art.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
