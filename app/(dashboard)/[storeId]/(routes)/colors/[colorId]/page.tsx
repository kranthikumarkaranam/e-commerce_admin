import prismadb from '@/lib/prismadb';

// Import the 'ColorForm' component from the './components/color-form' path.
import { ColorForm } from './components/color-form';
import { Color } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Color',
};

// Define the 'ColorPage' component as an asynchronous function that takes 'params' as an argument.
const ColorPage = async ({ params }: { params: { colorId: string } }) => {
	// Initialize 'data' to be either of type 'Color' or 'null'.
	let data: Color | null = null;

	// Check if the provided 'colorId' is not 'new'.
	if (params.colorId !== 'new') {
		// Use 'prismadb' to retrieve a color record by its unique ID.
		const color = await prismadb.color.findUnique({
			where: {
				id: params.colorId,
			},
		});
		// Assign the fetched 'color' data to the 'data' variable.
		data = color;
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the 'ColorForm' component with initial data passed as a prop. */}
				<ColorForm initialData={data} />
			</div>
		</div>
	);
};

export default ColorPage;
