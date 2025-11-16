import { create } from 'zustand';

export const ProductStore = create((set) => ({
  newProductId: null,
  setNewProductId: (id) => {
    set(() => ({ newProductId: id }));
  },
}));
export const StepsStore = create((set) => ({
  activeStep: 0,
  setActiveStep: (id) => {
    set(() => ({ activeStep: id }));
  },
}));
