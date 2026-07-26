import type { Metadata } from "next"
import Container from "@/components/shared/container"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how TurnAnything processes files locally in your browser to respect and protect your privacy.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 sm:py-16 md:py-20 bg-background text-foreground">
        <Container className="max-w-3xl">
          <article className="prose dark:prose-invert prose-slate max-w-none space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: July 26, 2026</p>
            
            <div className="space-y-8">
              <section className="space-y-3">
                <h2 className="text-xl font-bold">1. Local-First Processing & Data Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At TurnAnything, we take your privacy seriously. The core of our conversion and transformation technology operates <strong>locally inside your web browser</strong> whenever possible. Files you upload for conversions (such as PDFs, images, and text files) are processed directly on your device. They are not uploaded to our servers, keeping your sensitive documents completely private and secure.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Because our processing runs in-browser, we do not collect or store your file content. We only collect minimal, non-personally identifiable information required to run the service, such as standard analytics data (pages visited, system metadata) to optimize performance, and cookies to support system preferences.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold">3. Google AdSense & Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use third-party advertising services like Google AdSense to serve ads. Google may use cookies, such as the DoubleClick cookie, to serve ads based on your visits to our site and other websites on the Internet. You can manage or opt out of personalized advertising by visiting Google's Ads Settings.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold">4. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions or suggestions regarding our Privacy Policy, please contact us at <a href="mailto:contact@turnanything.xyz" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">contact@turnanything.xyz</a>.
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
