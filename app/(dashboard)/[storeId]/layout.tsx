import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin | Overview',
};

// Define the DashboardLayout component as an asynchronous function that takes props containing children and params.
export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	// Authenticate the user using Clerk's 'auth()' function.
	const { userId } = auth();

	// If the user is not authenticated, redirect to the sign-in page.
	if (!userId) {
		redirect('/sign-in');
	}

	// Attempt to find a store entry in the database.
	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	// If no store is found, redirect to the homepage.
	if (!store) {
		redirect('/');
	}

	// Render the Navbar component and the children components.
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
