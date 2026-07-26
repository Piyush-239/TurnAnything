import { Eye, Gauge, LaptopMinimal, Search, ShieldCheck, Sparkles } from "lucide-react"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"

const features = [
  {
    title: "One upload, many outcomes",
    description: "Turn the same source file into notes, quizzes, flashcards, summaries, and more.",
    icon: Sparkles,
  },
  {
    title: "Mobile-first by default",
    description: "The layout stays clean and usable on small screens without hiding core actions.",
    icon: LaptopMinimal,
  },
  {
    title: "Fast, focused results",
    description: "Built around short conversion paths so users get value with minimal friction.",
    icon: Gauge,
  },
  {
    title: "Privacy-conscious positioning",
    description: "The product story keeps trust visible with a simple, transparent experience.",
    icon: ShieldCheck,
  },
  {
    title: "SEO-first homepage structure",
    description: "Clear semantic sections support discoverability as the catalog grows.",
    icon: Search,
  },
  {
    title: "Readable output cards",
    description: "Results are presented with restrained spacing, strong hierarchy, and soft elevation.",
    icon: Eye,
  },
]

export default function Features() {
  return (
    <Section id="features" className="border-b border-border/60 py-16 sm:py-20">
      <SectionTitle
        eyebrow="Features"
        title="Every part of the homepage reinforces clarity."
        description="The layout and component choices reflect the product principles: beautiful UI, mobile-first flow, privacy-first messaging, and SEO-ready structure."
        className="mb-12"
      />

      <div className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="flex flex-col gap-4 border-b border-border/60 py-7 sm:border-r sm:border-b-0 sm:px-8 sm:py-0 sm:first:pl-0 lg:[&:nth-child(3n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r"
            >
              <div className="flex size-9 items-center justify-center rounded-sm border border-border/70 bg-secondary/60 text-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
