import { create } from "zustand";

export const useTriggerStore = create((set) => ({
  shouldRun: false,
  payload: null,
  setShouldRun: (val) => set({ shouldRun: val }),
  setPayload: (data) => set({ payload: data }),
}));
