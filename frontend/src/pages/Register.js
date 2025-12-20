import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { MdAppRegistration } from "react-icons/md";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", { name,email, password });
      const { user } = res.data;
login(user);
navigate("/dashboard");

      
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lime-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 shadow-xl rounded-xl p-8 w-full max-w-md space-y-5 transition-all duration-300"
      >
        <h2 className="text-2xl font-extrabold text-teal-700 dark:text-white text-center mb-2 flex items-center gap-2 justify-center">
          <MdAppRegistration /> Create Account
        </h2>

        <p className="text-sm text-center text-slate-600 dark:text-slate-300">
          Register to start using NoteMark today
        </p>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center font-medium">
            {error}
          </p>
        )}
        <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <button
          type="submit"
          className="font-medium w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-400 text-md border border-teal-600 dark:border-slate-600 py-2 rounded-md transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-700 dark:text-teal-400 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
