import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { EyeOff, Mail, MessageSquare, Eye, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { COLORS, EFFECTS } from "../UI/ui.js";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    if(isLoggingIn)return;
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className={`min-h-screen ${COLORS.bgPrimary} relative overflow-hidden flex items-center justify-center p-4`}
    >
      {/* Dynamic Starry Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                             radial-gradient(2px 2px at 60% 70%, white, transparent),
                             radial-gradient(1px 1px at 50% 50%, white, transparent),
                             radial-gradient(1px 1px at 80% 10%, white, transparent),
                             radial-gradient(2px 2px at 90% 60%, white, transparent)`,
            backgroundSize: "200% 200%",
            opacity: 0.3,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div
          className={`${COLORS.bgCard} ${COLORS.border} border rounded-3xl p-8 ${EFFECTS.glowStrong} backdrop-blur-sm`}
        >
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <div
              className={`w-16 h-16 ${COLORS.bgSecondary} rounded-2xl flex items-center justify-center mb-4 border ${COLORS.border} ${EFFECTS.transition} hover:scale-105`}
            >
              <MessageSquare className={`w-8 h-8 ${COLORS.textPrimary}`} />
            </div>
            <h1
              className={`text-2xl font-bold ${COLORS.textPrimary} mb-2 tracking-tight`}
            >
              Welcome Back
            </h1>
            <p className={`${COLORS.textSecondary} text-sm`}>
              Simple, fast messaging
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                className={`block text-sm font-medium ${COLORS.textSecondary} mb-2 ml-1`}
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 ${COLORS.textMuted} group-focus-within:${COLORS.textPrimary} transition-colors`}
                  />
                </div>
                <input
                  type="email"
                  className={`w-full pl-12 pr-4 py-3 ${COLORS.inputBg} ${COLORS.inputBorder} ${COLORS.inputFocus} border rounded-xl ${COLORS.textPrimary} placeholder-gray-600 focus:outline-none transition-all`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                className={`block text-sm font-medium ${COLORS.textSecondary} mb-2 ml-1`}
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`w-5 h-5 ${COLORS.textMuted} group-focus-within:${COLORS.textPrimary} transition-colors`}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-3 ${COLORS.inputBg} ${COLORS.inputBorder} ${COLORS.inputFocus} border rounded-xl ${COLORS.textPrimary} placeholder-•••••••• focus:outline-none transition-all`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      className={`w-5 h-5 ${COLORS.textMuted} hover:${COLORS.textPrimary} transition-colors`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${COLORS.textMuted} hover:${COLORS.textPrimary} transition-colors`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full mt-6 py-3.5 px-6   ${COLORS.textPrimary} font-semibold rounded-xl ${EFFECTS.transition} transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${EFFECTS.glowStrong}`}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${COLORS.border}`}></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className={`px-4  ${COLORS.textMuted}`}>New to ECHO?</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/signup"
              className={` hover:text-[#00b8e6] font-medium ${EFFECTS.transition}`}
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
   
    </div>
  );
}

export default LoginPage;
