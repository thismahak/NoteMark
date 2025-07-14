import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { TbBookmarkEdit } from "react-icons/tb";

export default function EditBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const res = await api.get(`/bookmarks/${id}`);
        setBookmark(res.data);
      } catch (err) {
        setError("Failed to fetch bookmark");
      }
    };

    fetchBookmark();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/bookmarks/${id}`, {
        url: bookmark.url,
        title: bookmark.title,
        description: bookmark.description,
        tags: bookmark.tags,
      });
      navigate("/bookmarks");
    } catch (err) {
      setError("Update failed");
    }
  };

  const handleChange = (field, value) => {
    setBookmark((prev) => ({
      ...prev,
      [field]: field === "tags" ? value.split(",").map((t) => t.trim()) : value,
    }));
  };

  if (!bookmark)
    return (
      <p className="p-6 text-slate-700 dark:text-slate-300 text-center">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lime-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 shadow-xl rounded-xl p-8 w-full max-w-md space-y-5 transition-all duration-300"
      >
        <h2 className="text-2xl font-extrabold text-teal-700 dark:text-white text-center mb-2 flex items-center gap-2 justify-center">
          <TbBookmarkEdit /> Edit Bookmark
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <input
          type="url"
          value={bookmark.url}
          onChange={(e) => handleChange("url", e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <input
          type="text"
          value={bookmark.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <textarea
          value={bookmark.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <input
          type="text"
          value={bookmark.tags.join(", ")}
          onChange={(e) => handleChange("tags", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <button
          type="submit"
          className="font-medium w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-400 text-md border border-teal-600 dark:border-slate-600 py-2 rounded-md transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
