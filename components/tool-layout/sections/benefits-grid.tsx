import * as React from "react"
import { Zap, Shield, Sparkles, Smartphone } from "lucide-react"
import { ToolDefinition } from "@/lib/tools/registry"

export interface BenefitItem {
  icon: React.ElementType
  title: string
  description: string
}

interface BenefitsGridProps {
  tool: ToolDefinition
  benefits?: BenefitItem[]
}

export function BenefitsGrid({ tool, benefits }: BenefitsGridProps) {
  const items = benefits || [
    {
      icon: Zap,
      title: "Instant Conversions",
      description: "Skip the upload queues. File processing starts instantly because it uses your browser's compiler engine.",
    },
    {
      icon: Shield,
      title: "Bank-Grade Confidentiality",
      description: `Ideal for government docs, financial statements, and personal identity items. Processing is sandboxed inside ${tool.title}.`,
    },
    {
      icon: Sparkles,
      title: "Zero Quality Loss",
      description: "We compile native binary tools directly to WebAssembly to guarantee full quality reproduction for all exports.",
    },
    {
      icon: Smartphone,
      title: "Designed for Mobile",
      description: "Simple responsive layout, zero intrusive sliders, and fast loading weights perfect for phones and tablets.",
    },
  ]

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-[1.2]">
          Why Use our Local {tool.title} Tool?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Get desktop-grade file formatting speed with browser-based convenience. No software downloads required.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((benefit) => {
          const Icon = benefit.icon
          return (
            <div key={benefit.title} className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-premium">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-[#E8400C]">
                <Icon className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
