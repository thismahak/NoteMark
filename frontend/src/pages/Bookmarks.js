import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import SearchBar from "../components/SearchBar";
import { BsBookmarkCheckFill } from "react-icons/bs";

export default function Bookmarks() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [q, setQ] = useState("");
  const [tags, setTags] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookmarks = async () => {
    try {
      const queryParams = [];
      if (q) queryParams.push(`q=${encodeURIComponent(q)}`);
      if (tags) queryParams.push(`tags=${encodeURIComponent(tags)}`);
      if (showFavoritesOnly) queryParams.push("isFavoriteOnly=true");
      const queryStr = queryParams.length ? `?${queryParams.join("&")}` : "";
      const res = await api.get(`/bookmarks${queryStr}`);
      const all = res.data;
      setTotalPages(Math.ceil(all.length / perPage));
      const start = (page - 1) * perPage;
      const end = start + perPage;
      setBookmarks(all.slice(start, end));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
    // eslint-disable-next-line
  }, [page, showFavoritesOnly]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete bookmark:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBookmarks();
  };

  const toggleFavorite = async (id, currentStatus) => {
    try {
      await api.put(`/bookmarks/${id}`, { favorite: !currentStatus });
      setBookmarks((prev) =>
        prev.map((b) => (b._id === id ? { ...b, favorite: !b.favorite } : b))
      );
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-6 md:mb-0">
          <BsBookmarkCheckFill /> My Bookmarks
        </h1>
        <button
          onClick={() => navigate("/add-bookmark")}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-md transition flex items-center gap-2"
        >
          <FaPlus /> New Bookmark
        </button>
      </div>

      {/* Search */}
      <SearchBar q={q} setQ={setQ} tags={tags} setTags={setTags} onSearch={handleSearch} />

      {/* Filter */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {showFavoritesOnly ? "❤️ Showing only favorite bookmarks" : "Showing all bookmarks"}
        </p>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox accent-teal-600 dark:accent-teal-400 h-5 w-5"
            checked={showFavoritesOnly}
            onChange={() => {
              setPage(1);
              setShowFavoritesOnly(!showFavoritesOnly);
            }}
          />
          <span className="ml-2 text-sm font-medium text-slate-800 dark:text-white">
            Show Favorites Only
          </span>
        </label>
      </div>

      {/* Bookmark Cards */}
      {bookmarks.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark._id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all relative group"
            >
              {/* Favorite */}
              <div className="absolute top-4 right-4 z-10 cursor-pointer">
                {bookmark.favorite ? (
                  <FaHeart
                    className="text-red-500 hover:scale-110 transition"
                    onClick={() => toggleFavorite(bookmark._id, bookmark.favorite)}
                  />
                ) : (
                  <FaRegHeart
                    className="text-gray-400 hover:text-red-400 hover:scale-110 transition"
                    onClick={() => toggleFavorite(bookmark._id, bookmark.favorite)}
                  />
                )}
              </div>

              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-slate-800 dark:text-white hover:underline block mb-2"
              >
                {bookmark.title}
              </a>

              <p className="text-slate-600 dark:text-slate-300 text-sm max-h-40 overflow-y-auto whitespace-pre-wrap pr-1 scrollbar-thin scrollbar-thumb-teal-300 dark:scrollbar-thumb-teal-400 scrollbar-track-transparent">
                {bookmark.description || <em className="text-slate-400">No description.</em>}
              </p>

              {bookmark.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {bookmark.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-teal-100 dark:bg-slate-700 text-teal-700 dark:text-teal-300 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-5 text-sm font-medium">
                <button
                  onClick={() => navigate(`/edit-bookmark/${bookmark._id}`)}
                  className="text-teal-600 dark:text-teal-300 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bookmark._id)}
                  className="text-rose-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-slate-500 dark:text-slate-400">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4213/4213179.png"
            alt="No bookmarks"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p className="text-xl font-medium">No bookmarks found.</p>
          <p className="text-sm mt-1">Try adding a bookmark or adjusting your search filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm bg-white dark:bg-slate-800 border dark:border-slate-700 rounded hover:bg-teal-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 text-sm rounded border ${
                page === i + 1
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm bg-white dark:bg-slate-800 border dark:border-slate-700 rounded hover:bg-teal-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
