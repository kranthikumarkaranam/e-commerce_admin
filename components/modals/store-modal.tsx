'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { useStoreModal } from '@/hooks/use-store-modal'; // Custom hook 'useStoreModal' for managing modal state.

// Defining a schema for form validation using 'zod'.
const formSchema = z.object({
	name: z.string().min(1), // Defining a schema for the 'name' field.
});

// Defining the 'StoreModal' component.
export const StoreModal = () => {
	const { isOpen, onClose } = useStoreModal(); // Using the 'useStoreModal' hook to manage modal state.
	const router = useRouter(); // Using the 'useRouter' hook for routing.

	const [loading, setLoading] = useState(false); // Managing loading state for form submission.

	// Initializing the 'form' using the 'useForm' hook.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema), // Using the 'zodResolver' for form validation.
		defaultValues: {
			name: '', // Setting default form values.
		},
	});

	// Function to handle form submission.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true); // Setting loading state to true.
			const response = await axios.post('/api/stores', values); // Making a POST request to create a new store.
			window.location.assign(`/${response.data.id}`); // Redirecting to a new page using the response data.
		} catch (error) {
			toast.error('Something went wrong'); // Displaying an error toast notification.
		} finally {
			setLoading(false); // Setting loading state back to false, regardless of success or failure.
		}
	};

	// Rendering the 'StoreModal' component.
	return (
		<Modal
			title='Create store'
			description='Add a new store to manage your products.'
			isOpen={isOpen} // Passing modal open state.
			onClose={onClose} // Passing modal close function.
		>
			<div>
				<div className='space-y-4 py-2 pb-4'>
					<div className='space-y-2'>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Store Name</FormLabel>
											<FormControl>
												<Input
													disabled={loading}
													placeholder='Suit Store'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='pt-6 space-x-2 flex items-center justify-end w-full'>
									<Button
										disabled={loading}
										variant='outline'
										onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										disabled={loading}
										type='submit'
									>
										Continue
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</Modal>
	);
};
