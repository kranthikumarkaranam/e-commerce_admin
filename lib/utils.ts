import { type ClassValue, clsx } from 'clsx'; // Import ClassValue and clsx from clsx library
import { twMerge } from 'tailwind-merge'; // Import twMerge function from tailwind-merge library

// Create a custom utility function 'cn'
export function cn(...inputs: ClassValue[]) {
	// The function accepts any number of arguments (ClassValue types)
	return twMerge(clsx(inputs)); // Merge and apply Tailwind CSS classes using clsx and twMerge
}

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});
