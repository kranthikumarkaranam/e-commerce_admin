'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Billboard, Category } from '@prisma/client';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

// Define the validation schema using Zod for the form fields
const formSchema = z.object({
	name: z.string().min(3, {
		message: 'Name must be atleast 3 characters.',
	}),
	billboardId: z.string().min(1, {
		message: 'Please choose atleast one.',
	}),
});

// Infer the type of form values from the Zod schema
type CategoryFormValues = z.infer<typeof formSchema>;

// Define the props interface for the CategoryForm component
interface CategoryFormProps {
	initialData: Category | null;
	billboards: Billboard[];
}

// Define the CategoryForm component
export const CategoryForm: React.FC<CategoryFormProps> = ({
	initialData,
	billboards,
}) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// Determine title, description, action text, and toast message based on whether it's an edit or create
	const title = initialData ? 'Edit category' : 'Create category';
	const description = initialData ? 'Edit a category.' : 'Add a new category';
	const toastMessage = initialData ? 'Category updated.' : 'Category created.';
	const action = initialData ? 'Save changes' : 'Create';

	// Create a useForm instance with Zod validation resolver and initial form values
	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			billboardId: '',
		},
	});

	// Handle form submission for both editing and creating categories
	const onSubmit = async (data: CategoryFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/categories/${params.categoryId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/categories`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	// Handle deletion of a category
	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(
				`/api/${params.storeId}/categories/${params.categoryId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success('Category deleted.');
		} catch (error: any) {
			toast.error(
				'Make sure you removed all products using this category first.'
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	// Render the CategoryForm component
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
					{/* Render the input fields */}
					<div className='md:grid md:grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category Name</FormLabel>
									<span className='text-xs text-muted-foreground'>
										{'\u00A0'} (required)
									</span>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Men's Fashion"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='billboardId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard</FormLabel>
									{/* Render the select control */}
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<span className='text-xs text-muted-foreground'>
											{'\u00A0'} (required)
										</span>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a billboard'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{/* Render the select options */}
											{billboards.length === 0 ? (
												<SelectItem
													value=''
													disabled
												>
													No billboards found.
												</SelectItem>
											) : (
												billboards.map((billboard) => (
													<SelectItem
														key={billboard.id}
														value={billboard.id}
													>
														{billboard.label}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>
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
