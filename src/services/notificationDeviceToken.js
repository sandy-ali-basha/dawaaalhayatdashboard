import { _Notifications } from "api/notifications/notifications";
import { _AuthApi } from "api/auth";

const DEVICE_TOKEN_KEY = "fcm_device_token";
const REGISTERED_TOKEN_KEY = "registered_fcm_device_token";
const ALLOWED_ROLES = new Set(["super_admin", "website_admin"]);

const getRole = () => localStorage.getItem("role");

export const saveFcmDeviceToken = (token) => {
  if (!token) return;
  localStorage.setItem(DEVICE_TOKEN_KEY, token);
};

export const getFcmDeviceToken = () => localStorage.getItem(DEVICE_TOKEN_KEY);
console.log("getFcmDeviceToken",DEVICE_TOKEN_KEY)

const getRegisteredToken = () => localStorage.getItem(REGISTERED_TOKEN_KEY);

const setRegisteredToken = (token) => {
  if (!token) {
    localStorage.removeItem(REGISTERED_TOKEN_KEY);
    return;
  }

  localStorage.setItem(REGISTERED_TOKEN_KEY, token);
};

const canRegisterForCurrentUser = () => {
  if (!_AuthApi.getToken()) return false;
  const role = getRole();
  return ALLOWED_ROLES.has(role);
};

export const registerDeviceTokenIfNeeded = async () => {
  const token = getFcmDeviceToken();
console.log("token",token)
  if (!token || !canRegisterForCurrentUser()) return;
  if (getRegisteredToken() === token) return;

  await _Notifications.registerDeviceToken(token, "web");
  setRegisteredToken(token);
};

export const unregisterDeviceTokenOnLogout = async () => {
  const token = getFcmDeviceToken();

  if (!token || !_AuthApi.getToken()) {
    setRegisteredToken("");
    return;
  }

  await _Notifications.deleteDeviceToken(token);
  setRegisteredToken("");
};
