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

  if (isLoading) return <p>Loading graph...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">
     User Activity
</h2>
<p className="text-sm text-gray-500 mb-4">
  7-day user creation and activity trends
</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}