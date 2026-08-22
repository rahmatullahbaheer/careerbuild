"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
  user: {
    name: "Alexander Wright",
    email: "alex.wright@engineer.io",
    jobTitle: "Senior Software Engineer",
    portfolio: "https://alexanderwright.dev",
    plan: "CareerBuild PRO Plan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  loading: false,
  updateProfile: async () => {},
  refreshUser: async () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Alexander Wright",
    email: "alex.wright@engineer.io",
    jobTitle: "Senior Software Engineer",
    portfolio: "https://alexanderwright.dev",
    plan: "CareerBuild PRO Plan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  });
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to fetch user context profile:", err);
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

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateProfile,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
