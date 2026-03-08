import { getMessaging, getToken } from "firebase/messaging";
import { app } from "../firebase";

export const initPushToken = async () => {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return null;
  }

  if (!app || !("serviceWorker" in navigator)) {
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.error("Missing REACT_APP_FIREBASE_VAPID_KEY");
    return null;
  }

  const messaging = getMessaging(app);

  const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: swReg,
  });

  return token || null;
};
