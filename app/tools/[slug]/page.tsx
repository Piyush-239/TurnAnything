import { notFound } from "next/navigation"

import { PrivacyCard, ToolHeader } from "@/components/tool-layout"
import { getToolBySlug } from "@/lib/tools/registry"

type ToolPageProps = {
  params: Promise<{
    slug: string
  }>
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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:gap-8 sm:px-6 lg:px-8">
      <section>
        <ToolHeader title={tool.title} description={tool.description} category={tool.category} />
      </section>

      <section className="grid gap-6">
        <ToolComponent />
        <PrivacyCard />
      </section>
    </main>
  )
}
