import React from "react";
import { COLORS } from "../../UI/ui";


const MessageSkeleton = () => {
  // Create an array of 6 items to represent a loading conversation
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className={`flex flex-col gap-1 max-w-[60%] ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
            
            {/* Avatar Skeleton (Optional, mirrors the chat bubble) */}
            <div className="flex items-center gap-2">
              {idx % 2 === 0 && (
                <div className={`size-8 rounded-full ${COLORS.bgSecondary} animate-pulse`} />
              )}
              
              {/* Message Bubble Skeleton */}
              <div
                className={`h-12 w-32 md:w-48 ${COLORS.bgSecondary} rounded-2xl animate-pulse ${
                  idx % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"
                }`}
              />
            </div>

            {/* Timestamp Skeleton */}
            <div className={`h-3 w-12 ${COLORS.bgSecondary} rounded animate-pulse mt-1`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;