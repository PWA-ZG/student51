const CACHE_NAME = "pwa-clicker-cache"
const urlsToCache = ["/", "/clicker", "/leaderboard"]

// Install a service worker
self.addEventListener("install", (event) => {
	console.log("called install event")
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache)
		})
	)
})

// Cache and return requests
self.addEventListener("fetch", (event) => {
	console.log("called fetch event")
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Cache hit - return response
			if (response) {
				return response
			}
			return fetch(event.request)
		})
	)
})

// Activate the service worker and delete old caches
self.addEventListener("activate", (event) => {
	console.log("called activate event")
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName)
					}
				})
			).then(() => {
                self.clients.claim()
            })
		})
	)
})

// Listen for high score updates
self.addEventListener("message", (event) => {
	console.log("called notification event")
	if (Notification.permission === "granted") {
		if (event.data && event.data.type === "newHighScore") {
			const { username, score } = event.data
			const title = "New High Score!"
			self.registration.showNotification(title, {
				body: `${username} achieved a new high score: ${score}`,
				icon: "/next.svg",
			})
		}
	} else {
		if (Notification.permission !== "denied") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					if (event.data && event.data.type === "newHighScore") {
						const { username, score } = event.data
						const title = "New High Score!"
						self.registration.showNotification(title, {
							body: `${username} achieved a new high score: ${score}`,
							icon: "/next.svg",
						})
					}
				}
			})
		}
	}
})
