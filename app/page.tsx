import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import Hero from "@/components/home/hero"
import ConverterDemo from "@/components/home/converter-demo"
import PopularTools from "@/components/home/popular-tools"
import Features from "@/components/home/features"
import HowItWorks from "@/components/home/how-it-works"
import Cta from "@/components/home/cta"

export default function HomePage() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<ConverterDemo />
				<PopularTools />
				<Features />
				<HowItWorks />
				<Cta />
			</main>
			<Footer />
		</>
	)
}
