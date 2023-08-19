import prismadb from '@/lib/prismadb'; // Import the prismadb library for database access

// Define an asynchronous function 'getStockCount'
export const getStockCount = async (storeId: string) => {
	// Retrieve the count of active products (not archived) for the given store from the database
	const stockCount = await prismadb.product.count({
		where: {
			storeId,
			isArchived: false,
		},
	});

	return stockCount; // Return the count of active products (stock count)
};
