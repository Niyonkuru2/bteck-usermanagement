"use client";

export default function DataPanel() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
      <h2 className="font-semibold text-lg">Data Management</h2>
      <p className="text-sm text-gray-500">
        Export or import user data
      </p>

      <button className="w-full border p-2 rounded-lg hover:bg-gray-50">
        ⬇ Export as JSON
      </button>

      <button className="w-full border p-2 rounded-lg hover:bg-gray-50">
        ⬆ Import from JSON
      </button>

      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
        <strong>Data Format</strong>
        <p>
          Export/import uses JSON format with user info including name,
          email, role, and status.
        </p>
      </div>

      <p className="text-sm text-gray-500">6 users ready to export</p>
    </div>
  );
}