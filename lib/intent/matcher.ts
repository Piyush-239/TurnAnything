import type { IntentDefinition, IntentMatch } from "./types"

function normalizeIntentText(value: string) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim()
}

function scoreTerms(input: string, terms: string[]) {
	let score = 0

	for (const term of terms) {
		const normalizedTerm = normalizeIntentText(term)

		if (!normalizedTerm) {
			continue
		}

		if (input === normalizedTerm) {
			score += 100 + normalizedTerm.length
			continue
		}

		if (input.includes(normalizedTerm)) {
			score += 40 + normalizedTerm.length
			continue
		}

		const termTokens = normalizedTerm.split(" ")
		const inputTokens = input.split(" ")
		const matchesEveryToken = termTokens.every((token) => inputTokens.includes(token))

		if (matchesEveryToken) {
			score += 10 + normalizedTerm.length
		}
	}

	return score
}

function buildSearchTerms(definition: IntentDefinition) {
	return [...definition.examples, ...definition.keywords]
}

export function matchIntent(text: string, definitions: IntentDefinition[]): IntentMatch | null {
	const normalizedInput = normalizeIntentText(text)

	if (!normalizedInput) {
		return null
	}

	let bestMatch: IntentMatch | null = null
	let bestScore = 0

	for (const definition of definitions) {
		const score = scoreTerms(normalizedInput, buildSearchTerms(definition))

		if (score > bestScore) {
			bestScore = score
			bestMatch = {
				slug: definition.slug,
				title: definition.title,
				definition,
				score,
			}
		}
	}

	return bestMatch && bestScore > 0 ? bestMatch : null
}
