"use client"

import Section from "@/components/shared/section"
import IntentSearch from "@/components/intent-search"
import PopularTools from "@/components/home/popular-tools"
import HowItWorks from "@/components/home/how-it-works"

const quickLinks = [
  "Video → summary",
  "Image → PDF",
  "YouTube → notes",
  "Audio → transcript",
]

export default function TurnAnythingHome() {
	return (
		<>
			{/* ── Hero ──────────────────────────────────────────────── */}
			<Section className="relative pt-16 pb-12 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16">
				<div className="mx-auto max-w-3xl">
					{/* Eyebrow */}
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground">
						<span className="size-1.5 rounded-full bg-[#E8400C]" aria-hidden="true" />
						500+ tools. one search bar. zero learning curve.
					</div>

					{/* Main headline */}
					<h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
						Turn anything
						<br />
						into{" "}
						<em className="not-italic font-extrabold text-[#E8400C]" style={{ fontStyle: "italic" }}>
							anything.
						</em>
					</h1>

					<p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">
						Stop hunting for{" "}
						<span className="text-foreground font-medium">&quot;the right converter.&quot;</span>{" "}
						Type what you have, type what you need, hit go. That&apos;s the whole product.
					</p>

					{/* Search */}
					<div className="mt-8">
						<IntentSearch placeholder="PDF to flashcards" />
					</div>

					{/* Quick links */}
					<div className="mt-4 flex flex-wrap gap-2">
						{quickLinks.map((link) => (
							<span
								key={link}
								className="inline-flex items-center rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
							>
								{link}
							</span>
						))}
					</div>
				</div>
			</Section>

			{/* ── Stats bar ─────────────────────────────────────────── */}
			<div className="border-y border-border/60 bg-secondary/40">
				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 divide-x divide-border/60 sm:grid-cols-4">
						{[
							{ value: "7+", label: "Tools live" },
							{ value: "$0", label: "To start" },
							{ value: "0", label: "Signups required" },
							{ value: "100%", label: "Runs in browser" },
						].map((stat) => (
							<div key={stat.label} className="flex flex-col items-center justify-center px-6 py-6 text-center">
								<span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{stat.value}</span>
								<span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{stat.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ── How it works ──────────────────────────────────────── */}
			<HowItWorks />

			{/* ── Tool grid ─────────────────────────────────────────── */}
			<PopularTools />
		</>
	)
}