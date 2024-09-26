"use client"
import Modal from "@/components/Modal"
import { useEffect, useState } from "react"
import { Score } from "@/types/ScoreType"
import addNewScore from "@/lib/addNewScore"
import { Timestamp } from "firebase/firestore"
import getHighScore from "@/lib/getHighScore"

export default function Clicker() {
	const [clicks, setClicks] = useState(0)
	const [time, setTime] = useState(50)
	const [gameStarted, setGameStarted] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		if (!gameStarted || gameOver) return

		if (time > 0 && !gameOver) {
			const timer = setInterval(() => {
				setTime((prevTime) => Math.max(0, prevTime - 1))
			}, 100)

			return () => clearInterval(timer)
		} else if (time === 0 && !gameOver) {
			setGameOver(true)
			setShowModal(true)
		}
	}, [gameOver, time, gameStarted])

	const handleClick = () => {
		if (!gameOver && time > 0) {
			setClicks(clicks + 1)
			if (!gameStarted) {
				setGameStarted(true)
			}
		}
	}

	const handleModalClose = () => {
		setClicks(0)
		setTime(50)
		setGameOver(false)
		setShowModal(false)
		setGameStarted(false)
	}

	const handleModalSubmit = async (name: string) => {
		const newScore: Score = {
			name,
			score: clicks,
			date: Timestamp.now(),
		}

		let isHighScore = false

		if (navigator.onLine) {
			try {
				let currentHighScore = await getHighScore()
				if (currentHighScore === undefined) isHighScore = true
				else isHighScore = newScore.score > currentHighScore?.score

				// Request notification permission

				if (isHighScore) {
					console.log("new high score!")
					if (
						"serviceWorker" in navigator &&
						navigator.serviceWorker.controller
					) {
						console.log("sending message to service worker")
						navigator.serviceWorker.controller.postMessage({
							type: "newHighScore",
							username: newScore.name,
							score: newScore.score,
						})
					} else {
						console.log("no service worker")
					}
				}

				await addNewScore(newScore)
			} catch (err) {
				console.error("error adding new score: ", err)
			}
		} else {
			console.log("offline, saving score locally")
			// TODO: save score to IndexedDB
		}

		handleModalClose()
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold mb-2">Clicker</h1>
			<p className="text-xl mb-4">
				Click the button as many times as you can in 5 seconds!
			</p>
			<p className="text-lg mb-2">Time: {(time / 10).toFixed(1)}</p>
			<p className="text-lg mb-2">Clicks: {clicks}</p>

			<button
				className="btn btn-primary btn-circle px-4 py-2 w-32 h-32 text-4xl"
				onClick={handleClick}
				disabled={time === 0}>
				{clicks}
			</button>

			<Modal
				isOpen={showModal}
				score={clicks}
				onClose={handleModalClose}
				onSubmit={handleModalSubmit}
			/>
		</div>
	)
}
