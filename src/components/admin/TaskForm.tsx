// src/components/admin/TaskForm.tsx
'use client';
import { useState } from 'react';

export default function TaskForm() {
  const [saving, setSaving] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Task Form</h2>
      {/* Form content here */}
    </div>
  );
}