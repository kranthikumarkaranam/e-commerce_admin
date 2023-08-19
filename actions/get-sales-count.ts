import prismadb from '@/lib/prismadb'; // Import the prismadb library for database access

// Define an asynchronous function 'getSalesCount'
export const getSalesCount = async (storeId: string) => {
	// Retrieve the count of paid orders for the given store from the database
	const salesCount = await prismadb.order.count({
		where: {
			storeId,
			isPaid: true,
		},
	});

	return salesCount; // Return the count of paid orders
};
