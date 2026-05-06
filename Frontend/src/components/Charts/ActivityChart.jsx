import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart = ({ data, height = 300 }) => {
    const chartData = data && data.length > 0 ? data : [
        { day: 'Mon', in: 12, out: 8 },
        { day: 'Tue', in: 15, out: 10 },
        { day: 'Wed', in: 18, out: 12 },
        { day: 'Thu', in: 14, out: 9 },
        { day: 'Fri', in: 20, out: 15 },
        { day: 'Sat', in: 10, out: 6 },
        { day: 'Sun', in: 8, out: 4 }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-1">{label}</p>
                    <p className="text-sm text-green-600">Stock In:{payload[0]?.value}</p>
                    <p className="text-sm text-red-600">Stock Out:{payload[1]?.value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="in" name="Stock In" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="out" name="Stock Out" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ActivityChart;