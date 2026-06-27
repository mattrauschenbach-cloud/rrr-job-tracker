import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

const workersRef = collection(db, "workers");

export function listenToWorkers(callback) {
  return onSnapshot(workersRef, (snapshot) => {
    const workers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(workers);
  });
}

export async function createWorker(worker) {
  return addDoc(workersRef, {
    ...worker,
    rate: Number(worker.rate || 0),
    createdAt: serverTimestamp()
  });
}

export async function deleteWorker(id) {
  return deleteDoc(doc(db, "workers", id));
}
