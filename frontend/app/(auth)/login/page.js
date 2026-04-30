'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', tenant_slug: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(form.email, form.password, form.tenant_slug);
      router.push('/');
    } catch (e) {
      setErr(e.response?.data?.error || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Login InvenTrack</h2>
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <input className="w-full border p-2 rounded" placeholder="Tenant Slug (ex: tokoa)" value={form.tenant_slug} onChange={e => setForm({...form, tenant_slug: e.target.value})} required />
        <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}