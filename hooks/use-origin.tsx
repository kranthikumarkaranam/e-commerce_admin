import { useEffect, useState } from 'react'; // Import necessary hooks from React

// Create a custom hook named 'useOrigin'
export const useOrigin = () => {
	// State to track whether the component is mounted or not
	const [mounted, setMounted] = useState(false);

	// Determine the origin based on the current window location
	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: '';

	// Effect to set 'mounted' to true after the component is mounted
	useEffect(() => {
		setMounted(true);
	}, []);

	// Return the origin if the component is mounted, otherwise return an empty string
	if (!mounted) {
		return '';
	}

	return origin;
};
