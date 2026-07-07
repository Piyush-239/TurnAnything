import {
  Captions,
  Clapperboard,
  FileImage,
  FileQuestion,
  FileText,
  Headphones,
  MessageSquareQuote,
} from "lucide-react"

import Section from "@/components/shared/section"
import SectionTitle from "@/components/shared/ssection-title"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  { title: "PDF → Notes", description: "Turn long documents into structured study notes.", icon: FileText, badge: "MVP" },
  { title: "PDF → Flashcards", description: "Extract key ideas for quick review sessions.", icon: MessageSquareQuote, badge: "MVP" },
  { title: "PDF → Quiz", description: "Create practice questions from dense reading.", icon: FileQuestion, badge: "MVP" },
  { title: "YouTube → Summary", description: "Convert video content into fast takeaways.", icon: Clapperboard, badge: "MVP" },
  { title: "YouTube → Notes", description: "Capture the talking points and action items.", icon: Captions, badge: "MVP" },
  { title: "Image → PDF", description: "Bundle screenshots and scans into one clean file.", icon: FileImage, badge: "Utility" },
  { title: "MP4 → MP3", description: "Pull audio from video for easier listening.", icon: Headphones, badge: "Utility" },
]

export default function PopularTools() {
  return (
    <Section id="tools">
      <SectionTitle
        eyebrow="Popular tools"
        title="Start with a focused MVP, then expand the catalog."
        description="The homepage highlights the first tools the product brief calls out, while keeping the structure flexible for future additions."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon

          return (
            <Card key={tool.title} className="rounded-2xl border-border/70 bg-background/95 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-muted">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <Badge variant={tool.badge === "MVP" ? "default" : "secondary"} className="rounded-full">
                    {tool.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-sm leading-6">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Button
                  render={<a href="#demo" />}
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-full px-4"
                >
                  Preview flow
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
