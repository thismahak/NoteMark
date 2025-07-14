export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-center py-4 mt-0 transition-colors duration-300">
      <p className="text-sm text-gray-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} <span className="font-medium text-teal-700 dark:text-lime-300">NoteMark</span>. All rights reserved.
      </p>
    </footer>
  );
}
