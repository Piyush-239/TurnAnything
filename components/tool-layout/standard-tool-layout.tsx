"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { getToolBySlug, type ToolCategory } from "@/lib/tools/registry"
import {
  ToolHero,
  ToolWorkspace,
  TrustSection,
  BenefitsGrid,
  WorkflowSection,
  HowItWorksSection,
  UseCasesSection,
  FAQSection,
  RelatedToolsSection,
  RelatedGuidesSection,
  CTASection,
  WhoIsThisFor,
} from "./index"

import type { BenefitItem } from "./sections/benefits-grid"
import type { TimelineStep } from "./sections/how-it-works-section"
import type { WorkflowChainNode } from "./sections/workflow-section"
import type { AudienceItem } from "./sections/who-is-this-for"
import type { UseCaseItem } from "./sections/use-cases-section"
import type { TrustItem } from "./sections/trust-section"

type StandardToolLayoutProps = {
  title: string
  description: string
  category: string
  children: React.ReactNode
  className?: string
  
  // Custom configurations for the flagship page or future custom tools
  heroTitle?: string
  heroDescription?: string
  benefits?: BenefitItem[]
  timelineSteps?: TimelineStep[]
  useCases?: UseCaseItem[]
  faqs?: { q: string; a: string }[]
  toolWorkflow?: WorkflowChainNode[]
  audience?: AudienceItem[]
  trustItems?: TrustItem[]
}

export function StandardToolLayout({
  title,
  description,
  category,
  children,
  className,
  heroTitle,
  heroDescription,
  benefits,
  timelineSteps,
  useCases,
  faqs,
  toolWorkflow,
  audience,
  trustItems,
}: StandardToolLayoutProps) {
  const params = useParams()
  const slug = params?.slug as string

  // Look up current tool metadata from registry, or fallback gracefully
  const tool = React.useMemo(() => {
    return getToolBySlug(slug) || {
      slug: slug || "utility-tool",
      title: title,
      description: description,
      category: category as ToolCategory,
      enabled: true,
      icon: () => null,
      component: () => null,
      seoTitle: title,
      seoDescription: description,
      keywords: [title.toLowerCase()],
    }
  }, [slug, title, description, category])

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Centered content bounds with generous margins on both sides for wide viewports */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <main className={cn("w-full flex flex-col gap-16 md:gap-24 select-none", className)}>
          {/* 1. Hero Section */}
          <ToolHero tool={tool} heroTitle={heroTitle} heroDescription={heroDescription} />

          {/* 2. Interactive Tool Workspace (Above the Fold) */}
          <ToolWorkspace>{children}</ToolWorkspace>

          {/* 3. Trust Strip */}
          <TrustSection tool={tool} trustItems={trustItems} />

          {/* 4. Core Benefits Grid */}
          <BenefitsGrid tool={tool} benefits={benefits} />

          {/* 5. Who is this designed for? */}
          <WhoIsThisFor audience={audience} />

          {/* 6. How it Works (Visual timeline) */}
          <HowItWorksSection toolTitle={tool.title} timelineSteps={timelineSteps} />

          {/* 7. Common Use Cases */}
          <UseCasesSection tool={tool} cases={useCases} />

          {/* 8. Linked Workflow Chain */}
          <WorkflowSection toolWorkflow={toolWorkflow} />

          {/* 9. Frequently Asked Questions (Accordion) */}
          <FAQSection tool={tool} faqs={faqs} />

          {/* 10. Related Tools */}
          <RelatedToolsSection tool={tool} />

          {/* 11. Related Guides */}
          <RelatedGuidesSection tool={tool} />

          {/* 12. Final CTA (with Search Uploader) */}
          <CTASection />
        </main>
      </div>
    </div>
  )
}
