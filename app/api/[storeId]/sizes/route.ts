import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

// POST handler function for creating a new size
export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID

		const body = await req.json(); // Parse the request body

		const { name, value } = body; // Destructure properties from the body

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if the required fields are provided
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

		// Create a new size in the database
		const size = await prismadb.size.create({
			data: {
				name,
				value,
				storeId: params.storeId,
			},
		});

		// Return the created size as a JSON response
		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZES_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// GET handler function for retrieving sizes associated with a store
export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// Check if storeId is provided
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		// Retrieve sizes associated with the provided storeId from the database
		const sizes = await prismadb.size.findMany({
			where: {
				storeId: params.storeId,
			},
		});

		// Return the retrieved sizes as a JSON response
		return NextResponse.json(sizes);
	} catch (error) {
		console.log('[SIZES_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
