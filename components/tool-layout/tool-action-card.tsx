import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ToolActionCardProps = {
  title?: string
  description: string
  buttonText: string
  loadingText?: string
  loading?: boolean
  disabled?: boolean
  error?: string | null
  onAction: () => void
  icon?: React.ReactNode
  className?: string
}

export function ToolActionCard({
  title = "Ready to convert",
  description,
  buttonText,
  loadingText = "Converting...",
  loading = false,
  disabled = false,
  error,
  onAction,
  icon,
  className,
}: ToolActionCardProps) {
  return (
    <div className={cn("flex flex-col gap-4 border border-border/60 bg-card p-6 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="space-y-1.5">
        <p className="text-base font-bold text-foreground">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        {error ? (
          <p className="text-sm font-medium text-[#E8400C] mt-1.5 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#E8400C] shrink-0" />
            {error}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        className={cn(
          "inline-flex w-full sm:w-auto h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-opacity duration-150 select-none",
          "bg-foreground text-background hover:opacity-80",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
        disabled={disabled || loading}
        onClick={onAction}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {buttonText}
          </>
        )}
      </button>
    </div>
  )
}
