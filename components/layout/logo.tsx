import Link from "next/link"

import { cn } from "@/lib/utils"

type LogoProps = {
	className?: string
}

export default function Logo({ className }: LogoProps) {
	return (
		<Link href="/" className={cn("inline-flex items-center gap-2.5 group", className)}>
			{/* Black square with "T" — matches reference design */}
			<span className="flex size-8 items-center justify-center rounded-sm bg-foreground text-background text-sm font-black tracking-tight select-none">
				T
			</span>
			<span className="text-sm font-bold tracking-tight text-foreground">
				TurnAnything
			</span>
		</Link>
	)
}
