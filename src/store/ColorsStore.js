import create from "zustand";

export const colorStore = create((set) => ({
  editedID: null,
  storeID: null,
  passID: null,
  passName: null,
  setEditedID: (id) => {
    set(() => ({ editedID: id }));
  },
  setStoreID: (id) => {
    set(() => ({ storeID: id }));
  },
  setPassID: (id) => {
    set(() => ({ passID: id }));
  },
  setPassName: (name) => {
    set(() => ({ passName: name }));
  },
}))

export const changeStore = create((set) => ({
  passID: null,
  setPassID: (id) => {
    set(() => ({ passID: id }));
  },
  setPassName: (name) => {
    set(() => ({ passName: name }));
  },
}))
