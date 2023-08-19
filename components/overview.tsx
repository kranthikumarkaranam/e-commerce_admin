'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'; // Import components from recharts library

// Define the Overview functional component
interface OverviewProps {
	data: any[]; // Expected data for the chart
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
	return (
		<ResponsiveContainer
			width='100%'
			height={350}
		>
			<BarChart data={data}>
				{/* Bar chart container */}
				<XAxis
					dataKey='name'
					stroke='#888888'
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				{/* X-axis configuration */}
				<YAxis
					stroke='#888888'
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value}`}
				/>
				{/* Y-axis configuration */}
				<Bar
					dataKey='total'
					fill='#3498db'
					radius={[4, 4, 0, 0]}
				/>
				{/* Bar chart data */}
			</BarChart>
		</ResponsiveContainer>
	);
};
