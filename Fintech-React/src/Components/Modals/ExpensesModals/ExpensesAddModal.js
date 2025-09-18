import React, { useState } from "react";
import { createUserAccount } from "../../../services/api"; // your API helper


export default function EAddModal({ isOpen, onClose, onAdd }) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] relative">
        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        {/* Modal Content */}
        <div className="text-gray-700 mb-4">
          <label className="block mb-2 font-semibold">Date</label>
          <input
            name="accountName"
            type="date"
            placeholder="Expense date"
            className="border rounded-lg px-4 py-2 w-full mb-3"
          />

          <label className="block mb-2 font-semibold">Time</label>
          <input 
            aria-label="Time" 
            type="time" 
            className="border rounded-lg px-4 py-2 w-full mb-3"
          />
            

          <label className="block mb-2 font-semibold">Description</label>
            <input
                type="text"
                className="border rounded-lg px-4 py-2 w-full mb-3"
            />

          <label className="block mb-2 font-semibold">Amount</label>
            <input
                type="number"
                className="border rounded-lg px-4 py-2 w-full mb-3"
            />

          <label className="block mb-2 font-semibold">Account to deduct from</label>
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
