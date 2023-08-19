import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe'; // Importing Stripe API client
import prismadb from '@/lib/prismadb'; // Importing database client (Prisma)

// Handling the POST request
export async function POST(req: Request) {
	const body = await req.text(); // Getting the request body as text
	const signature = headers().get('Stripe-Signature') as string; // Extracting Stripe signature

	let event: Stripe.Event;

	try {
		// Constructing Stripe event using the received body, signature, and webhook secret
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error: any) {
		// Handling error in case of invalid webhook data
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
	}

	// Extracting checkout session and address details from the event
	const session = event.data.object as Stripe.Checkout.Session;
	const address = session?.customer_details?.address;

	// Constructing address string from address components
	const addressComponents = [
		address?.line1,
		address?.line2,
		address?.city,
		address?.state,
		address?.postal_code,
		address?.country,
	];
	const addressString = addressComponents.filter((c) => c !== null).join(', ');

	if (event.type === 'checkout.session.completed') {
		// Handling the event when checkout is completed

		// Updating the order in the database as paid and including address and phone details
		const order = await prismadb.order.update({
			where: {
				id: session?.metadata?.orderId,
			},
			data: {
				isPaid: true,
				address: addressString,
				phone: session?.customer_details?.phone || '',
			},
			include: {
				orderItems: true,
			},
		});

		// Extracting product IDs from the order's orderItems
		const productIds = order.orderItems.map((orderItem) => orderItem.productId);

		// Updating multiple products in the database to be archived
		await prismadb.product.updateMany({
			where: {
				id: {
					in: [...productIds],
				},
			},
			data: {
				isArchived: true,
			},
		});
	}

	// Sending a successful response
	return new NextResponse(null, { status: 200 });
}
