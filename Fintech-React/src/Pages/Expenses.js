import React, { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { Plus, Edit2, Trash2 } from "lucide-react";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data (replace with your API or DB data)
  const [expenses] = useState([
    {
      id: 1,
      date: "August 12, 2025",
      time: "11:59 AM",
      description: "Paid for Gas",
      account: "GCash Wallet",
      amount: 500,
    },
    {
      id: 2,
      date: "August 13, 2025",
      time: "12:30 AM",
      description: "Paid for Food",
      account: "GCash Wallet",
      amount: 100,
    },
    {
      id: 3,
      date: "August 13, 2025",
      time: "6:35 PM",
      description: "Paid for Parking",
      account: "Cash",
      amount: 30,
    },
    {
      id: 4,
      date: "August 13, 2025",
      time: "8:00 PM",
      description: "Paid for Dinner",
      account: "Cash",
      amount: 100,
    },
  ]);

  // Filtered results
  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1
          suppressHydrationWarning={true}
          className="text-2xl font-semibold text-gray-700"
        >
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-full px-4 py-2 shadow-sm"
        />
      </div>

      <hr className="mb-5" />

      <div className="flex justify-end mb-3">
        {/* Add Expense Button */}
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition">
          <Plus size={16} />
          Add Expense
        </button>
      </div>
      {/* Card */}
      <div className="bg-white rounded-xl p-6 shadow">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Expenses</h2>
          <div className="flex items-center gap-3">
            {/* Sort dropdown (dummy for now) */}
            <select className="border rounded px-3 py-1 text-sm">
              <option>latest</option>
              <option>oldest</option>
            </select>

            {/* Row limit dropdown (dummy for now) */}
            <select className="border rounded px-3 py-1 text-sm">
              <option>show 5 rows</option>
              <option>show 10 rows</option>
              <option>show all</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 text-sm">
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Description</th>
                <th className="p-3">Account deducted from</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((exp) => (
                  <tr
                    key={exp.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3">{exp.date}</td>
                    <td className="p-3">{exp.time}</td>
                    <td className="p-3">{exp.description}</td>
                    <td className="p-3">{exp.account}</td>
                    <td className="p-3 font-semibold">${exp.amount}</td>
                    <td className="p-3 flex gap-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer (row count) */}
        <div className="mt-3 text-sm text-gray-500">
          showing {filteredExpenses.length} of {expenses.length} Records
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
