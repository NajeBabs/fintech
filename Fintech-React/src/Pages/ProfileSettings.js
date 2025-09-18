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

// ✅ Import your new modal components
import EditProfileModal from "../Components/Modals/EditProfileModal";
import PasswordModal from "../Components/Modals/PasswordModal";

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
        localStorage.setItem("user", JSON.stringify(res.data));

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
      await updateProfilePicture(picture);

      const res = await getProfile();
      setProfile(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      setSuccess("Profile picture updated!");
      setPicture(null);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  const submitEditProfile = async () => {
    try {
      await updateProfile(editForm);
      setProfile(editForm);
      setShowEditModal(false);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to update profile");
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
      setError("");
    } catch (err) {
      setError(err.message || "Failed to update profile");
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
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Default avatar"
            className="w-28 h-28 rounded-full border-4 border-primary object-cover"
          />
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

      {/* ✅ Externalized Modals */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        editForm={editForm}
        onChange={handleEditChange}
        onSubmit={submitEditProfile}
        onUpdate={async (updatedData) => {
          try {
            const updatedProfile = await updateProfile(updatedData);
            setProfile(updatedProfile); // refresh state
          } catch (err) {
            console.error("Update profile failed:", err.message);
          }
        }}
      />

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        passwordForm={passwordForm}
        onChange={handlePasswordChange}
        onSubmit={submitPasswordChange}
        onUpdate={async (newPassData) => {
          try {
            await changePassword(newPassData);
            console.log("Password updated!");
          } catch (err) {
            console.error("Password change failed:", err.message);
          }
        }}
      />
    </DashboardLayout>
  );
};

export default ProfileSettings;
