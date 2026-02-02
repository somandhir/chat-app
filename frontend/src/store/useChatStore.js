import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });

      get().markMessagesAsSeen(userId);
    } catch (error) {
      console.error("error in getMessage");
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get();

      if (!selectedUser || newMessage.senderId !== selectedUser._id) {
        get().getUsers();
        return;
      }

      set({
        messages: [...get().messages, newMessage],
      });
      get().markMessagesAsSeen(selectedUser._id);
    });

    socket.on("messagesSeen", ({ recieverId }) => {
      const { selectedUser } = get();
      if (selectedUser?._id === recieverId) {
        const updatedMessages = get().messages.map((msg) =>
          msg.state !== "seen" ? { ...msg, state: "seen" } : msg,
        );
        set({ messages: updatedMessages });
      }
    });

    socket.on("messagesDelivered", ({ deliveredTo }) => {
      const { selectedUser } = get();
      if (selectedUser?._id === deliveredTo) {
        const updatedMessages = get().messages.map((msg) =>
          msg.state === "sent" ? { ...msg, state: "delivered" } : msg,
        );
        set({ messages: updatedMessages });
      }
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("messagesSeen");
    socket.off("messagesDelivered");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
    if (selectedUser) {
      const updatedUsers = get().users.map((u) =>
        u._id === selectedUser._id ? { ...u, unreadCount: 0 } : u,
      );
      set({ users: updatedUsers });
      // get().getMessages(selectedUser._id);
    }
  },

  markMessagesAsSeen: async (userId) => {
    try {
      await axiosInstance.post(`/messages/markSeen/${userId}`);
    } catch (error) {
      console.log("error in markMessagesAsSeen");
    }
  },
}));
