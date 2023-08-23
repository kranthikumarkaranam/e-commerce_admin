import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'E-commerce | Sign Up',
	description: 'Clerk Signin/SignUp Page',
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
