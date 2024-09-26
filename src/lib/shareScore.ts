export default function shareScore(score: number) {
	const shareData = {
		text:
			"I scored " +
			score +
			" on the Web2 PWA Clicker Game! Try to beat my score!",
		url: "https://web2-pwa-clicker.vercel.app/clicker",
	}

	if (navigator.canShare(shareData)) {
		navigator
			.share(shareData)
			.then(() => {
				console.log("Shared successfully")
				console.log("navigator.share", navigator.share)
			})
			.catch((error) => console.log("Error sharing", error))
	} else {
		alert("Web Share API not supported in your browser")
	}
}
