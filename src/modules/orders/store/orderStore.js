import create from "zustand";

export const orderStore = create((set) => ({
  item: null,
  setItem: (itm) => {
    set(() => ({ item: itm }));
  },
}));
