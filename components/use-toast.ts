// This code defines a custom toast notification system inspired by the react-hot-toast library.

// Import necessary dependencies
import * as React from 'react';
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

// Constants for toast behavior
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

// Define the structure of a toast
type ToasterToast = ToastProps & {
	id: string;
	title?: React.ReactNode;
	description?: React.ReactNode;
	action?: ToastActionElement;
};

// Types for action types
type ActionType = {
	ADD_TOAST: 'ADD_TOAST';
	UPDATE_TOAST: 'UPDATE_TOAST';
	DISMISS_TOAST: 'DISMISS_TOAST';
	REMOVE_TOAST: 'REMOVE_TOAST';
};

// Available action types
const actionTypes: ActionType = {
	ADD_TOAST: 'ADD_TOAST',
	UPDATE_TOAST: 'UPDATE_TOAST',
	DISMISS_TOAST: 'DISMISS_TOAST',
	REMOVE_TOAST: 'REMOVE_TOAST',
};

// Counter to generate unique toast IDs
let count = 0;

// Function to generate a new ID
function genId() {
	count = (count + 1) % Number.MAX_VALUE;
	return count.toString();
}

// Action types and their structures
type Action =
	| { type: ActionType['ADD_TOAST']; toast: ToasterToast }
	| { type: ActionType['UPDATE_TOAST']; toast: Partial<ToasterToast> }
	| { type: ActionType['DISMISS_TOAST']; toastId?: ToasterToast['id'] }
	| { type: ActionType['REMOVE_TOAST']; toastId?: ToasterToast['id'] };

// Initial state for the toast system
interface State {
	toasts: ToasterToast[];
}

// Map to store the timeout IDs for each toast
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// Function to add a toast to the remove queue
const addToRemoveQueue = (toastId: string) => {
	if (toastTimeouts.has(toastId)) {
		return;
	}

	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		dispatch({
			type: 'REMOVE_TOAST',
			toastId: toastId,
		});
	}, TOAST_REMOVE_DELAY);

	toastTimeouts.set(toastId, timeout);
};

// Reducer function to manage the toast system state
export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'ADD_TOAST':
			return {
				...state,
				toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
			};

		case 'UPDATE_TOAST':
			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === action.toast.id ? { ...t, ...action.toast } : t
				),
			};

		case 'DISMISS_TOAST': {
			const { toastId } = action;

			// Add the toast to the remove queue
			if (toastId) {
				addToRemoveQueue(toastId);
			} else {
				state.toasts.forEach((toast) => {
					addToRemoveQueue(toast.id);
				});
			}

			// Update the toast state
			return {
				...state,
				toasts: state.toasts.map((t) =>
					t.id === toastId || toastId === undefined
						? {
								...t,
								open: false,
						  }
						: t
				),
			};
		}
		case 'REMOVE_TOAST':
			if (action.toastId === undefined) {
				return {
					...state,
					toasts: [],
				};
			}
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId),
			};
	}
};

// Array to store listeners for state updates
const listeners: Array<(state: State) => void> = [];

// Initial state for the toast system
let memoryState: State = { toasts: [] };

// Dispatch function to update state and notify listeners
function dispatch(action: Action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}

// Type for a simplified toast object
type Toast = Omit<ToasterToast, 'id'>;

// Function to display a new toast notification
function toast({ ...props }: Toast) {
	const id = genId();

	const update = (props: ToasterToast) =>
		dispatch({
			type: 'UPDATE_TOAST',
			toast: { ...props, id },
		});
	const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

	dispatch({
		type: 'ADD_TOAST',
		toast: {
			...props,
			id,
			open: true,
			onOpenChange: (open) => {
				if (!open) dismiss();
			},
		},
	});

	return {
		id: id,
		dismiss,
		update,
	};
}

// Custom hook to access the toast system state and functions
function useToast() {
	const [state, setState] = React.useState<State>(memoryState);

	React.useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}, [state]);

	return {
		...state,
		toast,
		dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
	};
}

export { useToast, toast };
