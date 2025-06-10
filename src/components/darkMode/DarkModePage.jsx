import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkmodeContext";
import { Link } from "react-router-dom";

const DarkModePage = () => {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="flex items-center justify-center mb-5 z-[10000]">
      <button
        onClick={toggle}
        className="cursor-pointer relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Sun Icon */}
        <Sun
          className={`h-5 w-5 text-yellow-500 transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute h-5 w-5 text-blue-400 transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </button>

      <Link to={"/"}>
        <button className="px-4 py-2 bg-gray-400 dark:bg-gray-200 text-black/70 dark:text-black/90 rounded-md ml-6 cursor-pointer">
          Back
        </button>
      </Link>
    </div>
  );
};

export default DarkModePage;
