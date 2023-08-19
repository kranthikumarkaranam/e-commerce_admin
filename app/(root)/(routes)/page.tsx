'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useStoreModal } from '@/hooks/use-store-modal';

// Component that handles setup actions and interacts with the Store Modal using hooks.
const SetupPage = () => {
	// Retrieve the 'onOpen' and 'isOpen' state from the 'useStoreModal' hook.
	const onOpen = useStoreModal((state) => state.onOpen);
	const isOpen = useStoreModal((state) => state.isOpen);

	// Use the 'useEffect' hook to automatically open the store modal if it's not open already.
	useEffect(() => {
		if (!isOpen) {
			onOpen(); // Invoke the 'onOpen' function to open the store modal.
		}
	}, [isOpen, onOpen]);

	return null; // Renders nothing (null), as this component only manages state and effects.
};

export default SetupPage;
