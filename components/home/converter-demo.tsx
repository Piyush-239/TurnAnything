import { ArrowRight, FileText, PlayCircle, WandSparkles } from "lucide-react"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"

const sampleSteps = [
  { title: "Upload", description: "Drop in a PDF, image, or video link." },
  { title: "Select output", description: "Choose notes, quiz, flashcards, or summary." },
  { title: "Get results", description: "Review the transformed output in seconds." },
]

export default function ConverterDemo() {
  return (
    <Section id="demo" className="border-b border-border/60 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <SectionTitle
          eyebrow="Converter demo"
          title="See the transformation flow before launch."
          description="The homepage showcases the future product experience without pretending there is backend logic behind it."
        />

        <div className="border border-border/60 bg-card overflow-hidden">
          {/* Card header */}
          <div className="border-b border-border/60 px-6 py-5 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center border border-border/70 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground rounded-sm">
                Preview
              </span>
              <span className="inline-flex items-center border border-border/70 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground rounded-sm">
                No backend yet
              </span>
            </div>
            <h3 className="text-lg font-bold tracking-tight">PDF → Notes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A high-signal demo card that mirrors the MVP direction from the product brief.
            </p>
          </div>

          <div className="grid gap-5 p-6">
            {/* Step indicators */}
            <div className="grid gap-3 sm:grid-cols-3">
              {sampleSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="border border-border/60 bg-secondary/30 p-4 space-y-2"
                >
                  <div className="inline-flex size-7 items-center justify-center border border-border/70 bg-foreground text-xs font-bold text-background">
                    {index + 1}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Input → Output flow */}
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="space-y-3 border border-dashed border-border/70 bg-secondary/20 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <FileText className="size-4 text-[#E8400C]" aria-hidden="true" />
                  Source content
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground/90">Annual research brief.pdf</p>
                  <p className="text-xs">Uploaded from a phone or laptop.</p>
                </div>
              </div>

              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                <ArrowRight className="size-4" aria-hidden="true" />
              </div>

              <div className="space-y-3 bg-foreground p-4 text-background">
                <div className="flex items-center gap-2 text-sm font-medium text-background/70">
                  <WandSparkles className="size-4" aria-hidden="true" />
                  Output preview
                </div>
                <div className="space-y-2 border border-white/10 p-3">
                  <p className="text-sm font-semibold">Key takeaways</p>
                  <ul className="space-y-1.5 text-sm text-background/75">
                    <li>• Summarize the core thesis in clear sections.</li>
                    <li>• Extract action items and highlighted references.</li>
                    <li>• Keep the result readable on mobile.</li>
                  </ul>
                </div>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See the workflow
                  <PlayCircle className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
