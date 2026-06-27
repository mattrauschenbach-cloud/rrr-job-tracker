import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

const jobsRef = collection(db, "jobs");

export function listenToJobs(callback) {
  return onSnapshot(jobsRef, (snapshot) => {
    const jobs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(jobs);
  });
}

export async function createJob(job) {
  return addDoc(jobsRef, {
    ...job,
    price: Number(job.price || 0),
    labor: Number(job.labor || 0),
    materials: Number(job.materials || 0),
    createdAt: serverTimestamp()
  });
}

export async function deleteJob(id) {
  return deleteDoc(doc(db, "jobs", id));
}
