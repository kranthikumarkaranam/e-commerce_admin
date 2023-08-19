import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { auth } from '@clerk/nextjs'; // Import auth from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'; // Import prismadb for database operations

// GET handler function for retrieving a specific billboard
export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		// Check if billboardId is provided
		if (!params.billboardId) {
			return new NextResponse('Billboard id is required', { status: 400 });
		}

		// Retrieve the billboard with the provided billboardId
		const billboard = await prismadb.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});

		// Return the retrieved billboard as JSON response
		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_GET]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}

// DELETE handler function for deleting a specific billboard
export async function DELETE(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get user ID from authentication

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if billboardId is provided
		if (!params.billboardId) {
			return new NextResponse('Billboard id is required', { status: 400 });
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

		// Delete the specified billboard from the database
		const billboard = await prismadb.billboard.delete({
			where: {
				id: params.billboardId,
			},
		});

		// Return the deleted billboard as JSON response
		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_DELETE]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}

// PATCH handler function for updating a specific billboard
export async function PATCH(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } }
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

		// Check if billboardId is provided
		if (!params.billboardId) {
			return new NextResponse('Billboard id is required', { status: 400 });
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

		// Update the specified billboard in the database
		const billboard = await prismadb.billboard.update({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageUrl,
			},
		});

		// Return the updated billboard as JSON response
		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_PATCH]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}
