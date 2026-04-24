"use client";

import { Users, Activity, TrendingUp } from "lucide-react";
import { useUsers } from "@/features/users/hooks";

export default function StatsCards() {
  const { data } = useUsers();

  const users = data?.data || [];

  const total = users.length;
  const active = users.filter((u: any) => u.status === "active").length;
  const inactive = total - active;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      
      <Card title="Total Users" value={total} icon={<Users />} />
      <Card title="Active Users" value={active} icon={<Activity />} />
      <Card title="Inactive" value={inactive} icon={<Activity />} />
      <Card title="Growth Rate" value="83%" icon={<TrendingUp />} />

    </div>
  );
}

function Card({ title, value, icon }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500">{title}</p>
        <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
      </div>

      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm text-green-600 mt-1">+5% vs last period</p>
    </div>
  );
}