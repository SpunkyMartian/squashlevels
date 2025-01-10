// src/components/tasks/TaskProgress.tsx
'use client';
import type { Task } from '@/types';

interface TaskProgressProps {
  task: Task;
  attempts: Array<{
    value: number;
    timestamp: string;
    notes?: string;
  }>;
}

export default function TaskProgress({ task, attempts = [] }: TaskProgressProps) {
  // Use the props
  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg">
        <h3 className="font-medium">{task.name}</h3>
        <div className="mt-2">
          {attempts.length > 0 ? (
            <p>Latest attempt: {attempts[0].value}</p>
          ) : (
            <p>No attempts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}