import React from "react";

const EditProfileModal = ({
  isOpen,
  onClose,
  editForm,
  onChange,
  onSubmit,
  onUpdate,
}) => {
  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(editForm); // 🔹 Call parent update (API + refresh state)
    }
    if (onSubmit) {
      onSubmit(editForm); // 🔹 Optional: keep your existing handler
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Edit Personal Information</h2>
        <div className="space-y-3 text-lg">
          <input
            type="text"
            name="firstName"
            value={editForm.firstName}
            onChange={onChange}
            placeholder="First Name"
            className="w-full border rounded-lg px-3 py-2 text-lg"
          />
          <input
            type="text"
            name="lastName"
            value={editForm.lastName}
            onChange={onChange}
            placeholder="Last Name"
            className="w-full border rounded-lg px-3 py-2 text-lg"
          />
          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 text-lg"
          />
          <input
            type="text"
            name="address"
            value={editForm.address}
            onChange={onChange}
            placeholder="Address"
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
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
