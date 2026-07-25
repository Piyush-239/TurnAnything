import * as React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    <div className={cn("flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {error ? <p className="text-sm text-destructive mt-1">{error}</p> : null}
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full sm:w-auto"
        disabled={disabled || loading}
        onClick={onAction}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {buttonText}
          </>
        )}
      </Button>
    </div>
  )
}
