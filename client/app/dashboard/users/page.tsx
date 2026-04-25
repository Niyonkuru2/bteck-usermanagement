"use client";

import { useState } from "react";
import { useVerifiedUsers } from "@/features/protobuf/useVerifiedUsers";

import {
  CheckCircle2,
  XCircle,
  Plus,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import CreateUserModal from "./model/CreateUserForm";
import UpdateUserModal from "./model/UpdateUser";
import DeleteUserModal from "./model/DeleteUser";
import ViewUserModal from "./model/ViewUser";

export default function UserManagementPage() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading } = useVerifiedUsers(page, limit);

  const users = data?.users ?? [];
  const meta = data?.meta;

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modal, setModal] = useState<
    null | "create" | "edit" | "delete" | "view"
  >(null);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u: any) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );
const totalPages = Number(meta?.totalPages || 0);
const currentPage = Number(meta?.page || 1);

  // ROLE COLORS
  const roleStyles: Record<string, string> = {
    user: "bg-gray-100 text-gray-700",
    moderator: "bg-blue-100 text-blue-700",
    admin: "bg-purple-100 text-purple-700",
  };

  // STATUS COLORS
  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total Users: {meta?.total ?? 0}
          </p>
        </div>

        <button
          onClick={() => setModal("create")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
          bg-gradient-to-r from-blue-600 to-indigo-600 text-white
          hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
        transition cursor-text"
      />

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {isLoading ? (
          <div className="p-10 text-center text-gray-500 animate-pulse">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <table className="w-full text-sm">

            {/* HEAD */}
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="p-4 font-medium">Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Verification</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filteredUsers.map((user: any) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-800">{user.email}</td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${
                        roleStyles[user.role] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${
                        statusStyles[user.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="text-gray-600">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td>
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
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

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex justify-end gap-3">

                      <button
                       aria-label="edit"
                        onClick={() => {
                          setSelectedUser(user);
                          setModal("edit");
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 cursor-pointer transition"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                       aria-label="delete"
                        onClick={() => {
                          setSelectedUser(user);
                          setModal("delete");
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer transition"
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        aria-label="view"
                        onClick={() => {
                          setSelectedUser(user);
                          setModal("view");
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition"
                      >
                        <Eye size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
   {totalPages > 1 && (
  <div className="flex items-center justify-between">

    {/* Previous */}
    <button
      disabled={currentPage <= 1}
      onClick={() => setPage((p) => p - 1)}
      className="px-4 py-2 text-sm rounded-xl border border-gray-200
      hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
    >
      Previous
    </button>

    {/* Pages */}
    <div className="flex items-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`
            w-9 h-9 flex items-center justify-center rounded-full text-sm transition cursor-pointer
            ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }
          `}
        >
          {page}
        </button>
      ))}
    </div>

    {/* Next */}
    <button
      disabled={currentPage >= totalPages}
      onClick={() => setPage((p) => p + 1)}
      className="px-4 py-2 text-sm rounded-xl border border-gray-200
      hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
    >
      Next
    </button>

  </div>
)}
      {/* MODALS */}
      {modal === "create" && (
        <CreateUserModal isOpen onClose={() => setModal(null)} />
      )}

      {modal === "edit" && (
        <UpdateUserModal
          isOpen
          onClose={() => setModal(null)}
          user={selectedUser}
        />
      )}

      {modal === "delete" && (
        <DeleteUserModal
          isOpen
          onClose={() => setModal(null)}
          user={selectedUser}
        />
      )}

      {modal === "view" && (
        <ViewUserModal
          isOpen
          onClose={() => setModal(null)}
          user={selectedUser}
        />
      )}
    </div>
  );
}