import * as React from "react"
import { cn } from "@/lib/utils"
import { getToolBySlug, type ToolCategory } from "@/lib/tools/registry"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import {
  ToolHero,
  ToolWorkspace,
  TrustSection,
  BenefitsGrid,
  HowItWorksSection,
  UseCasesSection,
  WorkflowSection,
  FAQSection,
  RelatedToolsSection,
  RelatedGuidesSection,
  CTASection,
  WhoIsThisFor,
} from "./index"

import {
  Zap,
  Shield,
  Sparkles,
  Smartphone,
  Lock,
  FileWarning,
  KeyRound,
  WifiOff,
  Upload,
  Sliders,
  Eye,
  Download,
  HelpCircle,
  FileText,
  Globe,
  Key,
  Users,
  Minimize,
  Repeat,
  Search,
  Wand2,
  GraduationCap,
  Code,
  BookOpen,
  Camera,
  Mail,
} from "lucide-react"

const IconMap: Record<string, React.ComponentType<any>> = {
  zap: Zap,
  shield: Shield,
  sparkles: Sparkles,
  smartphone: Smartphone,
  lock: Lock,
  fileWarning: FileWarning,
  keyRound: KeyRound,
  wifiOff: WifiOff,
  upload: Upload,
  sliders: Sliders,
  eye: Eye,
  download: Download,
  helpCircle: HelpCircle,
  fileText: FileText,
  globe: Globe,
  key: Key,
  users: Users,
  minimize: Minimize,
  repeat: Repeat,
  search: Search,
  wand: Wand2,
  graduationCap: GraduationCap,
  code: Code,
  bookOpen: BookOpen,
  camera: Camera,
  mail: Mail,
}

function resolveIcons<T extends { icon: string }>(
  items?: T[]
): (Omit<T, "icon"> & { icon: React.ComponentType<any> })[] | undefined {
  if (!items) return undefined
  return items.map((item) => ({
    ...item,
    icon: IconMap[item.icon] || HelpCircle,
  }))
}

type StandardToolLayoutProps = {
  title: string
  description: string
  category: string
  slug: string
  children: React.ReactNode
  className?: string

  heroTitle?: string
  heroDescription?: string
  benefits?: { icon: string; title: string; description: string }[]
  timelineSteps?: { icon: string; title: string; description: string }[]
  useCases?: { icon: string; title: string; description: string }[]
  faqs?: { q: string; a: string }[]
  toolWorkflow?: { title: string; slug: string; description: string; icon: string; active?: boolean }[]
  audience?: { icon: string; title: string; description: string }[]
  trustItems?: { icon: string; title: string; description: string }[]
}

export function StandardToolLayout({
  title,
  description,
  category,
  slug,
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
  // Find tool definition or use fallback
  const tool = getToolBySlug(slug) || {
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

  // Resolve icons for sections
  const resolvedBenefits = resolveIcons(benefits)
  const resolvedTimeline = resolveIcons(timelineSteps)
  const resolvedUseCases = resolveIcons(useCases)
  const resolvedAudience = resolveIcons(audience)
  const resolvedTrust = resolveIcons(trustItems)

  const resolvedWorkflow = toolWorkflow
    ? toolWorkflow.map((node) => ({
        ...node,
        icon: IconMap[node.icon] || HelpCircle,
      }))
    : undefined

  // Generate structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": tool.title,
        "description": tool.description,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
      ...(faqs && faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  }

  const serializableTool = {
    slug: tool.slug,
    title: tool.title,
    description: tool.description,
    category: tool.category,
    enabled: tool.enabled,
    seoTitle: tool.seoTitle,
    seoDescription: tool.seoDescription,
    keywords: tool.keywords || [],
  } as any

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Dynamic SEO JSON-LD Injected */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="flex-grow">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <main className={cn("w-full flex flex-col gap-16 md:gap-24 select-none", className)}>
            {/* 1. Hero Section */}
            <ToolHero tool={serializableTool} heroTitle={heroTitle} heroDescription={heroDescription} />

            {/* 2. Interactive Tool Workspace (Above the Fold) */}
            <ToolWorkspace>{children}</ToolWorkspace>

            {/* 3. Trust Strip */}
            <TrustSection tool={serializableTool} trustItems={resolvedTrust} />

            {/* 4. Core Benefits Grid */}
            <BenefitsGrid tool={serializableTool} benefits={resolvedBenefits} />

            {/* 5. Who is this designed for? */}
            {resolvedAudience && <WhoIsThisFor audience={resolvedAudience} />}

            {/* 6. How it Works (Visual timeline) */}
            <HowItWorksSection toolTitle={tool.title} timelineSteps={resolvedTimeline} />

            {/* 7. Common Use Cases */}
            <UseCasesSection tool={serializableTool} cases={resolvedUseCases} />

            {/* 8. Linked Workflow Chain */}
            {resolvedWorkflow && <WorkflowSection toolWorkflow={resolvedWorkflow} />}

            {/* 9. Frequently Asked Questions (Accordion) */}
            <FAQSection tool={serializableTool} faqs={faqs} />

            {/* 10. Related Tools */}
            <RelatedToolsSection tool={serializableTool} />

            {/* 11. Related Guides */}
            <RelatedGuidesSection tool={serializableTool} />

            {/* 12. Final CTA (with Search Uploader) */}
            <CTASection />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
