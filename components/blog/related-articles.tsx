import * as React from "react"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { getArticles } from "@/lib/learn/articles"

interface RelatedArticlesProps {
  articleSlugs: string[]
}

export default function RelatedArticles({ articleSlugs }: RelatedArticlesProps) {
  const articles = (articleSlugs || [])
    .map((slug) => getArticles().find((a) => a.slug === slug))
    .filter(Boolean)

  if (articles.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b pb-3">
        <BookOpen className="size-4.5 text-primary" />
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          Related Articles
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => {
          if (!article) return null
          return (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="group flex flex-col justify-between p-5 rounded-xl border bg-card hover:bg-muted/40 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {article.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                Read Guide
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
