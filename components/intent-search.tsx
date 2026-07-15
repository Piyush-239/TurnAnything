"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
		<Card
			className={cn(
				"mt-10 w-full rounded-[2rem] border-border/70 bg-background/90 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)] backdrop-blur sm:mt-12",
				className
			)}
		>
			<CardContent className="space-y-5 p-4 sm:p-6 lg:p-8">
				<form onSubmit={handleSubmit} className="space-y-4 text-left">
					<div className="rounded-[1.5rem] border border-border/70 bg-muted/20 px-4 py-4 shadow-sm transition-colors focus-within:border-ring/70 focus-within:bg-background focus-within:ring-2 focus-within:ring-ring/15 sm:px-5 sm:py-5">
						<p className="mb-3 text-sm font-medium text-muted-foreground sm:text-base">
							What do you want to turn today?
						</p>
						<div className="flex items-center gap-3">
							<Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
							<Input
								aria-label="What do you want to turn today?"
								value={userInput}
								onChange={(event) => setUserInput(event.target.value)}
								placeholder={placeholder}
								className="h-auto border-0 bg-transparent px-0 py-0 text-base shadow-none placeholder:text-muted-foreground/55 focus-visible:ring-0 sm:text-lg"
							/>
						</div>
						{helperMessage ? (
							<p
								aria-live="polite"
								className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm text-muted-foreground shadow-sm animate-in fade-in slide-in-from-top-1 duration-200"
							>
								{intentMatch ? (
									<Sparkles className="size-3.5 text-foreground" aria-hidden="true" />
								) : null}
								{intentMatch ? `✓ ${helperMessage}` : helperMessage}
							</p>
						) : null}
					</div>

					<Button
						type="submit"
						disabled={isSubmitDisabled}
						size="lg"
						className="h-12 w-full rounded-full px-8 text-base font-semibold sm:h-14 sm:w-auto"
					>
						Turn It
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
