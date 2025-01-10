// src/components/auth/LoginPage.tsx
'use client';
import { useAuth } from './AuthProvider';

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to Skills Tracker</h2>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}