import type { ReactNode } from "react"

import Container from "./container"
import { cn } from "@/lib/utils"

type SectionProps = {
	children: ReactNode
	className?: string
	id?: string
}

export default function Section({ children, className, id }: SectionProps) {
	return (
		<section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
			<Container>{children}</Container>
		</section>
	)
}
