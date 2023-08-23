import prismadb from '@/lib/prismadb';

import { SizeForm } from './components/size-form';
import { Size } from '@prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Size',
};

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
	// Initialize 'data' to be either of type 'Size' or 'null'.
	let data: Size | null = null;

	// Check if the provided 'sizeId' is not 'new'.
	if (params.sizeId !== 'new') {
		const size = await prismadb.size.findUnique({
			where: {
				id: params.sizeId,
			},
		});

		// Assign the fetched 'size' data to the 'data' variable.
		data = size;
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeForm initialData={data} />
			</div>
		</div>
	);
};

export default SizePage;
