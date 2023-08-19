'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

// Interface defining the props expected by the Modal component.
interface ModalProps {
	title: string; // Title of the modal
	description: string; // Description of the modal
	isOpen: boolean; // Flag indicating whether the modal is open
	onClose: () => void; // Callback function to close the modal
	children?: React.ReactNode; // Optional children components
}

// Modal component using React Functional Component syntax.
export const Modal: React.FC<ModalProps> = ({
	title,
	description,
	isOpen,
	onClose,
	children,
}) => {
	// Callback function to handle modal open state change.
	const onChange = (open: boolean) => {
		if (!open) {
			onClose(); // Call the provided onClose callback when modal is closed.
		}
	};

	return (
		<Dialog
			open={isOpen} // Pass the isOpen prop to control modal open state
			onOpenChange={onChange} // Pass the onChange function to handle open state change
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle> {/* Render the modal title */}
					<DialogDescription>{description}</DialogDescription>{' '}
					{/* Render the modal description */}
				</DialogHeader>
				<div>{children}</div>{' '}
				{/* Render any child components passed to the Modal */}
			</DialogContent>
		</Dialog>
	);
};
