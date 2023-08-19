'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react'; // Import Moon and Sun icons from Lucide
import { useTheme } from 'next-themes'; // Import useTheme hook from next-themes

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define the ThemeToggle functional component
export function ThemeToggle() {
	const { setTheme } = useTheme(); // Use the useTheme hook to access theme-related functions

	return (
		<DropdownMenu>
			{/* Dropdown menu container */}
			<DropdownMenuTrigger asChild>
				{/* Trigger element */}
				<Button
					variant='outline'
					size='icon'
				>
					{/* Button with icons */}
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />{' '}
					{/* Sun icon for light theme */}
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />{' '}
					{/* Moon icon for dark theme */}
					<span className='sr-only'>Toggle theme</span>{' '}
					{/* Screen reader-only label */}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{/* Dropdown content */}
				<DropdownMenuItem onClick={() => setTheme('light')}>
					{/* Light theme option */}
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					{/* Dark theme option */}
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					{/* System theme option */}
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
