"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
	const pathname = usePathname()

	return (
		<div className="navbar">
			<div className="navbar-center">
				<Link
					href="/"
					className={`navbar-item ${
						pathname === "/" ? "navbar-active" : ""
					}`}>
					Home
				</Link>
				<Link
					href="/clicker"
					className={`navbar-item ${
						pathname === "/clicker" ? "navbar-active" : ""
					}`}>
					Play
				</Link>
				<Link
					href="/leaderboard"
					className={`navbar-item ${
						pathname === "/leaderboard" ? "navbar-active" : ""
					}`}>
					Leaderboard
				</Link>
			</div>
		</div>
	)
}
