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
			{/* Bar chart container */}
			<BarChart data={data}>
				{/* X-axis configuration */}
				<XAxis
					dataKey='name'
					stroke='#888888'
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>

				{/* Y-axis configuration */}
				<YAxis
					stroke='#888888'
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value}`}
				/>

				{/* Bar chart data */}
				<Bar
					dataKey='total'
					fill='#3498db'
					radius={[4, 4, 0, 0]}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};
