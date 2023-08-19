import { NextResponse } from 'next/server'; // Import NextResponse from next/server
import { auth } from '@clerk/nextjs'; // Import authentication function from Clerk

import prismadb from '@/lib/prismadb'; // Import the prismadb instance

// PATCH endpoint to update store data
export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID using Clerk's auth()

		const body = await req.json(); // Parse the request body
		const { name } = body; // Extract the 'name' field from the body

		// Check if the user is not authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 }); // Return forbidden status
		}

		// Check if the 'name' field is missing
		if (!name) {
			return new NextResponse('Name is required', { status: 400 }); // Return bad request status
		}

		// Check if the 'storeId' parameter is missing
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 }); // Return bad request status
		}

		// Update the store using prismadb
		const store = await prismadb.store.updateMany({
			where: {
				id: params.storeId,
				userId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(store); // Return the updated store data as JSON
	} catch (error) {
		console.log('[STORE_PATCH]', error); // Log the error
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error status
	}
}

// DELETE endpoint to delete a store
export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID using Clerk's auth()

		// Check if the user is not authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 }); // Return forbidden status
		}

		// Check if the 'storeId' parameter is missing
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 }); // Return bad request status
		}

		// Delete the store using prismadb
		const store = await prismadb.store.deleteMany({
			where: {
				id: params.storeId,
				userId,
			},
		});

		return NextResponse.json(store); // Return the deleted store data as JSON
	} catch (error) {
		console.log('[STORE_DELETE]', error); // Log the error
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error status
	}
}
