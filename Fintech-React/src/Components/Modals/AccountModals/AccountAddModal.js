import React, { useState } from "react";
import { createUserAccount } from "../../../services/api"; // our API helper

export default function AddModal({ isOpen, onClose, onAdd }) {
  // for error array
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    accountName: "",
    accountForm: "",
    userAccountType: "",
    providerName: "",
    currentBalance: 0,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.accountName.trim()) {
      errors.accountName = "Account Name is required.";
    }
    if (!formData.accountForm) {
      errors.accountForm = "Account Form is required.";
    }
    if (!formData.userAccountType) {
      errors.userAccountType = "Account Type is required.";
    }
    if (!formData.providerName) {
      errors.providerName = "Provider Name is required.";
    }
    if ((formData.currentBalance = "" || formData.currentBalance < 0)) {
      errors.currentBalance = "Initial amount must be 0 or more.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    try {
      if (!validate()) {
        return;
      }

      await createUserAccount({
        ...formData,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      });

      onAdd(); // refresh parent list

      setFormData({
        accountName: "",
        accountForm: "",
        userAccountType: "",
        providerName: "",
        currentBalance: 0,
      });

      onClose(); // close modal
    } catch (error) {
      console.error("Failed to add account:", error);
      alert("Failed to add account. Check console.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] relative">
        {/* Display all errors at once */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-2 border border-red-400 bg-red-100 rounded">
            <ul className="text-red-500 text-sm list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </ul>
          </div>
        )}
        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">Add Account</h2>

        {/* Modal Content */}
        <div className="text-gray-700 mb-4">
          <label className="block mb-2 font-semibold">Account Name</label>
          <input
            name="accountName"
            type="text"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Account Name"
            className="border rounded-lg px-4 py-2 w-full mb-3"
          />

          <label className="block mb-2 font-semibold">Account Form</label>
          <select
            name="accountForm"
            value={formData.accountForm}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full mb-3"
          >
            <option value="" disabled>
              Select account form
            </option>
            <option>Cash</option>
            <option>E-Wallet</option>
            <option>Digital Currency</option>
            <option>Bank deposit</option>
          </select>

          <label className="block mb-2 font-semibold">Account Type</label>
          <select
            name="userAccountType"
            value={formData.userAccountType}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full mb-3"
          >
            <option value="" disabled>
              Select account type
            </option>
            <option>Savings</option>
            <option>Expenses</option>
          </select>

          <label className="block mb-2 font-semibold">Provider Name</label>
          <select
            name="providerName"
            value={formData.providerName}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full mb-3"
          >
            <option value="" disabled>
              Select provider name
            </option>
            <option>BDO</option>
            <option>BPI</option>
            <option>MetroBank</option>
            <option>G-Cash</option>
            <option>Maya</option>
            <option>Others</option>
          </select>

          <label className="block mb-2 font-semibold">Initial Balance</label>
          <input
            name="currentBalance"
            type="number"
            value={formData.currentBalance}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="border rounded-lg px-4 py-2 w-full mb-3"
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        {/* Footer */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={handleSave}
            className="bg-[#9FD8CB] text-black px-4 py-2 rounded-lg  shadow hover:bg-[#4bb69e] transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
