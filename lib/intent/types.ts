export interface IntentDefinition {
	slug: string
	title: string
	examples: string[]
	keywords: string[]
}

export interface IntentMatch {
	slug: string
	title: string
	definition: IntentDefinition
	score: number
}

export interface IntentEngine {
	resolve(text: string): IntentMatch | null
}
