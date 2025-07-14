import { GrDocumentNotes } from "react-icons/gr";
import { IoIosRocket } from "react-icons/io";
import { CiStickyNote } from "react-icons/ci";
import { MdOutlineSecurity } from "react-icons/md";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lime-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-12 text-slate-800 dark:text-slate-100">
        <header className="text-center">
          <h2 className="text-4xl font-extrabold text-teal-700 dark:text-white mb-2 flex items-center justify-center gap-2">
            About NoteMark <GrDocumentNotes />
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            NoteMark is a modern platform to capture, organize, and revisit your ideas and saved resources—all in one secure place.
          </p>
        </header>

        <section>
          <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4 flex items-center gap-2">
            <IoIosRocket /> Our Mission
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            In today’s fast-paced digital world, we’re bombarded with information every second. At NoteMark, our goal is to help you cut through the noise and preserve what truly matters—your thoughts, discoveries, and inspirations. Whether it's a quick note or a must-read article, NoteMark ensures it's there when you need it.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4 flex items-center gap-2">
            <CiStickyNote /> What You Can Do with NoteMark
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>Create and manage notes with tags and rich formatting</li>
            <li>Save bookmarks with automatic title fetching</li>
            <li>Organize everything into searchable collections</li>
            <li>Access securely from anywhere, anytime</li>
            <li>Enjoy a clutter-free, distraction-free writing experience</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4 flex items-center gap-2">
            <MdOutlineSecurity /> Privacy & Security First
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            Your data belongs to you. All your notes and bookmarks are securely stored, accessible only by you. With modern token-based authentication and encrypted storage practices, NoteMark is designed to respect your privacy from day one.
          </p>
        </section>

        <footer className="text-center pt-10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Made with ❤️ for developers, thinkers, learners & creators.
          </p>
        </footer>
      </div>
    </div>
  );
}
