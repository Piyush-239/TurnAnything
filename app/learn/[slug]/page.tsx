import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import Container from "@/components/shared/container"
import { getArticleBySlug, getArticles } from "@/lib/learn/articles"
import ArticleHero from "@/components/blog/article-hero"
import QuickAnswer from "@/components/blog/quick-answer"
import TableOfContents from "@/components/blog/table-of-contents"
import FAQ from "@/components/blog/faq"
import ContinueReading from "@/components/blog/continue-reading"
import ArticleFooter from "@/components/blog/article-footer"
import ArticleRenderer from "@/components/blog/article-renderer"
import { 
  DesktopTopAd, 
  DesktopBottomAd, 
  DesktopSidebarAd, 
  MobileTopAd, 
  MobileBottomAd 
} from "@/components/blog/ad-placeholder"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {}
  }

  return {
    title: `${article.title} | TurnAnything.xyz`,
    description: article.description,
    alternates: {
      canonical: `https://turnanything.xyz/learn/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://turnanything.xyz/learn/${article.slug}`,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // TOC items to exclude metadata and non-reading headers
  const EXCLUDED_TOC_HEADERS = [
    "hero introduction",
    "quick answer",
    "table of contents",
    "frequently asked questions",
    "related tools",
    "what's next?",
    "next steps"
  ]

  // Parse Table of Contents items (h2 headers)
  const toc = article.content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim())
    .filter((text) => !EXCLUDED_TOC_HEADERS.includes(text.toLowerCase()))
    .map((text) => ({
      text,
      id: text.toLowerCase().replace(/[^\w]+/g, "-"),
    }))

  // JSON-LD Schema definitions for Search Engines
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://turnanything.xyz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Learn",
        "item": "https://turnanything.xyz/learn"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://turnanything.xyz/learn/${article.slug}`
      }
    ]
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.description,
    "image": article.coverImage,
    "datePublished": article.publishedDate,
    "dateModified": article.updatedDate,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "TurnAnything",
      "logo": {
        "@type": "ImageObject",
        "url": "https://turnanything.xyz/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://turnanything.xyz/learn/${article.slug}`
    }
  }

  const faqSchema = article.faq && article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null

  return (
    <>
      {/* Dynamic Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen py-8 sm:py-12 bg-background/50">
        <Container className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main Content Column */}
          <div className="space-y-8 min-w-0 max-w-[760px] w-full justify-self-start">
            {/* Breadcrumb navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
              <span>/</span>
              <span className="text-foreground font-semibold truncate max-w-[180px] sm:max-w-xs" title={article.title}>
                {article.title}
              </span>
            </div>

            {/* Back Button */}
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to Learn
            </Link>

            {/* Redesigned Hero Header */}
            <ArticleHero
              title={article.title}
              description={article.description}
              category={article.category}
              updatedDate={article.updatedDate}
              readingTime={article.readingTime}
              tags={article.tags}
              coverImage={article.coverImage}
              author={article.author}
            />

            {/* Desktop & Mobile Top Ads */}
            <DesktopTopAd />
            <MobileTopAd />

            {/* Quick Answer section */}
            {article.quickAnswer && <QuickAnswer answer={article.quickAnswer} />}

            {/* Premium Article Body Renderer */}
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <ArticleRenderer content={article.content} />
            </article>

            {/* FAQ section */}
            {article.faq && article.faq.length > 0 && <FAQ items={article.faq} />}

            {/* Mobile Bottom Ad after FAQ */}
            <MobileBottomAd />

            {/* Desktop Bottom Ad before Next Steps */}
            <DesktopBottomAd />

            {/* Unified Next Steps (Tools and Guides recommendation block) */}
            <ContinueReading 
              currentSlug={article.slug} 
              category={article.category} 
              toolSlugs={article.relatedTools}
              articleSlugs={article.relatedArticles}
            />

            {/* Article Author, Share & Newsletter Footer section */}
            <ArticleFooter
              author={article.author}
              title={article.title}
              slug={article.slug}
            />
          </div>

          {/* Sidebar Area */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start hidden lg:block">
            {/* Table of Contents */}
            {toc.length > 0 && <TableOfContents items={toc} />}

            {/* Desktop Sticky Sidebar Ad placement */}
            <DesktopSidebarAd />
          </aside>
        </Container>
      </div>
    </>
  )
}

export function generateStaticParams() {
  const articles = getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
