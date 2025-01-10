// src/lib/db.ts
import { db } from './firebase';
import { 
  collection, 
  doc, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  serverTimestamp,
  getDoc,
  arrayUnion 
} from 'firebase/firestore';
import type { Task, Attempt, UserProgress } from '@/types';

export const dbService = {
  // Task Management
  async createTask(taskData: Omit<Task, 'id'>) {
    try {
      const taskRef = collection(db, 'tasks');
      const docRef = await addDoc(taskRef, {
        ...taskData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async getTasks(categoryId: string, level: number) {
    try {
      const q = query(
        collection(db, 'tasks'),
        where('categoryId', '==', categoryId),
        where('level', '==', level)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // User Progress
  async logAttempt(userId: string, taskId: string, attemptData: Attempt) {
    try {
      const progressRef = doc(db, 'userProgress', `${userId}_${taskId}`);
      const progressDoc = await getDoc(progressRef);

      if (progressDoc.exists()) {
        await updateDoc(progressRef, {
          attempts: arrayUnion({
            ...attemptData,
            timestamp: serverTimestamp()
          })
        });
      } else {
        await addDoc(collection(db, 'userProgress'), {
          userId,
          taskId,
          attempts: [{
            ...attemptData,
            timestamp: serverTimestamp()
          }]
        });
      }
    } catch (error) {
      console.error('Error logging attempt:', error);
      throw error;
    }
  },

  async getUserProgress(userId: string, taskId: string) {
    try {
      const progressRef = doc(db, 'userProgress', `${userId}_${taskId}`);
      const progressDoc = await getDoc(progressRef);
      return progressDoc.exists() ? progressDoc.data() as UserProgress : null;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  },

  // Category Level Progress
  async getCategoryProgress(userId: string, categoryId: string) {
    try {
      const q = query(
        collection(db, 'userProgress'),
        where('userId', '==', userId),
        where('categoryId', '==', categoryId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error fetching category progress:', error);
      throw error;
    }
  },

  // Admin Functions
  async bulkCreateTasks(tasks: Omit<Task, 'id'>[]) {
    try {
      const batch = db.batch();
      const tasksRef = collection(db, 'tasks');
      
      tasks.forEach(task => {
        const newTaskRef = doc(tasksRef);
        batch.set(newTaskRef, {
          ...task,
          createdAt: serverTimestamp()
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error in bulk task creation:', error);
      throw error;
    }
  },

  async updateTask(taskId: string, updates: Partial<Task>) {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }
};