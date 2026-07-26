"use client"

import * as React from "react"
import { ChevronDown, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface TOCItem {
  text: string
  id: string
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")
  const [isOpen, setIsOpen] = React.useState<boolean>(false) // Collapsed on mobile by default

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => {
      items.forEach((item) => {
        const el = document.getElementById(item.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [items])

  if (items.length === 0) return null

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveId(id)
      setIsOpen(false) // Close mobile drawer on selection
    }
  }

  return (
    <div className="rounded-sm border border-black/[0.06] bg-card p-5 shadow-premium space-y-4 dark:border-white/[0.08]">
      {/* Mobile Header: Collapsible Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-extrabold text-[10px] uppercase tracking-widest text-muted-foreground sm:hidden cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <List className="size-4" />
          On This Page
        </span>
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Desktop Header */}
      <h4 className="hidden sm:flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 border-b pb-3 border-black/[0.06] dark:border-white/[0.08]">
        <List className="size-4" />
        On This Page
      </h4>

      {/* Navigation list */}
      <nav 
        aria-label="Table of Contents" 
        className={cn(
          "sm:block transition-all duration-300",
          isOpen ? "block animate-fade-in" : "hidden"
        )}
      >
        <ul className="space-y-2 text-sm font-semibold mt-2 sm:mt-0">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={cn(
                    "block py-1.5 border-l-2 pl-3.5 transition-all text-[10px] font-extrabold uppercase tracking-widest",
                    isActive
                      ? "border-[#E8400C] text-[#E8400C] bg-[#E8400C]/5 rounded-r-sm"
                      : "border-transparent text-muted-foreground/70 hover:text-foreground hover:border-black/[0.1] dark:hover:border-white/[0.1]"
                  )}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
