import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';

// Import the 'ColorColumn' type from the './components/columns' path
import { ColorColumn } from './components/columns';
// Import the 'ColorClient' component from the './components/client' path
import { ColorClient } from './components/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Colors',
};

// Define the 'ColorsPage' component as an asynchronous function that takes 'params' as an argument
const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
	// Use 'prismadb' to retrieve a list of colors for a specific store
	const colors = await prismadb.color.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc', // Order colors by creation date in descending order
		},
	});

	// Format the retrieved colors for display
	const formattedColors: ColorColumn[] = colors.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'), // Format the creation date
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the 'ColorClient' component with the formatted color data */}
				<ColorClient data={formattedColors} />
			</div>
		</div>
	);
};

export default ColorsPage;
