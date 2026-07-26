"use client"

import * as React from "react"
import { Mail, Check, Share2, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ArticleFooterProps {
  author: string
  title: string
  slug: string
}

export default function ArticleFooter({ author, title, slug }: ArticleFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)
  const [shareUrl, setShareUrl] = React.useState("")

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShareUrl(window.location.href)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setSubscribed(true)
    setNewsletterEmail("")
    toast.success("Thank you for subscribing to our newsletter!")
    setTimeout(() => setSubscribed(false), 5000)
  }

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/learn/${slug}` : ""
    if (url) {
      navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="space-y-10 border-t border-black/[0.06] pt-10 dark:border-white/[0.08]">
      {/* 11. Author Card & Share Meta Panel */}
      <div className="rounded-[1.75rem] border border-black/[0.06] bg-secondary/35 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-premium dark:border-white/[0.08] dark:bg-secondary/20">
        {/* Simple & professional Author Card */}
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-card text-muted-foreground border border-black/[0.06] text-xs font-bold uppercase shadow-sm dark:border-white/[0.08]">
            {author.slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-extrabold text-foreground leading-none">Written by {author}</p>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/60 mt-1.5">Publisher & Utility Optimizer</p>
          </div>
        </div>

        {/* Action Share controls */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/60 mr-1.5 flex items-center gap-1.5">
            <Share2 className="size-3.5" /> Share Guide:
          </span>
          <button
            onClick={handleCopyLink}
            title="Copy link"
            className="flex size-9 items-center justify-center rounded-sm border border-black/[0.06] bg-card text-muted-foreground hover:text-[#E8400C] hover:bg-secondary transition-all cursor-pointer shadow-sm active:scale-95 dark:border-white/[0.08]"
          >
            <Link2 className="size-4" />
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
            className="flex size-9 items-center justify-center rounded-sm border border-black/[0.06] bg-card text-muted-foreground hover:text-[#E8400C] hover:bg-secondary transition-all cursor-pointer shadow-sm active:scale-95 dark:border-white/[0.08]"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            className="flex size-9 items-center justify-center rounded-sm border border-black/[0.06] bg-card text-muted-foreground hover:text-[#E8400C] hover:bg-secondary transition-all cursor-pointer shadow-sm active:scale-95 dark:border-white/[0.08]"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.85z" />
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
            className="flex size-9 items-center justify-center rounded-sm border border-black/[0.06] bg-card text-muted-foreground hover:text-[#E8400C] hover:bg-secondary transition-all cursor-pointer shadow-sm active:scale-95 dark:border-white/[0.08]"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Newsletter signup card */}
      <div className="relative overflow-hidden rounded-sm border border-black/[0.06] bg-card p-6 sm:p-8 shadow-glow grid gap-6 md:grid-cols-2 items-center dark:border-white/[0.08]">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-sm bg-[#E8400C]/10 text-[#E8400C] border border-[#E8400C]/15 shadow-sm">
              <Mail className="size-4.5" />
            </div>
            <h4 className="text-base font-extrabold text-foreground tracking-tight">Stay updated with TurnAnything</h4>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground/80 font-normal">
            Get the latest guides and tips on browser-side utility tools and local optimization workflows.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="flex gap-2 relative z-10">
          <input
            type="email"
            placeholder="Enter your email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            disabled={subscribed}
            required
            className="flex-1 h-11 px-4 rounded-sm border border-black/[0.06] bg-background text-sm outline-none focus-visible:border-[#E8400C] focus-visible:ring-2 focus-visible:ring-[#E8400C]/10 disabled:opacity-50 dark:border-white/[0.08]"
          />
          <Button type="submit" className="h-11 text-xs font-bold uppercase tracking-wider px-5 rounded-sm cursor-pointer bg-foreground text-background hover:opacity-80 transition-all duration-300" disabled={subscribed}>
            {subscribed ? (
              <>
                <Check className="mr-1.5 size-3.5 text-emerald-600 font-bold" />
                Done
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
