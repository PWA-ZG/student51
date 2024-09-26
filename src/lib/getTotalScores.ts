import { collection, getDocs } from "firebase/firestore"
import { firestoreDB } from "./firebase"

export default async function getTotalScores() {
	try {
		const querySnapshot = await getDocs(collection(firestoreDB, "scores"))
		return querySnapshot.size
	} catch (error) {
		console.error(error)
	}
}
