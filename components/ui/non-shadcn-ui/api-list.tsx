'use client';

import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';
import { useParams } from 'next/navigation';

// Props interface for the ApiList component
interface ApiListProps {
	entityName: string;
	entityIdName: string;
}

// The main ApiList component
export const ApiList: React.FC<ApiListProps> = ({
	entityName,
	entityIdName,
}) => {
	const params = useParams();
	const origin = useOrigin();

	// Constructing the base URL for API endpoints
	const baseUrl = `${origin}/api/${params.storeId}`;

	return (
		<>
			{/* Displaying API endpoints for various actions */}
			<ApiAlert
				title='GET'
				variant='public'
				description={`${baseUrl}/${entityName}`}
			/>
			<ApiAlert
				title='GET'
				variant='public'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>
			<ApiAlert
				title='POST'
				variant='admin'
				description={`${baseUrl}/${entityName}`}
			/>
			<ApiAlert
				title='PATCH'
				variant='admin'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>
			<ApiAlert
				title='DELETE'
				variant='admin'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>
		</>
	);
};
