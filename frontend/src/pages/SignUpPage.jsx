import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  EyeOff,
  Mail,
  MessageSquare,
  User,
  Eye,
  Lock,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { COLORS, EFFECTS } from "../UI/ui.js";
import { toast } from "react-hot-toast";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      return toast.error("Invalid email format");
    if (!formData || formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  return (
    <div
      className={`min-h-screen ${COLORS.bgPrimary} relative overflow-hidden flex items-center justify-center p-4`}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                           radial-gradient(2px 2px at 60% 70%, white, transparent),
                           radial-gradient(1px 1px at 50% 50%, white, transparent),
                           radial-gradient(1px 1px at 80% 10%, white, transparent),
                           radial-gradient(2px 2px at 90% 60%, white, transparent),
                           radial-gradient(1px 1px at 33% 80%, white, transparent),
                           radial-gradient(1px 1px at 15% 55%, white, transparent)`,
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 0%",
            opacity: 0.4,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <div
          className={`${COLORS.bgCard} ${COLORS.border} border rounded-3xl p-8 ${EFFECTS.glow}`}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className={`w-16 h-16 ${COLORS.bgSecondary} rounded-2xl flex items-center justify-center mb-4 ${COLORS.border} border`}
            >
              <MessageSquare className={`w-8 h-8`} />
            </div>
            <h1 className={`text-2xl font-bold ${COLORS.textPrimary} mb-2`}>
              Welcome to Echo
            </h1>
            <p className={COLORS.textSecondary}>Simple, fast messaging</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label
                className={`block text-sm font-medium ${COLORS.textSecondary} mb-2`}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`w-5 h-5 ${COLORS.textMuted}`} />
                </div>
                <input
                  type="text"
                  className={`w-full pl-12 pr-4 py-3 ${COLORS.inputBg} ${COLORS.inputBorder} ${COLORS.inputFocus} border rounded-xl ${COLORS.textPrimary} placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20 ${EFFECTS.transition}`}
                  placeholder="Enter you name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                className={`block text-sm font-medium ${COLORS.textSecondary} mb-2`}
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${COLORS.textMuted}`} />
                </div>
                <input
                  type="email"
                  className={`w-full pl-12 pr-4 py-3 ${COLORS.inputBg} ${COLORS.inputBorder} ${COLORS.inputFocus} border rounded-xl ${COLORS.textPrimary} placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20 ${EFFECTS.transition}`}
                  placeholder="enter your email address..."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                className={`block text-sm font-medium ${COLORS.textSecondary} mb-2`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${COLORS.textMuted}`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-3 ${COLORS.inputBg} ${COLORS.inputBorder} ${COLORS.inputFocus} border rounded-xl ${COLORS.textPrimary} placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/20 ${EFFECTS.transition}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      className={`w-5 h-5 ${COLORS.textMuted} hover:${COLORS.textSecondary} ${EFFECTS.transition}`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${COLORS.textMuted} hover:${COLORS.textSecondary} ${EFFECTS.transition}`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className={`w-full mt-6 py-3.5 px-6   ${COLORS.textPrimary} font-semibold rounded-xl ${EFFECTS.transition} transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${EFFECTS.glowStrong}`}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${COLORS.border}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4  ${COLORS.textMuted}`}>
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <Link
              to="/login"
              className={` hover:text-[#00b8e6] font-medium ${EFFECTS.transition}`}
            >
              Sign in instead
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className={`text-center ${COLORS.textMuted} text-sm mt-6`}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
  
    </div>
  );
}

export default SignUpPage;
