'use client';

import axios from 'axios';
import { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertModal } from '@/components/modals/alert-modal';

// Import the BillboardColumn interface from the 'columns' module.
import { BillboardColumn } from './columns';

// Define the props interface for the CellAction component.
interface CellActionProps {
	data: BillboardColumn; // Data of the billboard.
}

// Define the CellAction component using the 'CellActionProps' interface.
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	// Get router instance and route parameters using hooks.
	const router = useRouter();
	const params = useParams();

	// State variables to control modal and loading state.
	const [open, setOpen] = useState(false); // Modal open state
	const [loading, setLoading] = useState(false); // Loading state

	// Function to handle the delete confirmation.
	const onConfirm = async () => {
		try {
			setLoading(true); // Set loading state to true
			await axios.delete(`/api/${params.storeId}/billboards/${data.id}`); // Delete the billboard
			toast.success('Billboard deleted.'); // Show success toast
			router.refresh(); // Refresh the page
		} catch (error) {
			toast.error(
				'Make sure you removed all categories using this billboard first.'
			); // Show error toast
		} finally {
			setOpen(false); // Close the modal
			setLoading(false); // Set loading state to false
		}
	};

	// Function to copy the billboard ID to clipboard.
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id); // Copy to clipboard
		toast.success('Billboard ID copied to clipboard.'); // Show success toast
	};

	return (
		<>
			{/* Alert modal for delete confirmation */}
			<AlertModal
				isOpen={open} // Show modal if 'open' is true
				onClose={() => setOpen(false)} // Close modal
				onConfirm={onConfirm} // Call 'onConfirm' function on confirmation
				loading={loading} // Pass loading state to modal
			/>
			{/* Dropdown menu for actions */}
			<DropdownMenu>
				{/* Use the DropdownMenuTrigger component */}
				<DropdownMenuTrigger asChild>
					{/* Button to trigger the dropdown menu */}
					<Button
						variant='ghost'
						className='h-8 w-8 p-0'
					>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				{/* Dropdown menu content */}
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					{/* Dropdown menu items */}
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className='mr-2 h-4 w-4' /> Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/${params.storeId}/billboards/${data.id}`)
						}
					>
						<Edit className='mr-2 h-4 w-4' /> Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className='mr-2 h-4 w-4' /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
