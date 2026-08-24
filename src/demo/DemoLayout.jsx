import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Check, Copy, Github, Moon, Sun, Monitor } from "lucide-react";
import { useDarkMode } from "../contexts/DarkmodeContext";
import { DarkModeToggle } from "../components/darkMode/DarkModeToggle";

export const DemoLayout = ({ title, componentName, children }) => {
  const { mode, setMode } = useDarkMode();
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const formattedName = componentName || title || location.pathname.replace("/", "");
  const importSnippet = `import { ${formattedName} } from "readyui-react";`;

  const copyImport = () => {
    navigator.clipboard.writeText(importSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-50 transition-colors">
      {/* Top Demo Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Left: Back Link & Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
              <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">ReadyUI</Link>
              <span>/</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-medium capitalize">{formattedName}</span>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={copyImport}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              title="Click to copy import statement"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied import!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{importSnippet}</span>
                </>
              )}
            </button>

            <DarkModeToggle mode={mode} onChange={setMode} size="sm" />

            <a
              href="https://github.com/Kemi-Oluwadahunsi/ReadyToUse-React-Components"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Demo Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
};
