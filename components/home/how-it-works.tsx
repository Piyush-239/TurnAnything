import { ArrowRightLeft, CheckCircle2, Sparkles, Upload } from "lucide-react"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Upload or paste",
    description: "Start with a PDF, YouTube link, image, or a file you already have.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Choose the transformation",
    description: "Select the output format that matches the task, like notes, a quiz, or audio.",
    icon: ArrowRightLeft,
  },
  {
    number: "03",
    title: "Review the result",
    description: "Get a polished, readable output that is easy to scan and act on.",
    icon: Sparkles,
  },
]

const promises = ["No clutter", "Accessible layout", "Ready for the MVP roadmap"]

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionTitle
        eyebrow="How it works"
        title="Three simple steps keep the experience focused."
        description="The goal is not to add more software layers. It is to make the transformation from input to outcome obvious at a glance."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon

          return (
            <Card key={step.number} className="rounded-2xl border-border/70 bg-background/95 shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <Badge variant="outline" className="rounded-full px-3 py-1 font-semibold tracking-wide">
                    {step.number}
                  </Badge>
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-sm leading-6">{step.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Clear, repeatable, low-friction
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {promises.map((promise) => (
          <Badge key={promise} variant="secondary" className="rounded-full px-3 py-1">
            {promise}
          </Badge>
        ))}
      </div>
    </Section>
  )
}
