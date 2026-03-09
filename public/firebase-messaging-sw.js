self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload = {};
  try {
    payload = event.data.json();
  } catch (_e) {
    payload = { body: event.data.text() };
  }

  const title = payload?.notification?.title || payload?.title || "New notification";
  const options = {
    body: payload?.notification?.body || payload?.body || "",
    icon: payload?.notification?.icon || "/logo192.png",
    badge: payload?.notification?.badge || "/logo192.png",
    data: payload?.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
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
