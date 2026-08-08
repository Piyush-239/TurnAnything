import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getToolBySlug, getEnabledTools } from "@/lib/tools/registry"
import { getToolContentBySlug } from "@/lib/tools/content"
import { StandardToolLayout } from "@/components/tool-layout"

type ToolPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const tools = getEnabledTools()
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool || !tool.enabled) {
    return {}
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `https://turnanything.xyz/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `https://turnanything.xyz/tools/${tool.slug}`,
      type: "website",
    },
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool || !tool.enabled) {
    notFound()
  }

  const ToolComponent = tool.component
  const content = getToolContentBySlug(slug)

  return (
    <StandardToolLayout
      title={tool.title}
      description={tool.description}
      category={tool.category}
      slug={slug}
      {...content}
    >
      <ToolComponent />
    </StandardToolLayout>
  )
}
