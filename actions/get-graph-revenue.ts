import prismadb from '@/lib/prismadb'; // Import the prismadb library for database access

// Define an interface for the graph data structure
interface GraphData {
	name: string; // Month's name
	total: number; // Total revenue for the month
}

// Define an asynchronous function 'getGraphRevenue'
export const getGraphRevenue = async (
	storeId: string
): Promise<GraphData[]> => {
	// Fetch paid orders from the database for the given store
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

	// Initialize an object to hold monthly revenue
	const monthlyRevenue: { [key: number]: number } = {};

	// Grouping the orders by month and summing the revenue
	for (const order of paidOrders) {
		const month = order.createdAt.getMonth(); // Extract the month (0 for Jan, 1 for Feb, ...)
		let revenueForOrder = 0;

		// Calculate the revenue for each item in the order
		for (const item of order.orderItems) {
			revenueForOrder += item.product.price.toNumber();
		}

		// Adding the revenue for this order to the respective month
		monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
	}

	// Converting the grouped data into the format expected by the graph
	const graphData: GraphData[] = [
		{ name: 'Jan', total: 0 },
		{ name: 'Feb', total: 0 },
		{ name: 'Mar', total: 0 },
		{ name: 'Apr', total: 0 },
		{ name: 'May', total: 0 },
		{ name: 'Jun', total: 0 },
		{ name: 'Jul', total: 0 },
		{ name: 'Aug', total: 0 },
		{ name: 'Sep', total: 0 },
		{ name: 'Oct', total: 0 },
		{ name: 'Nov', total: 0 },
		{ name: 'Dec', total: 0 },
	];

	// Filling in the revenue data from the grouped monthly data
	for (const month in monthlyRevenue) {
		graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
	}

	return graphData; // Return the formatted graph data
};
