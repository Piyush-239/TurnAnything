import * as React from "react"
import IntentSearch from "@/components/intent-search"

export function CTASection() {
  return (
    <section className="w-full py-12 border-t border-border/40">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 shadow-premium text-center">
        {/* Background Dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl leading-[1.1]">
              Need to convert something else?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              TurnAnything has over 500+ converters. Type what you have and what you want, and let our search engine guide you.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <IntentSearch placeholder="e.g. JPG to PDF, Video to summary..." />
          </div>
        </div>
      </div>
    </section>
  )
}
