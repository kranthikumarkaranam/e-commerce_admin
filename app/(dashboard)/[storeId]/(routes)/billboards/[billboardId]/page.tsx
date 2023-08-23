import prismadb from '@/lib/prismadb';

import { BillboardForm } from './components/billboard-form';

import { Billboard } from '@prisma/client';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Billboard',
};

// Define the 'BillboardPage' component which displays the form for a specific billboard.
const BillboardPage = async ({
	params,
}: {
	params: { billboardId: string }; // Route parameters containing the billboard ID
}) => {
	// Initialize 'data' to be either of type 'Billboard' or 'null'.
	let data: Billboard | null = null;

	// Check if the provided 'billboardId' is not 'new'.
	if (params.billboardId !== 'new') {
		// Fetch the specific billboard data using the 'billboardId'.
		const billboard = await prismadb.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});

		// Assign the fetched 'billboard' data to the 'data' variable.
		data = billboard;
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the 'BillboardForm' component with the fetched billboard data */}
				<BillboardForm initialData={data} />
			</div>
		</div>
	);
};

// Export the 'BillboardPage' component as the default export of this module.
export default BillboardPage;
