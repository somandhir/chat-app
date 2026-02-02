import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { COLORS } from "../UI/ui.js";

function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-[#0a0a0a]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isMyMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex flex-col max-w-[70%] ${isMyMessage ? "items-end" : "items-start"}`}
              >
                {/* Message Bubble */}
                <div
                  className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                    isMyMessage
                      ? "bg-white text-black rounded-tr-none"
                      : `${COLORS.bgCard} ${COLORS.textPrimary} border ${COLORS.border} rounded-tl-none`
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="rounded-lg mb-2 max-w-50 border border-gray-800"
                    />
                  )}
                  {message.text && (
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  )}
                </div>

                <span
                  className={`flex gap-1 text-[10px] mt-1 ${COLORS.textMuted} opacity-70 px-1`}
                >
                  {isMyMessage && (
                    <span className={`capitalize font-medium ${message.state==="sent" ? COLORS.inputFocus : ""} `}>
                      {message.state} •
                    </span>
                  )}

                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        {/* Dummy div to anchor the scroll */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
