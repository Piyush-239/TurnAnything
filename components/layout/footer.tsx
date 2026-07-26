import Link from "next/link"
import { Mail } from "lucide-react"

import Container from "@/components/shared/container"
import Logo from "./logo"

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/#tools", label: "Popular tools" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#demo", label: "Get started" },
      { href: "/learn", label: "Learn" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy" },
      { href: "/terms-and-conditions", label: "Terms" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground font-normal">
              One search bar that replaces the ten converter tabs you have open{" "}
              <span className="text-[#E8400C]">right now</span>.
            </p>
            <Link
              href="mailto:hello@turnanything.xyz"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              hello@turnanything.xyz
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">{group.title}</p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
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

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-8 text-xs text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TurnAnything.xyz. All rights reserved.</p>
          <p>Fast, secure, local conversions on every screen.</p>
        </div>
      </Container>
    </footer>
  )
}
