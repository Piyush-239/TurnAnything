"use client"

import Section from "@/components/shared/section"
import IntentSearch from "@/components/intent-search"
import PopularTools from "@/components/home/popular-tools"

export default function TurnAnythingHome() {
	return (
		<Section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.04),transparent_24%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.02))] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_22%)]" />
			<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
				<div className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm">
					TurnAnything.xyz
				</div>

				<div className="mt-6 space-y-4 sm:mt-8">
					<h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
						Turn Anything into Anything
					</h1>
					<p className="mx-auto max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
						One place to convert files,
						<br className="hidden sm:block" />
						transform content,
						<br className="hidden sm:block" />
						and automate repetitive work.
					</p>
				</div>

				<IntentSearch placeholder="Turn my PDF into flashcards" />

				<PopularTools />
			</div>
		</Section>
	)
}