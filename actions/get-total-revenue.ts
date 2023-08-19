import prismadb from '@/lib/prismadb'; // Import the prismadb library for database access

// Define an asynchronous function 'getTotalRevenue'
export const getTotalRevenue = async (storeId: string) => {
	// Retrieve paid orders with associated order items and products from the database
	const paidOrders = await prismadb.order.findMany({
		where: {
			storeId,
			isPaid: true,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
	});

	// Calculate the total revenue by summing up order item prices
	const totalRevenue = paidOrders.reduce((total, order) => {
		// Calculate the total revenue for each order
		const orderTotal = order.orderItems.reduce((orderSum, item) => {
			return orderSum + item.product.price.toNumber(); // Convert product price to a number and sum
		}, 0);

		// Accumulate the order's total revenue to the overall total
		return total + orderTotal;
	}, 0);

	return totalRevenue; // Return the calculated total revenue
};
