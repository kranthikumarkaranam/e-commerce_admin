'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';

// Import the column configurations defined in the 'columns' module.
import { columns, BillboardColumn } from './columns';

// Define the props interface for the BillboardClient component.
interface BillboardClientProps {
	data: BillboardColumn[]; // Array of billboard data.
}

// Define the BillboardClient component using the 'BillboardClientProps' interface.
export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
	// Get route parameters and router instance using hooks.
	const params = useParams();
	const router = useRouter();

	return (
		<>
			{/* Section for managing billboards */}
			<div className='flex items-center justify-between'>
				{/* Display heading with title and description */}
				<Heading
					title={`Billboards (${data.length})`}
					description='Manage billboards for your store'
				/>
				{/* Button to add a new billboard */}
				<Button
					onClick={() => router.push(`/${params.storeId}/billboards/new`)}
				>
					<Plus className='mr-2 h-4 w-4' /> Add New
				</Button>
			</div>
			{/* Add a separator for visual separation */}
			<Separator />

			{/* Display the data table */}
			<DataTable
				searchKey='label' // Key to use for searching within the data
				columns={columns} // Use the defined columns configuration
				data={data} // Pass in the billboard data
			/>

			{/* Section for displaying API information */}
			<Heading
				title='API'
				description='API Calls for Billboards'
			/>
			<Separator />
			{/* Display the list of API calls related to billboards */}
			<ApiList
				entityName='billboards' // Name of the entity for API calls
				entityIdName='billboardId' // Name of the entity ID used in API calls
			/>
		</>
	);
};
