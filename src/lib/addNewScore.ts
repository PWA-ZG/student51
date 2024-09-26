import { firestoreDB } from "./firebase"
import { Score } from "@/types/ScoreType"
import { addDoc, collection } from "firebase/firestore"

export default async function addNewScore(newScore: Score) {
	try {
		await addDoc(collection(firestoreDB, "scores"), newScore)
	} catch (error) {
		console.error(error)
	}
}
