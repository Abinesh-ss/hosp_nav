"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ArrowRight,
  Plus
} from "lucide-react";

interface UploadFile {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadTime: string;
  status: "uploading" | "completed" | "error";
  progress: number;
}

export default function Upload() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      window.location.href = "/login";
      return;
    }
    setIsAuthenticated(true);
  }, []);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map((file: File) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadTime: new Date().toISOString(),
      status: 'uploading',
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'completed', progress: 100 }
            : f
        ));
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));
      } else {
        setUploadProgress(prev => ({ ...prev, [fileId]: Math.floor(progress) }));
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: Math.floor(progress) }
            : f
        ));
      }
    }, 500);
  };

  const removeFile = (fileId: number) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-5 h-5" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case 'uploading':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const acceptedFileTypes = [
    { name: "PDF Floor Plans", extensions: ".pdf", description: "Architectural drawings and layouts" },
    { name: "Images", extensions: ".jpg, .png, .svg", description: "High-resolution floor plan images" },
    { name: "CAD Files", extensions: ".dwg, .dxf", description: "AutoCAD and technical drawings" },
    { name: "Vector Graphics", extensions: ".svg, .ai", description: "Scalable vector graphics" }
  ];

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <Layout showSidebar>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Map Upload</h1>
            <p className="text-gray-600 mt-1">Upload and process floor plans for navigation system</p>
          </div>
        </div>

        {/* Drop Zone */}
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Drop your floor plans here
          </h3>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.svg,.dwg,.dxf,.ai"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Select Files
          </label>
        </div>

        {/* File Upload Progress */}
        {files.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Progress</h3>
            <div className="space-y-3">
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center flex-1">
                    <div className="p-2 bg-white rounded-lg mr-3">{getFileIcon(file.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{file.name}</div>
                      <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
                      {file.status === 'uploading' && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Uploading...</span>
                            <span>{file.progress || uploadProgress[file.id] || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress || uploadProgress[file.id] || 0}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(file.status)}
                    <button onClick={() => removeFile(file.id)} className="p-1 hover:bg-gray-200 rounded-lg transition">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

