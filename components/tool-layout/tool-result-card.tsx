import * as React from "react"
import { cn } from "@/lib/utils"

type ToolResultCardProps = {
  title?: string
  successMessage?: string | null
  downloadArea?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function ToolResultCard({
  title = "Results",
  successMessage,
  downloadArea,
  children,
  className,
}: ToolResultCardProps) {
  if (!children && !downloadArea && !successMessage) {
    return null
  }

  return (
    <div className={cn("space-y-5 border border-border/60 bg-card p-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-base font-bold text-foreground">{title}</p>
          {successMessage && (
            <div className="flex items-center gap-2 mt-1.5">
              <span className="size-1.5 rounded-full bg-[#E8400C] shrink-0" />
              <p className="text-xs font-semibold text-[#E8400C]">{successMessage}</p>
            </div>
          )}
        </div>
        {downloadArea && (
          <div className="flex items-center gap-2.5">{downloadArea}</div>
        )}
      </div>
      {children && <div className="space-y-4">{children}</div>}
    </div>
  )
}
