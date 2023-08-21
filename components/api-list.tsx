'use client';

import { ApiCopy } from '@/components/api-copy';
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
			<ApiCopy
				title='GET'
				variant='public'
				description={`${baseUrl}/${entityName}`}
			/>
			<ApiCopy
				title='GET'
				variant='public'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>
			<ApiCopy
				title='POST'
				variant='admin'
				description={`${baseUrl}/${entityName}`}
			/>
			<ApiCopy
				title='PATCH'
				variant='admin'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>
			<ApiCopy
				title='DELETE'
				variant='admin'
				description={`${baseUrl}/${entityName}/{${entityIdName}}`}
			/>
		</>
	);
};
