import { ArrowRightLeft, Sparkles, Upload } from "lucide-react"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"

const steps = [
  {
    number: "01",
    total: "03",
    title: "Say what you have",
    description:
      "A PDF, a video link, an image, a screenshot of your professor's handwriting. Doesn't matter.",
    icon: Upload,
  },
  {
    number: "02",
    total: "03",
    title: "Say what you want",
    description:
      "Notes, a quiz, flashcards, audio, a summary. Type it in plain English. We match the tool.",
    icon: ArrowRightLeft,
  },
  {
    number: "03",
    total: "03",
    title: "Get it. Instantly.",
    description:
      'No queue, no export screen, no "upgrade to download." Just the result you asked for.',
    icon: Sparkles,
  },
]

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-b border-border/60 py-16 sm:py-20">
      {/* Section header — two column editorial layout */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 mb-14">
        <SectionTitle
          eyebrow="No manual required"
          title="This isn't rocket science. It's three steps."
          description=""
        />
        <p className="self-end text-sm text-muted-foreground leading-relaxed max-w-sm lg:max-w-none">
          Most tools make you learn their system. This{" "}
          <span className="text-[#E8400C]">one</span> adapts to what you already have.
        </p>
      </div>

      {/* Steps — border-divided columns */}
      <div className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-4 px-0 py-6 sm:px-8 sm:py-0 first:pl-0 last:pr-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40">
              {step.number} / {step.total}
            </p>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
