import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ShieldCheck, Calendar } from "lucide-react";
import { COLORS, EFFECTS } from "../UI/ui.js";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className={`min-h-[calc(100vh-73px)] ${COLORS.bgPrimary} py-10 px-4`}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Card */}
        <div
          className={`${COLORS.bgCard} border ${COLORS.border} rounded-2xl p-8`}
        >
          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold ${COLORS.textPrimary}`}>
              Profile
            </h1>
            <p className={`text-sm ${COLORS.textSecondary} mt-1`}>
              Your personal account information
            </p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="relative group">
              <img
                src={selectedImg || authUser?.profilePic || "/placeholder.jpg"}
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-white p-2 rounded-full cursor-pointer 
                  hover:scale-105 transition-all
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-black" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className={`text-xs ${COLORS.textMuted}`}>
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details (Read-only UI) */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div
                className={`text-sm ${COLORS.textMuted} flex items-center gap-2`}
              >
                <User className="w-4 h-4" />
                Full Name
              </div>
              <div
                className={`px-4 py-3 ${COLORS.bgSecondary} rounded-xl border ${COLORS.border} ${COLORS.textPrimary}`}
              >
                {authUser?.fullName}
              </div>
            </div>

            <div className="space-y-1.5">
              <div
                className={`text-sm ${COLORS.textMuted} flex items-center gap-2`}
              >
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <div
                className={`px-4 py-3 ${COLORS.bgSecondary} rounded-xl border ${COLORS.border} ${COLORS.textPrimary}`}
              >
                {authUser?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Account Information Section */}
        <div
          className={`${COLORS.bgCard} border ${COLORS.border} rounded-2xl p-8`}
        >
          <h2 className={`text-lg font-semibold ${COLORS.textPrimary} mb-6`}>
            Account Information
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <span
                className={`flex items-center gap-2 ${COLORS.textSecondary}`}
              >
                <Calendar className="w-4 h-4" />
                Member Since
              </span>
              <span className={COLORS.textPrimary}>
                {authUser?.createdAt?.split("T")[0]}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span
                className={`flex items-center gap-2 ${COLORS.textSecondary}`}
              >
                <ShieldCheck className="w-4 h-4 text-green-500" />
                Account Status
              </span>
              <span className="text-green-500 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
