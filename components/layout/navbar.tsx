import Logo from "./logo"
import MobileMenu from "./mobile-menu"

import Container from "@/components/shared/container"

const links = [
	{ href: "/#demo", label: "Tools" },
	{ href: "/#how-it-works", label: "How it works" },
	{ href: "/learn", label: "Learn" },
]

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm select-none">
			<Container>
				<div className="flex h-14 items-center justify-between gap-6">
					<Logo />

					<nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
							>
								{link.label}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<a
							href="#demo"
							className="hidden h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-opacity duration-150 hover:opacity-80 md:inline-flex"
						>
							Find a tool
							<span aria-hidden="true">→</span>
						</a>
						<MobileMenu />
					</div>
				</div>
			</Container>
		</header>
	)
}
