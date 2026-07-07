import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SectionTitleProps = {
	eyebrow?: string
	title: string
	description: string
	align?: "left" | "center"
	className?: string
	children?: ReactNode
}

export default function SectionTitle({
	eyebrow,
	title,
	description,
	align = "left",
	className,
	children,
}: SectionTitleProps) {
	return (
		<div
			className={cn(
				"mx-auto flex max-w-3xl flex-col gap-4",
				align === "center" && "items-center text-center",
				className
			)}
		>
			{eyebrow ? (
				<Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-medium">
					{eyebrow}
				</Badge>
			) : null}
			<div className="space-y-3">
				<h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
					{title}
				</h2>
				<p className="text-base leading-7 text-muted-foreground sm:text-lg">
					{description}
				</p>
			</div>
			{children}
		</div>
	)
}
