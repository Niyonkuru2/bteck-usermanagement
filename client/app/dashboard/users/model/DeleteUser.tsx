"use client";

import { useDeleteUser } from "@/features/users/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type User = {
  id: string;
  email: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
};

export default function DeleteUserModal({
  isOpen,
  onClose,
  user,
}: Props) {
  const { mutate, isPending } = useDeleteUser();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    if (!user?.id) return;

    mutate(user.id, {
      onSuccess: () => {
        toast.success("User deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["verifiedUsers"],
        });

        onClose();
      },
      onError: () => {
        toast.error("Failed to delete user");
      },
    });
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
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Delete User
          </h2>
          <p className="text-sm text-gray-500">
            This action is permanent and cannot be undone
          </p>
        </div>

        {/* WARNING BOX */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700">
          <p>
            You are about to delete:
          </p>

          <p className="font-semibold mt-1 text-red-800 break-all">
            {user.email}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">

          {/* CANCEL */}
          <button
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm
            hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600
            text-white text-sm font-medium hover:opacity-90 active:scale-[0.98]
            transition disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Deleting..." : "Delete User"}
          </button>

        </div>
      </div>
    </div>
  );
}