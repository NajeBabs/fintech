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
import {Toaster, toast } from 'react-hot-toast';

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
      toast.success("Profile picture updated!");
      setPicture(null);
      setError("");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const submitEditProfile = async () => {
    try {
      await updateProfile(editForm);
      setProfile(editForm);
      setShowEditModal(false);
      toast.success("Profile updated successfully!");
      setError("");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
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
      toast.success("Password changed successfully!");
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
      <Toaster />
      <div className="flex justify-between items-center mb-5">
        <h1 suppressHydrationWarning className="text-2xl">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h1>
        <input
          type="text"
          placeholder="Search Here"
          className="border rounded-full px-4 py-2"
        />
      </div>
      <hr className="mb-5" />

      {error && (
        <div className="text-red-600 font-semibold mb-4 text-lg">{error}</div>
      )}
      {success && (
        <div className="text-green-600 font-semibold mb-4 text-lg">
          {success}
        </div>
      )}

      {/* Profile Picture */}
      <div className="relative items-center gap-6 mb-8">
        <div className="flex items-center gap-6 mb-8">
        {preview ? (
          <img
            src={preview}
            alt="User avatar"
            className="w-28 h-28 rounded-full border-4 border-[#9FD8CB] object-cover"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center border-4 border-[#9FD8CB] text-lg font-semibold">
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
            className="text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#9FD8CB] file:text-black hover:file:bg-primary/80 rounded-lgcursor-pointer"
          />
          {picture && (
            <button
              onClick={submitProfilePicture}
              className="bg-[#9FD8CB] text-black text-sm px-4 py-2 rounded-lg font-semibold"
            >
              Upload Picture
            </button>
          )}
        </div>
      </div>

         <button
          onClick={() => setShowEditModal(true)}
          className="bg-[#9FD8CB] text-black absolute top-0 right-0 px-6 py-3 rounded-full font-bold hover:brightness-110"
        >
          Edit Personal Information
        </button>
      </div>
      
      <div className="relative ">
      {/* Personal Info */}
        <div className="grid grid-cols-3 md:grid-cols-2 gap-6 mb-8 text-xl">
          <div>
            <p className="text-gray-500 text-xl">First Name</p>
            <p className="font-bold text-2xl">{profile.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xl">Last Name</p>
            <p className="font-bold text-2xl">{profile.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xl">Email</p>
            <p className="font-bold text-2xl">{profile.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xl">Address</p>
            <p className="font-bold text-2xl">{profile.address}</p>
          </div>
        </div>

      {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-[#9FD8CB] text-black px-4 py-2 rounded-lg font-semibold hover:brightness-110"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white absolute bottom-0 right-0 px-4 py-2 rounded-lg font-semibold hover:brightness-110"
          >
            Logout
          </button>
        </div>
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
