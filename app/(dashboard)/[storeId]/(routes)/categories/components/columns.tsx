'use client';

import { ColumnDef } from '@tanstack/react-table';

// Import the CellAction component for rendering action buttons
import { CellAction } from './cell-action';

// Define the structure of the CategoryColumn type
export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

// Define the columns for the category data table
export const columns: ColumnDef<CategoryColumn>[] = [
	// Column for displaying category names
	{
		accessorKey: 'name',
		header: 'Name',
	},
	// Column for displaying associated billboard labels
	{
		accessorKey: 'billboard',
		header: 'Billboard',
		// Custom cell rendering to display billboard label
		cell: ({ row }) => row.original.billboardLabel,
	},
	// Column for displaying creation dates
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	// Column for displaying action buttons using the CellAction component
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
