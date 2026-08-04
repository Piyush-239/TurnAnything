import * as React from "react"
import { cn } from "@/lib/utils"

interface ToolWorkspaceProps {
  children: React.ReactNode
  className?: string
}

export function ToolWorkspace({ children, className }: ToolWorkspaceProps) {
  return (
    <section className={cn("w-full py-4", className)}>
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8 shadow-premium transition-all duration-200 hover:shadow-lifted relative">
        {children}
      </div>
    </section>
  )
}
