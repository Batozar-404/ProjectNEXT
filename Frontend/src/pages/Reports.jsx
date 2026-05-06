import { useState } from 'react';
import { FileText, Download, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '../components/Common/Card';
import toast from 'react-hot-toast';

const Reports = () => {
    const [reportType, setReportType] = useState('products');
    const [loading, setLoading] = useState(false);

    const handleExport = () => {
        setLoading(true);
        setTimeout(() => {
            toast.success('Report exported successfully!');
            setLoading(false);
        }, 1000);
    };

    const reportOptions = [
        { id: 'products', label: 'Product Report', icon: Package, description: 'List of all products with stock levels' },
        { id: 'stock', label: 'Stock Report', icon: TrendingUp, description: 'Current stock levels and values' },
        { id: 'low-stock', label: 'Low Stock Alert', icon: AlertTriangle, description: 'Products below minimum stock level' },
        { id: 'transfers', label: 'Transfer Report', icon: FileText, description: 'History of stock transfers' },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
                <p className="text-gray-500 mt-1">Generate and export inventory reports</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {reportOptions.map((option) => (
                    <Card
                        key={option.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${reportType === option.id ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => setReportType(option.id)}
                    >
                        <div className="text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${reportType === option.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <option.icon className={`w-6 h-6 ${reportType === option.id ? 'text-blue-600' : 'text-gray-500'}`} />
                            </div>
                            <h3 className="font-semibold text-gray-800">{option.label}</h3>
                            <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Export Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={handleExport}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    <Download className="w-4 h-4" />
                    {loading ? 'Exporting...' : 'Export to CSV'}
                </button>
            </div>

            {/* Preview Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Report Preview</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Sample data for {reportOptions.find(o => o.id === reportType)?.label}</p>
                </div>
                <div className="overflow-x-auto p-6">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">SKU</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Stock</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="px-4 py-3 text-sm">1</td>
                                <td className="px-4 py-3 text-sm">Kipas Angin</td>
                                <td className="px-4 py-3 text-sm font-mono">PRD001</td>
                                <td className="px-4 py-3 text-sm">50 pcs</td>
                                <td className="px-4 py-3 text-sm">Rp 200,000</td>
                                <td className="px-4 py-3 text-sm">Rp 10,000,000</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-3 text-sm">2</td>
                                <td className="px-4 py-3 text-sm">Meja Kayu</td>
                                <td className="px-4 py-3 text-sm font-mono">PRD002</td>
                                <td className="px-4 py-3 text-sm">25 pcs</td>
                                <td className="px-4 py-3 text-sm">Rp 750,000</td>
                                <td className="px-4 py-3 text-sm">Rp 18,750,000</td>
                            </tr>
                            <tr className="border-t bg-gray-50">
                                <td colSpan="5" className="px-4 py-3 text-sm font-semibold text-right">Total Value:</td>
                                <td className="px-4 py-3 text-sm font-bold">Rp 28,750,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;