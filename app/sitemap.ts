import type { MetadataRoute } from "next"

import { getEnabledTools } from "@/lib/tools/registry"

const baseUrl = "https://turnanything.xyz"

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date()

	return [
		{
			url: baseUrl,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
		},
		...getEnabledTools().map((tool) => ({
			url: `${baseUrl}/tools/${tool.slug}`,
			lastModified,
			changeFrequency: "weekly" as const,
			priority: 0.8,
		})),
	]
}
