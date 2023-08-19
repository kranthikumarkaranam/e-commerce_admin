import prismadb from '@/lib/prismadb';

// Import the 'BillboardForm' component from the 'components/billboard-form' module.
import { BillboardForm } from './components/billboard-form';

// Define the 'BillboardPage' component which displays the form for a specific billboard.
const BillboardPage = async ({
	params,
}: {
	params: { billboardId: string }; // Route parameters containing the billboard ID
}) => {
	// Fetch the specific billboard data using the 'billboardId'.
	const billboard = await prismadb.billboard.findUnique({
		where: {
			id: params.billboardId, // Use the provided billboard ID from the route parameters
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the 'BillboardForm' component with the fetched billboard data */}
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
};

export default BillboardPage;
