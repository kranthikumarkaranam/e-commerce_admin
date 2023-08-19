'use client';

import { Loader } from '@/components/loader';

// Define the 'Loading' functional component.
const Loading = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			{/* Render the 'Loader' component to display a loading animation. */}
			<Loader />
		</div>
	);
};

export default Loading;
