import type { TransformationDefinition, TransformationDefinitionBase } from "./types"

// The registry is the single place where transformations are discovered by slug.
// This keeps registration and execution decoupled so the engine never needs to know what a transformation actually does.
export class TransformationRegistry {
  private readonly transformations = new Map<string, TransformationDefinitionBase>()

  register<TInput, TOutput, TOptions>(
    transformation: TransformationDefinition<TInput, TOutput, TOptions>,
  ): void {
    if (this.transformations.has(transformation.slug)) {
      throw new Error(`Transformation with slug "${transformation.slug}" is already registered.`)
    }

    this.transformations.set(transformation.slug, transformation)
  }

  get<TInput = unknown, TOutput = unknown, TOptions = unknown>(
    slug: string,
  ): TransformationDefinition<TInput, TOutput, TOptions> | undefined {
    return this.transformations.get(slug) as TransformationDefinition<TInput, TOutput, TOptions> | undefined
  }

  has(slug: string): boolean {
    return this.transformations.has(slug)
  }

  list(): TransformationDefinitionBase[] {
    return Array.from(this.transformations.values())
  }

  listEnabled(): TransformationDefinitionBase[] {
    return this.list().filter((transformation) => transformation.enabled)
  }

  listByCategory(category: TransformationDefinition["category"]): TransformationDefinitionBase[] {
    return this.list().filter((transformation) => transformation.category === category)
  }
}
