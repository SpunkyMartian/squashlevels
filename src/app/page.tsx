// src/app/page.tsx
'use client';
import { useAuth } from '@/components/auth/AuthProvider';
import LoginPage from '@/components/auth/LoginPage';
import CategoryGrid from '@/components/tasks/CategoryGrid';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <CategoryGrid />;
}

// src/app/admin/page.tsx
'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminPanel from '@/components/admin/AdminPanel';

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminPanel />
    </ProtectedRoute>
  );
}