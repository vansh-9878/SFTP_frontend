import React, { useState } from 'react';
import { Download } from 'lucide-react';

function ReceiveFile() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.length !== 8) {
      setError('Please enter a valid 8-character token');
      return;
    }
    // Here you would implement the actual file receiving logic
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Receive a File</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700">
              Enter sharing token
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter 8-character token"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-5 w-5 mr-2" />
            Receive File
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Ask the sender for the sharing token to receive the file.</p>
        </div>
      </div>
    </div>
  );
}

export default ReceiveFile;