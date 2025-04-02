import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

function SendFile() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [email, setEmail] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((files) => files.filter((_, i) => i !== index));
  };

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const sendCall = async (formdata: FormData) => {
    try {
      const response = await fetch("https://securesftp.onrender.com/upload", {
        method: "POST",
        body: formdata,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      console.log("Upload success:", data);
      // alert(`Files uploaded successfully for ${data.email}`);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleUpload = async () => {
    // if (selectedFiles.length === 0 || email.trim() === "") return;
    if (
      !validateEmail(email) ||
      selectedFiles.length === 0 ||
      email.trim() === ""
    ) {
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
    const formData = new FormData();
    formData.append("email", email);
    selectedFiles.forEach((file) => formData.append("files", file));
    toast.promise(sendCall(formData), {
      loading: "Processing Your request...",
      success: <b>Files Uploaded!!</b>,
      error: <b>Internal Server Error!!</b>,
    });
    setSelectedFiles([]);
    setEmail("");
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Files</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter recipient's email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          required
        />

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-indigo-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Click to upload or drag and drop files
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900">Selected files:</p>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex justify-between p-2 border rounded my-2"
              >
                <p className="text-sm">{file.name}</p>
                <button onClick={() => removeFile(index)}>
                  <X className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors mt-4"
        >
          Upload Files
        </button>
      </div>
    </div>
  );
}

export default SendFile;
