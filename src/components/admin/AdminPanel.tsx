// src/components/admin/AdminPanel.tsx
'use client';
import { useState } from 'react';
import TaskManager from './TaskManager';
import CategoryManager from './CategoryManager';
import UserManager from './UserManager';
import BulkImport from './BulkImport';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = [
    { id: 'tasks', label: 'Tasks' },
    { id: 'categories', label: 'Categories' },
    { id: 'users', label: 'Users' },
    { id: 'import', label: 'Bulk Import' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your skill tracking system</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b">
        <nav className="flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'tasks' && <TaskManager />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'users' && <UserManager />}
        {activeTab === 'import' && <BulkImport />}
      </div>
    </div>
  );
}