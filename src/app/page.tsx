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