import { FaSearch } from "react-icons/fa";

export default function SearchBar({ q, setQ, tags, setTags, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-400"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-400"
      />
      <button
  type="submit"
  className="
   bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600
    text-teal-700 dark:text-teal-400 text-sm border border-teal-600 dark:border-slate-600
   font-medium px-4 py-2 rounded-md flex items-center gap-2 transition duration-200 shadow-sm
  "
>
  <FaSearch /> Search
</button>


    </form>
  );
}
