import React, { useEffect, useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  updateProfilePicture,
  changePassword,
  logoutUser,
} from "../services/api";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [editForm, setEditForm] = useState(profile);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfile(res.data);
        setEditForm(res.data);
        if (res.data.profilePicture)
          setPreview(`http://localhost:5000/${res.data.profilePicture}`);
      })
      .catch(() => setError("Failed to load profile"));
  }, []);

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPicture(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitProfilePicture = async () => {
    if (!picture) return;
    try {
      const formData = new FormData();
      formData.append("profilePicture", picture);
      await updateProfilePicture(formData);
      setSuccess("Profile picture updated!");
      setPicture(null);
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to update picture");
    }
  };

  const submitEditProfile = async () => {
    try {
      await updateProfile(editForm);
      setProfile(editForm);
      setShowEditModal(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to update profile");
    }
  };

  const submitPasswordChange = async () => {
    try {
      if (!passwordForm.currentPassword || !passwordForm.newPassword) {
        setError("Both current and new password are required");
        return;
      }
      await changePassword(passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setShowPasswordModal(false);
      setSuccess("Password changed successfully!");
    } catch (err) {
      setError(
        err.response?.data || err.message || "Failed to change password"
      );
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-extrabold mb-8">Profile Settings</h1>

      {error && (
        <div className="text-red-600 font-semibold mb-4 text-lg">{error}</div>
      )}
      {success && (
        <div className="text-green-600 font-semibold mb-4 text-lg">
          {success}
        </div>
      )}

      {/* Profile Picture */}
      <div className="flex items-center gap-6 mb-8">
        {preview ? (
          <img
            src={preview}
            alt="User avatar"
            className="w-28 h-28 rounded-full border-4 border-primary object-cover"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center border-4 border-primary text-lg font-semibold">
            No Image
          </div>
        )}
        <div>
          <p className="text-gray-700 font-semibold text-xl mb-2">
            Change Profile Picture
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mb-2 text-lg"
          />
          {picture && (
            <button
              onClick={submitProfilePicture}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-lg"
            >
              Upload Picture
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 text-xl">
        <h1 className="text-4xl font-extrabold mb-8">Personal Information</h1>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xl">
        <div>
          <p className="font-bold text-2xl">First Name</p>
          <p className="text-gray-800 text-xl">{profile.firstName}</p>
        </div>
        <div>
          <p className="font-bold text-2xl">Last Name</p>
          <p className="text-gray-800 text-xl">{profile.lastName}</p>
        </div>
        <div>
          <p className="font-bold text-2xl">Email</p>
          <p className="text-gray-800 text-xl">{profile.email}</p>
        </div>
        <div>
          <p className="font-bold text-2xl">Address</p>
          <p className="text-gray-800 text-xl">{profile.address}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-lg hover:brightness-110"
        >
          Edit Personal Information
        </button>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-lg hover:brightness-110"
        >
          Change Password
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:brightness-110"
        >
          Logout
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Edit Personal Information
            </h2>
            <div className="space-y-3 text-lg">
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleEditChange}
                placeholder="First Name"
                className="w-full border rounded-lg px-3 py-2 text-lg"
              />
              <input
                type="text"
                name="lastName"
                value={editForm.lastName}
                onChange={handleEditChange}
                placeholder="Last Name"
                className="w-full border rounded-lg px-3 py-2 text-lg"
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full border rounded-lg px-3 py-2 text-lg"
              />
              <input
                type="text"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
                placeholder="Address"
                className="w-full border rounded-lg px-3 py-2 text-lg"
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 font-medium text-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitEditProfile}
                className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Change Password</h2>
            <div className="space-y-3 text-lg">
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                className="w-full border rounded-lg px-3 py-2 text-lg"
              />
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="w-full border rounded-lg px-3 py-2 text-lg"
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 font-medium text-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitPasswordChange}
                className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-lg"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProfileSettings;
