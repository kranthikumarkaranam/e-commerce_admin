import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

// Define an asynchronous function named POST that takes a 'req' parameter representing the incoming request.
export async function POST(req: Request) {
	try {
		// Authenticate the user using Clerk's 'auth()' function.
		const { userId } = auth();

		// Parse the JSON content of the request.
		const body = await req.json();

		// Extract the 'name' property from the parsed request body.
		const { name } = body;

		// Check if the user is not authenticated (userId is falsy).
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		// Check if the 'name' property is missing in the request body.
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		// Create a new store entry in the database using the 'prismadb' instance.
		const store = await prismadb.store.create({
			data: {
				name,
				userId,
			},
		});

		// Return a JSON response containing the newly created store entry.
		return NextResponse.json(store);
	} catch (error) {
		// If an error occurs within the try block, log the error and return an internal server error response.
		console.log('[STORES_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
