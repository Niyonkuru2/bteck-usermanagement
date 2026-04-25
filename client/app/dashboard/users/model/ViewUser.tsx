"use client";

type User = {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
  isValid?: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
};

export default function ViewUserModal({ isOpen, onClose, user }: Props) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      {/* MODAL CARD */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 relative animate-fadeIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 transition cursor-pointer"
        >
          X
        </button>

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            User Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Complete profile information
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-5 text-sm">

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs uppercase tracking-wide">
              Email
            </span>
            <span className="font-medium text-gray-900">
              {user.email}
            </span>
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs uppercase tracking-wide">
              Role
            </span>
            <span className="font-medium capitalize text-gray-900">
              {user.role}
            </span>
          </div>

          {/* STATUS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs uppercase tracking-wide">
              Status
            </span>

            <span
              className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {user.status}
            </span>
          </div>

          {/* CREATED DATE */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs uppercase tracking-wide">
              Created At
            </span>
            <span className="text-gray-900 font-medium">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "—"}
            </span>
          </div>

          {/* VALIDATION */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs uppercase tracking-wide">
              Verification
            </span>

            <span
              className={`inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-medium ${
                user.isValid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isValid ? "✓ Valid Signature" : "✗ Invalid Signature"}
            </span>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200
            hover:bg-gray-50 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}