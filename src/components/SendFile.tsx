import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Upload, Copy, Check, X } from 'lucide-react';

function SendFile() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [token, setToken] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setToken(nanoid(8));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      if (newFiles.length === 0) {
        setToken('');
      }
      return newFiles;
    });
  };

  const getTotalSize = () => {
    return selectedFiles.reduce((acc, file) => acc + file.size, 0);
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Files</h2>
        
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-indigo-500 transition-colors ${
              selectedFiles.length > 0 ? 'border-indigo-500 bg-indigo-50' : ''
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload or drag and drop multiple files
            </p>
            <p className="text-xs text-gray-500">Up to 100MB total</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-900">Selected files:</p>
                  <p className="text-xs text-gray-500">
                    Total size: {(getTotalSize() / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-2 rounded-md"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-2">Share this token:</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-white px-4 py-2 rounded border text-lg font-mono">
                    {token}
                  </code>
                  <button
                    onClick={copyToken}
                    className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {copied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSelectedFiles([]);
                  setToken('');
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Send More Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendFile;