import { TransformationRegistry } from "./registry"
import type { TransformationContext, TransformationResult } from "./types"

// The engine is intentionally thin: it resolves a transformation by slug and delegates execution.
// That makes it reusable for simple utility pipelines and AI-backed flows without coupling it to either implementation.
export class TransformationEngine {
  constructor(private readonly registry: TransformationRegistry) {}

  async execute<TInput = unknown, TOutput = unknown, TOptions = unknown>(
    slug: string,
    context: TransformationContext<TInput, TOptions>,
  ): Promise<TransformationResult<TOutput>> {
    const transformation = this.registry.get<TInput, TOutput, TOptions>(slug)

    if (!transformation) {
      throw new Error(`Transformation with slug "${slug}" was not found.`)
    }

    if (!transformation.enabled) {
      throw new Error(`Transformation with slug "${slug}" is disabled.`)
    }

    const result = await transformation.run(context)

    return {
      slug: transformation.slug,
      category: transformation.category,
      input: transformation.input,
      output: transformation.output,
      result,
    }
  }
}
