import { CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ProgressCardProps = {
  status: string
  progress: number
  className?: string
}

function clampProgress(progress: number): number {
  if (!Number.isFinite(progress)) return 0
  if (progress < 0) return 0
  if (progress > 100) return 100
  return Math.round(progress)
}

export function ProgressCard({ status, progress, className }: ProgressCardProps) {
  const safeProgress = clampProgress(progress)
  const trimmedStatus = status.trim()
  const isCompleted = safeProgress >= 100 || trimmedStatus.toLowerCase() === "completed"
  const hasStarted = safeProgress > 0

  return (
    <div className={cn("border border-border/60 bg-card p-6", className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {isCompleted ? (
              <CheckCircle2 className="size-4.5 text-[#E8400C] shrink-0" aria-hidden="true" />
            ) : (
              <Loader2
                className={cn("size-4.5 shrink-0", hasStarted ? "animate-spin text-foreground" : "text-muted-foreground/40")}
                aria-hidden="true"
              />
            )}
            <span className="text-sm font-semibold text-foreground/90">
              {trimmedStatus || "Waiting to start"}
            </span>
          </div>
          <span className={cn(
            "text-sm font-bold tabular-nums",
            isCompleted ? "text-[#E8400C]" : "text-muted-foreground"
          )}>
            {safeProgress}%
          </span>
        </div>

        {/* Progress track */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safeProgress}
          aria-label="Conversion progress"
          className="h-1.5 w-full overflow-hidden bg-secondary border border-border/50"
        >
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out",
              isCompleted ? "bg-[#E8400C]" : "bg-foreground"
            )}
            style={{ width: `${safeProgress}%` }}
          />
        </div>

        {isCompleted && (
          <p className="text-xs font-medium text-[#E8400C]">
            ✓ Conversion complete — ready to download
          </p>
        )}
      </div>
    </div>
  )
}
