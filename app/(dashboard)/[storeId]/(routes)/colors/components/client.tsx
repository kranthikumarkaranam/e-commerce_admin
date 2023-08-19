'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/non-shadcn-ui/data-table';
import { Heading } from '@/components/ui/non-shadcn-ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/non-shadcn-ui/api-list';

import { columns, ColorColumn } from './columns';

// Define the props interface for the ColorClient component
interface ColorClientProps {
	data: ColorColumn[];
}

// Define the ColorClient component
export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
	// Initialize router and params using Next.js hooks
	const params = useParams();
	const router = useRouter();

	// Render the component
	return (
		<>
			{/* Heading and "Add New" button */}
			<div className='flex items-center justify-between'>
				{/* Display heading with dynamic data length and description */}
				<Heading
					title={`Colors (${data.length})`}
					description='Manage colors for your products'
				/>
				{/* Button for adding a new color */}
				<Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
					<Plus className='mr-2 h-4 w-4' /> Add New
				</Button>
			</div>
			<Separator />
			{/* DataTable to display color data */}
			<DataTable
				searchKey='name' // Specify the search key for filtering
				columns={columns} // Provide the table columns configuration
				data={data} // Pass the color data to display
			/>
			{/* Heading and separator for API section */}
			<Heading
				title='API'
				description='API Calls for Colors'
			/>
			<Separator />
			{/* Display a list of API calls related to colors */}
			<ApiList
				entityName='colors' // Name of the entity (for display)
				entityIdName='colorId' // Name of the entity ID field (for display)
			/>
		</>
	);
};
