import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-iZfczRN5W09ajxHbHTyw83o_uS7FkWY",
  authDomain: "upsifs-912ed.firebaseapp.com",
  projectId: "upsifs-912ed",
  storageBucket: "upsifs-912ed.appspot.com",
  messagingSenderId: "653325425997",
  appId: "1:653325425997:web:711f3a3921abe87ce1eb04",
};

// ✅ Prevent duplicate app initialization
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(
  app,
  "gs://upsifs-912ed.firebasestorage.app"
);
export default app;