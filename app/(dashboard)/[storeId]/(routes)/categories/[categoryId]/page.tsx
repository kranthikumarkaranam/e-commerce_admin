import prismadb from '@/lib/prismadb';

import { CategoryForm } from './components/category-form';

// Define the CategoryPage component
const CategoryPage = async ({
	params,
}: {
	params: { categoryId: string; storeId: string };
}) => {
	// Fetch the category data based on the provided categoryId
	const category = await prismadb.category.findUnique({
		where: {
			id: params.categoryId,
		},
	});

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
				{/* Render the CategoryForm component with billboards and initialData */}
				<CategoryForm
					billboards={billboards}
					initialData={category}
				/>
			</div>
		</div>
	);
};

export default CategoryPage;
