import type { TransformationDefinition } from "./types"
import { mergePdfFiles } from "@/lib/utils/pdf-merge"

export type PdfMergeTransformationOptions = {
  fileName?: string
}

export type PdfMergeTransformationInput = File[]

export type PdfMergeTransformationOutput = Blob

export const pdfMergeTransformation: TransformationDefinition<
  PdfMergeTransformationInput,
  PdfMergeTransformationOutput,
  PdfMergeTransformationOptions
> = {
  slug: "pdf-merge",
  title: "PDF Merge",
  description: "Merge multiple PDF files locally in the browser.",
  category: "utility",
  enabled: true,
  input: "pdf",
  output: "pdf",
  run: async ({ input }) => {
    return mergePdfFiles({
      files: input,
      onProgress: () => undefined,
    })
  },
}