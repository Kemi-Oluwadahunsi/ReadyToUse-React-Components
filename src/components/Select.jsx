/**
 * Select - Custom searchable dropdown with single/multi, groups, clear, keyboard nav.
 */
/*
 * @param {Array} options - [{ value, label, group?, disabled? }]
 * @param {*} value - Selected value (single) or array (multi)
 * @param {Function} onChange - (value) => void
 * @param {boolean} multiple - Enable multi-select (default false)
 * @param {boolean} searchable - Enable search filtering (default true)
 * @param {boolean} clearable - Show clear button (default true)
 * @param {boolean} disabled - (default false)
 * @param {string} placeholder - Placeholder text (default "Select…")
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {boolean} grouped - Render group headers from option.group (default false)
 * @param {number} maxSelected - Max items in multi mode (default Infinity)
 * @param {Function} renderOption - Custom option renderer (option, isSelected) => JSX
 * @param {string} className - Extra CSS
 */
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, X, Check, Search } from "lucide-react";

const sizeStyles = {
  sm: "px-2.5 py-1.5 text-sm min-h-[32px]",
  md: "px-3 py-2 text-sm min-h-[40px]",
  lg: "px-4 py-2.5 text-base min-h-[48px]",
};

const Select = ({
  options = [],
  value,
  onChange,
  multiple = false,
  searchable = true,
  clearable = true,
  disabled = false,
  placeholder = "Select…",
  size = "md",
  grouped = false,
  maxSelected = Infinity,
  renderOption,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusIdx, setFocusIdx] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Normalize value
  const selected = useMemo(
    () => multiple
      ? Array.isArray(value) ? value : value != null ? [value] : []
      : value,
    [multiple, value]
  );

  const isSelected = useCallback(
    (v) => (multiple ? selected.includes(v) : selected === v),
    [multiple, selected]
  );

  // Filtered options
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return options.filter(
      (o) => !o.disabled && o.label.toLowerCase().includes(q)
    );
  }, [options, search]);

  // Grouped options
  const groupedOptions = useMemo(() => {
    if (!grouped) return null;
    const map = new Map();
    filtered.forEach((o) => {
      const g = o.group || "";
      if (!map.has(g)) map.set(g, []);
      map.get(g).push(o);
    });
    return map;
  }, [filtered, grouped]);

  // Flat list for keyboard nav
  const flatList = grouped
    ? [...(groupedOptions?.values() || [])].flat()
    : filtered;

  // Click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Keyboard
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") { setOpen(false); setSearch(""); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((p) => Math.min(p + 1, flatList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((p) => Math.max(p - 1, 0));
    } else if (e.key === "Enter" && focusIdx >= 0) {
      e.preventDefault();
      selectOption(flatList[focusIdx]);
    }
  };

  // Scroll focused into view
  useEffect(() => {
    if (focusIdx < 0 || !listRef.current) return;
    const el = listRef.current.children[focusIdx];
    el?.scrollIntoView?.({ block: "nearest" });
  }, [focusIdx]);

  const selectOption = (opt) => {
    if (!opt) return;
    if (multiple) {
      const arr = [...selected];
      const idx = arr.indexOf(opt.value);
      if (idx >= 0) arr.splice(idx, 1);
      else if (arr.length < maxSelected) arr.push(opt.value);
      onChange?.(arr);
    } else {
      onChange?.(opt.value);
      setOpen(false);
      setSearch("");
    }
  };

  const clearAll = (e) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : null);
    setSearch("");
  };

  const removeTag = (v, e) => {
    e.stopPropagation();
    onChange?.(selected.filter((s) => s !== v));
  };

  const getLabel = (v) => options.find((o) => o.value === v)?.label || v;
  const hasValue = multiple ? selected.length > 0 : selected != null;

  const renderOpt = (opt, idx) => {
    const sel = isSelected(opt.value);
    return (
      <button
        key={opt.value}
        type="button"
        role="option"
        aria-selected={sel}
        onClick={() => selectOption(opt)}
        className={`w-full text-left px-3 py-2 flex items-center gap-2 text-sm transition-colors
          ${sel ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"}
          ${focusIdx === idx ? "bg-gray-100 dark:bg-zinc-700" : ""}`}
      >
        {renderOption ? renderOption(opt, sel) : (
          <>
            <span className="flex-1 truncate">{opt.label}</span>
            {sel && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />}
          </>
        )}
      </button>
    );
  };

  let flatIdx = -1;

  return (
    <div ref={containerRef} className={`relative ${className}`} onKeyDown={handleKeyDown}>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => { if (!disabled) { setOpen(!open); setTimeout(() => inputRef.current?.focus(), 0); } }}
        className={`w-full flex items-center gap-2 ${sizeStyles[size]} bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl transition-colors
          ${open ? "ring-2 ring-blue-500 border-blue-500" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400 dark:hover:border-zinc-600"}`}
      >
        <div className="flex-1 flex flex-wrap gap-1 items-center min-w-0">
          {multiple && selected.length > 0 ? (
            selected.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md text-xs font-medium"
              >
                {getLabel(v)}
                <X className="h-3 w-3 cursor-pointer hover:text-blue-900 dark:hover:text-blue-100" onClick={(e) => removeTag(v, e)} />
              </span>
            ))
          ) : !multiple && selected != null ? (
            <span className="truncate text-gray-900 dark:text-white">{getLabel(selected)}</span>
          ) : (
            <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
          )}
        </div>
        {clearable && hasValue && !disabled && (
          <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0 cursor-pointer" onClick={clearAll} />
        )}
        <ChevronDown className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden">
          {searchable && (
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-zinc-700">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setFocusIdx(0); }}
                placeholder="Search…"
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none"
              />
            </div>
          )}
          <div ref={listRef} role="listbox" aria-multiselectable={multiple || undefined} className="max-h-60 overflow-y-auto py-1">
            {flatList.length === 0 ? (
              <p className="px-3 py-4 text-sm text-gray-400 text-center">No options found</p>
            ) : grouped && groupedOptions ? (
              [...groupedOptions].map(([group, opts]) => (
                <div key={group}>
                  {group && (
                    <p className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{group}</p>
                  )}
                  {opts.map((opt) => {
                    flatIdx++;
                    return renderOpt(opt, flatIdx);
                  })}
                </div>
              ))
            ) : (
              flatList.map((opt, i) => renderOpt(opt, i))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Select.displayName = "Select";

export { Select };
export default Select;
