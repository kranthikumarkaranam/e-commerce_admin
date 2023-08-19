'use client';

import { Loader } from '@/components/ui/non-shadcn-ui/loader'; // Importing Loader component

// Loading component
const Loading = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<Loader /> {/* Render the Loader component */}
		</div>
	);
};

export default Loading;
