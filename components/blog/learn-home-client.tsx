"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Calendar, BookOpen, ArrowRight } from "lucide-react"
import type { Article } from "@/lib/learn/articles"
import ArticleCard from "@/components/learn/article-card"

interface LearnHomeClientProps {
  articles: Article[]
}

const CATEGORIES = ["All", "Image", "PDF", "Video", "AI", "Productivity", "Guides"]

export default function LearnHomeClient({ articles }: LearnHomeClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")

  const filteredArticles = React.useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
  }, [articles, searchQuery, selectedCategory])

  const featuredArticle = React.useMemo(() => {
    return articles.find((a) => a.category === "Guides") || articles[0]
  }, [articles])

  const popularGuides = React.useMemo(() => {
    return articles.slice(0, 3)
  }, [articles])

  return (
    <div className="space-y-14">
      {/* ── 1. Hero & Search ──────────────────────────────────────── */}
      <div className="border-b border-border/60 pb-12 text-left">
        <p className="eyebrow mb-5">Learn &amp; Convert</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-foreground">
          TurnAnything Knowledge Hub
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
          Master local file transformations, OCR technology, client-side PDF manipulation, and modern web productivity.
        </p>

        {/* Search box */}
        <div className="mt-8 max-w-md relative">
          <div className="flex h-12 items-center gap-2 border border-border/70 bg-card pl-4 pr-2 transition-all duration-150 focus-within:border-[#E8400C]/40">
            <Search className="size-4 shrink-0 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Search guides, tags, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/40"
            />
          </div>
        </div>
      </div>

      {/* ── 2. Category Chips ─────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Browse by category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-sm px-4 py-1.5 text-xs font-semibold border transition-colors duration-150 cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border-border/70 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 3. Featured Article ───────────────────────────────────── */}
      {!searchQuery && selectedCategory === "All" && featuredArticle && (
        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Featured Guide</p>
          <div className="group relative grid gap-0 md:grid-cols-2 border border-border/60 overflow-hidden hover:border-foreground/20 transition-colors duration-150">
            <Link href={`/learn/${featuredArticle.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">Read {featuredArticle.title}</span>
            </Link>

            <div className="relative aspect-video md:aspect-auto w-full bg-muted overflow-hidden min-h-64 sm:min-h-80">
              <img
                src={featuredArticle.coverImage}
                alt=""
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 inline-flex items-center border border-border/60 bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                {featuredArticle.category}
              </span>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-9">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {featuredArticle.updatedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3.5" />
                  {featuredArticle.readingTime}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground group-hover:text-[#E8400C] transition-colors duration-150 leading-snug">
                {featuredArticle.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {featuredArticle.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {featuredArticle.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] border border-border/60 px-2.5 py-0.5 text-muted-foreground/70">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="flex size-7 items-center justify-center bg-foreground text-background text-[9px] font-bold uppercase">
                  {featuredArticle.author.slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{featuredArticle.author}</p>
                  <p className="text-[10px] text-muted-foreground/60">Author</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Popular Guides ─────────────────────────────────────── */}
      {!searchQuery && selectedCategory === "All" && popularGuides.length > 0 && (
        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Popular Guides</p>
          <div className="grid gap-0 border border-border/60 sm:grid-cols-3 sm:divide-x divide-border/60">
            {popularGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/learn/${guide.slug}`}
                className="group flex flex-col justify-between p-5 border-b border-border/60 sm:border-b-0 transition-colors hover:bg-secondary/30"
              >
                <div className="space-y-2">
                  <span className="eyebrow">{guide.category}</span>
                  <h3 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-[#E8400C] transition-colors duration-150 leading-snug mt-1">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-[#E8400C] transition-colors">
                  Read
                  <ArrowRight className="size-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. Articles Grid ──────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
            {searchQuery || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
          </p>
          <span className="text-xs text-muted-foreground/50">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border/60 bg-secondary/20">
            <p className="text-sm text-muted-foreground">No articles match your criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All") }}
              className="mt-3 text-xs font-semibold text-[#E8400C] hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
