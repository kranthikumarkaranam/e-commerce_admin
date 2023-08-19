'use client';

// Import necessary modules and components
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
import { useCategoryModal } from '@/hooks/use-category-modal';
import { AlertModal } from '@/components/modals/alert-modal';

import { CategoryColumn } from './columns';

// Define the CellAction component
interface CellActionProps {
	data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// Function to handle the delete confirmation
	const onConfirm = async () => {
		try {
			setLoading(true);
			// Send a delete request to the API endpoint for deleting the category
			await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
			toast.success('Category deleted.');
			router.refresh(); // Refresh the page to reflect the changes
		} catch (error) {
			toast.error(
				'Make sure you removed all products using this category first.'
			);
		} finally {
			setOpen(false); // Close the delete confirmation modal
			setLoading(false);
		}
	};

	// Function to copy the category ID to the clipboard
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id); // Copy the ID to the clipboard
		toast.success('Category ID copied to clipboard.');
	};

	return (
		<>
			{/* Alert modal for delete confirmation */}
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onConfirm}
				loading={loading}
			/>
			{/* Dropdown menu for category actions */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='h-8 w-8 p-0'
					>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					{/* Menu items for copying, updating, and deleting the category */}
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className='mr-2 h-4 w-4' /> Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/${params.storeId}/categories/${data.id}`)
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
