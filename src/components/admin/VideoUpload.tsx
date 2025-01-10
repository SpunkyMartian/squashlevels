// src/components/admin/VideoUpload.tsx
'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface VideoUploadProps {
  taskId?: string;
  onUpload?: (url: string) => void;
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function VideoUpload({ taskId, onUpload }: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateAndFormatUrl = (url: string) => {
    const videoId = getYouTubeId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      // Validate YouTube URL
      const formattedUrl = validateAndFormatUrl(videoUrl);

      // If taskId is provided, update the task
      if (taskId) {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, {
          videoUrl: formattedUrl,
          updatedAt: new Date().toISOString()
        });
      }

      // Call onUpload callback if provided
      onUpload?.(formattedUrl);
      
      // Reset form
      setVideoUrl('');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Add Video</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isUploading || !videoUrl}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {isUploading ? 'Processing...' : 'Add Video'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>Supported formats:</p>
        <ul className="list-disc list-inside">
          <li>YouTube standard URLs (youtube.com/watch?v=...)</li>
          <li>YouTube short URLs (youtu.be/...)</li>
          <li>YouTube embed URLs (youtube.com/embed/...)</li>
        </ul>
      </div>
    </div>
  );
}