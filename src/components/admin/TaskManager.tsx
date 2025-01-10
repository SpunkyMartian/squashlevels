// src/components/admin/TaskManager.tsx
'use client';
import { useState } from 'react';
import type { Task } from '@/types';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Task Manager</h2>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setEditingTask({} as Task)}
        >
          Add New Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{task.name}</h3>
              <div className="space-x-2">
                <button 
                  onClick={() => setEditingTask(task)}
                  className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Level {task.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}