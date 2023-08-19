// Importing the 'create' function from the 'zustand' library to create a store.
import { create } from 'zustand';

// Defining an interface that represents the shape of our store's state.
interface useStoreModalStore {
	isOpen: boolean; // A boolean value to track whether the modal is open or not.
	onOpen: () => void; // A function to open the modal.
	onClose: () => void; // A function to close the modal.
}

// Creating a custom hook 'useStoreModal' using the 'create' function from 'zustand'.
export const useStoreModal = create<useStoreModalStore>((set) => ({
	isOpen: false, // Initializing the modal state as closed (not open).
	onOpen: () => set({ isOpen: true }), // Defining a function to set 'isOpen' to true.
	onClose: () => set({ isOpen: false }), // Defining a function to set 'isOpen' to false.
}));
