"use client";

import { useState } from "react";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      key: "dashboard",
      href: "/dashboard",
    },
    {
      name: "User Management",
      icon: Users,
      key: "users",
      href: "/dashboard/users",
    },
  ];

  return (
    <aside className="h-full w-full flex flex-col justify-between border-r border-white/10 bg-[#070b18] text-white">

      {/* Top Section */}
      <div className="overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-bold text-black">
            BT
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">B-Tech</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-2 mt-4">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;

            return (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setActive(item.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-green-500 text-black font-semibold"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/10 text-white/80">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}