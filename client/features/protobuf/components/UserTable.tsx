"use client";

import { useVerifiedUsers } from "../useVerifiedUsers";

export default function UserTable() {
  const { data, isLoading } = useVerifiedUsers();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="font-bold mb-4">Users (Protobuf Verified)</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
      <th>Join Date</th>
      <th>Actions</th>

          </tr>
        </thead>

        <tbody>
          {data?.map((user: any) => (
            <tr key={user.id} className="border-b">
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><span className={`px-3 py-1 rounded-full text-xs font-medium ${
  user.status === "active"
    ? "bg-green-100 text-green-700"
    : "bg-gray-200 text-gray-600"
}`}>
  {user.status}
</span></td>

              <td>
                {user.isValid ? (
                  <span className="text-green-600 font-bold">✓ Valid</span>
                ) : (
                  <span className="text-red-600 font-bold">✗ Invalid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}