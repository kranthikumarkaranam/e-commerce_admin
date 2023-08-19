'use client';

import { useEffect, useState } from 'react';
import { StoreModal } from '@/components/modals/store-modal';

export const ModalProvider = () => {
	// Setting up state to track whether the component is mounted or not.
	const [isMounted, setIsMounted] = useState(false);

	// Using the 'useEffect' hook to set 'isMounted' to true when the component is mounted.
	useEffect(() => {
		setIsMounted(true); // Marks the component as mounted.
	}, []);

	// If the component is not yet mounted, return null.
	if (!isMounted) {
		return null;
	}

	// If the component is mounted, return the JSX structure.
	return (
		<>
			<StoreModal /> {/* Rendering the 'StoreModal' component. */}
		</>
	);
};
