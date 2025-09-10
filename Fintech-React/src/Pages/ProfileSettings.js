import React from "react";
import DashboardLayout from "../Components/DashboardLayout";

const ProfileSettings = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <div className="bg-white rounded-xl p-6 shadow space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="User avatar"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <p className="text-gray-700 font-medium">Change Profile Picture</p>
            <input type="file" className="mt-2" />
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Account Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-primary text-black px-6 py-2 rounded-lg font-bold hover:bg-opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;
