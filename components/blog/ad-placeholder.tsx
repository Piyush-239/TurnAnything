import * as React from "react"
import { Sparkles, Megaphone } from "lucide-react"

interface AdPlaceholderProps {
  label?: string
}

function BaseAdContainer({ label = "Sponsored Placement", children, className = "" }: AdPlaceholderProps & { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-dashed border-border/80 bg-muted/20 p-5 text-center transition-all hover:bg-muted/30 shadow-sm ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-30 pointer-events-none" />
      <span className="absolute top-2.5 right-3 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 flex items-center gap-1">
        <Megaphone className="size-2.5" />
        {label}
      </span>
      <div className="relative z-10 flex flex-col items-center justify-center pt-2">
        {children}
      </div>
    </div>
  )
}

// 1. Desktop Top Ad: Top after hero (Desktop only)
export function DesktopTopAd() {
  return (
    <BaseAdContainer className="hidden lg:flex min-h-[90px] w-full items-center justify-center my-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4.5" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-foreground">Sponsor TurnAnything</p>
          <p className="text-[11px] text-muted-foreground">Keep our server-less local conversion tools free & open source.</p>
        </div>
      </div>
    </BaseAdContainer>
  )
}

// 2. Desktop Middle Ad: Middle after section 3 (Desktop only)
export function DesktopMiddleAd() {
  return (
    <BaseAdContainer className="hidden lg:flex min-h-[90px] w-full items-center justify-center my-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4.5" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-foreground">Fast, Private & In-Browser</p>
          <p className="text-[11px] text-muted-foreground">We compile WebAssembly modules locally to secure your document transfers.</p>
        </div>
      </div>
    </BaseAdContainer>
  )
}

// 3. Desktop Sidebar Ad: Sticky sidebar slot
export function DesktopSidebarAd() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-border/80 bg-muted/20 p-6 text-center transition-all hover:bg-muted/30 shadow-sm flex flex-col items-center justify-center min-h-[280px]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-30 pointer-events-none" />
      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-1">
        <Megaphone className="size-2.5" /> Sponsored Placement
      </span>
      <div className="mt-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-105">
        <Sparkles className="size-5" />
      </div>
      <p className="mt-4 text-xs font-bold text-foreground">Support Local Web Utilities</p>
      <p className="mt-1.5 max-w-[200px] text-[11px] text-muted-foreground leading-normal">
        All tools execute 100% locally. Help us build more private converter endpoints.
      </p>
      <button className="mt-6 rounded-xl bg-foreground px-4 py-2 text-[10px] font-semibold text-background transition-all hover:opacity-90 active:scale-95 cursor-pointer">
        Advertise With Us
      </button>
    </div>
  )
}

// 4. Desktop Bottom Ad: Bottom before related articles (Desktop only)
export function DesktopBottomAd() {
  return (
    <BaseAdContainer className="hidden lg:flex min-h-[90px] w-full items-center justify-center my-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="size-4.5" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-foreground">Need PDF merging or split operations?</p>
          <p className="text-[11px] text-muted-foreground">Check out our PDF Merge and PDF Split widgets processing locally in RAM.</p>
        </div>
      </div>
    </BaseAdContainer>
  )
}

// 5. Mobile Top Ad: One after hero (Mobile only)
export function MobileTopAd() {
  return (
    <BaseAdContainer className="flex lg:hidden min-h-[80px] w-full items-center justify-center my-4">
      <div className="text-center space-y-1">
        <p className="text-xs font-bold text-foreground">Privacy First conversions</p>
        <p className="text-[10px] text-muted-foreground">Browser-side file processing, always secure.</p>
      </div>
    </BaseAdContainer>
  )
}

// 6. Mobile Bottom Ad: One after FAQ (Mobile only)
export function MobileBottomAd() {
  return (
    <BaseAdContainer className="flex lg:hidden min-h-[80px] w-full items-center justify-center my-4">
      <div className="text-center space-y-1">
        <p className="text-xs font-bold text-foreground">Support TurnAnything</p>
        <p className="text-[10px] text-muted-foreground">Keep tools running fast and completely locally.</p>
      </div>
    </BaseAdContainer>
  )
}

// Retain legacy exports to prevent compilation break during intermediate refactoring
export { DesktopSidebarAd as SidebarAd }
export { DesktopMiddleAd as InContentAd }
export { MobileTopAd as MobileInlineAd }
