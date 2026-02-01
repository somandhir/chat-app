import React from "react";
import { Users } from "lucide-react";
import { COLORS } from "../../UI/ui.js";

const SideBarSkeleton = () => {
  // Create 8 skeleton items to fill the sidebar
  const skeletonItems = Array(8).fill(null);

  return (
    <aside
      className={`h-full w-20 lg:w-72 border-r ${COLORS.border} flex flex-col overflow-hidden`}
    >
      {/* Header Skeleton */}
      <div className={`border-b ${COLORS.border} w-full p-5`}>
        <div className="flex items-center gap-2">
          <Users className={`w-6 h-6 ${COLORS.textMuted}`} />
          <div className={`h-4 w-20 ${COLORS.bgSecondary} rounded hidden lg:block animate-pulse`} />
        </div>
      </div>

      {/* Skeleton Items */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonItems.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar Skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className={`size-12 ${COLORS.bgSecondary} rounded-full animate-pulse`} />
            </div>

            {/* User Info Skeleton - Only visible on desktop */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className={`h-4 w-32 ${COLORS.bgSecondary} rounded mb-2 animate-pulse`} />
              <div className={`h-3 w-16 ${COLORS.bgSecondary} rounded animate-pulse`} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBarSkeleton;