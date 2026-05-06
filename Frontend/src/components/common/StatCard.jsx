import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, icon, color = 'blue', trend, trendValue, bgLight, textColor }) => {
    const colors = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
        green: { bg: 'bg-green-50', text: 'text-green-600' },
        yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
        red: { bg: 'bg-red-50', text: 'text-red-600' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
        cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600' },
    };

    const colorStyle = colors[color] || colors.blue;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
                <div className={`${bgLight || colorStyle.bg} p-2.5 rounded-xl`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-medium flex items-center gap-0.5${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {trendValue}
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            <p className="text-xs text-gray-500 mt-1.5">{title}</p>
        </div>
    );
};

export default StatCard;