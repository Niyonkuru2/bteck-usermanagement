"use client";

import { useVerifiedUsers } from "../useVerifiedUsers";
import { CheckCircle2, XCircle } from "lucide-react";

export default function UserTable() {
  const { data, isLoading } = useVerifiedUsers();

  const users = data ?? [];

  // ROLE STYLES
  const roleStyles: Record<string, string> = {
    user: "bg-gray-100 text-gray-700",
    moderator: "bg-blue-100 text-blue-700",
    admin: "bg-purple-100 text-purple-700",
  };

  // STATUS STYLES
  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Users
        </h2>
        <p className="text-sm text-gray-500">
          Protobuf verified user records
        </p>
      </div>

      {/* LOADING */}
      {isLoading ? (
        <div className="text-sm text-gray-500 py-10 text-center animate-pulse">
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div className="text-sm text-gray-500 py-10 text-center">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-sm border-separate border-spacing-y-2">

            {/* HEAD */}
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-3 font-medium">Email</th>
                <th className="py-3 font-medium">Role</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Join Date</th>
                <th className="py-3 font-medium">Signature</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className="bg-white border border-gray-100 rounded-xl hover:shadow-sm transition"
                >

                  {/* EMAIL */}
                  <td className="py-3 px-2 text-gray-800">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${
                        roleStyles[user.role] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${
                        statusStyles[user.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="py-3 px-2 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* SIGNATURE */}
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        user.isValid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isValid ? (
                        <>
                          <CheckCircle2 size={14} />
                          Valid
                        </>
                      ) : (
                        <>
                          <XCircle size={14} />
                          Invalid
                        </>
                      )}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}