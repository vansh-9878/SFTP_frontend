import React, { useState } from "react";
import { Download } from "lucide-react";
import toast from "react-hot-toast";

const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const receiveCall = async (email: string) => {
  try {
    const response = await fetch("https://securesftp.onrender.com/receive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("No files found for this email");
    }

    const data = await response.json();
    return data.files;
  } catch (err: any) {
    throw new Error("Failed to fetch files");
  }
};

function ReceiveFile() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please Fill the details correctly...", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return;
    }
    setError("");
    setLoading(true);

    toast.promise(receiveCall(email), {
      loading: "Connecting to the Server...",
      success: (files) => {
        setFiles(files);
        setLoading(false);
        return <b>Received Files Successfully!!</b>;
      },
      error: (err) => {
        setLoading(false);
        return <b>{err.message || "No Files Found!!"}</b>;
      },
    });
    setFiles([]);
  };

  // 📌 Function to download the selected file
  const handleDownload = (fileName: string) => {
    const downloadUrl = `https://securesftp.onrender.com/download/${email}/${fileName}`;

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName; // Set the filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Receive a File
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Email ID
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 pl-2"
                placeholder="Enter your Email ID"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            <Download className="h-5 w-5 mr-2" />
            {loading ? "Fetching..." : "Receive File"}
          </button>
        </form>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Available Files:</h3>
            <ul className="mt-2 space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border p-2 rounded-lg shadow-sm"
                >
                  <span className="break-all">{file}</span>
                  <button
                    onClick={() => handleDownload(file)}
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceiveFile;
