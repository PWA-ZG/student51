"use client"
import Link from "next/link"
import { useEffect } from "react"

export default function Home() {
	useEffect(() => {
		const requestNotificationPermission = async () => {
			if (navigator.onLine) {
				try {
					if (Notification.permission !== "granted") {
						console.log("requesting notification permission")
						const permission =
							await Notification.requestPermission()
						if (permission !== "granted") {
							console.warn("Notification permission denied.")
						}
					}
				} catch (err) {
					console.error(
						"error requesting notification permission: ",
						err
					)
				}
			}
		}

		requestNotificationPermission()
	}, [])

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold mb-4">Web2 PWA Application</h1>
			<h3 className="text-2xl mb-4">Clicker game</h3>
			<Link href="/clicker">
				<button className="btn btn-outline-primary btn-rounded px-4 py-2">
					Click To Play
				</button>
			</Link>
		</div>
	)
}
