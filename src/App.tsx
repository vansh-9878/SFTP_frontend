import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Send, Download, FileIcon } from "lucide-react";
import SendFile from "./components/SendFile";
import ReceiveFile from "./components/ReceiveFile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <FileIcon className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    FileShare
                  </span>
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send
                </Link>
                <Link
                  to="/receive"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Receive
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<SendFile />} />
            <Route path="/receive" element={<ReceiveFile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
