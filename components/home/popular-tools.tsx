import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import SectionTitle from "@/components/shared/ssection-title"
import { getEnabledTools } from "@/lib/tools/registry"

function formatCategoryLabel(category: "utility" | "ai") {
	return category === "ai" ? "AI" : "Utility"
}

export default function PopularTools() {
	// The homepage reads directly from the registry so adding a new enabled tool automatically updates discovery UI.
	// This keeps scaling predictable as the catalog grows from a handful of tools to hundreds.
	const tools = getEnabledTools()

	return (
		<section id="tools" className="border-b border-border/60">
			{/* Section header */}
			<div className="mx-auto w-full max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
				<div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
					<SectionTitle
						eyebrow="Popular right now"
						title="Skip the search. Start here."
						description=""
					/>
					<p className="max-w-xs text-sm text-muted-foreground leading-relaxed lg:text-right">
						The tools people open first.{" "}
						<span className="text-[#E8400C]">Everything else</span> is one search away.
					</p>
				</div>
			</div>

			{/* Tool grid — divider lines between cards, no card backgrounds */}
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 border-t border-border/60 sm:grid-cols-2 lg:grid-cols-4">
					{tools.map((tool, i) => {
						const paddedIndex = String(i + 1).padStart(2, "0")

						return (
							<Link
								key={tool.slug}
								href={`/tools/${tool.slug}`}
								className="group relative flex flex-col gap-4 border-b border-r border-border/60 px-6 py-8 transition-colors duration-150 hover:bg-secondary/40 last:border-r-0 [&:nth-child(4n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
							>
								{/* Index + category + arrow */}
								<div className="flex items-center justify-between">
									<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
										{paddedIndex} — {formatCategoryLabel(tool.category)}
									</span>
									<ArrowUpRight className="size-4 text-muted-foreground/30 transition-all duration-150 group-hover:text-[#E8400C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
								</div>

								{/* Tool title */}
								<div>
									<h3 className="text-lg font-bold text-foreground leading-snug">
										{tool.title}
									</h3>
									<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
										{tool.description}
									</p>
								</div>
							</Link>
						)
					})}

					{/* "View all" card */}
					<Link
						href="/tools"
						className="group flex flex-col items-center justify-center gap-2 border-b border-border/60 bg-foreground px-6 py-8 text-center transition-opacity duration-150 hover:opacity-90"
					>
						<p className="text-base font-bold text-background">View all 500+ tools</p>
						<p className="text-sm text-background/60">Or just search for yours above.</p>
					</Link>
				</div>
			</div>
		</section>
	)
}
