import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { auth } from '@clerk/nextjs'; // Import auth function from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'; // Import prismadb for database operations

// GET handler function for retrieving a specific color by its ID
export async function GET(
	req: Request,
	{ params }: { params: { colorId: string } }
) {
	try {
		// Check if colorId is provided
		if (!params.colorId) {
			return new NextResponse('Color id is required', { status: 400 });
		}

		// Retrieve the color from the database based on the provided colorId
		const color = await prismadb.color.findUnique({
			where: {
				id: params.colorId,
			},
		});

		// Return the retrieved color as a JSON response
		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLOR_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// DELETE handler function for deleting a specific color
export async function DELETE(
	req: Request,
	{ params }: { params: { colorId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if colorId is provided
		if (!params.colorId) {
			return new NextResponse('Color id is required', { status: 400 });
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

		// Delete the color from the database based on the provided colorId
		const color = await prismadb.color.delete({
			where: {
				id: params.colorId,
			},
		});

		// Return the deleted color as a JSON response
		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLOR_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// PATCH handler function for updating a specific color
export async function PATCH(
	req: Request,
	{ params }: { params: { colorId: string; storeId: string } }
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

		// Check if colorId is provided
		if (!params.colorId) {
			return new NextResponse('Color id is required', { status: 400 });
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

		// Update the color in the database based on the provided colorId
		const color = await prismadb.color.update({
			where: {
				id: params.colorId,
			},
			data: {
				name,
				value,
			},
		});

		// Return the updated color as a JSON response
		return NextResponse.json(color);
	} catch (error) {
		console.log('[COLOR_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
