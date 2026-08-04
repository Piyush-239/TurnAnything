import { NextResponse } from "next/server"
import { getArticles } from "@/lib/learn/articles"

export async function GET() {
  try {
    const articles = getArticles()
    return NextResponse.json(articles)
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
