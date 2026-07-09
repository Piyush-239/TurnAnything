import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://turnanything.xyz/sitemap.xml",
    host: "https://turnanything.xyz",
  }
}