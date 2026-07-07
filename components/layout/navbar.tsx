import Logo from "./logo"
import MobileMenu from "./mobile-menu"

import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"

const links = [
	{ href: "#demo", label: "Demo" },
	{ href: "#tools", label: "Tools" },
	{ href: "#features", label: "Features" },
	{ href: "#how-it-works", label: "How it works" },
]

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
			<Container className="flex h-16 items-center justify-between gap-4">
				<Logo />

				<nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
					<Button
						render={<a href="#demo" />}
						nativeButton={false}
						variant="outline"
						size="sm"
						className="hidden h-10 rounded-full px-4 md:inline-flex"
					>
						View demo
					</Button>
					<MobileMenu />
				</div>
			</Container>
		</header>
	)
}
