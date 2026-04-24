"use client";

import { Menu, Bell, User } from "lucide-react";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b px-4 md:px-6 py-3 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold text-lg">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <span className="hidden sm:block text-sm font-medium">
            Admin
          </span>
        </div>
      </div>
    </div>
  );
}