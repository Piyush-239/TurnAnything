import Link from "next/link"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"
import type { Article } from "@/lib/learn/articles"

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-border/60 bg-card transition-colors hover:border-foreground/20">
      <Link href={`/learn/${article.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>

      {/* Cover image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <img
          src={article.coverImage}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center border border-border/60 bg-card px-2.5 py-0.5 text-[10px] font-semibold text-foreground shadow-sm">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3" />
            {article.updatedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3" />
            {article.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm leading-snug line-clamp-2 text-foreground group-hover:text-[#E8400C] transition-colors duration-150">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 flex-1 leading-relaxed">
          {article.description}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/50 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center bg-foreground text-background text-[9px] font-bold uppercase">
              {article.author.slice(0, 2)}
            </div>
            <span className="text-[11px] font-semibold text-foreground/70">{article.author}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground group-hover:text-[#E8400C] transition-colors">
            Read
            <ArrowRight className="size-3 transition-transform duration-150 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </article>
  )
}
