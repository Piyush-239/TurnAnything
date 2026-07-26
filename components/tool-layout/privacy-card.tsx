import { Check, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const privacyHighlights = [
  "Files never leave your device",
  "No account required",
  "Free to use",
  "Privacy-first processing",
]

type PrivacyCardProps = {
  className?: string
}

export function PrivacyCard({ className }: PrivacyCardProps) {
  return (
    <div className={cn("border border-border/60 bg-secondary/30 p-6", className)}>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex size-8 items-center justify-center border border-border/70 bg-card text-muted-foreground">
          <Lock className="size-4" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Processed locally</p>
          <p className="text-xs text-muted-foreground">Your data never leaves your browser.</p>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {privacyHighlights.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/75">
            <Check className="size-3.5 shrink-0 text-[#E8400C]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
