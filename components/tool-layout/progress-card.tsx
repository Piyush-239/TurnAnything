import { CheckCircle2, Loader2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ProgressCardProps = {
  status: string
  progress: number
  className?: string
}

function clampProgress(progress: number): number {
  if (!Number.isFinite(progress)) {
    return 0
  }

  if (progress < 0) {
    return 0
  }

  if (progress > 100) {
    return 100
  }

  return Math.round(progress)
}

export function ProgressCard({ status, progress, className }: ProgressCardProps) {
  const safeProgress = clampProgress(progress)
  const trimmedStatus = status.trim()
  const isCompleted = safeProgress >= 100 || trimmedStatus.toLowerCase() === "completed"
  const hasStarted = safeProgress > 0

  return (
    <Card className={cn("rounded-2xl border-border/70", className)}>
      <CardHeader className="border-b border-border/60 pb-3">
        <CardTitle className="text-base">Conversion progress</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="inline-flex items-center gap-2 text-muted-foreground">
            {isCompleted ? (
              <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
            ) : (
              <Loader2
                className={cn("size-4", hasStarted ? "animate-spin text-primary" : "text-muted-foreground")}
                aria-hidden="true"
              />
            )}
            <span>{trimmedStatus || "Waiting to start"}</span>
          </p>
          <p className="font-medium tabular-nums">{safeProgress}%</p>
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeProgress}
          aria-label="Conversion progress"
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-300",
              isCompleted ? "bg-emerald-600" : "bg-primary"
            )}
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
