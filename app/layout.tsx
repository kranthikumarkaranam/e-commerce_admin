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
	title: 'Dashboard',
	description: 'E-Commerce Dashboard',
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
