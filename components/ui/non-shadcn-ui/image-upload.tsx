'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

// Props interface for the ImageUpload component
interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

// The ImageUpload component allows uploading and displaying images
const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	// Set isMounted to true after component mounts
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Handle image upload completion
	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	// Render component contents
	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<div className='mb-4 flex items-center gap-4'>
				{/* Display uploaded images */}
				{value.map((url) => (
					<div
						key={url}
						className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
					>
						<div className='z-10 absolute top-2 right-2'>
							{/* Button to remove an image */}
							<Button
								type='button'
								onClick={() => onRemove(url)}
								variant='destructive'
								size='sm'
							>
								<Trash className='h-4 w-4' />
							</Button>
						</div>
						{/* Display the image */}
						<Image
							fill
							className='object-cover'
							alt='Image'
							src={url}
						/>
					</div>
				))}
			</div>
			{/* Cloudinary upload widget */}
			<CldUploadWidget
				onUpload={onUpload}
				uploadPreset='skzx9lc0'
			>
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							type='button'
							disabled={disabled}
							variant='secondary'
							onClick={onClick}
						>
							<ImagePlus className='h-4 w-4 mr-2' />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
