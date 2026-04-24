"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white px-4">
      
      <div className="w-full max-w-md bg-[#0b1220]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-blue-600 rounded-xl shadow-lg">
            <span className="text-xl font-bold">B</span>
          </div>

          <h1 className="text-2xl font-bold tracking-wide">
            B-Tech Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Admin User Management System
          </p>
        </div>

        {/* Welcome */}
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold">Welcome Back</h2>
          <p className="text-gray-400 text-sm">
            Sign in securely using your Google account
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-200 shadow-md cursor-pointer"
        >
          {loading ? (
            <span className="animate-pulse">Redirecting...</span>
          ) : (
            <>
              {/* Google SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.19 3.6l6.85-6.85C35.95 2.15 30.4 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.45 13.01 17.73 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.96-2.2 5.47-4.7 7.16l7.3 5.68C43.98 37.18 46.5 31.35 46.5 24.5z"/>
                <path fill="#FBBC05" d="M10.67 28.64A14.5 14.5 0 0 1 9.5 24c0-1.61.28-3.16.77-4.64l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.51 10.44l8.16-5.8z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.3-5.68c-2.03 1.37-4.64 2.19-8.59 2.19-6.27 0-11.55-3.51-13.33-8.64l-8.16 5.8C6.73 42.52 14.82 48 24 48z"/>
              </svg>

              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-500 text-xs">SECURE LOGIN</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Info */}
        <p className="text-center text-gray-500 text-xs leading-relaxed">
          This system uses Google OAuth 2.0 authentication.<br />
          Only authorized users can access the dashboard.
        </p>

      </div>
    </div>
  );
}