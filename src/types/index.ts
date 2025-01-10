// src/types/index.ts
export interface Category {
    id: string;
    name: string;
    icon: string;
    order: number;
  }
  
  export interface Level {
    id: string;
    categoryId: string;
    number: number;
    tasks: Task[];
  }
  
  export interface Task {
    id: string;
    name: string;
    level: number;
    videoUrl?: string;
    description?: string;
    benchmarks: {
      beginner: number;
      intermediate: number;
      advanced: number;
    };
    createdAt: string;
  }
  
  export interface UserProgress {
    userId: string;
    taskId: string;
    attempts: Attempt[];
  }
  
  export interface Attempt {
    value: number;
    timestamp: string;
    notes?: string;
  }