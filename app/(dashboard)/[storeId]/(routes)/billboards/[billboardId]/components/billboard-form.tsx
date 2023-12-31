'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Billboard } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

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
import ImageUpload from '@/components/image-upload';

// Define the validation schema using Zod for the form fields
const formSchema = z.object({
	label: z.string().min(1, {
		message: 'Label must be atleast 3 characters.',
	}),
	imageUrl: z.string().min(1, {
		message: 'Please upload an image.',
	}),
});

// Infer the type of form values from the Zod schema
type BillboardFormValues = z.infer<typeof formSchema>;

// Define the props interface for the BillboardForm component
interface BillboardFormProps {
	initialData: Billboard | null;
}

// Define the BillboardForm component
export const BillboardForm: React.FC<BillboardFormProps> = ({
	initialData,
}) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// Determine title, description, action text, and toast message based on whether it's an edit or create
	const title = initialData ? 'Edit billboard' : 'Create billboard';
	const description = initialData
		? 'Edit your billboard.'
		: 'Add a new billboard';
	const toastMessage = initialData
		? 'Billboard updated.'
		: 'Billboard created.';
	const action = initialData ? 'Save changes' : 'Create';

	// Create a useForm instance with Zod validation resolver and initial form values
	const form = useForm<BillboardFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: '',
		},
	});

	// Handle form submission
	const onSubmit = async (data: BillboardFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/billboards/${params.billboardId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/billboards`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/billboards`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	// Handle deletion of a billboard
	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(
				`/api/${params.storeId}/billboards/${params.billboardId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/billboards`);
			toast.success('Billboard deleted.');
		} catch (error: any) {
			toast.error(
				'Make sure you removed all categories using this billboard first.'
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	// Render the BillboardForm component
	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			{/* Render the form header */}
			<div className='flex items-center justify-between'>
				<Heading
					title={title}
					description={description}
				/>
				{/* Render delete button for editing */}
				{initialData && (
					<Button
						disabled={loading}
						variant='destructive'
						size='sm'
						onClick={() => setOpen(true)}
					>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			{/* Render the form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					{/* Render the image upload control */}
					<FormField
						control={form.control}
						name='imageUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Billboard Background</FormLabel>
								<span className='text-xs text-muted-foreground'>
									{'\u00A0'} (required)
								</span>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={loading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Render the label input control */}
					<div className='md:grid md:grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='label'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard Label</FormLabel>
									<span className='text-xs text-muted-foreground'>
										{'\u00A0'} (required)
									</span>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='New Arrivals Just for You'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Render the submit button */}
					<Button
						disabled={loading}
						className='ml-auto'
						type='submit'
					>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
