import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Authorization',
	description:
		'Efficiently manage and control access permissions to ensure data security and privacy.',
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex items-center justify-center h-full'>{children}</div>
	);
}
