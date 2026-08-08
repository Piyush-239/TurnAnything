"use client"

import Link from "next/link"
import { ArrowRight, ChevronDown, Menu as MenuIcon } from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const links = [
	{ href: "/#demo", label: "Demo" },
	{ href: "/tools", label: "Tools" },
	{ href: "/#features", label: "Features" },
	{ href: "/#how-it-works", label: "How it works" },
	{ href: "/learn", label: "Learn" },
]

export default function MobileMenu() {
	return (
		<div className="md:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger
					className="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-card px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95 cursor-pointer shadow-sm dark:border-white/[0.08]"
					aria-label="Open navigation menu"
				>
					<MenuIcon className="size-3.5" aria-hidden="true" />
					Menu
					<ChevronDown className="size-3.5 text-muted-foreground/80" aria-hidden="true" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64 p-2">
					{links.map((link) => (
						<DropdownMenuItem
							key={link.href}
							render={<Link href={link.href} />}
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
