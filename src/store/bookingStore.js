import create from "zustand";

export const bookingStore = create((set) => ({
  allBooking: undefined,

  setAllBooking: (data) => {
    set(() => ({ allBooking: data }));
  },
}));
