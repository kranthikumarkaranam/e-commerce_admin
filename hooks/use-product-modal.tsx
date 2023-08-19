import { create } from 'zustand'; // Import the 'create' function from the 'zustand' library

// Define the interface for the 'useProductModal' zustand store
interface useProductModalStore {
	isOpen: boolean; // A boolean indicating if the modal is open
	isEdit: boolean; // A boolean indicating if the modal is in edit mode
	editId?: string; // An optional string representing the ID of the item being edited
	onOpen: () => void; // A function to open the modal
	onEdit: (id: string) => void; // A function to start editing a specific item
	onClose: () => void; // A function to close the modal
}

// Create a zustand store named 'useProductModal'
export const useProductModal = create<useProductModalStore>((set) => ({
	isOpen: false, // Initialize 'isOpen' as false
	isEdit: false, // Initialize 'isEdit' as false
	editId: undefined, // Initialize 'editId' as undefined
	onOpen: () => set({ isOpen: true }), // Define a function to open the modal
	onEdit: (id: string) => set({ isOpen: true, isEdit: true, editId: id }), // Define a function to start editing
	onClose: () => set({ isOpen: false, isEdit: false, editId: undefined }), // Define a function to close the modal
}));
