"use client"
import { useEffect } from "react"

export default function UseServiceWorker() {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/service-worker.js", { scope: "/" })
				.then((registration) =>
					console.log(
						"Service worker registered with scope: ",
						registration.scope
					)
				)
				.catch((err) =>
					console.error("Service worker registration failed", err)
				)
		}
	}, [])

	return null
}
