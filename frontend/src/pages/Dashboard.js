import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaPlus, FaBookmark, FaUserCog, FaStickyNote } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen px-6 py-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3 tracking-tight">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-10 text-base">
          Your personal dashboard to manage everything in one place.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard
            icon={<FaStickyNote className="text-teal-600 dark:text-teal-400" />}
            title="Notes"
            description="View and manage all your saved notes."
            primaryText="View Notes"
            primaryLink="/notes"
            altText="New"
            altLink="/add-note"
          />

          <DashboardCard
            icon={<FaBookmark className="text-teal-600 dark:text-teal-400" />}
            title="Bookmarks"
            description="Keep track of useful links and resources."
            primaryText="View Bookmarks"
            primaryLink="/bookmarks"
            altText="Add"
            altLink="/add-bookmark"
          />

          <DashboardCard
            icon={<FaUserCog className="text-teal-600 dark:text-teal-400" />}
            title="Profile Settings"
            description="Manage your name, email, and account settings."
            primaryText="Edit Profile"
            primaryLink="/profile"
            isSingleButton
          />
        </div>
      </div>
    </div>
  );
}

// 💡 Reusable Card Component
function DashboardCard({
  icon,
  title,
  description,
  primaryText,
  primaryLink,
  altText,
  altLink,
  isSingleButton,
}) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-md hover:shadow-lg dark:hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          {icon} {title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <Link
          to={primaryLink}
          className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-200 shadow-sm"
        >
          {primaryText}
        </Link>
        {!isSingleButton && (
          <Link
            to={altLink}
            className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-400 text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 transition duration-200 shadow-sm"
          >
            <FaPlus className="text-xs" /> {altText}
          </Link>
        )}
      </div>
    </div>
  );
}
