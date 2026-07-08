import { notFound } from "next/navigation"

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
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Tools / {tool.category}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{tool.title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{tool.description}</p>
      </section>

      <section className="grid gap-6">
        <ToolComponent />
      </section>
    </main>
  )
}
