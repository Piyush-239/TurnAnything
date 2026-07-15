import type { TransformationDefinition } from "./types"
import {
  convertImageFile,
  type ConvertImageFileOptions,
  type ImageConversionResult,
  type ImageInputFormat,
  type ImageOutputFormat,
} from "@/lib/utils/image-converter"

export type ImageConverterTransformationOptions = {
  inputFormat?: ImageInputFormat | null
  outputFormat: ImageOutputFormat
}

export type ImageConverterTransformationInput = File

export type ImageConverterTransformationOutput = ImageConversionResult

export const imageConverterTransformation: TransformationDefinition<
  ImageConverterTransformationInput,
  ImageConverterTransformationOutput,
  ImageConverterTransformationOptions
> = {
  slug: "image-converter",
  title: "Image Converter",
  description: "Convert JPG, JPEG, PNG, WEBP, GIF, and BMP images in the browser.",
  category: "utility",
  enabled: true,
  input: "image",
  output: "image",
  run: async ({ input, options }) => {
    const { inputFormat, outputFormat } = options ?? { outputFormat: "jpg" as ImageOutputFormat }

    return convertImageFile({
      file: input,
      inputFormat: inputFormat ?? null,
      outputFormat,
    } satisfies ConvertImageFileOptions)
  },
}