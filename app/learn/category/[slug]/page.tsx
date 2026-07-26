import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import Container from "@/components/shared/container"
import { getArticlesByCategory } from "@/lib/learn/articles"
import ArticleCard from "@/components/learn/article-card"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

function normalizeCategory(slug: string | undefined): string {
  if (!slug || typeof slug !== "string") return ""
  const mapping: Record<string, string> = {
    image: "Image",
    pdf: "PDF",
    video: "Video",
    ai: "AI",
    productivity: "Productivity",
    guides: "Guides",
  }
  return mapping[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1)
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  if (!slug) return {}
  const categoryName = normalizeCategory(slug)

  // Verify that there is at least one article or valid category name
  const articles = getArticlesByCategory(categoryName)
  if (articles.length === 0) {
    return {}
  }

  return {
    title: `${categoryName} Guides & Tutorials | TurnAnything.xyz`,
    description: `Explore local browser-side guides, converters, tools, and tutorials about ${categoryName} workflows on TurnAnything.xyz.`,
    alternates: {
      canonical: `https://turnanything.xyz/learn/category/${slug.toLowerCase()}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categoryName = normalizeCategory(slug)
  const articles = getArticlesByCategory(categoryName)

  if (articles.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-foreground">Learn</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Category: {categoryName}</span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Learn
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {categoryName} Guides
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Discover tips, guides, and tutorials about local browser transformations, optimization, and security practices relating to {categoryName} files.
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Guides in {categoryName}</h2>
            <span className="text-xs text-muted-foreground">
              {articles.length} {articles.length === 1 ? "article" : "articles"} available
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export function generateStaticParams() {
  const categories = ["image", "pdf", "video", "ai", "productivity", "guides"]
  return categories.map((cat) => ({
    slug: cat,
  }))
}
