import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'

import prismadb from '@/lib/prismadb'; // Import prismadb for database operations
import { auth } from '@clerk/nextjs'; // Import auth function from '@clerk/nextjs'

// POST handler function for creating a new color
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID

		const body = await req.json(); // Parse the request body

		const { name, value } = body; // Destructure name and value from the body

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if name and value are provided
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
		}

		// Check if storeId is provided
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Find the store associated with the authenticated user
		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		// Check if the store exists and is associated with the user
		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		// Create a new color in the database with provided information
		const color = await prismadb.color.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});

		// Return the newly created color as a JSON response
		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLORS_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// GET handler function for retrieving colors associated with a store
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// Check if storeId is provided
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Retrieve colors from the database based on the provided storeId
		const colors = await prismadb.color.findMany({
			where: {
				storeId: params.storeId,
			},
		});

		// Return the retrieved colors as a JSON response
		return NextResponse.json(colors);
	} catch (error) {
		console.log('[COLORS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
