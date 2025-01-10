// src/components/admin/TaskForm.tsx
'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface TaskFormProps {
  onSave?: () => void;
}

export default function TaskForm({ onSave }: TaskFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [taskData, setTaskData] = useState({
    name: '',
    categoryId: '',
    level: 1,
    videoUrl: '',
    benchmarks: {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const tasksRef = collection(db, 'tasks');
      await addDoc(tasksRef, {
        ...taskData,
        createdAt: serverTimestamp()
      });
      setTaskData({
        name: '',
        categoryId: '',
        level: 1,
        videoUrl: '',
        benchmarks: {
          beginner: 0,
          intermediate: 0,
          advanced: 0
        }
      });
      onSave?.();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Task Name</label>
        <input
          type="text"
          value={taskData.name}
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={taskData.categoryId}
          onChange={(e) => setTaskData({ ...taskData, categoryId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          <option value="">Select Category</option>
          <option value="hitting">Individual Hitting</option>
          <option value="movement">Movement</option>
          <option value="target">Target Hitting</option>
          <option value="fitness">Fitness</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Level</label>
        <input
          type="number"
          value={taskData.level}
          onChange={(e) => setTaskData({ ...taskData, level: parseInt(e.target.value) })}
          min="1"
          max="10"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Video URL</label>
        <input
          type="url"
          value={taskData.videoUrl}
          onChange={(e) => setTaskData({ ...taskData, videoUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="https://youtube.com/..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Beginner</label>
          <input
            type="number"
            value={taskData.benchmarks.beginner}
            onChange={(e) => setTaskData({
              ...taskData,
              benchmarks: {
                ...taskData.benchmarks,
                beginner: parseInt(e.target.value)
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Intermediate</label>
          <input
            type="number"
            value={taskData.benchmarks.intermediate}
            onChange={(e) => setTaskData({
              ...taskData,
              benchmarks: {
                ...taskData.benchmarks,
                intermediate: parseInt(e.target.value)
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Advanced</label>
          <input
            type="number"
            value={taskData.benchmarks.advanced}
            onChange={(e) => setTaskData({
              ...taskData,
              benchmarks: {
                ...taskData.benchmarks,
                advanced: parseInt(e.target.value)
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save Task'}
      </button>
    </form>
  );
}