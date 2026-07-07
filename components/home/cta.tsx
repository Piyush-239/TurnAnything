import { ArrowRight, Sparkles } from "lucide-react"

import Section from "@/components/shared/section"
import { Button } from "@/components/ui/button"

export default function Cta() {
  return (
    <Section className="pb-20 sm:pb-24">
      <div className="rounded-2xl border border-border/70 bg-foreground px-6 py-10 text-background sm:px-8 sm:py-12 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-sm font-medium text-background/85">
              <Sparkles className="size-4" aria-hidden="true" />
              Ready for launch
            </div>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Build the easiest place on the internet to transform information.
            </h2>
            <p className="max-w-xl text-base leading-7 text-background/75 sm:text-lg">
              The foundation is in place: a premium homepage, clear product story, and a structure
              that can grow as TurnAnything adds more tools.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button
              render={<a href="#demo" />}
              nativeButton={false}
              variant="secondary"
              size="lg"
              className="h-11 rounded-full px-5"
            >
              Explore the demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              render={<a href="mailto:hello@turnanything.xyz" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-background/20 bg-transparent px-5 text-background hover:bg-background/10 hover:text-background"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
