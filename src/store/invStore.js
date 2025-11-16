import { create } from 'zustand';

export const InvStore = create((set) => ({
  InvData: null,
  setInvData: (Data) => {
    set(() => ({ InvData: Data }));
  },
}));
