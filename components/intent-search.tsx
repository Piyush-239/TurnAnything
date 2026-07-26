"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles } from "lucide-react"

import { Input } from "@/components/ui/input"
import { resolveIntent } from "@/lib/intent"
import { cn } from "@/lib/utils"

type IntentSearchProps = {
	placeholder?: string
	className?: string
}

export default function IntentSearch({
	placeholder = "Turn my PDF into flashcards",
	className,
}: IntentSearchProps) {
	const router = useRouter()
	const [userInput, setUserInput] = useState("")
	const trimmedInput = userInput.trim()
	const isSubmitDisabled = trimmedInput.length === 0
	const intentMatch = resolveIntent(userInput)
	const helperMessage =
		trimmedInput.length === 0
			? null
			: intentMatch
				? `We'll use ${intentMatch.title}`
				: "We couldn't find an exact tool yet."

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (isSubmitDisabled) {
			return
		}

		const route = resolveIntent(userInput)

		if (route) {
			router.push(`/tools/${route.slug}`)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("w-full", className)}
		>
			{/* Search bar — matches reference: white pill with black Search button */}
			<div className="flex h-14 items-center gap-2 rounded-full border border-border bg-card pl-5 pr-2 shadow-sm focus-within:border-[#E8400C]/40 focus-within:shadow-[0_0_0_1px_rgba(232,64,12,0.15)] transition-all duration-150">
				<Search className="size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
				<Input
					aria-label="What do you want to turn today?"
					value={userInput}
					onChange={(event) => setUserInput(event.target.value)}
					placeholder={placeholder}
					className="h-auto flex-1 border-0 bg-transparent px-0 py-0 text-base font-medium shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 text-foreground"
				/>
				<button
					type="submit"
					disabled={isSubmitDisabled}
					className="h-10 shrink-0 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-40"
				>
					Search
				</button>
			</div>

			{/* Helper message */}
			{helperMessage ? (
				<p
					aria-live="polite"
					className="mt-3 inline-flex items-center gap-1.5 border border-border/70 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground animate-in fade-in slide-in-from-top-1 duration-200 rounded-sm"
				>
					{intentMatch ? (
						<Sparkles className="size-3.5 text-[#E8400C]" aria-hidden="true" />
					) : null}
					{intentMatch ? `✓ ${helperMessage}` : helperMessage}
				</p>
			) : null}
		</form>
	)
}
