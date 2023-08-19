'use client';

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/non-shadcn-ui/use-toast';

// The Toaster component displays toast notifications
export function Toaster() {
	// Get toast data from useToast hook
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{/* Iterate through toast data and render each toast */}
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast
						key={id}
						{...props}
					>
						{/* Display title and description if provided */}
						<div className='grid gap-1'>
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
						{/* Display action and close button */}
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			{/* Render the toast viewport */}
			<ToastViewport />
		</ToastProvider>
	);
}
