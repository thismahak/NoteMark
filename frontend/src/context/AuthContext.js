// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info from /me endpoint on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me"); // Checks for valid cookie/session
        setUser(res.data);
      } catch (err) {
        console.error("Auth check failed:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    try {
      setUser(userData);
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const updateUser = async (newData) => {
    try {
      const res = await api.put("/auth/update", newData); // Backend must support this route
      setUser(res.data); // Assuming backend sends updated user
    } catch (err) {
      console.error("Profile update failed:", err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
