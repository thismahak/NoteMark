import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 dark:text-slate-300">
        Please login to view your profile.
      </div>
    );
  }

  const hasChanges = name.trim() !== user.name || email.trim() !== user.email;

  const handleSave = async () => {
    if (!hasChanges) {
      toast("No changes to save");
      return;
    }

    try {
      setLoading(true);
      await updateUser({ name: name.trim(), email: email.trim() });
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lime-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 transition-all duration-300">
      <div className="bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 shadow-xl rounded-xl p-8 w-full max-w-md space-y-5 transition-all duration-300">
        <h2 className="text-2xl font-extrabold text-teal-700 dark:text-white text-center">
          👤 Your Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Name</label>
            <input
              type="text"
              value={name}
              disabled={!editing}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                editing
                  ? "bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:ring-teal-300 dark:focus:ring-teal-300"
                  : "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              disabled={!editing}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                editing
                  ? "bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:ring-teal-300 dark:focus:ring-teal-300"
                  : "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              disabled
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed rounded-md"
            />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Password update not available yet</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex gap-3 justify-center">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-400 border border-teal-600 dark:border-slate-600 font-medium px-4 py-2 rounded-md transition"
            >
              <MdEdit /> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={!hasChanges || loading}
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-white transition ${
                  !hasChanges || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <MdSave />
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                <MdCancel /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
