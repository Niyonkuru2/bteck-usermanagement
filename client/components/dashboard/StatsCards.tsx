"use client";

import { Users, Activity, TrendingUp, UserPlus } from "lucide-react";
import { useUsers } from "@/features/users/hooks";

export default function StatsCards() {
  const { data, isLoading } = useUsers();

  const users = data?.data ?? [];

  const total = users.length;
  const active = users.filter((u: any) => u.status === "active").length;
  const inactive = users.filter((u: any) => u.status === "inactive").length;

  const activeRate = total ? Math.round((active / total) * 100) : 0;

  const cards = [
    {
      title: "Total Users",
      value: total,
      icon: <Users size={18} />,
      trend: `+${total} total users`,
      accent: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: active,
      icon: <UserPlus size={18} />,
      trend: `${activeRate}% active rate`,
      accent: "from-green-500 to-emerald-500",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      title: "Inactive Users",
      value: inactive,
      icon: <Activity size={18} />,
      trend: `${100 - activeRate}% inactive`,
      accent: "from-orange-500 to-yellow-500",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
    {
      title: "System Health",
      value: activeRate > 70 ? "Good" : "Warning",
      icon: <TrendingUp size={18} />,
      trend: "Based on activity level",
      accent:
        activeRate > 70
          ? "from-emerald-500 to-green-400"
          : "from-red-500 to-orange-500",
      iconColor: activeRate > 70 ? "text-green-600" : "text-red-600",
      iconBg: activeRate > 70 ? "bg-green-100" : "bg-red-100",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 bg-gray-100 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {cards.map((card, i) => (
        <Card key={i} {...card} />
      ))}
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  trend,
  accent,
  iconColor,
  iconBg,
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
  trend: string;
  accent: string;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <div className="relative group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      
      {/* top gradient accent */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${accent}`}
      />

      {/* header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">{title}</p>

        <div
          className={`p-2 rounded-xl ${iconBg} ${iconColor}
          group-hover:scale-110 group-hover:shadow-md transition duration-300`}
        >
          {icon}
        </div>
      </div>

      {/* value */}
      <h2 className="text-3xl font-bold mt-3 text-gray-900 tracking-tight">
        {value}
      </h2>

      {/* trend */}
      <p className="text-xs text-gray-500 mt-2">{trend}</p>
    </div>
  );
}