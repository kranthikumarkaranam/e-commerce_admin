import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

// GET handler function for retrieving a size by its id
export async function GET(
	req: Request,
	{ params }: { params: { sizeId: string } }
) {
	try {
		// Check if sizeId is provided
		if (!params.sizeId) {
			return new NextResponse('Size id is required', { status: 400 });
		}

		// Retrieve the size with the provided sizeId from the database
		const size = await prismadb.size.findUnique({
			where: {
				id: params.sizeId,
			},
		});

		// Return the retrieved size as a JSON response
		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// DELETE handler function for deleting a size by its id
export async function DELETE(
	req: Request,
	{ params }: { params: { sizeId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if sizeId is provided
		if (!params.sizeId) {
			return new NextResponse('Size id is required', { status: 400 });
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

		// Delete the size with the provided sizeId from the database
		const size = await prismadb.size.delete({
			where: {
				id: params.sizeId,
			},
		});

		// Return the deleted size as a JSON response
		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// PATCH handler function for updating a size by its id
export async function PATCH(
	req: Request,
	{ params }: { params: { sizeId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID

		const body = await req.json(); // Parse the request body

		const { name, value } = body; // Destructure properties from the body

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if sizeId is provided
		if (!params.sizeId) {
			return new NextResponse('Size id is required', { status: 400 });
		}

		// Check if required fields are provided
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
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

		// Update the size with the provided sizeId in the database
		const size = await prismadb.size.update({
			where: {
				id: params.sizeId,
			},
			data: {
				name,
				value,
			},
		});

		// Return the updated size as a JSON response
		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
