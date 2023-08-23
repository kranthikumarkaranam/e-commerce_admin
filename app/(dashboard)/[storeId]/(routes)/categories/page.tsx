// Import the format function from the date-fns library
import { format } from 'date-fns';

// Import the prismadb instance for database access
import prismadb from '@/lib/prismadb';

// Import the CategoryColumn type and the CategoriesClient component
import { CategoryColumn } from './components/columns';
import { CategoriesClient } from './components/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Categories',
};

// Define the CategoriesPage component
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
	// Fetch categories data from the database including associated billboards
	const categories = await prismadb.category.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			billboard: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// Format the fetched categories data for display
	const formattedCategories: CategoryColumn[] = categories.map((item) => ({
		id: item.id,
		name: item.name,
		billboardLabel: item.billboard.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'), // Format the creation date
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the CategoriesClient component with the formatted category data */}
				<CategoriesClient data={formattedCategories} />
			</div>
		</div>
	);
};

export default CategoriesPage;
