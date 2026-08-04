import * as React from "react"
import { Users } from "lucide-react"

export interface AudienceItem {
  icon: React.ElementType
  title: string
  description: string
}

interface WhoIsThisForProps {
  audience?: AudienceItem[]
}

export function WhoIsThisFor({ audience }: WhoIsThisForProps) {
  const items = audience || [
    {
      icon: Users,
      title: "Professionals",
      description: "Compress and format files under strict guidelines without third-party data collection.",
    },
  ]

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-[1.2]">
          Who is this designed for?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Optimized for individuals and teams seeking maximum privacy and speed.
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
