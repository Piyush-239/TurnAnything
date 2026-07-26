import * as React from "react"
import Link from "next/link"
import { ArrowRight, Wrench, BookOpen, Compass } from "lucide-react"

import { getToolBySlug } from "@/lib/tools/registry"
import { getArticles } from "@/lib/learn/articles"

interface NextStepsProps {
  currentSlug: string
  category: string
  toolSlugs?: string[]
  articleSlugs?: string[]
}

export default function ContinueReading({ 
  currentSlug, 
  category, 
  toolSlugs = [], 
  articleSlugs = [] 
}: NextStepsProps) {
  // 1. Resolve related tools
  const tools = (toolSlugs || []).map((slug) => getToolBySlug(slug)).filter(Boolean)

  // 2. Resolve related articles
  const allArticles = getArticles()
  const articles = (articleSlugs && articleSlugs.length > 0)
    ? articleSlugs
        .map((slug) => allArticles.find((a) => a.slug === slug))
        .filter(Boolean)
    : (() => {
        const sameCategory = allArticles.filter(
          (a) => a.category.toLowerCase() === category.toLowerCase() && a.slug !== currentSlug
        )
        const others = allArticles.filter(
          (a) => a.category.toLowerCase() !== category.toLowerCase() && a.slug !== currentSlug
        )
        return [...sameCategory, ...others].slice(0, 2)
      })()

  const hasTools = tools.length > 0
  const hasArticles = articles.length > 0

  if (!hasTools && !hasArticles) return null

  return (
    <div className="space-y-8 rounded-sm border border-black/[0.06] bg-card p-6 sm:p-8 shadow-premium relative overflow-hidden dark:border-white/[0.08]">
      
      {/* Title block */}
      <div className="space-y-1.5 relative z-10">
        <div className="flex items-center gap-2 text-[#E8400C]">
          <Compass className="size-5" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest">Next steps</span>
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-foreground animate-fade-in">
          What should you do next?
        </h3>
        <p className="text-sm text-muted-foreground/80 leading-relaxed font-normal">
          Optimise your workflow by launching these local utility tools or exploring related technical guides.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 relative z-10">
        {/* Recommended Tools column */}
        {hasTools && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2 border-b pb-2 border-black/[0.06] dark:border-white/[0.08]">
              <Wrench className="size-3.5" />
              Recommended Tools
            </h4>
            <div className="space-y-3">
              {tools.map((tool) => {
                if (!tool) return null
                const Icon = tool.icon
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group relative flex items-center gap-3.5 p-4 rounded-sm border border-black/[0.06] bg-secondary/35 hover:bg-card hover:shadow-premium hover:-translate-y-0.5 hover:border-[#E8400C]/20 transition-all duration-300 dark:border-white/[0.08]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-card border border-black/[0.06] text-foreground transition-all duration-300 group-hover:bg-[#1A1A1A] group-hover:text-[#F8F7F4] group-hover:border-transparent shadow-sm dark:border-white/[0.08] dark:bg-secondary">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold truncate text-foreground group-hover:text-[#E8400C] transition-colors">
                        {tool.title}
                      </p>
                      <p className="text-xs text-muted-foreground/80 truncate leading-normal font-normal mt-0.5">{tool.description}</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[#E8400C]" />
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Recommended Articles column */}
        {hasArticles && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2 border-b pb-2 border-black/[0.06] dark:border-white/[0.08]">
              <BookOpen className="size-3.5" />
              Related Guides
            </h4>
            <div className="space-y-3">
              {articles.map((article) => {
                if (!article) return null
                return (
                  <Link
                    key={article.slug}
                    href={`/learn/${article.slug}`}
                    className="group relative flex items-center gap-3.5 p-4 rounded-sm border border-black/[0.06] bg-secondary/35 hover:bg-card hover:shadow-premium hover:-translate-y-0.5 hover:border-[#E8400C]/20 transition-all duration-300 dark:border-white/[0.08]"
                  >
                    {/* Small thumbnail if present */}
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-sm border border-black/[0.06] bg-card shadow-sm dark:border-white/[0.08] dark:bg-secondary">
                      <img 
                        src={article.coverImage} 
                        alt="" 
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-extrabold uppercase text-[#E8400C] tracking-widest">
                          {article.category}
                        </span>
                        <span className="text-[9px] font-bold text-muted-foreground/50">
                          • {article.readingTime}
                        </span>
                      </div>
                      <p className="text-sm font-bold truncate text-foreground group-hover:text-[#E8400C] transition-colors mt-0.5">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground/80 truncate leading-normal font-normal mt-0.5">
                        {article.description}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[#E8400C]" />
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
