import create from "zustand";

export const InvStore = create((set) => ({
  InvId: null,
  setInvId: (id) => {
    set(() => ({ InvId: id }));
  },
}));
