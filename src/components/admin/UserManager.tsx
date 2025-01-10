// src/components/admin/UserManager.tsx
'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

interface User {
  id: string;
  email: string;
  displayName: string;
  role?: string;
  lastLogin?: string;
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{user.displayName || 'Unnamed User'}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.lastLogin && (
                  <p className="text-xs text-gray-500">
                    Last login: {new Date(user.lastLogin).toLocaleString()}
                  </p>
                )}
              </div>
              <select
                value={user.role || 'user'}
                onChange={(e) => updateUserRole(user.id, e.target.value)}
                className="ml-4 p-2 border rounded-md text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No users found
        </div>
      )}
    </div>
  );
}