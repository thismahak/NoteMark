import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

export default function ProtectedLayout({ children }) {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(!user);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        login(res.data, localStorage.getItem("token")); // If token exists
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auto-login failed:", err.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
    else setLoading(false);
  }, [user, login]);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
