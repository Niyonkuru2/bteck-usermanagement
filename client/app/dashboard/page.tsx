"use client";

import StatsCards from "@/components/dashboard/StatsCards";
import UserGraph from "@/features/graph/components/UserGraph";
import UserTable from "@/features/protobuf/components/UserTable";
import DataPanel from "@/components/dashboard/DataPanel";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm md:text-base">
          Welcome back! Here's your system overview.
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Graph + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserGraph />
        </div>

        <DataPanel />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <UserTable />
      </div>
    </div>
  );
}