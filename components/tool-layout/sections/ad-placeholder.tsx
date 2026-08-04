import * as React from "react"
import { cn } from "@/lib/utils"

interface AdPlaceholderProps {
  placement: "banner" | "sidebar" | "rectangle"
  className?: string
}

export function AdPlaceholder({ placement, className }: AdPlaceholderProps) {
  return (
    <div
      className={cn(
        "mx-auto flex items-center justify-center rounded-xl bg-muted/20 border border-dashed border-border/40 select-none text-[9px] font-semibold tracking-widest text-muted-foreground/30 uppercase my-8 transition-colors hover:border-border/60",
        placement === "banner" && "w-full max-w-4xl h-[90px] sm:h-[100px]",
        placement === "sidebar" && "w-full max-w-[300px] h-[250px] sm:h-[600px]",
        placement === "rectangle" && "w-full max-w-[336px] h-[280px]",
        className
      )}
    >
      Reserved Ad Space
    </div>
  )
}
