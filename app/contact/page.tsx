import type { Metadata } from "next"
import Container from "@/components/shared/container"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the TurnAnything team for support, feedback, or business inquiries.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 sm:py-16 md:py-20 bg-background text-foreground">
        <Container className="max-w-3xl">
          <article className="prose dark:prose-invert prose-slate max-w-none space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact Us</h1>
            <p className="text-muted-foreground leading-relaxed">
              Have questions, feedback, or suggestions? We would love to hear from you. Since all conversions on TurnAnything occur locally inside your browser, we do not have access to your files or documents. If you are experiencing technical difficulties, please provide as much context about the file type and your browser/operating system version as possible.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="p-6 rounded-lg border border-border/60 bg-muted/30">
                <h2 className="text-lg font-semibold mb-2">Email Support</h2>
                <p className="text-muted-foreground mb-4">
                  For general support inquiries, bug reports, and feedback, please email us directly:
                </p>
                <a
                  href="mailto:contact@turnanything.xyz"
                  className="text-lg font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors duration-150"
                >
                  contact@turnanything.xyz
                </a>
              </div>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}
