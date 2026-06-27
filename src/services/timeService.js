import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

const timeRef = collection(db, "timeEntries");

export function listenToTimeEntries(callback) {
  return onSnapshot(timeRef, (snapshot) => {
    const entries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(entries);
  });
}

export async function createTimeEntry(entry) {
  return addDoc(timeRef, {
    ...entry,
    hours: Number(entry.hours || 0),
    lunchMinutes: Number(entry.lunchMinutes || 0),
    createdAt: serverTimestamp()
  });
}
