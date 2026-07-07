import { Eye, Gauge, LaptopMinimal, Search, ShieldCheck, Sparkles } from "lucide-react"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Section id="features" className="bg-muted/20">
      <SectionTitle
        eyebrow="Features"
        title="Every part of the homepage reinforces clarity."
        description="The layout and component choices reflect the product principles: beautiful UI, mobile-first flow, privacy-first messaging, and SEO-ready structure."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <Card key={feature.title} className="rounded-2xl border-border/70 bg-background/95 shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-6">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6 text-sm text-muted-foreground">
                Designed to feel polished without adding unnecessary complexity.
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
