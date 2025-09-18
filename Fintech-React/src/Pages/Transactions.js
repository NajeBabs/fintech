import React, { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { Download } from "lucide-react";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data (replace with your DB/API later)
  const [transactions] = useState([
    {
      id: 1,
      date: "August 12, 2025",
      time: "11:59 AM",
      type: "Expenses",
      account: "GCash Wallet",
      description: "Paid for Gas",
      amount: 500,
    },
    {
      id: 2,
      date: "August 12, 2025",
      time: "9:00 PM",
      type: "Savings",
      account: "BPI Savings",
      description: "Saving for Travel",
      amount: 1000,
    },
    {
      id: 3,
      date: "August 13, 2025",
      time: "12:30 AM",
      type: "Expenses",
      account: "GCash Wallet",
      description: "Paid for Food",
      amount: 100,
    },
    {
      id: 4,
      date: "August 13, 2025",
      time: "1:00 PM",
      type: "Income",
      account: "Cash",
      description: "Received money from mother",
      amount: 1000,
    },
  ]);

  // Filtered results
  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Download Button above container */}
      <div className="flex justify-end mb-3">
        <button className="flex items-center gap-2 bg-[#9FD8CB] text-black font-bold px-4 py-2 rounded-full shadow hover:bg-[#4bb69e] transition">
          + Download Transactions
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl p-6 shadow">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Transactions</h2>
          <div className="flex justify-end gap-2 mb-3">
            {/* Sorting controls */}
            <select className="border rounded px-3 py-1 text-sm">
              <option>latest</option>
              <option>oldest</option>
            </select>
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
                <th className="p-3">Type</th>
                <th className="p-3">Account</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3">{txn.date}</td>
                    <td className="p-3">{txn.time}</td>
                    <td className="p-3">{txn.type}</td>
                    <td className="p-3">{txn.account}</td>
                    <td className="p-3">{txn.description}</td>
                    <td className="p-3 font-semibold">${txn.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-3 text-sm text-gray-500">
          showing {filteredTransactions.length} of {transactions.length}{" "}
          Transactions
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
