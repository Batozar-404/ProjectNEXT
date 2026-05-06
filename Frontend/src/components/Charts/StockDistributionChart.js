import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StockDistributionChart = ({ data, height = 300 }) => {
    const chartData = data && data.length > 0 ? data : [
        { name: 'Electronics', value: 45, color: '#3B82F6' },
        { name: 'Furniture', value: 25, color: '#10B981' },
        { name: 'Clothing', value: 20, color: '#F59E0B' },
        { name: 'Others', value: 10, color: '#8B5CF6' }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{payload[0].name}</p>
                    <p className="text-sm text-gray-600">{payload[0].value}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default StockDistributionChart;