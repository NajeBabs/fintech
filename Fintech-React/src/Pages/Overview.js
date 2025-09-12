import DashboardLayout from "../Components/DashboardLayout";
import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Overview = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    document.title = "Overview | FinTech";

    // Fetch logged-in profile
    getProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold flex-1">
          Hello {profile?.firstName || "User"}
        </h1>

        <h2 suppressHydrationWarning={true} className="text-2xl flex-1">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>

        <input
          type="text"
          placeholder="Search Here"
          className="border rounded-full px-4 py-2"
        />
      </div>
      <hr className="mb-5" />

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
          <p className="text-gray-500">$65,000.00</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Expenses</h2>
          <p className="text-gray-500">$5,000.00</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Goals</h2>
          <p className="text-gray-500">$10,500.00</p>
        </div>
      </div>

      {/* Table + Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="font-semibold mb-2">Recent Transactions</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Food</td>
                <td>$500</td>
              </tr>
              <tr>
                <td>Gas</td>
                <td>$300</td>
              </tr>
              <tr>
                <td>Rent</td>
                <td>$3,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="font-semibold mb-2">Statistics</h2>
          <div className="h-40 flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
