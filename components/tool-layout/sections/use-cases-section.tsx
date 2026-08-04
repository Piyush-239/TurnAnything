import * as React from "react"
import { HelpCircle, FileText, Globe, Key } from "lucide-react"
import { ToolDefinition } from "@/lib/tools/registry"

export interface UseCaseItem {
  icon: React.ElementType
  title: string
  description: string
}

interface UseCasesSectionProps {
  tool: ToolDefinition
  cases?: UseCaseItem[]
}

export function UseCasesSection({ tool, cases }: UseCasesSectionProps) {
  const items = cases || [
    {
      icon: Key,
      title: "Confidential Business Documents",
      description: "Convert corporate PDF contracts, tax logs, spreadsheets, and private slide decks without exposing internal records to cloud scrapers.",
    },
    {
      icon: FileText,
      title: "Academic Submissions",
      description: "Quickly format assignments, scan student documents using browser OCR, or merge course documents right from your tablet before class.",
    },
    {
      icon: Globe,
      title: "Optimized Web Content Assets",
      description: "Compress or convert high-res images to modern formats like WEBP and PNG on the fly to boost page speed performance.",
    },
    {
      icon: HelpCircle,
      title: "Quick Offline File Edits",
      description: "Process files on flights, trains, or in locations with restricted internet connectivity since no cloud uploads are required.",
    },
  ]

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-[1.2]">
          Common Use Cases for {tool.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How students, creators, and business professionals leverage this utility.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-premium">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-[#E8400C]">
                <Icon className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
