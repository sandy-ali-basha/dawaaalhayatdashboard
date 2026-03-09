import { getMessaging, getToken } from "firebase/messaging";
import { app } from "../firebase";

export const initPushToken = async () => {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    console.error("Push token skipped: Notification API is not available in this environment.");
    return null;
  }

  if (!app) {
    console.error("Push token skipped: Firebase app is not initialized.");
    return null;
  }

  if (!("serviceWorker" in navigator)) {
    console.error("Push token skipped: serviceWorker is not supported in this browser.");
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.error(`Push token skipped: notification permission is '${permission}'.`);
    return null;
  }

  const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.error("Push token skipped: Missing REACT_APP_FIREBASE_VAPID_KEY.");
    return null;
  }

  try {
    const messaging = getMessaging(app);
    const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swReg,
    });

    if (!token) {
      console.error("Push token request returned empty token.");
      return null;
    }

    return token;
  } catch (error) {
    console.error("Push token failed:", error);
    return null;
  }
};
