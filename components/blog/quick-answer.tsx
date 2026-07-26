import * as React from "react"
import { Sparkles } from "lucide-react"

interface QuickAnswerProps {
  answer: string
}

export default function QuickAnswer({ answer }: QuickAnswerProps) {
  if (!answer) return null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/0 to-background p-5 sm:p-6 shadow-sm">
      <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 blur-2xl rounded-full" />
      <div className="flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4.5" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-bold tracking-tight text-foreground uppercase">
            Quick Answer (AEO Summary)
          </h4>
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}
