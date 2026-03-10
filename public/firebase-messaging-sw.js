self.addEventListener("push", (event) => {
  console.log("🔔 Push event received", event);
  
  if (!event.data) {
    console.warn("Push event has no data");
    return;
  }

  let payload = {};
  try {
    payload = event.data.json();
    console.log("Push payload:", payload);
  } catch (_e) {
    payload = { body: event.data.text() };
    console.log("Push text payload:", payload);
  }

  const title = payload?.notification?.title || payload?.title || "New notification";
  const options = {
    body: payload?.notification?.body || payload?.body || "",
    icon: payload?.notification?.icon || "/logo192.png",
    badge: payload?.notification?.badge || "/logo192.png",
    data: payload?.data || {},
  };

  console.log("Showing notification:", { title, options });

  event.waitUntil(
    self.registration.showNotification(title, options).then(() => {
      console.log("✅ Notification displayed successfully");
    }).catch((err) => {
      console.error("❌ Failed to show notification:", err);
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("📲 Notification clicked");
  event.notification.close();

  const targetUrl =
    event.notification?.data?.url ||
    "/notifications";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
      return null;
    })
  );
});
