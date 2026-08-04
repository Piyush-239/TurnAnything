import * as React from "react"
import { Upload, Sliders, Eye, Download } from "lucide-react"

export interface TimelineStep {
  icon: React.ElementType
  title: string
  description: string
}

interface HowItWorksSectionProps {
  toolTitle?: string
  timelineSteps?: TimelineStep[]
}

export function HowItWorksSection({ toolTitle = "Image Compressor", timelineSteps }: HowItWorksSectionProps) {
  const steps = timelineSteps || [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Select or drag your image file directly into the local browser uploader workspace.",
    },
    {
      icon: Sliders,
      title: "Choose Compression Settings",
      description: "Fine-tune the output quality slider and select the target output file format.",
    },
    {
      icon: Eye,
      title: "Preview & Compare Results",
      description: "Inspect the final file dimensions, byte reduction, and image preview side-by-side.",
    },
    {
      icon: Download,
      title: "Download Compressed File",
      description: "Save your fully optimized, privacy-safe media file instantly to your device.",
    },
  ]

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-[1.2]">
          How does the {toolTitle} work?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A visual walkthrough of the local sandboxed processing pipeline.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
        {steps.map((step, index) => {
          const Icon = step.icon
          const stepNum = index + 1

          return (
            <div key={step.title} className="relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-premium group">
              {/* Badge Step number */}
              <div className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-muted-foreground border border-border/60">
                {stepNum}
              </div>

              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-[#E8400C]">
                <Icon className="size-5" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
