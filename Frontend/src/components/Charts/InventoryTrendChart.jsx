import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const InventoryTrendChart = ({ data }) => {
    // Default data if empty
    const chartData = data && data.length > 0 ? data : [
        { month: 'Jan', value: 65, stock: 120 },
        { month: 'Feb', value: 68, stock: 135 },
        { month: 'Mar', value: 72, stock: 148 },
        { month: 'Apr', value: 75, stock: 160 },
        { month: 'May', value: 78, stock: 175 },
        { month: 'Jun', value: 82, stock: 190 },
        { month: 'Jul', value: 85, stock: 205 },
        { month: 'Aug', value: 88, stock: 218 },
        { month: 'Sep', value: 92, stock: 230 },
        { month: 'Oct', value: 95, stock: 245 },
        { month: 'Nov', value: 98, stock: 258 },
        { month: 'Dec', value: 100, stock: 270 }
    ];

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1">{label}</p>
                    <p className="text-sm text-blue-600">
                        Inventory Value: {payload[0]?.value}%
                    </p>
                    <p className="text-sm text-green-600">
                        Stock Units: {payload[1]?.value}K
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    label={{ value: 'Value (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#6B7280' } }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11, fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    label={{ value: 'Stock (K)', angle: 90, position: 'insideRight', style: { fontSize: 11, fill: '#6B7280' } }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                />
                <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="value"
                    name="Inventory Value %"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5 }}
                />
                <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="stock"
                    name="Stock Units"
                    stroke="#10B981"
                    strokeWidth={2}
                    fill="url(#colorStock)"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default InventoryTrendChart;