import Link from "next/link"
import { ArrowRight, Mail, Sparkles } from "lucide-react"

import Container from "@/components/shared/container"
import Logo from "./logo"

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "#tools", label: "Popular tools" },
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "mailto:hello@turnanything.xyz", label: "Contact" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <Logo />
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              TurnAnything helps people transform content into useful outputs with fewer steps,
              less friction, and a cleaner mobile-first workflow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="mailto:hello@turnanything.xyz"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Mail className="size-4" aria-hidden="true" />
                hello@turnanything.xyz
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                Try the demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-sm font-semibold">{group.title}</p>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TurnAnything.xyz. All rights reserved.</p>
          <p>Designed for fast, clear transformations on every screen.</p>
        </div>
      </Container>
    </footer>
  )
}
