import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Check,
  Copy,
  Terminal,
  FileCode2,
  Moon,
  Sparkles,
  BookOpen,
  ArrowRight,
  Search,
  Hash,
} from "lucide-react";

export const InstallationModal = ({ isOpen, onClose }) => {
  const [pkgManager, setPkgManager] = useState("npm");
  const [copied, setCopied] = useState("");

  if (!isOpen) return null;

  const installCmds = {
    npm: "npm install readyui-react lucide-react",
    pnpm: "pnpm add readyui-react lucide-react",
    yarn: "yarn add readyui-react lucide-react",
    bun: "bun add readyui-react lucide-react",
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 animate-scaleUp"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-white" />
            <h3 className="font-semibold text-lg text-white">
              Installation Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Package Install */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                1. Install Dependency
              </span>
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
                {["npm", "pnpm", "yarn", "bun"].map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPkgManager(pm)}
                    className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                      pkgManager === pm
                        ? "bg-zinc-800 text-white font-medium shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm">
              <span className="text-zinc-300 select-all">
                $ {installCmds[pkgManager]}
              </span>
              <button
                onClick={() => copyText(installCmds[pkgManager], "install")}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              >
                {copied === "install" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Step 2: Root Styles Setup */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                2. Import the styles once in your app entry point (e.g. main.jsx or App.jsx)
              </span>
              <button
                onClick={() =>
                  copyText(
                    `import "readyui-react/styles.css";`,
                    "root-styles"
                  )
                }
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copied === "root-styles" ? "Copied!" : "Copy Snippet"}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              {`/* In your main entry file (e.g. main.jsx or App.jsx) */
import "readyui-react/styles.css";
`}
            </pre>
          </div>

          {/* Step 3: Tailwind CSS Setup */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                3. Tailwind CSS Setup (Tailwind v4 / v3)
              </span>
              <button
                onClick={() =>
                  copyText(
                    `@import "tailwindcss";\n@custom-variant dark (&:where(.dark, .dark *));\n@source "../node_modules/readyui-react/dist/*.js";`,
                    "tailwind",
                  )
                }
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copied === "tailwind" ? "Copied!" : "Copy Snippet"}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              {`/* In your global styles (e.g. index.css) */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
@source "../node_modules/readyui-react/dist/*.js";`}
            </pre>
          </div>

          {/* Step 4: Quick Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                4. Wrap with DarkModeProvider & Import
              </span>
              <button
                onClick={() =>
                  copyText(
                    `import { DarkModeProvider } from "readyui-react";\nimport { Accordion } from "readyui-react";\n\nexport default function App() {\n  return (\n    <DarkModeProvider defaultMode="system">\n      <Accordion items={[{ id: "1", title: "Hello", content: "World" }]} />\n    </DarkModeProvider>\n  );\n}`,
                    "usage",
                  )
                }
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copied === "usage" ? "Copied!" : "Copy Snippet"}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
              {`import { DarkModeProvider, Accordion } from "readyui-react";

export default function App() {
  return (
    <DarkModeProvider defaultMode="system">
      <div className="p-8">
        <Accordion items={[{ id: "1", title: "Hello", content: "World" }]} />
      </div>
    </DarkModeProvider>
  );
}`}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const DocumentationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 animate-scaleUp"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-white" />
            <h3 className="font-semibold text-lg text-white">
              Documentation Overview
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-sm text-zinc-300">
          <div>
            <h4 className="font-semibold text-white text-base mb-1.5">
              Philosophy
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              ReadyUI is crafted to provide complete freedom without opinionated
              lock-in. All components are built using native React hooks,
              standard Tailwind CSS classes, and seamless dark mode support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <h5 className="font-medium text-white mb-1">
                ⚡ Zero Configuration
              </h5>
              <p className="text-xs text-zinc-400">
                Works out of the box with any Vite, Next.js, Remix, or CRA
                setup.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <h5 className="font-medium text-white mb-1">
                🎨 Tailwind CSS v4 & v3
              </h5>
              <p className="text-xs text-zinc-400">
                Class names are clean and easily customizable via standard
                className props.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <h5 className="font-medium text-white mb-1">
                🌙 Native Dark Mode
              </h5>
              <p className="text-xs text-zinc-400">
                Built-in DarkModeProvider handles system preference,
                localStorage, and instant toggles.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <h5 className="font-medium text-white mb-1">
                ♿ Fully Accessible
              </h5>
              <p className="text-xs text-zinc-400">
                WAI-ARIA compliant keyboard navigation, ARIA attributes, and
                focus states.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800 flex justify-between">
          <a
            href="https://readyui-docs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read Documentation"
            className="px-4 py-2 rounded-lg bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
          >
            Read Documentation
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export const ThemesModal = ({ isOpen, onClose }) => {
  const [activeTheme, setActiveTheme] = useState("zinc");

  if (!isOpen) return null;

  const themes = [
    {
      id: "zinc",
      name: "Zinc / Neutral",
      color: "bg-zinc-500",
      border: "border-zinc-400",
      hex: "#71717a",
    },
    {
      id: "blue",
      name: "Modern Blue",
      color: "bg-blue-600",
      border: "border-blue-500",
      hex: "#2563eb",
    },
    {
      id: "violet",
      name: "Electric Violet",
      color: "bg-violet-600",
      border: "border-violet-500",
      hex: "#7c3aed",
    },
    {
      id: "emerald",
      name: "Emerald Mint",
      color: "bg-emerald-600",
      border: "border-emerald-500",
      hex: "#059669",
    },
    {
      id: "rose",
      name: "Crimson Rose",
      color: "bg-rose-600",
      border: "border-rose-500",
      hex: "#e11d48",
    },
    {
      id: "amber",
      name: "Warm Amber",
      color: "bg-amber-600",
      border: "border-amber-500",
      hex: "#d97706",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 animate-scaleUp"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="font-semibold text-lg text-white">Accent Theme</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-zinc-400">
            Select a color palette for components and live UI previews:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  activeTheme === t.id
                    ? "bg-zinc-900 border-white text-white shadow-md ring-1 ring-white"
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${t.color}`} />
                <span className="text-xs font-medium">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors"
          >
            Apply Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export const CommandPaletteModal = ({ isOpen, onClose, components }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = components.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.desc?.toLowerCase().includes(query.toLowerCase()) ||
      c.category?.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filtered.length) % (filtered.length || 1),
      );
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      navigate(filtered[selectedIndex].path);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100 animate-scaleUp"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search components, categories, or keywords..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 text-sm"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 text-sm">
              No components matching "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-zinc-800/90 text-white"
                      : "text-zinc-300 hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {item.label}
                      </div>
                      <div className="text-xs text-zinc-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${isSelected ? "text-white translate-x-0.5" : "text-zinc-600"}`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>{filtered.length} components</span>
        </div>
      </div>
    </div>
  );
};
