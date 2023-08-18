import { create } from "zustand";

interface useQuestionModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useQuestionModal = create<useQuestionModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
