"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
  user: null,
  loading: true,
  updateProfile: async () => {},
  refreshUser: async () => {},
  logout: async () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user context profile:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateProfile = async (newProfileData) => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfileData),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true, message: data.message };
      }
      throw new Error(data.error || "Failed to update profile.");
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.clear();
          localStorage.clear();
        } catch (e) {}
        window.location.replace("/login");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateProfile,
        refreshUser: fetchUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
