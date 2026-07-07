"use client"

import { ArrowRight, ChevronDown, Menu as MenuIcon } from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const links = [
	{ href: "#demo", label: "Demo" },
	{ href: "#tools", label: "Popular tools" },
	{ href: "#features", label: "Features" },
	{ href: "#how-it-works", label: "How it works" },
]

export default function MobileMenu() {
	return (
		<div className="md:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger
					className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
					aria-label="Open navigation menu"
				>
					<MenuIcon className="size-4" aria-hidden="true" />
					Menu
					<ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64 p-2">
					{links.map((link) => (
						<DropdownMenuItem
							key={link.href}
							render={<a href={link.href} />}
							className="rounded-lg px-3 py-2 text-sm"
						>
							{link.label}
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator />
					<DropdownMenuItem
						render={<a href="#demo" />}
						className="rounded-lg px-3 py-2 text-sm font-medium"
					>
						<span className="inline-flex items-center gap-2">
							Start converting
							<ArrowRight className="size-4" aria-hidden="true" />
						</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
