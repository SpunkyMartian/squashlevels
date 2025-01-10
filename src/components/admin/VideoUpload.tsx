// src/components/admin/VideoUpload.tsx
'use client';
import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface VideoUploadProps {
  onUpload?: (url: string) => void;
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;
    
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      onUpload?.(videoUrl);
      setVideoUrl('');
      setError(null);
    } else {
      setError('Please enter a valid YouTube URL');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Add Video URL</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleUrlSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Video URL
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading || !videoUrl}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {uploading ? 'Processing...' : 'Add Video'}
        </button>
      </form>
    </div>
  );
}