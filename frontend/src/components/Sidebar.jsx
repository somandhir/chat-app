import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SideBarSkeleton from "./Skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { COLORS, EFFECTS } from "../UI/ui.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useState } from "react";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
  console.log(showOnlineOnly);
  console.log(filteredUsers);

  if (isUsersLoading) return <SideBarSkeleton />;

  return (
    <aside
      className={`h-full w-20 lg:w-72 border-r ${COLORS.border} flex flex-col ${EFFECTS.transition} z-10`}
    >
      {/* Header */}
      <div className={`border-b ${COLORS.border} w-full p-5 cursor-pointer`}>
        <div
          className="flex items-center gap-2"
          onClick={() => setSelectedUser(null)}
        >
          <Users className={`size-6 ${COLORS.textPrimary}`} />
          <span className={`font-medium hidden lg:block ${COLORS.textPrimary}`}>
            Contacts
          </span>
        </div>
        {/* online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            {" "}
            {onlineUsers.length - 1} online{" "}
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-gray-800">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              console.log("Selecting user:", user.fullName); // Debugging log
              setSelectedUser(user);
            }}
            // Note: Fixed dynamic hover by using a standard hover class that matches your theme
            className={`
              w-full p-3 flex items-center gap-3 cursor-pointer
              hover:bg-[#1a1a1a] transition-colors duration-200
              ${selectedUser?._id === user._id ? `bg-[#1a1a1a] ring-1 ring-inset ${COLORS.border}` : ""}
            `}
          >
            {/* Avatar Section */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user?.profilePic || "/placeholder.jpg"}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                }}
                alt={user?.fullName}
                className="size-12 object-cover rounded-full border border-gray-800"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-[#0a0a0a]" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className={`font-medium truncate ${COLORS.textPrimary}`}>
                {user.fullName}
              </div>
              <div className={`text-sm ${COLORS.textMuted}`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className={`text-center ${COLORS.textMuted} py-8`}>
            No users found
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
