// src/components/tasks/TaskProgress.tsx
'use client';
import { useState } from 'react';
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
  return (
    <div className="space-y-4">
      {/* Progress visualization */}
    </div>
  );
}