import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full">
      {/* 404 Text */}
      <h1 className="text-8xl font-bold text-purple-600 dark:text-purple-400 mb-2">
        404
      </h1>

      {/* Main Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Page Not Found
      </h2>

      {/* Short description */}
      <p className="text-gray-600 dark:text-purple-200 max-w-sm mb-8">
        We couldn't find the page you are looking for. It might have been moved
        or doesn't exist.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded transition-colors cursor-pointer"
        >
          Go to Chat
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 border border-gray-350 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-800 dark:text-white font-medium rounded transition-colors cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
