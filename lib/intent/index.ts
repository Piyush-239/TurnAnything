import { matchIntent } from "./matcher"
import { intentRegistry } from "./registry"
import type { IntentEngine, IntentMatch } from "./types"

const intentEngine: IntentEngine = {
	resolve(text: string): IntentMatch | null {
		return matchIntent(text, intentRegistry)
	},
}

export function resolveIntent(text: string): IntentMatch | null {
	return intentEngine.resolve(text)
}
