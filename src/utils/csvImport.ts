// src/utils/csvImport.ts
import Papa from 'papaparse';
import { Task } from '@/types';

interface CSVRow {
  name: string;
  categoryId: string;
  level: string;
  videoUrl: string;
  beginnerBenchmark: string;
  intermediateBenchmark: string;
  advancedBenchmark: string;
}

export async function processCSVImport(file: File): Promise<Partial<Task>[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const tasks = (results.data as CSVRow[]).map(row => ({
          name: row.name,
          categoryId: row.categoryId,
          level: parseInt(row.level),
          videoUrl: row.videoUrl,
          benchmarks: {
            beginner: parseInt(row.beginnerBenchmark),
            intermediate: parseInt(row.intermediateBenchmark),
            advanced: parseInt(row.advancedBenchmark)
          }
        }));
        resolve(tasks);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}