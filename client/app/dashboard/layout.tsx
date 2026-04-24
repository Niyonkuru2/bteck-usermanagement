"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar (Desktop) */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-64">
        <Sidebar />
      </div>

      {/* Sidebar (Mobile Drawer) */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-[#070b18]">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="md:ml-64 flex flex-col min-h-screen">

        {/* Navbar */}
        <Navbar onMenuClick={() => setOpen(true)} />

        {/* Page Content */}
        <main className="p-4 md:p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}