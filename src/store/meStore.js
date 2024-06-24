import create from "zustand";


export const useMe = create((set) => ({
  data: undefined,
  set: (res) => set(() => ({ data: res })),
  clear: () => set(() => ({ data: undefined })),
}));
