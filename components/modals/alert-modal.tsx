import { useEffect, useState } from 'react';

import { Modal } from '@/components/modal';
import { Button } from '@/components/ui/button';

// Define the prop types for the AlertModal component
interface AlertModalProps {
	isOpen: boolean; // Indicates if the modal is open or not
	onClose: () => void; // Function to close the modal
	onConfirm: () => void; // Function to confirm the action
	loading: boolean; // Indicates if the action is in loading state
}

// AlertModal component that displays a confirmation modal
export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
}) => {
	// State to track if the component is mounted
	const [isMounted, setIsMounted] = useState(false);

	// useEffect hook to set the isMounted state to true after component mount
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// If the component is not mounted, return null (don't render)
	if (!isMounted) {
		return null;
	}

	// Render the Modal component with the confirmation content
	return (
		<Modal
			title='Are you sure?' // Modal title
			description='This action cannot be undone.' // Modal description
			isOpen={isOpen} // Whether the modal is open or not
			onClose={onClose} // Function to close the modal
		>
			{/* Buttons for canceling or confirming the action */}
			<div className='pt-6 space-x-2 flex items-center justify-end w-full'>
				<Button
					disabled={loading} // Disable the button if action is loading
					variant='outline' // Styling variant for the button
					onClick={onClose} // Function to execute when button is clicked
				>
					Cancel
				</Button>
				<Button
					disabled={loading} // Disable the button if action is loading
					variant='destructive' // Styling variant for the button
					onClick={onConfirm} // Function to execute when button is clicked
				>
					Continue
				</Button>
			</div>
		</Modal>
	);
};
