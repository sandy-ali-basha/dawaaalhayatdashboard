import { _Notifications } from "api/notifications/notifications";
import { _AuthApi } from "api/auth";

const DEVICE_TOKEN_KEY = "device_token";
const REGISTERED_DEVICE_TOKEN_KEY = "registered_device_token";

const ALLOWED_ROLES = new Set([
  "super_admin",
  "website_admin",
  "ecommerce_admin",
  "order_admin",
]);

const getRole = () => localStorage.getItem("role");

export const saveDeviceToken = (token) => {
  if (!token) return;
  localStorage.setItem(DEVICE_TOKEN_KEY, token);
};

export const getDeviceToken = () => localStorage.getItem(DEVICE_TOKEN_KEY);

const getRegisteredToken = () =>
  localStorage.getItem(REGISTERED_DEVICE_TOKEN_KEY);

const setRegisteredToken = (token) => {
  if (!token) {
    localStorage.removeItem(REGISTERED_DEVICE_TOKEN_KEY);
    return;
  }
  localStorage.setItem(REGISTERED_DEVICE_TOKEN_KEY, token);
};

const canRegisterForCurrentUser = () => {
  if (!_AuthApi.getToken()) return false;
  const role = getRole();
  return ALLOWED_ROLES.has(role);
};

export const registerDeviceTokenIfNeeded = async () => {
  const token = getDeviceToken();

  if (!token) return;
  if (!canRegisterForCurrentUser()) return;
  if (getRegisteredToken() === token) return;

  try {
    await _Notifications.registerDeviceToken(token, "web");
    setRegisteredToken(token);
  } catch (e) {
    console.error("registerDeviceToken failed", e);
  }
};

export const unregisterDeviceTokenOnLogout = async () => {
  const token = getDeviceToken();

  // مهم: نادِ هالدالة قبل حذف auth token من localStorage
  if (!token || !_AuthApi.getToken()) {
    setRegisteredToken("");
    return;
  }

  try {
    await _Notifications.deleteDeviceToken(token);
  } catch (e) {
    console.error("deleteDeviceToken failed", e);
  } finally {
    setRegisteredToken("");
  }
};
