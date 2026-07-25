import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getToolBySlug } from "@/lib/tools/registry"

type ToolPageProps = {
  params: Promise<{
    slug: string
  }>
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
  }
}

// Dynamic routing scales better than one page per tool because the page structure stays stable while the registry controls what tools exist.
// That lets us add, disable, or update tools centrally without duplicating route logic across the application.
export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool || !tool.enabled) {
    notFound()
  }

  const ToolComponent = tool.component

  return <ToolComponent />
}
