import { Check, Lock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className={cn("rounded-2xl border-border/70", className)}>
      <CardHeader className="border-b border-border/60 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Lock className="size-4 text-primary" aria-hidden="true" />
          Processed locally
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <ul className="space-y-2.5">
          {privacyHighlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
