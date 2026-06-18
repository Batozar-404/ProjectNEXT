import { useState } from 'react';
import api from '../services/api';

const TestApi = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const testHealth = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/health');
            const data = await response.json();
            setResult({ success: true, data });
        } catch (error) {
            setResult({ success: false, error: error.message });
        } finally {
            setLoading(false);
        }
    };

    const testProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products');
            setResult({ success: true, data: response.data });
        } catch (error) {
            setResult({ success: false, error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">API Test (Tanpa Auth)</h1>
            <div className="flex gap-4 mb-4">
                <button onClick={testHealth} className="btn-primary">Test Health</button>
                <button onClick={testProducts} className="btn-secondary">Test GET Products</button>
            </div>
            {loading && <p>Loading...</p>}
            {result && (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default TestApi;