// src/components/admin/BulkImport.tsx
'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import type { Task } from '@/types';

export default function BulkImport() {
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setPreview(results.data);
        setError(null);
      },
      error: (error) => {
        setError('Error parsing CSV file');
        console.error('CSV Parse Error:', error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-upload"
        />
        <label 
          htmlFor="csv-upload"
          className="cursor-pointer text-blue-500 hover:text-blue-600"
        >
          Upload CSV File
        </label>
        <p className="text-sm text-gray-500 mt-2">
          Click to upload or drag and drop your CSV file
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Preview */}
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
                    {Object.values(row).map((value: any, j) => (
                      <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={async () => {
              setImporting(true);
              try {
                // Import logic here
              } catch (error) {
                setError('Import failed');
              } finally {
                setImporting(false);
              }
            }}
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