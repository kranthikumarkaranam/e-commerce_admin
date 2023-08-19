import Stripe from 'stripe'; // Import Stripe library
import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'

import { stripe } from '@/lib/stripe'; // Import stripe instance for API calls
import prismadb from '@/lib/prismadb'; // Import prismadb for database operations

// Define CORS headers for preflight requests
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS handler function for handling preflight requests
export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}

// POST handler function for creating a new order and Stripe checkout session
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	// Parse productIds from the request body
	const { productIds } = await req.json();

	// Check if productIds are provided
	if (!productIds || productIds.length === 0) {
		return new NextResponse('Product ids are required', { status: 400 });
	}

	// Retrieve products from the database based on the provided productIds
	const products = await prismadb.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	});

	// Initialize an array to store line items for the Stripe session
	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

	// Iterate over products to create line items for the Stripe session
	products.forEach((product) => {
		line_items.push({
			quantity: 1,
			price_data: {
				currency: 'USD',
				product_data: {
					name: product.name,
				},
				unit_amount: product.price.toNumber() * 100,
			},
		});
	});

	// Create a new order in the database with provided information
	const order = await prismadb.order.create({
		data: {
			storeId: params.storeId,
			isPaid: false,
			orderItems: {
				create: productIds.map((productId: string) => ({
					product: {
						connect: {
							id: productId,
						},
					},
				})),
			},
		},
	});

	// Create a new Stripe checkout session
	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		billing_address_collection: 'required',
		phone_number_collection: {
			enabled: true,
		},
		success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
		cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
		metadata: {
			orderId: order.id,
		},
	});

	// Return the session URL as a JSON response with CORS headers
	return NextResponse.json(
		{ url: session.url },
		{
			headers: corsHeaders,
		}
	);
}
