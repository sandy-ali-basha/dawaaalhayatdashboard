import create from "zustand";

function storeMode(mode) {
  localStorage.setItem("mode", mode);
}

function storeDirection(lang) {
  localStorage.setItem("direction", lang);
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

function getLang() {
  if (!!localStorage.getItem("direction")) {
    return localStorage.getItem("direction");
  } else {
    return "ltr";
  }
}

export const settingsStore = create((set) => ({
  // direction: getLang(),
  responsiveFontSizes: true,
  mode: getMode(),

  // setDirection: (dir) => {
  //   set(() => ({ direction: dir }));
  //   storeDirection(dir);
  // },
  setResponsiveFontSizes: (resFont) =>
    set(() => ({ responsiveFontSizes: resFont })),
  setMode: (mode) => {
    set(() => ({ mode: mode }));
    storeMode(mode);
  },
}));
