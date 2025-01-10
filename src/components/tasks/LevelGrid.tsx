// src/components/tasks/LevelGrid.tsx
'use client';
import { useState } from 'react';
import TaskList from './TaskList';

interface LevelGridProps {
  categoryId: string;
  categoryName: string;
  onBack: () => void;
}

export default function LevelGrid({ categoryId, categoryName, onBack }: LevelGridProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  if (selectedLevel) {
    return (
      <TaskList
        categoryId={categoryId}
        categoryName={categoryName}
        level={selectedLevel}
        onBack={() => setSelectedLevel(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header with Breadcrumbs */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-gray-500 mb-2">
          <span 
            className="hover:text-blue-500 cursor-pointer"
            onClick={onBack}
          >
            Skills Benchmarking
          </span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{categoryName}</span>
        </div>
        <h1 className="text-2xl font-bold">{categoryName} Skill Benchmarking</h1>
        <p className="text-gray-600">Select a level to begin</p>
      </div>

      {/* Level Grid */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedLevel(i + 1)}
            >
              Level {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}