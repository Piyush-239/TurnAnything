import Link from "next/link"
import { Workflow } from "lucide-react"

import { cn } from "@/lib/utils"

type LogoProps = {
	className?: string
}

export default function Logo({ className }: LogoProps) {
	return (
		<Link href="/" className={cn("inline-flex items-center gap-2.5", className)}>
			<span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background shadow-sm shadow-foreground/10">
				<Workflow className="size-4" aria-hidden="true" />
			</span>
			<span className="flex flex-col leading-none">
				<span className="text-sm font-semibold tracking-tight">TurnAnything</span>
				<span className="text-xs text-muted-foreground">TurnAnything.xyz</span>
			</span>
		</Link>
	)
}
