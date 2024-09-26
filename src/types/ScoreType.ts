import { Timestamp } from "firebase/firestore"

export type Score = {
	name: string
	score: number
	date: Timestamp
}
