"use client";

import { useGraph } from "../hooks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function UserGraph() {
  const { data, isLoading } = useGraph();

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            User Activity
          </h2>
          <p className="text-sm text-gray-500">
            7-day user creation and activity trends
          </p>
        </div>

        {/* Status badge */}
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          Last 7 days
        </span>
      </div>

      {/* LOADING STATE */}
      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-sm text-gray-400">
            Loading analytics...
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}