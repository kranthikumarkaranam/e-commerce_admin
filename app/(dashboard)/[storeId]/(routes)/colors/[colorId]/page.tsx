import prismadb from '@/lib/prismadb';

// Import the 'ColorForm' component from the './components/color-form' path.
import { ColorForm } from './components/color-form';

// Define the 'ColorPage' component as an asynchronous function that takes 'params' as an argument.
const ColorPage = async ({ params }: { params: { colorId: string } }) => {
	// Use 'prismadb' to retrieve a color record by its unique ID.
	const color = await prismadb.color.findUnique({
		where: {
			id: params.colorId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				{/* Render the 'ColorForm' component with initial data passed as a prop. */}
				<ColorForm initialData={color} />
			</div>
		</div>
	);
};

export default ColorPage;
