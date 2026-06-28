import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

const payrollRef = collection(db, "payrollAdjustments");

export function listenToPayrollAdjustments(callback) {
  return onSnapshot(payrollRef, (snapshot) => {
    const adjustments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(adjustments);
  });
}

export async function savePayrollAdjustment(workerId, data) {
  return setDoc(doc(db, "payrollAdjustments", workerId), {
    workerId,
    adjustment: Number(data.adjustment || 0),
    paid: Boolean(data.paid),
    paidDate: data.paid ? data.paidDate || new Date().toISOString().slice(0, 10) : "",
    updatedAt: serverTimestamp()
  });
}
