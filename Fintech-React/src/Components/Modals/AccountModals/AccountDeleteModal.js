import React from "react";
import { deleteUserAccount } from "../../../services/api";

export default function DeleteModal({ isOpen, onClose, account, onDelete }) {
  if (!isOpen || !account) return null;

  const handleDelete = async () => {
    try {
      await deleteUserAccount(account.id);
      onDelete(); // refresh parent UI
      onClose();
    } catch (error) {
      console.error("Delete error:", error.response || error);
      alert("Delete failed. Please check console.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[770px] relative">
        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">Delete Account</h2>

        {/* Modal Content */}
        <div className="text-gray-700 mb-4">
          <p>
            Are you sure you want to delete{" "}
            <strong>{account.accountName}</strong>? This action cannot be
            undone.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Confirm
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
