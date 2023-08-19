import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { auth } from '@clerk/nextjs'; // Import auth from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'; // Import prismadb for database operations

// GET handler function for retrieving a specific category
export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		// Check if categoryId is provided
		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		// Retrieve the category with the provided categoryId, including its associated billboard
		const category = await prismadb.category.findUnique({
			where: {
				id: params.categoryId,
			},
			include: {
				billboard: true,
			},
		});

		// Return the retrieved category as JSON response
		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_GET]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}

// DELETE handler function for deleting a specific category
export async function DELETE(
	req: Request,
	{ params }: { params: { categoryId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get user ID from authentication

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if categoryId is provided
		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
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

		// Delete the specified category from the database
		const category = await prismadb.category.delete({
			where: {
				id: params.categoryId,
			},
		});

		// Return the deleted category as JSON response
		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_DELETE]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}

// PATCH handler function for updating a specific category
export async function PATCH(
	req: Request,
	{ params }: { params: { categoryId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get user ID from authentication

		const body = await req.json(); // Parse JSON from request body

		const { name, billboardId } = body; // Extract name and billboardId from the request body

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if billboardId and name are provided
		if (!billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		// Check if categoryId is provided
		if (!params.categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
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

		// Update the specified category in the database
		const category = await prismadb.category.update({
			where: {
				id: params.categoryId,
			},
			data: {
				name,
				billboardId,
			},
		});

		// Return the updated category as JSON response
		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_PATCH]', error); // Log error for debugging
		return new NextResponse('Internal error', { status: 500 }); // Return internal server error
	}
}
