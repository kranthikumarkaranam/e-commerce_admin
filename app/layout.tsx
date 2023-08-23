import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import { ModalProvider } from '@/providers/modal-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css'; // Importing global styles

// Load the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata = {
	title: 'E-Commerce Admin Dashboard',
	description:
		'Elevate your e-commerce business with our intuitive Admin Dashboard. Gain real-time insights into sales, inventory, and customer behavior. Streamline operations and drive growth today.',
};

// Root layout component
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
					>
						<ToastProvider /> {/* Providing toast notifications */}
						<ModalProvider /> {/* Providing modal dialogs */}
						{children} {/* Render the main content */}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
