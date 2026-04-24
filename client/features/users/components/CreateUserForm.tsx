"use client";

import { useState } from "react";
import { useCreateUser } from "../hooks";

export default function CreateUserForm() {
  const { mutate, isPending } = useCreateUser();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, role, status },
      {
        onSuccess: () => {
          setEmail("");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-bold mb-4">Create User</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select
        className="border p-2 w-full mb-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
      </select>

      <select
        className="border p-2 w-full mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}