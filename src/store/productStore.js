import { create } from "zustand";

export const ProductStore = create((set) => ({
  newProductId: null,
  stepData: {
    basicInfo: {},
    selectedCities: [],
    variants: [],
  },

  setNewProductId: (newProductId) => set({ newProductId }),
  setBasicInfo: (data) =>
    set((state) => ({
      stepData: { ...state.stepData, basicInfo: data },
    })),

  setSelectedCities: (cities) =>
    set((state) => ({
      stepData: { ...state.stepData, selectedCities: cities },
    })),

  setVariants: (variants) =>
    set((state) => ({
      stepData: { ...state.stepData, variants },
    })),

  resetProductSteps: () =>
    set({
      stepData: {
        basicInfo: {},
        selectedCities: [],
        variants: [],
      },
    }),
}));

export const StepsStore = create((set) => ({
  activeStep: 0,
  setActiveStep: (id) => set({ activeStep: id }),
}));
