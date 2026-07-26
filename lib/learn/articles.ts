import fs from "fs"
import path from "path"

export interface FAQItem {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  description: string
  category: "Image" | "PDF" | "AI" | "Video" | "Productivity" | "Guides" | "Study" | "Updates"
  tags: string[]
  publishedDate: string
  updatedDate: string
  readingTime: string
  author: string
  coverImage: string
  quickAnswer?: string
  featuredTool?: string
  relatedTools?: string[]
  relatedArticles?: string[]
  faq?: FAQItem[]
  content: string // Markdown body
  status: "published" | "draft"
}

const PUBLISHED_DIR = path.join(process.cwd(), "content/published")

// Safely parse frontmatter from markdown files
function parseArticle(fileContent: string): Omit<Article, "slug"> & { slug?: string } {
  const parts = fileContent.split("---")
  if (parts.length < 3) {
    throw new Error("Invalid markdown file: missing frontmatter delimiters (---)")
  }

  const frontmatterText = parts[1]
  const content = parts.slice(2).join("---").trim()

  const metadata: Record<string, string | string[] | FAQItem[] | undefined> = {}
  const lines = frontmatterText.split("\n")

  lines.forEach((line) => {
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) return

    const key = line.slice(0, colonIndex).trim()
    let val = line.slice(colonIndex + 1).trim()

    // Clean quotes if wrapped
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }

    // Try parsing as JSON array/object first
    if (val.startsWith("[") && val.endsWith("]")) {
      try {
        metadata[key] = JSON.parse(val) as string[] | FAQItem[]
        return
      } catch {
        // Fallback if JSON parse fails
      }
    }

    // Handlers for specific fields
    if (key === "tags" || key === "relatedTools" || key === "relatedArticles") {
      // If it wasn't parsed as JSON array, try comma-separated
      if (!metadata[key]) {
        metadata[key] = val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      }
    } else if (key === "faq") {
      if (!metadata[key]) {
        try {
          metadata[key] = JSON.parse(val) as FAQItem[]
        } catch {
          metadata[key] = []
        }
      }
    } else {
      metadata[key] = val
    }
  })

  return {
    title: (metadata.title as string) || "",
    description: (metadata.description as string) || "",
    category: (metadata.category as Article["category"]) || "Guides",
    tags: (metadata.tags as string[]) || [],
    publishedDate: (metadata.publishedDate as string) || "",
    updatedDate: (metadata.updatedDate as string) || "",
    readingTime: (metadata.readingTime as string) || "",
    author: (metadata.author as string) || "",
    coverImage: (metadata.coverImage as string) || "",
    quickAnswer: (metadata.quickAnswer as string) || "",
    featuredTool: (metadata.featuredTool as string) || undefined,
    relatedTools: (metadata.relatedTools as string[]) || [],
    relatedArticles: (metadata.relatedArticles as string[]) || [],
    faq: (metadata.faq as FAQItem[]) || [],
    status: (metadata.status as Article["status"]) || "draft",
    slug: (metadata.slug as string) || undefined,
    content,
  }
}

// Scans only content/published directory for articles
export function getArticles(): Article[] {
  if (!fs.existsSync(PUBLISHED_DIR)) {
    return []
  }

  const files = fs.readdirSync(PUBLISHED_DIR)
  const articles: Article[] = []

  files.forEach((file) => {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) return

    const filePath = path.join(PUBLISHED_DIR, file)
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const parsed = parseArticle(fileContent)
      
      // Slug defaults to filename (without extension) if not specified in frontmatter
      const fileSlug = path.parse(file).name
      const slug = parsed.slug || fileSlug

      // Explicit double-check: only return articles where status is published
      if (parsed.status === "published") {
        articles.push({
          ...parsed,
          slug,
        } as Article)
      }
    } catch (error) {
      console.error(`Failed to parse article at ${file}:`, error)
    }
  })

  // Sort by updatedDate desc or publishedDate desc
  return articles.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime())
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getArticles()
  return articles.find((article) => article.slug === slug)
}

export function getArticlesByCategory(category: string | undefined): Article[] {
  if (!category) return []
  const articles = getArticles()
  return articles.filter((article) => article.category.toLowerCase() === category.toLowerCase())
}
