import create from "zustand";

export const categoryStore = create((set) => ({
  editedID: null,
  passID: null,

  setEditedID: (id) => {
    set(() => ({ editedID: id }));
  },
  setPassID: (id) => {
    set(() => ({ passID: id }));
  },
}));
export const changeStore = create((set) => ({
  passID: null,
  setPassID: (id) => {
    set(() => ({ passID: id }));
  },
}));



// export const idStore = create((set) => ({
//   data: undefined,
//   set: (res) => set(() => ({ data: res })),
//   clear: () => set(() => ({ data: undefined })),
// }));