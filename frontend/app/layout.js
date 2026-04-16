import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = { title: 'InvenTrack', description: 'Multi-Tenant Inventory' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}