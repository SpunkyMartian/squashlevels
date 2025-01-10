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

// src/components/admin/TaskManager.tsx
export function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Tasks</h2>
        <button
          onClick={() => setSelectedTask({})}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => setSelectedTask(task)}
          />
        ))}
      </div>

      {/* Task Edit Modal */}
      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={async (updatedTask) => {
            // Save task logic
          }}
        />
      )}
    </div>
  );
}

// src/components/admin/BulkImport.tsx
export function BulkImport() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      // Parse CSV and show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target?.result;
        // Parse CSV and set preview
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      // Import logic
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="cursor-pointer text-blue-500 hover:text-blue-600"
        >
          Upload CSV File
        </label>
      </div>

      {preview.length > 0 && (
        <>
          <div className="mt-4">
            <h3 className="text-lg font-medium">Preview</h3>
            {/* Preview table */}
          </div>
          <button
            onClick={handleImport}
            disabled={importing}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Import Tasks'}
          </button>
        </>
      )}
    </div>
  );
}