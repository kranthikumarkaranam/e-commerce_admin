import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { auth } from '@clerk/nextjs'; // Import auth from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'; // Import prismadb for database operations

// POST handler function for creating a new category
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth(); // Get user ID from authentication

		const body = await req.json(); // Parse JSON from request body

		const { name, billboardId } = body; // Extract name and billboardId from the request body

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if name and billboardId are provided
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
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

		// Create a new category in the database
		const category = await prismadb.category.create({
			data: {
				name,
				billboardId,
				storeId: params.storeId,
			},
		});

		// Return the created category as JSON response
		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORIES_POST]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}

// GET handler function for retrieving categories associated with a specific store
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// Check if storeId is provided
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Retrieve categories from the database based on the provided storeId
		const categories = await prismadb.category.findMany({
			where: {
				storeId: params.storeId,
			},
		});

		// Return the retrieved categories as JSON response
		return NextResponse.json(categories);
	} catch (error) {
		console.log('[CATEGORIES_GET]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}
