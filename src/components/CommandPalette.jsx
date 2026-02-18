import { useState, useEffect, useRef, useCallback, useMemo, useId, isValidElement } from "react";
import { Search, Command, ArrowUp, ArrowDown, CornerDownLeft, X } from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * CommandPalette - ⌘K spotlight-style search overlay with keyboard navigation.
 */
/*
 * @param {boolean} isOpen - Controlled open state
 * @param {Function} onClose - Called when the palette should close
 * @param {Array} items - Array of { id, label, icon?, group?, shortcut?, description?, onSelect? }
 * @param {Function} onSelect - Called when an item is selected: (item) => void
 * @param {string} placeholder - Search input placeholder
 * @param {Array} recentItems - IDs of recently used items (shown first when empty query)
 * @param {number} maxResults - Maximum results shown (default 8)
 * @param {string} className - Extra CSS on the modal card
 * @param {boolean} enableHotkey - Auto-open on ⌘K / Ctrl+K (default true)
 * @param {Function} onQueryChange - Called with current search text
 */
const CommandPalette = ({
  isOpen: controlledOpen,
  onClose,
  items = [],
  onSelect,
  placeholder = "Type a command or search...",
  recentItems = [],
  maxResults = 8,
  className = "",
  enableHotkey = true,
  onQueryChange,
}) => {
  injectRuiStyles();
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const close = useCallback(() => {
    controlledOpen !== undefined ? onClose?.() : setInternalOpen(false);
  }, [controlledOpen, onClose]);

  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const cmdListId = useId();

  /* ── hotkey ⌘K / Ctrl+K ── */
  useEffect(() => {
    if (!enableHotkey) return;
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        controlledOpen !== undefined ? (isOpen ? onClose?.() : null) : setInternalOpen((p) => !p);
      }
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enableHotkey, isOpen, controlledOpen, onClose, close]);

  /* ── reset on open ── */
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  /* ── fuzzy match ── */
  const fuzzy = (text, q) => {
    const lower = text.toLowerCase();
    const ql = q.toLowerCase();
    let qi = 0;
    for (let i = 0; i < lower.length && qi < ql.length; i++) {
      if (lower[i] === ql[qi]) qi++;
    }
    return qi === ql.length;
  };

  /* ── filtered & grouped results ── */
  const results = useMemo(() => {
    let list = items;
    if (!query.trim()) {
      // Show recents at top
      const recentSet = new Set(recentItems);
      const recents = items.filter((i) => recentSet.has(i.id)).map((i) => ({ ...i, _group: "Recent" }));
      const rest = items.filter((i) => !recentSet.has(i.id));
      list = [...recents, ...rest];
    } else {
      list = items.filter((i) => fuzzy(i.label, query) || (i.description && fuzzy(i.description, query)));
    }
    return list.slice(0, maxResults);
  }, [items, query, recentItems, maxResults]);

  /* ── grouped for display ── */
  const grouped = useMemo(() => {
    const map = new Map();
    results.forEach((item) => {
      const g = item._group || item.group || "Actions";
      if (!map.has(g)) map.set(g, []);
      map.get(g).push(item);
    });
    return map;
  }, [results]);

  const flatResults = results;

  /* ── keyboard nav ── */
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((p) => (p + 1) % flatResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((p) => (p - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === "Enter" && flatResults[activeIdx]) {
      e.preventDefault();
      const item = flatResults[activeIdx];
      item.onSelect ? item.onSelect(item) : onSelect?.(item);
      close();
    }
  };

  /* ── scroll active into view ── */
  useEffect(() => {
    const el = listRef.current?.children?.[activeIdx];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  useEffect(() => {
    setActiveIdx(0);
    onQueryChange?.(query);
  }, [query, onQueryChange]);

  if (!isOpen) return null;

  let flatIdx = -1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]"
      style={{ backgroundColor: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)" }}
      onClick={close}
    >
      <div
        className={`w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-700 ${className}`}
        style={{ animation: "rui-cmd-in .2s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={true}
            aria-controls={cmdListId}
            aria-activedescendant={flatResults.length > 0 ? `${cmdListId}-opt-${activeIdx}` : undefined}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} id={cmdListId} role="listbox" className="max-h-72 overflow-y-auto py-2">
          {flatResults.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            [...grouped.entries()].map(([group, groupItems]) => (
              <div key={group}>
                <div className="px-4 py-1.5 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {group}
                </div>
                {groupItems.map((item) => {
                  flatIdx++;
                  const idx = flatIdx;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`${cmdListId}-opt-${idx}`}
                      role="option"
                      aria-selected={idx === activeIdx}
                      onClick={() => {
                        item.onSelect ? item.onSelect(item) : onSelect?.(item);
                        close();
                      }}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors ${
                        idx === activeIdx
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {Icon && (
                        <span className="flex-shrink-0">
                          {isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-gray-400 dark:text-gray-500 truncate">{item.description}</div>
                        )}
                      </div>
                      {item.shortcut && (
                        <kbd className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded flex-shrink-0">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-gray-100 dark:border-zinc-800 text-[11px] text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" /> Navigate</span>
          <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> Select</span>
          <span className="flex items-center gap-1"><Command className="w-3 h-3" />K Toggle</span>
        </div>
      </div>
    </div>
  );
};

CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
export default CommandPalette;
