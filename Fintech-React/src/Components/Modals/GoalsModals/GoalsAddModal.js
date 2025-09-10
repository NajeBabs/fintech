import React, { useState } from "react";
import { createUserAccount } from "../../../services/api"; // your API helper

export default function GAddModal({ isOpen, onClose }) {
  
  if (!isOpen) return null;

    const today = new Date().toISOString().split("T")[0];


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] relative">
        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">Add Goal</h2>

        {/* Modal Content */}
        <div className="text-gray-700 mb-4">
          <label className="block mb-2 font-semibold">Goal Name</label>
          <input
            type="text"
            placeholder="Goal Name"
            className="border rounded-lg px-4 py-2 w-full mb-3"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            {/* Start Date */}
            <div className="flex flex-col">
                <label className="mb-2 font-semibold">Start Date</label>
                <input
                type="date"
                min={today} // Prevent past dates
                className="rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-800"
                />
            </div>

            {/* End Date */}
            <div className="flex flex-col">
                <label className="mb-2 font-semibold">End Date</label>
                <input
                type="date"
                min={today} // End date must be after start date
                className="rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-800"
                />
            </div>
            </div>

          <label className="block mb-2 font-semibold">Target Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            className="border rounded-lg px-4 py-2 w-full mb-3"
          />

          <label className="block mb-2 font-semibold">Linked Account</label>
          <select className="border rounded-lg px-4 py-2 w-full mb-3">
            <option value="">Select Account</option>
            <option value="account1">Account 1</option>
            <option value="account2">Account 2</option>
            <option value="account3">Account 3</option>
          </select>
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
