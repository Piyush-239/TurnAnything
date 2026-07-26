import type { Metadata } from "next"
import Container from "@/components/shared/container"
import { getArticles } from "@/lib/learn/articles"
import LearnHomeClient from "@/components/blog/learn-home-client"

export const metadata: Metadata = {
  title: "Learn – Browser Utility Tools & Local Productivity",
  description: "Master browser-side local image conversion, PDF editing, text extraction, and modern WebAssembly productivity with our free guides.",
}

export default function LearnPage() {
  const articles = getArticles()
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <Container>
        <LearnHomeClient articles={articles} />
      </Container>
    </div>
  )
}
