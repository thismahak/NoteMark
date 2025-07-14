import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {  FaSun, FaMoon } from "react-icons/fa";
import { GrDocumentNotes } from "react-icons/gr";
import { MdMessage } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";
import { BsBookmarksFill } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import {MdDashboard} from "react-icons/md";
export default function Navbar() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 tracking-tight hover:text-teal-700 dark:hover:text-teal-300 transition flex items-center gap-2"
        >
          <GrDocumentNotes /> NoteMark
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <Link
            to="/dashboard"
            className="flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition"
          >
            <MdDashboard className="mr-1" />
            Dashboard
          </Link>
          <Link
            to="/notes"
            className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 transition flex items-center gap-1"
          >
            <FaRegNoteSticky/> Notes
          </Link>
          <Link
            to="/bookmarks"
            className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 transition flex items-center gap-1"
          >
            <BsBookmarksFill/> Bookmarks
          </Link>
          <Link
            to="/contact"
            className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 transition flex items-center gap-1"
          >
            <MdMessage /> Contact
          </Link>
          <Link
            to="/about"
            className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-300 transition flex items-center gap-1"
          >
            <FaInfoCircle/> About
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl text-slate-700 dark:text-yellow-300 p-1.5 hover:scale-110 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={logout}
              className="bg-rose-500 text-white px-3 py-1.5 rounded-md hover:bg-rose-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-teal-600 text-white px-3 py-1.5 rounded-md hover:bg-teal-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-slate-700 text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
