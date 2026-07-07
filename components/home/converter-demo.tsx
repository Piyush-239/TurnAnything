import { ArrowRight, FileText, PlayCircle, WandSparkles } from "lucide-react"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const sampleSteps = [
  { title: "Upload", description: "Drop in a PDF, image, or video link." },
  { title: "Select output", description: "Choose notes, quiz, flashcards, or summary." },
  { title: "Get results", description: "Review the transformed output in seconds." },
]

export default function ConverterDemo() {
  return (
    <Section id="demo" className="relative overflow-hidden bg-muted/20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-10">
        <SectionTitle
          eyebrow="Converter demo"
          title="See the transformation flow before launch."
          description="The homepage showcases the future product experience without pretending there is backend logic behind it."
        />

        <Card className="rounded-2xl border-border/70 bg-background/90 shadow-sm">
          <CardHeader className="space-y-3 border-b border-border/60 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                Preview
              </Badge>
              <Badge variant="outline" className="rounded-full">
                No backend yet
              </Badge>
            </div>
            <CardTitle className="text-2xl">PDF → Notes</CardTitle>
            <CardDescription>
              A high-signal demo card that mirrors the MVP direction from the product brief.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {sampleSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-border/70 p-4">
                  <div className="mb-3 inline-flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {index + 1}
                  </div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="space-y-4 rounded-2xl border border-dashed border-border/70 p-5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="size-4" aria-hidden="true" />
                  Source content
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Annual research brief.pdf</p>
                  <p>Uploaded from a phone or laptop.</p>
                  <p>TurnAnything keeps the flow simple: one input, one output, one result.</p>
                </div>
              </div>

              <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-foreground text-background">
                <ArrowRight className="size-4" aria-hidden="true" />
              </div>

              <div className="space-y-4 rounded-2xl bg-foreground p-5 text-background">
                <div className="flex items-center gap-2 text-sm font-medium text-background/80">
                  <WandSparkles className="size-4" aria-hidden="true" />
                  Output preview
                </div>
                <div className="space-y-3 rounded-2xl bg-background/10 p-4">
                  <p className="text-sm font-medium">Key takeaways</p>
                  <ul className="space-y-2 text-sm text-background/85">
                    <li>• Summarize the core thesis in clear sections.</li>
                    <li>• Extract action items and highlighted references.</li>
                    <li>• Keep the result readable on mobile.</li>
                  </ul>
                </div>
                <Button
                  render={<a href="#how-it-works" />}
                  nativeButton={false}
                  variant="secondary"
                  size="sm"
                  className="h-10 rounded-full px-4"
                >
                  See the workflow
                  <PlayCircle className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
