// Use Case: App navigation, shortcuts, search.

// Steps:

// 1. Modal that opens on keypress (Cmd+K).

// 2. Search input with filtered list items.

// 3. Add keyboard-navigable arrow keys using onKeyDown.

// 4. Tailwind styles: bg-zinc-800 text-white, use rounded-lg.

// 5. Make full-screen modal for mobile: w-full h-screen.

import { useState, useEffect, useRef } from "react";

const commands = [
  "Dashboard",
  "Settings",
  "Profile",
  "Help",
  "Logout",
  "New Project",
  "Theme Toggle",
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter((cmd) =>
    cmd.toLowerCase().includes(query.toLowerCase())
  );

  // Open modal with Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev === 0 ? filtered.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      alert(`You selected: ${filtered[highlightedIndex]}`);
      setOpen(false);
    }
  };

  if (!open) return (
    <div className="min-h-screen flex items-center justify-center text-center my-auto">
      <h2 className="flex justify-center items-center text-sm md:text-2xl font-bold">
        Press the keys <kbd className="p-2 bg-blue-100 rounded-md">Ctrl + K </kbd> on your Keyboard to view page
      </h2>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 md:px-0">
      
      <div className="bg-zinc-800 text-white rounded-lg w-full max-w-xl p-4 md:h-auto md:max-h-[80vh] overflow-y-auto md:rounded-lg h-screen">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-zinc-700 text-white p-3 rounded-md mb-4 outline-none"
          placeholder="Search..."
        />
        <ul className="space-y-2">
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <li
                key={item}
                className={`p-3 rounded-md cursor-pointer ${
                  i === highlightedIndex ? "bg-zinc-600" : "hover:bg-zinc-700"
                }`}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-sm text-zinc-400">No matches found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
