import { useState } from "react"
import shareScore from "@/lib/shareScore"

type ModalProps = {
	isOpen: boolean
	score: number
	onClose: () => void
	onSubmit: (name: string) => void
}

export default function Modal({
	isOpen,
	score,
	onClose,
	onSubmit,
}: ModalProps) {
	const [name, setName] = useState("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit(name)
	}

	const handleCheckboxChange = () => {
		if (isOpen) onClose()
	}

	const handleScoreShare = () => {
		shareScore(score)
	}

	return (
		<>
			<input
				className="modal-state"
				id="modal-3"
				type="checkbox"
				checked={isOpen}
				onChange={handleCheckboxChange}
			/>
			<div className="modal">
				<label className="modal-overlay"></label>
				<div className="modal-content flex flex-col gap-5 p-6">
					<label
						htmlFor="modal-3"
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
						onClick={onClose}>
						✕
					</label>
					<h2 className="text-2xl">Game Over!</h2>
					<p className="text-lg">Your score is {score}</p>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Enter your name"
							className="input input-bordered"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<div className="flex flex-col gap-2 mt-4">
							<button
								className="btn btn-primary"
								type="submit">
								Submit
							</button>
							<button
								className="btn btn-primary"
								onClick={handleScoreShare}
								type="button">
								Share
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
