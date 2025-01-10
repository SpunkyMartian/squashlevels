// src/components/admin/BulkImport.tsx
'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CSVRow {
  name: string;
  categoryId: string;
  level: string;
  videoUrl: string;
  benchmarks: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}

interface TableCellProps {
  value: string | number;
}

const TableCell = ({ value }: TableCellProps) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    {value}
  </td>
);

export default function BulkImport() {
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<CSVRow[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setPreview(results.data as CSVRow[]);
        setErrorMessage(null);
      },
      error: (parseError) => {
        setErrorMessage('Error parsing CSV file');
        console.error('CSV Parse Error:', parseError);
      }
    });
  };

  const handleImport = async () => {
    if (preview.length === 0) return;

    setImporting(true);
    setErrorMessage(null);

    try {
      const tasksRef = collection(db, 'tasks');
      
      for (const row of preview) {
        await addDoc(tasksRef, {
          name: row.name,
          categoryId: row.categoryId,
          level: parseInt(row.level),
          videoUrl: row.videoUrl,
          benchmarks: {
            beginner: parseInt(row.benchmarks.beginner),
            intermediate: parseInt(row.benchmarks.intermediate),
            advanced: parseInt(row.benchmarks.advanced)
          },
          createdAt: serverTimestamp()
        });
      }

      // Clear preview after successful import
      setPreview([]);
      
    } catch (error) {
      setErrorMessage('Failed to import data. Please try again.');
      console.error('Import error:', error);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-upload"
          disabled={importing}
        />
        <label 
          htmlFor="csv-upload"
          className={`cursor-pointer text-blue-500 hover:text-blue-600 ${importing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Upload CSV File
        </label>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {preview.length > 0 && (
        <div>
          <h3 className="font-medium mb-2">Preview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(preview[0]).map(key => (
                    <th 
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {preview.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value, j) => (
                      <TableCell key={j} value={value} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleImport}
            disabled={importing}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Import Data'}
          </button>
        </div>
      )}
    </div>
  );
}