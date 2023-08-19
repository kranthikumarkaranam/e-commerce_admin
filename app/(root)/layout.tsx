import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

// Define the SetupLayout component as an asynchronous function that takes 'children' as a prop.
export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Authenticate the user using Clerk's 'auth()' function.
	const { userId } = auth();

	// If the user is not authenticated, redirect to the sign-in page.
	if (!userId) {
		redirect('/sign-in');
	}

	// Find a store associated with the current user.
	const store = await prismadb.store.findFirst({
		where: {
			userId,
		},
	});

	// If a store is found, redirect to its specific page.
	if (store) {
		redirect(`/${store.id}`);
	}

	// Return the children components passed to the SetupLayout.
	return <>{children}</>;
}
