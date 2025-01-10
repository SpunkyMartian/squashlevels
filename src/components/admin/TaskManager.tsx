// src/components/admin/TaskManager.tsx
'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import type { Task } from '@/types';
import TaskForm from './TaskForm';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const tasksRef = collection(db, 'tasks');
      const snapshot = await getDocs(tasksRef);
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Manage Tasks</h2>
        <button
          onClick={() => setSelectedTask({} as Task)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Task
        </button>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium mb-4">
              {selectedTask.id ? 'Edit Task' : 'New Task'}
            </h3>
            <TaskForm
              onSave={() => {
                fetchTasks();
                setSelectedTask(null);
              }}
            />
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
                  onClick={() => setSelectedTask(task)}
                  className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-3 py-1 text-red-500 hover:bg-red-50 rounded"
                >
                  Delete
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