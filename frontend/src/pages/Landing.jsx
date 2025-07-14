import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { GrNotes, GrSecure } from "react-icons/gr";

export default function Landing() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  // Set theme on <html> root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="font-sans text-slate-800 bg-white dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-700 dark:from-slate-800 dark:to-slate-700 text-white text-center py-28 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
          Organize Smarter with <span className="text-lime-300 dark:text-lime-400">NoteMark</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-teal-100 dark:text-slate-300">
          A modern platform for notes, bookmarks & ideas — built for focus, speed, and clarity.
        </p>
        <div className="space-x-4">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-white text-teal-800 hover:bg-slate-100 font-medium px-6 py-3 rounded-md shadow transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-lime-300 hover:bg-lime-400 text-slate-900 font-semibold px-6 py-3 rounded-md shadow transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white text-teal-800 hover:bg-slate-100 font-medium px-6 py-3 rounded-md shadow transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900 px-6">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-14">
          Why NoteMark?
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center justify-center gap-2">
              <GrNotes /> Powerful Notes
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Write, edit, and manage your thoughts effortlessly with tags and categories.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center justify-center gap-2">
              <BiSolidBookmarkHeart /> Smart Bookmarks
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Save and tag useful links with auto-generated titles and lightning-fast search.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center justify-center gap-2">
              <GrSecure /> Private & Secure
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Authentication and encryption ensure your data stays in your hands.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Start Building Your Second Brain
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
            Trusted by developers, students, and creators to save ideas & links in one place.
          </p>
          <Link
            to={user ? "/dashboard" : "/register"}
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow transition"
          >
            {user ? "Go to Dashboard" : "Create Free Account"}
          </Link>
        </div>
      </section>
    </div>
  );
}
