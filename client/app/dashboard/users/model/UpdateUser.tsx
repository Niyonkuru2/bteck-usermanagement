"use client";

import { useEffect, useState } from "react";
import { useUpdateUser } from "@/features/users/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type User = {
  id: string;
  email: string;
  role: string;
  status: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
};

export default function UpdateUserModal({
  isOpen,
  onClose,
  user,
}: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateUser();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (user && isOpen) {
      setEmail(user.email ?? "");
      setRole(user.role ?? "user");
      setStatus(user.status ?? "active");
    }
  }, [user, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    mutate(
      {
        id: user.id,
        data: { email, role, status },
      },
      {
        onSuccess: () => {
          toast.success("User updated successfully");
          queryClient.invalidateQueries({ queryKey: ["verifiedUsers"] });
          onClose();
        },
        onError: () => {
          toast.error("Failed to update user");
        },
      }
    );
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 animate-in fade-in zoom-in-95">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 transition cursor-pointer"
        >
          X
        </button>

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit User
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Update user details safely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs text-gray-500 uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          {/* ROLE */}
          <div className="space-y-1">
            <label
              htmlFor="role"
              className="text-xs text-gray-500 uppercase tracking-wide"
            >
              Role
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer"
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* STATUS */}
          <div className="space-y-1">
            <label
              htmlFor="status"
              className="text-xs text-gray-500 uppercase tracking-wide"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600
            text-white py-2.5 rounded-xl text-sm font-medium
            hover:opacity-90 active:scale-[0.98] transition
            disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Updating..." : "Update User"}
          </button>

        </form>
      </div>
    </div>
  );
}