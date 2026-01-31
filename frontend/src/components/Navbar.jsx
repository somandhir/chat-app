import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { COLORS, EFFECTS } from "../UI/ui.js";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    /* Changed to 'sticky' so subsequent elements stay below it. 
       Added border-b to give it a clean separation from the page content.
    */
    <nav
      className={`sticky top-0 z-50 w-full border-b ${COLORS.border} ${COLORS.bgPrimary} px-6 py-3`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className={`w-10 h-10 ${COLORS.bgSecondary} rounded-xl flex items-center justify-center 
            border ${COLORS.border} group-hover:border-gray-600 ${EFFECTS.transition}`}
          >
            <MessageSquare className={`w-5 h-5 ${COLORS.textPrimary}`} />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold ${COLORS.textPrimary} leading-none tracking-tight`}
            >
              ECHO
            </span>
            <span
              className={`text-[10px] ${COLORS.textMuted} font-medium tracking-[0.2em] uppercase`}
            >
              Chat
            </span>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2">
          {authUser && (
            <>
              {/* Vertical Divider */}
              <div className={`h-6 w-px ${COLORS.border} mx-2`} />

              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${COLORS.textSecondary} 
                hover:${COLORS.textPrimary} hover:${COLORS.bgSecondary} ${EFFECTS.transition}`}
              >
                <div
                  className={`w-8 h-8 rounded-full border ${COLORS.border} flex items-center justify-center ${COLORS.bgCard}`}
                >
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium hidden md:block">
                  Account
                </span>
              </Link>

              <button
                onClick={logout}
                className={`ml-2 p-2.5 rounded-xl text-red-500/70 hover:text-red-400 
                hover:bg-red-500/10 ${EFFECTS.transition}`}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
