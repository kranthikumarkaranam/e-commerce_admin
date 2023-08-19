import { create } from 'zustand'; // Import the 'create' function from the 'zustand' library

// Define the interface for the 'useActiveStore' zustand store
interface useActiveStoreInterface {
	id?: string; // An optional 'id' property of type string
	set: (id: string) => void; // A function to set the 'id'
	reset: () => void; // A function to reset the 'id'
}

// Create a zustand store named 'useActiveStore'
export const useActiveStore = create<useActiveStoreInterface>((set) => ({
	id: undefined, // Initialize 'id' as undefined
	set: (id: string) => set({ id }), // Define a function to set the 'id'
	reset: () => set({ id: undefined }), // Define a function to reset the 'id'
}));
