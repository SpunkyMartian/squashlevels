// src/components/auth/SignOutButton.tsx
'use client';
import { useAuth } from './AuthProvider';

export default function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={() => signOut()}
      className="text-sm text-gray-500 hover:text-gray-700"
    >
      Sign Out
    </button>
  );
}