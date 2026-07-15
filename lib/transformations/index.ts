import { TransformationRegistry } from "./registry"
import { imageConverterTransformation } from "./image-converter"
import { pdfMergeTransformation } from "./pdf-merge"

export const transformationRegistry = new TransformationRegistry()

transformationRegistry.register(imageConverterTransformation)
transformationRegistry.register(pdfMergeTransformation)

export { imageConverterTransformation }
export { pdfMergeTransformation }