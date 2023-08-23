// Import the 'format' function from the 'date-fns' library for date formatting.
import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { BillboardColumn } from './components/columns';
import { BillboardClient } from './components/client';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Billboards',
};

// Define the 'BillboardsPage' functional component which takes 'params' as a prop.
const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
	// Fetch a list of billboards from the database for the given store ID.
	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// Format the fetched billboards into a new array with required fields.
	const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
		id: item.id,
		label: item.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'), // Format the creation date of the billboard.
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the BillboardClient component and pass in the formatted billboard data */}
				<BillboardClient data={formattedBillboards} />
			</div>
		</div>
	);
};

export default BillboardsPage;
