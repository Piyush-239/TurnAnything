import * as React from "react"
import { cn } from "@/lib/utils"

type ToolUploadSectionProps = {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ToolUploadSection({
  title,
  description,
  children,
  className,
}: ToolUploadSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title || description ? (
        <div className="space-y-1">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  )
}
