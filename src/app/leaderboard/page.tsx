"use client"
import getLeaderboard from "@/lib/getLeaderboard"
import { useEffect, useState } from "react"
import { Score } from "@/types/ScoreType"
import Pagination from "@/components/Pagination"
import getTotalScores from "@/lib/getTotalScores"

export default function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState<Score[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10
	const [totalPages, setTotalPages] = useState(0)

	const onPageChange = (page: number) => {
		if (page < 1 || page > totalPages) return
		setCurrentPage(page)
	}

	useEffect(() => {
		;(async () => {
			try {
				const leaderboardData = await getLeaderboard(
					currentPage,
					itemsPerPage
				)
				setLeaderboard(leaderboardData as Score[])
			} catch (error) {
				console.error(error)
			}

			try {
				const totalScores = await getTotalScores()
				setTotalPages(Math.ceil((totalScores ?? 0) / itemsPerPage))
			} catch (error) {
				console.error(error)
			}
		})()
	}, [currentPage])

	return (
		<div className="flex flex-col items-center justify-start min-h-screen">
			<h1 className="text-4xl font-bold my-6">Leaderboard</h1>

			<div className="flex w-full max-w-lg overflow-x-auto justify-center">
				<table className="table table-compact table-hover w-full max-w-xl text-center">
					<thead>
						<tr>
							<th className="px-4 py-2">#</th>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Score</th>
							<th className="px-4 py-2">Date</th>
						</tr>
					</thead>
					<tbody>
						{leaderboard &&
							leaderboard.map((score, index) => (
								<tr key={index}>
									<td className="px-4 py-2">{index + 1}</td>
									<td className="px-4 py-2">{score.name}</td>
									<td className="px-4 py-2">{score.score}</td>
									<td className="px-4 py-2">
										{score.date.toDate().toISOString()}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<div className="mt-6">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	)
}
