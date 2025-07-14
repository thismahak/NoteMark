import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { MdOutlineBookmarkAdd } from "react-icons/md";

export default function AddBookmark() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/bookmarks", {
        url,
        title: title.trim() === "" ? undefined : title,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
      });
      navigate("/bookmarks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create bookmark.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lime-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 shadow-xl rounded-xl p-8 w-full max-w-md space-y-5 transition-all duration-300"
      >
        <h2 className="text-2xl font-extrabold text-teal-700 dark:text-white text-center mb-2 flex items-center gap-2 justify-center">
          <MdOutlineBookmarkAdd /> Add Bookmark
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <input
          type="url"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-300"
        />

        <button
          type="submit"
          className="font-medium w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-400 text-md border border-teal-600 dark:border-slate-600 py-2 rounded-md transition"
        >
          Create Bookmark
        </button>
      </form>
    </div>
  );
}
