'use client';

// 'ColumnDef' is imported from the '@tanstack/react-table' module.
import { ColumnDef } from '@tanstack/react-table';
// 'CellAction' is imported from the local 'cell-action' module.
import { CellAction } from './cell-action';

// Define the type for the data structure of each billboard column.
export type BillboardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

// Define an array of column configurations for a table using 'ColumnDef'.
export const columns: ColumnDef<BillboardColumn>[] = [
	{
		// Configure the column to display the 'label' property.
		accessorKey: 'label',
		header: 'Label', // Set the column header text.
	},
	{
		// Configure the column to display the 'createdAt' property.
		accessorKey: 'createdAt',
		header: 'Date', // Set the column header text.
	},
	{
		// Configure a custom column with an 'id' and 'cell' property.
		id: 'actions', // Column identifier.
		// Define a rendering function for the cell content.
		cell: ({ row }) => <CellAction data={row.original} />, // Render the 'CellAction' component.
	},
];
