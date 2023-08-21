import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { auth } from '@clerk/nextjs'; // Import auth function from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'; // Import prismadb for database operations

// GET handler function for retrieving a specific product
export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		// Check if productId is provided
		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		// Retrieve the product with related data from the database
		const product = await prismadb.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				size: true,
				color: true,
			},
		});

		// Return the retrieved product as a JSON response
		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// DELETE handler function for deleting a specific product
export async function DELETE(
	req: Request,
	{ params }: { params: { productId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if productId is provided
		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
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

		// Delete the product from the database
		const product = await prismadb.product.delete({
			where: {
				id: params.productId,
			},
		});

		// Return the deleted product as a JSON response
		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

// PATCH handler function for updating a specific product
export async function PATCH(
	req: Request,
	{ params }: { params: { productId: string; storeId: string } }
) {
	try {
		const { userId } = auth(); // Get the authenticated user's ID

		const body = await req.json(); // Parse the request body

		const {
			name,
			price,
			categoryId,
			images,
			colorId,
			sizeId,
			isFeatured,
			isArchived,
		} = body; // Destructure properties from the body

		// Check if the user is authenticated
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// Check if productId is provided
		if (!params.productId) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		// Check if required fields are provided
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 });
		}

		if (!price) {
			return new NextResponse('Price is required', { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		if (!colorId) {
			return new NextResponse('Color id is required', { status: 400 });
		}

		if (!sizeId) {
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

		// Update the product in the database by deleting all images first
		await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name,
				price,
				categoryId,
				colorId,
				sizeId,
				images: {
					deleteMany: {},
				},
				isFeatured,
				isArchived,
			},
		});

		// Later, Update the product's images in the database with the new images
		const product = await prismadb.product.update({
			where: {
				id: params.productId,
			},
			data: {
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		// Return the updated product as a JSON response
		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
