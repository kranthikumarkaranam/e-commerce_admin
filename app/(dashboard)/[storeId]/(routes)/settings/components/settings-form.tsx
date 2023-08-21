'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiCopy } from '@/components/api-copy';
import { useOrigin } from '@/hooks/use-origin';

// Define the validation schema using zod
const formSchema = z.object({
	name: z.string().min(2), // Name field validation
});

// Infer the type of form values from the validation schema
type SettingsFormValues = z.infer<typeof formSchema>;

// Define props interface for SettingsForm component
interface SettingsFormProps {
	initialData: Store; // Initial store data
}

// SettingsForm component that displays and manages store settings
export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	// Get route parameters and router object using custom hooks
	const params = useParams();
	const router = useRouter();

	// Get API origin using custom hook
	const origin = useOrigin();

	// Define local state variables
	const [open, setOpen] = useState(false); // For displaying alert modal
	const [loading, setLoading] = useState(false); // For managing loading state

	// Initialize react-hook-form with validation schema and default values
	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	// Function to handle form submission
	const onSubmit = async (data: SettingsFormValues) => {
		try {
			setLoading(true); // Set loading state
			await axios.patch(`/api/stores/${params.storeId}`, data); // Send patch request to update store data
			router.refresh(); // Refresh the current route
			toast.success('Store updated.'); // Display success toast
		} catch (error: any) {
			toast.error('Something went wrong.'); // Display error toast
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	// Function to handle store deletion
	const onDelete = async () => {
		try {
			setLoading(true); // Set loading state
			await axios.delete(`/api/stores/${params.storeId}`); // Send delete request to delete store
			router.refresh(); // Refresh the current route
			router.push('/'); // Navigate to the home page
			toast.success('Store deleted.'); // Display success toast
		} catch (error: any) {
			toast.error('Make sure you removed all products and categories first.'); // Display error toast
		} finally {
			setLoading(false); // Reset loading state
			setOpen(false); // Close the modal
		}
	};

	// Render the SettingsForm component
	return (
		<>
			{/* Display AlertModal for store deletion */}
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			{/* Heading and delete button */}
			<div className='flex items-center justify-between'>
				<Heading
					title='Store settings'
					description='Manage store preferences'
				/>
				<Button
					disabled={loading}
					variant='destructive'
					size='sm'
					onClick={() => setOpen(true)}
				>
					<Trash className='h-4 w-4' />
				</Button>
			</div>
			<Separator />
			{/* Form for updating store settings */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					{/* Form fields */}
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Store name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Submit button */}
					<Button
						disabled={loading}
						className='ml-auto'
						type='submit'
					>
						Save changes
					</Button>
				</form>
			</Form>
			<Separator />
			{/* Display API origin */}
			<ApiCopy
				title='NEXT_PUBLIC_API_URL'
				variant='public'
				description={`${origin}/api/${params.storeId}`}
			/>
		</>
	);
};
