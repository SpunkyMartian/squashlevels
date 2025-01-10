// src/components/admin/CategoryManager.tsx
'use client';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  order: number;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, {
      id: Date.now().toString(),
      name: newCategory,
      order: categories.length
    }]);
    setNewCategory('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category name"
          className="flex-1 p-2 border rounded"
        />
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addCategory}
        >
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map(category => (
          <div 
            key={category.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <span>{category.name}</span>
            <div className="space-x-2">
              <button className="text-blue-500 hover:text-blue-700">Edit</button>
              <button className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}