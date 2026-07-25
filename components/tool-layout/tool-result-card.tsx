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
    <div className={cn("space-y-4 rounded-2xl border bg-card p-5 shadow-sm", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-sm">{title}</p>
          {successMessage && (
            <p className="text-sm text-emerald-600 mt-1">{successMessage}</p>
          )}
        </div>
        {downloadArea && <div className="flex items-center gap-2">{downloadArea}</div>}
      </div>
      {children && <div className="space-y-3">{children}</div>}
    </div>
  )
}
