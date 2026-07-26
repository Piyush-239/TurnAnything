import * as React from "react"
import Link from "next/link"
import { Calendar, BookOpen } from "lucide-react"

interface ArticleHeroProps {
  title: string
  description: string
  category: string
  updatedDate: string
  readingTime: string
  tags?: string[]
  coverImage: string
  author: string
}

export default function ArticleHero({
  title,
  description,
  category,
  updatedDate,
  readingTime,
  tags = [],
  coverImage,
  author,
}: ArticleHeroProps) {
  return (
    <div className="space-y-8">
      {/* Category & tags */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/learn/category/${category.toLowerCase()}`}
          className="inline-flex items-center border border-[#E8400C]/25 bg-[#E8400C]/5 px-3.5 py-1 text-[11px] font-semibold text-[#E8400C] transition-colors hover:bg-[#E8400C]/8 rounded-sm"
        >
          {category}
        </Link>
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center border border-border/60 px-3 py-1 text-[10px] font-medium text-muted-foreground rounded-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Title & Description */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Author and Meta Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-border/60 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center bg-foreground text-background text-xs font-bold uppercase">
            {author.slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{author}</p>
            <p className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wide">Author</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="size-3.5 text-muted-foreground/40" />
            Updated {updatedDate}
          </span>
          <span className="flex items-center gap-2">
            <BookOpen className="size-3.5 text-muted-foreground/40" />
            {readingTime}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden border border-border/60 bg-secondary/30 group">
        <img
          src={coverImage}
          alt={title}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="eager"
        />
      </div>
    </div>
  )
}
