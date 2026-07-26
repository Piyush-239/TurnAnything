import { ArrowRight, CheckCircle2, ShieldCheck, Upload, Zap } from "lucide-react"

import Section from "@/components/shared/section"

const highlights = ["One upload", "One click", "Fast results"]

const stats = [
  { label: "Popular formats", value: "7+" },
  { label: "Mobile-first flow", value: "Built-in" },
  { label: "Privacy-first", value: "Yes" },
]

export default function Hero() {
  return (
    <Section className="border-b border-border/60 py-14 sm:py-16 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="space-y-7">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 border border-border/70 px-3 py-1 text-[11px] font-semibold text-[#E8400C] rounded-sm">
              <Zap className="size-3" aria-hidden="true" />
              AI content transformations, simplified
            </div>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl leading-[1.05]">
                Turn anything into the format you actually need.
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
                Upload a PDF, link a video, or drop in an image and get notes, flashcards, quizzes,
                summaries, audio, and more without switching tools.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-80"
            >
              Explore the demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#tools"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border/80 px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              View popular tools
            </a>
          </div>

          <ul className="flex flex-wrap gap-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 border border-border/70 px-3 py-1.5 text-xs font-medium text-muted-foreground rounded-sm"
              >
                <CheckCircle2 className="size-3.5 text-[#E8400C]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Preview card */}
        <div className="border border-border/60 bg-card overflow-hidden shadow-sm">
          <div className="border-b border-border/50 px-6 py-5 space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Upload className="size-3.5" aria-hidden="true" />
              Upload preview
            </div>
            <h2 className="text-lg font-bold">PDF to notes in one pass</h2>
            <p className="text-sm text-muted-foreground">
              A clean demo of the TurnAnything flow: choose a source, pick an output, and move on.
            </p>
          </div>

          <div className="grid gap-4 p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-border/60 bg-secondary/40 p-4">
                  <p className="text-xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 border border-border/60 bg-secondary/20 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div className="space-y-2 border border-border/60 bg-card p-3">
                <p className="text-xs font-semibold">Input</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Annual research brief.pdf</p>
                  <p>98 pages · uploaded from mobile</p>
                </div>
              </div>
              <div className="mx-auto flex size-9 items-center justify-center rounded-full bg-foreground text-background">
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </div>
              <div className="space-y-2 border border-border/60 bg-card p-3">
                <p className="text-xs font-semibold">Output</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Structured notes</p>
                  <p>Headings, bullets, takeaways</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 border border-border/60 bg-secondary/30 p-4">
                <ShieldCheck className="size-4 shrink-0 text-[#E8400C]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">Privacy-aware</p>
                  <p className="text-xs text-muted-foreground">Simple, transparent.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border border-border/60 bg-secondary/30 p-4">
                <Zap className="size-4 shrink-0 text-[#E8400C]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">Premium output</p>
                  <p className="text-xs text-muted-foreground">Sharp, readable results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
