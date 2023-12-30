import {create} from "zustand";

interface StoreModal {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;     

}

export const useStoreModal = create<StoreModal>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
})) 