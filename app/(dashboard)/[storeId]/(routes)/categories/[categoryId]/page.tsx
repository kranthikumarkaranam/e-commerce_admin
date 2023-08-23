import prismadb from '@/lib/prismadb';

import { CategoryForm } from './components/category-form';
import { Category } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Category',
};

// Define the CategoryPage component
const CategoryPage = async ({
	params,
}: {
	params: { categoryId: string; storeId: string };
}) => {
	// Initialize 'data' to be either of type 'Category' or 'null'.
	let data: Category | null = null;

	// Check if the provided 'categoryId' is not 'new'.
	if (params.categoryId !== 'new') {
		// Fetch the category data based on the provided categoryId
		const category = await prismadb.category.findUnique({
			where: {
				id: params.categoryId,
			},
		});

		// Assign the fetched 'category' data to the 'data' variable.
		data = category;
	}

	// Fetch the list of billboards for the specified storeId
	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	// Render the CategoryPage component
	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the CategoryForm component with billboards and data */}
				<CategoryForm
					billboards={billboards}
					initialData={data}
				/>
			</div>
		</div>
	);
};

export default CategoryPage;
