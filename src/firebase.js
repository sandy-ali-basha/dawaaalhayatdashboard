import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "messagingSenderId",
  "appId",
];

const missingFirebaseKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

if (missingFirebaseKeys.length) {
  console.error(
    "Missing Firebase config envs:",
    missingFirebaseKeys.map((key) => `REACT_APP_FIREBASE_${key.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase().replace(/^_/, "")}`),
  );
}

export const app =
  missingFirebaseKeys.length === 0
    ? getApps().length
      ? getApp()
      : initializeApp(firebaseConfig)
    : null;
