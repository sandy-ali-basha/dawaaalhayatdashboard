import { getMessaging, getToken } from "firebase/messaging";
import { app } from "../firebase";

const ensureActiveServiceWorker = async () => {
  const existingReg = await navigator.serviceWorker.getRegistration("/");
  const reg = existingReg || (await navigator.serviceWorker.register("/firebase-messaging-sw.js", { scope: "/" }));

  // Wait until a service worker is controlling and ready for push subscribe.
  await navigator.serviceWorker.ready;

  if (reg.installing) {
    await new Promise((resolve) => {
      reg.installing.addEventListener("statechange", () => {
        if (reg.active) resolve();
      });
    });
  }

  return reg;
};

export const initPushToken = async () => {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    console.warn("Push init skipped: window/Notification not available");
    return null;
  }

  if (!app || !("serviceWorker" in navigator)) {
    console.warn("Push init skipped: Firebase app or serviceWorker unavailable");
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Push permission not granted:", permission);
    return null;
  }

  const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.error("Missing REACT_APP_FIREBASE_VAPID_KEY");
    return null;
  }

  if (vapidKey.length < 80) {
    console.error("Invalid REACT_APP_FIREBASE_VAPID_KEY format. Use Firebase Cloud Messaging Web Push PUBLIC key.");
    return null;
  }

  try {
    const messaging = getMessaging(app);
    const swReg = await ensureActiveServiceWorker();

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swReg,
    });

    if (!token) {
      console.warn("FCM returned empty token");
      return null;
    }

    return token;
  } catch (error) {
    console.error("Failed to get FCM token:", error);
    return null;
  }
};
