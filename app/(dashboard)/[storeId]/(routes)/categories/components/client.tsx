'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/non-shadcn-ui/data-table';
import { Heading } from '@/components/ui/non-shadcn-ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiAlert } from '@/components/ui/non-shadcn-ui/api-alert';

import { columns, CategoryColumn } from './columns';
import { ApiList } from '@/components/ui/non-shadcn-ui/api-list';

// Define the CategoriesClient component
interface CategoriesClientProps {
	data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			{/* Display the title and "Add New" button */}
			<div className='flex items-center justify-between'>
				<Heading
					title={`Categories (${data.length})`}
					description='Manage categories for your store'
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/categories/new`)}
				>
					<Plus className='mr-2 h-4 w-4' /> Add New
				</Button>
			</div>
			<Separator />
			{/* Display the data table of categories */}
			<DataTable
				searchKey='name'
				columns={columns}
				data={data}
			/>
			{/* Display section title for API Calls */}
			<Heading
				title='API'
				description='API Calls for Categories'
			/>
			<Separator />
			{/* Display the list of API calls for categories */}
			<ApiList
				entityName='categories'
				entityIdName='categoryId'
			/>
		</>
	);
};
