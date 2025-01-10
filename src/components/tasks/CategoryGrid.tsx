// src/components/tasks/CategoryGrid.tsx
'use client';
import { useState } from 'react';
import { Activity, Dumbbell, Target, Crosshair } from 'lucide-react';
import LevelGrid from './LevelGrid';

const categories = [
  { id: 'hitting', name: 'Individual Hitting', icon: Activity, color: 'text-blue-500' },
  { id: 'movement', name: 'Movement', icon: Dumbbell, color: 'text-green-500' },
  { id: 'target', name: 'Target Hitting', icon: Target, color: 'text-red-500' },
  { id: 'fitness', name: 'Fitness', icon: Crosshair, color: 'text-purple-500' }
];

export default function CategoryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    return <LevelGrid 
      categoryId={selectedCategory} 
      categoryName={categories.find(c => c.id === selectedCategory)?.name || ''}
      onBack={() => setSelectedCategory(null)}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold">Skills Benchmarking</h1>
        <p className="text-gray-600">Master your skills through structured practice</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <div 
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white p-6 rounded-lg"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex flex-col items-center text-center">
                <Icon className={`w-12 h-12 ${category.color} mb-4`} />
                <h2 className="text-lg font-semibold">{category.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}