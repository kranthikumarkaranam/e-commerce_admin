import prismadb from '@/lib/prismadb';

import { ProductForm } from './components/product-form';
import { Image, Product } from '@prisma/client';

const ProductPage = async ({
	params,
}: {
	params: { productId: string; storeId: string };
}) => {
	//  Extend the 'Product' interface with 'Image' like this
	interface ExtendedProduct extends Product {
		images: Image[];
	}

	// Initialize 'data' to be either of type 'ExtendedProduct' or 'null'.
	let data: ExtendedProduct | null = null;

	// Check if the provided 'productId' is not 'new'.
	if (params.productId !== 'new') {
		const product = await prismadb.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
			},
		});

		// Assign the fetched 'product' data to the 'data' variable.
		data = product;
	}

	const categories = await prismadb.category.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	const sizes = await prismadb.size.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	const colors = await prismadb.color.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ProductForm
					categories={categories}
					colors={colors}
					sizes={sizes}
					initialData={data}
				/>
			</div>
		</div>
	);
};

export default ProductPage;
