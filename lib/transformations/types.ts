// Shared transformation contracts live here so utility and AI flows can share the same execution surface.
// The engine only depends on these abstractions; concrete implementation details stay behind each transformation.

export type TransformationCategory = "utility" | "ai"

export type MaybePromise<T> = T | Promise<T>

export interface TransformationMetadata {
  title: string
  description?: string
  tags?: string[]
}

export interface TransformationContext<TInput = unknown, TOptions = unknown> {
  input: TInput
  options?: TOptions
}

export interface TransformationDefinitionBase extends TransformationMetadata {
  slug: string
  category: TransformationCategory
  enabled: boolean
  input: string
  output: string

  // The base contract is intentionally opaque so the registry can store heterogeneous transformations safely.
  run: (context: TransformationContext<never, never>) => MaybePromise<unknown>
}

export interface TransformationDefinition<
  TInput = unknown,
  TOutput = unknown,
  TOptions = unknown,
> extends TransformationDefinitionBase {

  // The implementation is intentionally opaque to the engine so new transformation types can be added without changing orchestration code.
  run: (context: TransformationContext<TInput, TOptions>) => MaybePromise<TOutput>
}

export interface TransformationResult<TOutput = unknown> {
  slug: string
  category: TransformationCategory
  input: string
  output: string
  result: TOutput
}
