import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import TurnAnythingHome from "@/components/home/turn-anything-home"

export default function HomePage() {
	return (
		<>
			<Navbar />
			<main>
				<TurnAnythingHome />
			</main>
			<Footer />
		</>
	)
}
