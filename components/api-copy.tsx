import { Copy, Server } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Props interface for the ApiCopy component
interface ApiCopyProps {
	title: string;
	description: string;
	variant: 'public' | 'admin';
}

// Mapping for displaying text based on variant
const textMap: Record<ApiCopyProps['variant'], string> = {
	public: 'Public',
	admin: 'Admin',
};

// Mapping for assigning badge variant based on variant
const variantMap: Record<ApiCopyProps['variant'], BadgeProps['variant']> = {
	public: 'secondary',
	admin: 'destructive',
};

// The main ApiCopy component
export const ApiCopy: React.FC<ApiCopyProps> = ({
	title,
	description,
	variant = 'public',
}) => {
	// Function to handle copying the description to clipboard
	const onCopy = () => {
		navigator.clipboard.writeText(description);
		toast.success('API Route copied to clipboard.');
	};

	return (
		<Alert>
			<Server className='h-4 w-4' />
			<AlertTitle className='flex items-center gap-x-2'>
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className='mt-4 flex items-center justify-between'>
				<code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
					{description}
				</code>
				<Button
					variant='outline'
					size='sm'
					onClick={onCopy}
				>
					<Copy className='h-4 w-4' />
				</Button>
			</AlertDescription>
		</Alert>
	);
};
