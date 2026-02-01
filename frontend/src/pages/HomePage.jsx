import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { COLORS } from "../UI/ui.js";

function HomePage() {
  const { selectedUser } = useChatStore();
  // console.log(selectedUser);
  

  return (
    <div className={`h-screen ${COLORS.bgPrimary} overflow-hidden`}>
      <div className="flex items-center justify-center pt-4 px-4">
        <div className={`${COLORS.bgCard} rounded-2xl border ${COLORS.border} w-full max-w-6xl h-[calc(100vh-8rem)] shadow-2xl overflow-hidden`}>
          <div className="flex h-full rounded-2xl overflow-hidden">
            
            <Sidebar />

            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer />
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;