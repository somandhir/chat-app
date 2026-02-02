import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { COLORS } from "./UI/ui.js";
import { useChatStore } from "./store/useChatStore.js";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log({ onlineUsers });

  const { subscribeToMessages, unsubscribeFromMessages, getUsers } =
    useChatStore();

  useEffect(() => {
    if (authUser) {
      getUsers(); 
      subscribeToMessages(); 
    }

    return () => unsubscribeFromMessages();
  }, [authUser, getUsers, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    checkAuth();
  }, []);
  // console.log({ authUser });
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#141414",
            color: "#ffffff",
            border: "1px solid #2a2a2a",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 0 50px rgba(0, 212, 255, 0.15)",
          },
          success: {
            style: {
              background: "#141414",
              color: "#ffffff",
              border: "1px solid #2a2a2a",
            },
            iconTheme: {
              primary: "#00d4ff",
              secondary: "#141414",
            },
          },
          error: {
            style: {
              background: "#141414",
              color: "#ffffff",
              border: "1px solid #2a2a2a",
            },
            iconTheme: {
              primary: "#ff6b6b",
              secondary: "#141414",
            },
          },
        }}
      />
    </>
  );
}

export default App;
