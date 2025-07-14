import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa6";
import { FaRegNoteSticky } from "react-icons/fa6";
import SearchBar from "../components/SearchBar";

export default function Notes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [tags, setTags] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [page, setPage] = useState(1);
  const notesPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes", {
        params: {
          q: q || undefined,
          tags: tags || undefined,
          isFavoriteOnly: showFavoritesOnly ? true : undefined,
        },
      });

      const allNotes = res.data;
      setTotalPages(Math.ceil(allNotes.length / notesPerPage));
      const start = (page - 1) * notesPerPage;
      const end = start + notesPerPage;
      setNotes(allNotes.slice(start, end));
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, [page, showFavoritesOnly]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    fetchNotes();
  };

  const toggleFavorite = async (id, currentStatus) => {
    try {
      await api.put(`/notes/${id}`, { favorite: !currentStatus });
      setNotes((prev) =>
        prev.map((note) =>
          note._id === id ? { ...note, favorite: !note.favorite } : note
        )
      );
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-6 md:mb-0">
          <FaRegNoteSticky /> My Notes
        </h1>
        <button
          onClick={() => navigate("/add-note")}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-md transition flex items-center gap-2"
        >
          <FaNotesMedical /> New Note
        </button>
      </div>

      {/* Search */}
      <SearchBar q={q} setQ={setQ} tags={tags} setTags={setTags} onSearch={handleSearch} />

      {/* Filter */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {showFavoritesOnly ? "❤️ Showing only favorite notes" : "Showing all notes"}
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

      {/* Notes */}
      {notes.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all relative group"
            >
              {/* Favorite */}
              <div className="absolute top-4 right-4 z-10 cursor-pointer">
                {note.favorite ? (
                  <FaHeart
                    className="text-red-500 hover:scale-110 transition"
                    onClick={() => toggleFavorite(note._id, note.favorite)}
                  />
                ) : (
                  <FaRegHeart
                    className="text-gray-400 hover:text-red-400 hover:scale-110 transition"
                    onClick={() => toggleFavorite(note._id, note.favorite)}
                  />
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {note.title}
              </h2>

              <div className="text-slate-600 dark:text-slate-300 text-sm max-h-40 overflow-y-auto whitespace-pre-wrap pr-1 scrollbar-thin scrollbar-thumb-teal-300 dark:scrollbar-thumb-teal-400 scrollbar-track-transparent">
                {note.content || <em className="text-slate-400">No content.</em>}
              </div>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {note.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-teal-100 dark:bg-slate-700 text-teal-700 dark:text-teal-300 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-5 text-sm font-medium">
                <button
                  onClick={() => navigate(`/edit-note/${note._id}`)}
                  className="text-teal-600 dark:text-teal-300 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
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
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="No Notes"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p className="text-xl font-medium">No notes found.</p>
          <p className="text-sm mt-1">Try adding a note or adjusting your search filters.</p>
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
