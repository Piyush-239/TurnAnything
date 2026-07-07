import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Upload } from "lucide-react"

import Section from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const highlights = ["One upload", "One click", "Fast results"]

const stats = [
  { label: "Popular formats", value: "7+" },
  { label: "Mobile-first flow", value: "Built-in" },
  { label: "Privacy-first", value: "Yes" },
]

export default function Hero() {
  return (
    <Section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.08),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,0,0,0.06),transparent_32%),linear-gradient(to_bottom,transparent,transparent,rgba(0,0,0,0.02))] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="space-y-8">
          <div className="space-y-5">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              <Sparkles className="mr-1.5 size-3.5" aria-hidden="true" />
              AI content transformations, simplified
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Turn anything into the format you actually need.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Upload a PDF, link a video, or drop in an image and get notes, flashcards, quizzes,
                summaries, audio, and more without switching tools.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<a href="#demo" />}
              nativeButton={false}
              size="lg"
              className="h-11 rounded-full px-5"
            >
              Explore the demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              render={<a href="#tools" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-11 rounded-full px-5"
            >
              View popular tools
            </Button>
          </div>

          <ul className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2"
              >
                <CheckCircle2
                  className="size-4 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Card className="rounded-2xl border-border/70 bg-background/90 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.35)] backdrop-blur">
          <CardHeader className="space-y-3 border-b border-border/60 pb-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="size-4" aria-hidden="true" />
              Upload preview
            </div>
            <CardTitle className="text-2xl">PDF to notes in one pass</CardTitle>
            <CardDescription>
              A clean demo of the TurnAnything flow: choose a source, pick an output, and move on.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-2xl border border-border/70 bg-muted/30 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div className="space-y-3 rounded-2xl bg-background p-4 ring-1 ring-border/70">
                <p className="text-sm font-medium">Input</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Annual research brief.pdf</p>
                  <p>98 pages · uploaded from mobile</p>
                </div>
              </div>
              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                <ArrowRight className="size-4" aria-hidden="true" />
              </div>
              <div className="space-y-3 rounded-2xl bg-background p-4 ring-1 ring-border/70">
                <p className="text-sm font-medium">Output</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Structured notes</p>
                  <p>Headings, bullets, and takeaways</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 p-4">
                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <div>
                  <p className="font-medium">Privacy-aware workflow</p>
                  <p className="text-sm text-muted-foreground">Built for clear, simple transformations.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 p-4">
                <Sparkles className="size-5 text-foreground" aria-hidden="true" />
                <div>
                  <p className="font-medium">Premium output feel</p>
                  <p className="text-sm text-muted-foreground">Sharp cards, clean spacing, and readable results.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
