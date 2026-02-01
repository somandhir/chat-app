import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";
import { COLORS } from "../UI/ui.js";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className={`p-4 border-b ${COLORS.border} ${COLORS.bgCard}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar Section */}
          <div className="relative">
            <div className="size-10 rounded-full border border-gray-800 overflow-hidden">
              <img
                src={selectedUser?.profilePic || "/placeholder.jpg"}
                alt={selectedUser?.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />
            </div>
            {/* Online Status Dot */}
            {onlineUsers.includes(selectedUser?._id) && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-[#141414]" />
            )}
          </div>

          {/* User Info */}
          <div>
            <h3 className={`font-medium ${COLORS.textPrimary} leading-tight`}>
              {selectedUser?.fullName}
            </h3>
            <p className={`text-xs ${COLORS.textSecondary}`}>
              {onlineUsers.includes(selectedUser?._id) ? (
                <span className="text-green-500">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className={`p-2 rounded-lg ${COLORS.textSecondary} hover:${COLORS.bgSecondary} hover:${COLORS.textPrimary} transition-colors`}
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;