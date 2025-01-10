// src/app/admin/page.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import TaskForm from '@/components/admin/TaskForm';
import VideoUpload from '@/components/admin/VideoUpload';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tasks');

  if (!user) {
    return <div>Access denied</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'tasks' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'videos' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
      </div>

      {activeTab === 'tasks' ? <TaskForm /> : <VideoUpload />}
    </div>
  );
}