import type { ReactNode } from "react"

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
				"flex max-w-3xl flex-col gap-3",
				align === "center" && "mx-auto items-center text-center",
				className
			)}
		>
			{eyebrow ? (
				<p className="eyebrow">{eyebrow}</p>
			) : null}
			<div className="space-y-3">
				<h2 className="text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl leading-[1.1]">
					{title}
				</h2>
				<p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
					{description}
				</p>
			</div>
			{children}
		</div>
	)
}
