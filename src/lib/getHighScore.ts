import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { firestoreDB } from "./firebase"
import { Score } from "@/types/ScoreType"

export default async function getHighScore() {
	try {
		const highScoreQuery = query(
			collection(firestoreDB, "scores"),
			orderBy("score", "desc"),
			orderBy("date", "asc"),
			limit(1)
		)

		const highScoreSnapshot = await getDocs(highScoreQuery)
		if (highScoreSnapshot.empty) {
			return undefined
		}
		const highScore = highScoreSnapshot.docs[0].data() as Score
		return highScore as Score
	} catch (error) {
		console.log("Error getting documents: ", error)
	}
}
