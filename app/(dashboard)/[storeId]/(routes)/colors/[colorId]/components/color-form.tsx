'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Color } from '@prisma/client';
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

// Define the form schema using zod
const formSchema = z.object({
	name: z.string().min(3, {
		message: 'Name must be atleast 3 characters.',
	}),
	value: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
		message: 'Must be a valid hex code in the format "#ffffff" or "#fff"',
	}),
});

// Define the type for ColorForm values based on form schema
type ColorFormValues = z.infer<typeof formSchema>;

// Define the props interface for the ColorForm component
interface ColorFormProps {
	initialData: Color | null;
}

// Define the ColorForm component
export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// Determine the title, description, toast message, and action text based on initial data
	const title = initialData ? 'Edit color' : 'Create color';
	const description = initialData ? 'Edit a color.' : 'Add a new color';
	const toastMessage = initialData ? 'Color updated.' : 'Color created.';
	const action = initialData ? 'Save changes' : 'Create';

	// Initialize the form using react-hook-form and zodResolver
	const form = useForm<ColorFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	});

	// Handle form submission
	const onSubmit = async (data: ColorFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/colors/${params.colorId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/colors`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/colors`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	// Handle deletion of color
	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
			router.refresh();
			router.push(`/${params.storeId}/colors`);
			toast.success('Color deleted.');
		} catch (error: any) {
			toast.error('Make sure you removed all products using this color first.');
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			{/* Render title, description, and delete button */}
			<div className='flex items-center justify-between'>
				<Heading
					title={title}
					description={description}
				/>
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
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<div className='md:grid md:grid-cols-3 gap-8'>
						{/* Form field for color name */}
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color Name</FormLabel>
									<span className='text-xs text-muted-foreground'>
										{'\u00A0'} (required)
									</span>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Navy Blue'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Form field for color value */}
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color Value</FormLabel>
									<span className='text-xs text-muted-foreground'>
										{'\u00A0'} (required)
									</span>
									<FormControl>
										<div className='flex items-center gap-x-4'>
											<Input
												disabled={loading}
												placeholder='#000080'
												{...field}
											/>
											<div
												className='border p-4 rounded-full'
												style={{ backgroundColor: field.value }}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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
