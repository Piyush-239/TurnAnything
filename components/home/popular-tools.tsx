import Link from "next/link"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getEnabledTools } from "@/lib/tools/registry"

function formatCategoryLabel(category: "utility" | "ai") {
	return category.toUpperCase()
}

export default function PopularTools() {
	// The homepage reads directly from the registry so adding a new enabled tool automatically updates discovery UI.
	// This keeps scaling predictable as the catalog grows from a handful of tools to hundreds.
	const tools = getEnabledTools()

	return (
		<Section id="tools">
			<SectionTitle
				eyebrow="Popular tools"
				title="Explore active tools from the platform registry."
				description="Tools shown here are discovered from the central registry, so releases and feature flags update this section automatically."
			/>

			<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{tools.map((tool) => {
					const Icon = tool.icon

					return (
						<Link
							key={tool.slug}
							href={`/tools/${tool.slug}`}
							className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
						>
							<Card className="h-full rounded-2xl border-border/70 bg-background/95 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-1 group-hover:ring-primary/20">
								<CardHeader className="space-y-4">
									<div className="flex items-center justify-between gap-3">
										<div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
											<Icon className="size-5" aria-hidden="true" />
										</div>
										<Badge variant={tool.category === "ai" ? "default" : "secondary"} className="rounded-full">
											{formatCategoryLabel(tool.category)}
										</Badge>
									</div>
									<CardTitle className="text-xl">{tool.title}</CardTitle>
									<CardDescription className="text-sm leading-6">{tool.description}</CardDescription>
								</CardHeader>
								<CardContent className="pb-6 text-sm font-medium text-primary">
									Open tool
								</CardContent>
							</Card>
						</Link>
					)
				})}
			</div>
		</Section>
	)
}
