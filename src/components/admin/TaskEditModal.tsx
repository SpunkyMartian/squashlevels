// src/components/admin/TaskEditModal.tsx
'use client';
import { useState } from 'react';
import { Task } from '@/types';

interface TaskEditModalProps {
  task: Partial<Task>;
  onClose: () => void;
  onSave: (task: Partial<Task>) => Promise<void>;
}

export default function TaskEditModal({ task, onClose, onSave }: TaskEditModalProps) {
  const [formData, setFormData] = useState(task);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Task Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              type="url"
              value={formData.videoUrl || ''}
              onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          {/* Benchmarks */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Beginner
              </label>
              <input
                type="number"
                value={formData.benchmarks?.beginner || ''}
                onChange={e => setFormData({
                  ...formData,
                  benchmarks: {
                    beginner: formData.benchmarks?.beginner || 0,
                    intermediate: formData.benchmarks?.intermediate || 0,
                    advanced: formData.benchmarks?.advanced || 0,
                    [e.target.name]: parseInt(e.target.value)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Intermediate
              </label>
              <input
                type="number"
                value={formData.benchmarks?.intermediate || ''}
                onChange={e => setFormData({
                  ...formData,
                  benchmarks: {
                    beginner: formData.benchmarks?.beginner || 0,
                    intermediate: formData.benchmarks?.intermediate || 0,
                    advanced: formData.benchmarks?.advanced || 0,
                    [e.target.name]: parseInt(e.target.value)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Advanced
              </label>
              <input
                type="number"
                value={formData.benchmarks?.advanced || ''}
                onChange={e => setFormData({
                  ...formData,
                  benchmarks: {
                    beginner: formData.benchmarks?.beginner || 0,
                    intermediate: formData.benchmarks?.intermediate || 0,
                    advanced: formData.benchmarks?.advanced || 0,
                    [e.target.name]: parseInt(e.target.value)
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}