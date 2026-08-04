import * as React from "react"
import { Lock, FileWarning, KeyRound, WifiOff } from "lucide-react"
import { ToolDefinition } from "@/lib/tools/registry"

export interface TrustItem {
  icon: React.ElementType
  title: string
  description: string
}

interface TrustSectionProps {
  tool: ToolDefinition
  trustItems?: TrustItem[]
}

export function TrustSection({ tool, trustItems }: TrustSectionProps) {
  const items = trustItems || [
    {
      icon: Lock,
      title: "100% Client-Side Processing",
      description: `Your files are never sent to a backend server. The entire conversion logic of ${tool.title} runs locally in your browser.`,
    },
    {
      icon: WifiOff,
      title: "Works Offline",
      description: "Once loaded, you can disconnect your internet and continue using the tool. No data is shared with third parties.",
    },
    {
      icon: KeyRound,
      title: "No Signups / No Accounts",
      description: "We don't require emails, names, or registration. Start using it immediately with zero onboarding friction.",
    },
    {
      icon: FileWarning,
      title: "No File Logs Stored",
      description: "Since files remain inside your local browser memory space, there are no temporary file logs or server storage records.",
    },
  ]

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-[1.2]">
          Secured by Client-Side Sandbox Technology
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Standard websites upload your data to remote cloud storage. TurnAnything executes all file algorithms locally on your CPU/GPU, ensuring complete file security.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-premium hover:-translate-y-0.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/50 border border-border/50 text-[#E8400C]">
                <Icon className="size-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
