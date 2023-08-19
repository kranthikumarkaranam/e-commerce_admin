import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import StoreSwitcher from '@/components/store-switcher';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import prismadb from '@/lib/prismadb';

// Define the Navbar functional component
const Navbar = async () => {
	const { userId } = auth(); // Get the authenticated user's ID from Clerk's auth

	if (!userId) {
		redirect('/sign-in'); // If user is not authenticated, redirect to the sign-in page
	}

	const stores = await prismadb.store.findMany({
		where: {
			userId,
		},
	}); // Fetch the user's stores from the database

	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<StoreSwitcher items={stores} />{' '}
				{/* Render the StoreSwitcher component with fetched stores */}
				<MainNav className='mx-6' /> {/* Render the MainNav component */}
				<div className='ml-auto flex items-center space-x-4'>
					<ThemeToggle /> {/* Render the ThemeToggle component */}
					<UserButton afterSignOutUrl='/' />{' '}
					{/* Render the UserButton component with sign-out redirection */}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
