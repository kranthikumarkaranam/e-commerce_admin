'use client';

import * as React from 'react'; // Import React library
import { ThemeProvider as NextThemesProvider } from 'next-themes'; // Import ThemeProvider from next-themes
import { type ThemeProviderProps } from 'next-themes/dist/types'; // Import ThemeProviderProps type from next-themes

// Define a custom ThemeProvider component
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	// This component takes in children and additional props
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
	// Render NextThemesProvider with the passed props and children
}
