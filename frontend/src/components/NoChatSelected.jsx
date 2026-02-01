import React from "react";
import { MessageSquare, ShieldCheck, Zap } from "lucide-react";
import { COLORS, EFFECTS } from "../UI/ui.js";

function NoChatSelected() {
  return (
    <div className={`w-full flex flex-1 flex-col items-center justify-center p-16 ${COLORS.bgPrimary}`}>
      <div className="max-w-md text-center space-y-8">
        
        {/* Animated Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className={`w-20 h-20 ${COLORS.bgSecondary} rounded-3xl flex items-center justify-center border ${COLORS.border}  `}
            >
              <MessageSquare className={`w-10 h-10 ${COLORS.textPrimary}`} />
            </div>
            {/* Decorative Sparkle for that 'Echo' vibe */}
            <div className={`absolute -top-2 -right-2 w-8 h-8 ${COLORS.bgCard} border ${COLORS.border} rounded-full flex items-center justify-center shadow-xl`}>
               <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <h2 className={`text-3xl font-bold ${COLORS.textPrimary} tracking-tight`}>
            Welcome to ECHO
          </h2>
          <p className={`${COLORS.textSecondary} text-base leading-relaxed`}>
            Select a contact from the sidebar to start a conversation and stay connected.
          </p>
        </div>

        {/* Chat App Feature Highlights */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className={`${COLORS.bgCard} p-4 rounded-2xl border ${COLORS.border} ${EFFECTS.transition} hover:border-gray-700`}>
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-lg mb-3 mx-auto">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <p className={`text-xs font-semibold ${COLORS.textPrimary} uppercase tracking-wider`}>Fast</p>
            <p className={`text-[10px] ${COLORS.textMuted} mt-1`}>Real-time delivery</p>
          </div>

          <div className={`${COLORS.bgCard} p-4 rounded-2xl border ${COLORS.border} ${EFFECTS.transition} hover:border-gray-600`}>
            <div className="flex items-center justify-center w-8 h-8 bg-purple-500/10 rounded-lg mb-3 mx-auto">
              <MessageSquare className="w-4 h-4 text-purple-400" />
            </div>
            <p className={`text-xs font-semibold ${COLORS.textPrimary} uppercase tracking-wider`}>Connect</p>
            <p className={`text-[10px] ${COLORS.textMuted} mt-1`}>Stay in touch</p>
          </div>
        </div>

        {/* Bottom Minimalist Hint */}
        <div className={`pt-8 ${COLORS.textMuted} text-[11px] uppercase tracking-[0.3em] opacity-40`}>
          Encrypted • Minimalist • Fast
        </div>
      </div>
    </div>
  );
}

export default NoChatSelected;