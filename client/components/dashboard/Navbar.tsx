"use client";

import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { useCurrentUser } from "@/features/auth/useCurrentUser";

export default function Navbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [query, setQuery] = useState("");

  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          aria-label="menu"
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition active:scale-95"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold text-lg tracking-tight text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full group">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users, roles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 
            focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 
            outline-none transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* User Profile */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition">

          {/* Avatar */}
          {isLoading ? (
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
          ) : user?.picture ? (
            <img
              src={user.picture}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}

          {/* Name */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-800">
              {isLoading ? "Loading..." : user?.name || "Guest"}
            </span>
            <span className="text-xs text-gray-500">
              {user?.email || ""}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}