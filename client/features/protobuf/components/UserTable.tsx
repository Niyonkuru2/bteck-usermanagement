"use client";

import { useVerifiedUsers } from "../useVerifiedUsers";

export default function UserTable() {
  const { data, isLoading } = useVerifiedUsers();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-bold mb-4">Users (Protobuf Verified)</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Signature</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((user: any) => (
            <tr key={user.id} className="border-b">
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>

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