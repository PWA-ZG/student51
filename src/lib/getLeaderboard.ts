import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
} from "firebase/firestore"
import { firestoreDB } from "./firebase"
import { Score } from "@/types/ScoreType"

export default async function getLeaderboard(
	page: number,
	itemsPerPage: number
) {
	try {
		if (page === 1) {
			const first = query(
				collection(firestoreDB, "scores"),
				orderBy("score", "desc"),
				orderBy("date", "asc"),
				limit(itemsPerPage)
			)
			const firstQuerySnapshot = await getDocs(first)
			const leaderboard: Score[] = firstQuerySnapshot.docs.map(
				(doc) => doc.data() as Score
			)
			return leaderboard
		} else {
			const first = query(
				collection(firestoreDB, "scores"),
				orderBy("score", "desc"),
				orderBy("date", "asc"),
				limit((page - 1) * itemsPerPage)
			)
			const firstQuerySnapshot = await getDocs(first)
			const lastDoc =
				firstQuerySnapshot.docs[firstQuerySnapshot.docs.length - 1]

			const leaderboardQuery = query(
				collection(firestoreDB, "scores"),
				orderBy("score", "desc"),
				orderBy("date", "asc"),
				startAfter(lastDoc),
				limit(itemsPerPage)
			)

			const querySnapshot = await getDocs(leaderboardQuery)
			const leaderboard: Score[] = querySnapshot.docs.map(
				(doc) => doc.data() as Score
			)
			return leaderboard
		}
	} catch (error) {
		console.error(error)
	}
}
