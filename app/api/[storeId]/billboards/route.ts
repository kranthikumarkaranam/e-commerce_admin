import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { auth } from '@clerk/nextjs'; // Import auth from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'; // Import prismadb for database operations

// POST handler function for creating a new billboard
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth(); // Get user ID from authentication

		const body = await req.json(); // Parse JSON from request body

		const { label, imageUrl } = body; // Extract label and imageUrl from the request body

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if label and imageUrl are provided
		if (!label) {
			return new NextResponse('Label is required', { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse('Image URL is required', { status: 400 });
		}

		// Check if storeId is provided
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Find the store associated with the user's userId and provided storeId
		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		// If no store is found for the user, return unauthorized response
		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		// Create a new billboard record in the database
		const billboard = await prismadb.billboard.create({
			data: {
				label,
				imageUrl,
				storeId: params.storeId,
			},
		});

		// Return the created billboard as JSON response
		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARDS_POST]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}

// GET handler function for retrieving billboards
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// Check if storeId is provided
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Retrieve all billboards associated with the provided storeId
		const billboards = await prismadb.billboard.findMany({
			where: {
				storeId: params.storeId,
			},
		});

		// Return retrieved billboards as JSON response
		return NextResponse.json(billboards);
	} catch (error) {
		console.log('[BILLBOARDS_GET]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}
