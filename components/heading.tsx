// Props interface for the Heading component
interface HeadingProps {
	title: string;
	description: string;
}

// The Heading component displays a title and description
export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
	return (
		<div>
			{/* Title */}
			<h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
			{/* Description */}
			<p className='text-sm text-muted-foreground'>{description}</p>
		</div>
	);
};
