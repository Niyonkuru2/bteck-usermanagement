"use client";

import { useState } from "react";
import { useVerifiedUsers } from "@/features/protobuf/useVerifiedUsers";
import { Download } from "lucide-react";
import { api } from "@/lib/api";
import { decodeUsers, initProto } from "@/features/protobuf/decode";

export default function DataPanel() {
  // ✅ fetch only first page (for display)
  const { data, isLoading } = useVerifiedUsers(1, 10);

  const [loadingExport, setLoadingExport] = useState(false);

  const users = data?.users ?? [];
  const total = data?.meta?.total ?? 0;

  // ✅ EXPORT ALL USERS (iterate pages)
  const handleExportJSON = async () => {
    try {
      setLoadingExport(true);

      await initProto();

      const allUsers: any[] = [];

      const totalPages = data?.meta?.totalPages ?? 1;

      for (let page = 1; page <= totalPages; page++) {
        const res = await api.get("/user/export", {
          params: { page, limit: 50 }, // bigger batch for export
          responseType: "arraybuffer",
        });

        const decoded = decodeUsers(res.data);
        allUsers.push(...decoded.users);
      }

      const blob = new Blob([JSON.stringify(allUsers, null, 2)], {
        type: "application/json",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "users-export.json";
      a.click();

      window.URL.revokeObjectURL(url);
    } finally {
      setLoadingExport(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-lg text-gray-900">
            Data Management
          </h2>
          <p className="text-sm text-gray-500">
            Export verified users from the system
          </p>
        </div>

        {/* ✅ TOTAL USERS (FIXED) */}
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          {isLoading ? "..." : `${total} users`}
        </span>
      </div>

      {/* EXPORT BUTTON */}
      <button
        onClick={handleExportJSON}
        disabled={loadingExport || isLoading || total === 0}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl 
        bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium
        hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <Download size={18} />
        {loadingExport ? "Exporting..." : "Export Users (JSON)"}
      </button>

      {/* INFO BOX */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-700">
        <strong className="block mb-1">Data Format</strong>
        <p>
          Export includes user records such as role, status, email, and
          verification signature metadata.
        </p>
      </div>

      {/* FOOTER STATUS */}
      <div className="text-sm text-gray-500">
        {isLoading ? (
          <span className="animate-pulse">Loading users...</span>
        ) : total === 0 ? (
          <span>No users available for export</span>
        ) : (
          <span>{total} users ready for export</span>
        )}
      </div>
    </div>
  );
}