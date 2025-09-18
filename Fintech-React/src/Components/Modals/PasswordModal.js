import React from "react";

const PasswordModal = ({
  isOpen,
  onClose,
  passwordForm,
  onChange,
  onSubmit,
  onUpdate,
}) => {
  if (!isOpen) return null;

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(passwordForm); // 🔹 Call parent update (API)
    }
    if (onSubmit) {
      onSubmit(passwordForm); // 🔹 Optional: keep your existing handler
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px] shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Change Password</h2>
        <div className="space-y-3 text-lg">
          <label className="block font-semibold">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2 text-lg"
          />
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2 text-lg"
          />
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 font-medium text-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            className="px-4 py-2 rounded-lg bg-[#9FD8CB] text-black font-medium text-lg"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
