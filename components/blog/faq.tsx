"use client"

import * as React from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0) // open first by default

  if (!items || items.length === 0) return null

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 border-b pb-4 border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex size-9 items-center justify-center rounded-sm bg-secondary text-[#E8400C] border border-black/[0.06] shadow-sm dark:border-white/[0.08] dark:bg-card">
          <HelpCircle className="size-5" />
        </div>
        <h3 className="text-xl font-extrabold tracking-tight text-foreground">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx
          return (
            <div 
              key={idx} 
              className={cn(
                "rounded-sm border border-black/[0.06] transition-all duration-300 overflow-hidden bg-card shadow-premium dark:border-white/[0.08]",
                isOpen 
                  ? "border-[#E8400C]/40 shadow-glow" 
                  : "border-black/[0.04] hover:bg-secondary/45 hover:border-black/[0.08] dark:border-white/[0.04] dark:hover:border-white/[0.08]"
              )}
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between px-6 py-4.5 text-left font-extrabold text-sm sm:text-base text-foreground cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="pr-4 tracking-tight leading-tight">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180 text-primary"
                  )}
                />
              </button>
              
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 pt-1.5 text-sm leading-relaxed text-muted-foreground font-normal">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
