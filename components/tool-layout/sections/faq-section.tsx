"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { ToolDefinition } from "@/lib/tools/registry"
import { cn } from "@/lib/utils"

interface FAQSectionProps {
  tool: ToolDefinition
  faqs?: { q: string; a: string }[]
}

export function FAQSection({ tool, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const items = faqs || [
    {
      q: `Is the ${tool.title} tool completely free?`,
      a: "Yes. All conversion utilities on TurnAnything are 100% free with no monthly subscription fees, paywalls, or feature limits.",
    },
    {
      q: "Are my files uploaded or stored on your servers?",
      a: `No. Unlike other online document converters, your files never leave your device. The entire processing library of ${tool.title} executes completely on the client side inside your browser memory cache, ensuring complete confidentiality.`,
    },
    {
      q: "Is there a maximum file size limit?",
      a: "Since the conversion runs locally inside your browser's sandboxed environment, the file size limit is bounded by your computer's RAM. It handles standard document files up to 500MB easily.",
    },
    {
      q: "Can I run this tool while offline?",
      a: "Yes. Once the page is loaded, the underlying WebAssembly/JS logic remains cached in your browser. You can disconnect from the internet and continue using the tool to process files.",
    },
    {
      q: "Which browsers are supported?",
      a: "TurnAnything supports all modern standard browsers including Chrome, Safari, Firefox, and Edge. It works on both mobile devices and desktop computers.",
    },
  ]

  return (
    <section className="w-full py-8 border-t border-border/40">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-[1.2]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Quick answers to common questions about TurnAnything&apos;s processing and privacy.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-sm sm:text-base text-foreground transition-colors hover:text-[#E8400C]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground/70 transition-transform duration-200",
                    isOpen && "rotate-180 text-[#E8400C]"
                  )}
                />
              </button>
              
              <div
                className={cn(
                  "grid transition-all duration-200 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-4 text-sm text-muted-foreground/90 leading-relaxed border-t border-border/40 pt-3">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
