// src/components/tasks/TaskList.tsx
'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, PlayCircle } from 'lucide-react';
import TaskProgress from './TaskProgress';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { Task } from '@/types';
import { dbService } from '@/lib/db';
import { useAuth } from '@/components/auth/AuthProvider';

interface TaskListProps {
  categoryId: string;
  categoryName: string;
  level: number;
  onBack: () => void;
}

export default function TaskList({ categoryId, categoryName, level, onBack }: TaskListProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userMetrics, setUserMetrics] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, 'id'>)
        })) as Task[];
        setTasks(tasksData);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, [categoryId, level]);

  const handleMetricSubmit = async (taskId: string, value: number) => {
    try {
      await dbService.logAttempt(user.uid, taskId, {
        value,
        notes,
        timestamp: new Date().toISOString()
      });
      // Refresh tasks or update UI
    } catch (error) {
      console.error('Error submitting metric:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header with Breadcrumbs */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500 mb-2">
          <span 
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => onBack()}
          >
            {categoryName}
          </span>
          <span className="mx-2"></span>
          <span className="text-gray-700">Level {level}</span>
        </div>
        <h1 className="text-2xl font-bold">{categoryName} Level {level}</h1>
        <p className="text-gray-600">Complete the tasks to advance</p>
      </div>

      {/* Tasks List */}
      <div className="space-y-6">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 p-4">
              <h3 className="text-lg font-semibold">{task.name}</h3>
            </div>
            <div className="p-6">
              {/* Video Section */}
              <div className="mb-6 aspect-video bg-black rounded-lg flex items-center justify-center">
                {task.videoUrl ? (
                  <iframe
                    className="w-full h-full"
                    src={task.videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <PlayCircle className="w-16 h-16 text-white opacity-50" />
                )}
              </div>

              {/* Task Progress */}
              <TaskProgress task={task} attempts={userMetrics} />

              {/* Input Section */}
              <div className="mt-6 space-y-4">
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your score"
                />
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Add notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                    handleMetricSubmit(task.id, parseInt(input.value));
                    input.value = '';
                  }}
                >
                  Log Attempt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}