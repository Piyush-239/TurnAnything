import { Search } from "lucide-react"

export default function Cta() {
  return (
    <section className="bg-foreground py-20 sm:py-24 lg:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-background/40">
          Stop switching between 10 tabs
        </p>

        {/* Headline */}
        <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-background sm:text-5xl lg:text-6xl">
          Turn anything into{" "}
          <em className="not-italic font-extrabold text-[#E8400C]" style={{ fontStyle: "italic" }}>
            anything
          </em>{" "}
          — right now.
        </h2>

        {/* Search bar on dark */}
        <div className="w-full max-w-lg">
          <div className="flex h-14 items-center gap-2 rounded-full border border-white/15 bg-card pl-5 pr-2 shadow-sm">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="flex-1 text-sm text-muted-foreground">
              What do you want to turn today?
            </span>
            <a
              href="#tools"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
            >
              Search
            </a>
          </div>
          <p className="mt-3 text-xs text-background/40">
            No credit card. No account. No catch.
          </p>
        </div>
      </div>
    </section>
  )
}
