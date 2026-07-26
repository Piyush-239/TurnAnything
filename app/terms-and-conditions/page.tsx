import type { Metadata } from "next"
import Container from "@/components/shared/container"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read the terms and conditions for using the TurnAnything conversion platform.",
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 sm:py-16 md:py-20 bg-background text-foreground">
        <Container className="max-w-3xl">
          <article className="prose dark:prose-invert prose-slate max-w-none space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Terms and Conditions</h1>
            <p className="text-sm text-muted-foreground">Last updated: July 26, 2026</p>
            
            <div className="space-y-8">
              <section className="space-y-3">
                <h2 className="text-xl font-bold">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using TurnAnything.xyz, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold">2. Local-First Use & Permitted Activity</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service provides browser-side tools designed to convert and transform file formats locally. You agree to use the service only for lawful purposes and in accordance with these Terms. Since processing occurs locally on your machine, you are solely responsible for ensuring you have all rights and ownership to the files you convert.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold">3. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TurnAnything.xyz is provided on an "as-is" and "as-available" basis. We make no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, or reliability of conversions. Use of the service is at your own risk.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold">4. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions or concerns about these Terms, you can contact us at <a href="mailto:contact@turnanything.xyz" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">contact@turnanything.xyz</a>.
                </p>
              </section>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}
