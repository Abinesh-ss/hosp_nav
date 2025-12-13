// app/upload/page.tsx
'use client'

import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, File, Trash2 } from 'lucide-react';

interface UploadedFile { name: string; progress: number; }

const mockFiles: UploadedFile[] = [
  { name: "floor_1.pdf", progress: 100 },
  { name: "floor_2.jpg", progress: 100 },
  { name: "emergency_plan.svg", progress: 80 },
  { name: "floor_3.png", progress: 100 },
];

interface FileIconProps { fileName: string; }

const FileIcon = ({ fileName }: FileIconProps) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
    case 'jpg':
    case 'png':
    case 'jpeg': return <File className="h-5 w-5 text-blue-500" />;
    case 'svg': return <File className="h-5 w-5 text-green-500" />;
    default: return <File className="h-5 w-5 text-gray-500" />;
  }
};

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockFiles);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const newFile: UploadedFile = { name: file.name, progress: 0 };
      setUploadedFiles(prev => [...prev, newFile]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadedFiles(prev => prev.map(f => f === newFile ? { ...f, progress: Math.min(progress, 100) } : f));
        if (progress >= 100) clearInterval(interval);
      }, 300);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleRemoveFile = (fileName: string) => setUploadedFiles(prev => prev.filter(f => f.name !== fileName));

  return (
    <section className="py-10 page-transition">
      <div className="content-wrap">
        <div className="w-full max-w-4xl rounded-xl bg-white p-8 shadow-2xl border border-gray-100 mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Map File Uploader 📄</h3>

          <div className="flex gap-8">
            {/* Dropzone */}
            <div
              className="w-1/2 p-10 border-4 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors duration-200"
              style={{ borderColor: 'rgb(var(--color-primary))', minHeight: '300px' }}
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              <UploadCloud className="h-10 w-10 mb-4 text-primary" />
              <p className="text-lg font-medium text-gray-700 mb-2">Drag and Drop Files Here</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>

              <input
                type="file"
                id="file-upload"
                onChange={(e) => {
                  if (e.target.files) handleFileDrop({ dataTransfer: { files: e.target.files } } as unknown as React.DragEvent<HTMLDivElement>);
                }}
                className="hidden"
                accept=".jpg,.jpeg,.png,.svg,.pdf"
              />
              <label htmlFor="file-upload" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-white hover:bg-primary/90 cursor-pointer">
                Browse
              </label>
              <p className="mt-4 text-xs text-muted-foreground">Supported formats: PDF, SVG, PNG, JPG</p>
            </div>

            {/* Uploaded List */}
            <div className="w-1/2">
              <h4 className="text-lg font-semibold mb-4 border-b pb-2">Uploaded Files</h4>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {uploadedFiles.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No files uploaded yet.</p>
                ) : (
                  uploadedFiles.map((file) => (
                    <div key={file.name} className="flex items-center space-x-3 p-2 border rounded-lg bg-gray-50">
                      <FileIcon fileName={file.name} />
                      <div className="flex-grow">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${file.progress}%` }} />
                        </div>
                      </div>
                      <button onClick={() => handleRemoveFile(file.name)} className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                className="mt-6 w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400"
                disabled={uploadedFiles.length === 0 || uploadedFiles.some(f => f.progress < 100)}
                onClick={() => alert('Proceeding to Editor...')}
              >
                Proceed to Editor ({uploadedFiles.length} files)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

