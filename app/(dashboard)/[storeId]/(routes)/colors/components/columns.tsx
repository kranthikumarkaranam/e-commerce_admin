'use client';

import { ColumnDef } from '@tanstack/react-table';

// Import the CellAction component for handling cell actions
import { CellAction } from './cell-action';

// Define the shape of a color column
export type ColorColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

// Define the columns configuration for the data table
export const columns: ColumnDef<ColorColumn>[] = [
	// Column for displaying the color name
	{
		accessorKey: 'name',
		header: 'Name', // Displayed as column header
	},
	// Column for displaying the color value and a color swatch
	{
		accessorKey: 'value',
		header: 'Value', // Displayed as column header
		cell: ({ row }) => (
			<div className='flex items-center gap-x-2'>
				{row.original.value}
				{/* Display a colored circle using the color value */}
				<div
					className='h-6 w-6 rounded-full border'
					style={{ backgroundColor: row.original.value }}
				/>
			</div>
		),
	},
	// Column for displaying the creation date of the color
	{
		accessorKey: 'createdAt',
		header: 'Date', // Displayed as column header
	},
	// Column for displaying cell actions using the CellAction component
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />, // Pass the row's original data to the CellAction component
	},
];
