import { create } from 'zustand';

function storeMode(mode) {
  localStorage.setItem("mode", mode);
}

function getMode() {
  if (!!localStorage.getItem("mode")) {
    return localStorage.getItem("mode");
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
}

export const settingsStore = create((set) => ({
  responsiveFontSizes: true,
  mode: getMode(),

  setResponsiveFontSizes: (resFont) =>
    set(() => ({ responsiveFontSizes: resFont })),
  setMode: (mode) => {
    set(() => ({ mode: mode }));
    storeMode(mode);
  },
}));
