import { useState, useRef, useCallback, useEffect } from "react";
import { X } from "lucide-react";

/**
 * MultiSelectTagInput - A searchable multi-select with tag display.
 */
/*
 * @param {string[]} options - Available options to select from
 * @param {string[]} value - Controlled selected values
 * @param {string[]} defaultValue - Initial selected values (uncontrolled)
 * @param {Function} onChange - Callback: (selected: string[]) => void
 * @param {string} placeholder - Input placeholder text
 * @param {boolean} allowCustom - Allow typing custom tags (not in options)
 * @param {number} maxItems - Maximum selectable items
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disable the input
 * @param {string} tagColor - Tailwind bg class for tags
 */
const MultiSelectTagInput = ({
  options = [],
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = "Type to search...",
  allowCustom = false,
  maxItems,
  className = "",
  disabled = false,
  tagColor = "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
}) => {
  const [internalSelected, setInternalSelected] = useState(defaultValue);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const isControlled = controlledValue !== undefined;
  const selected = isControlled ? controlledValue : internalSelected;

  const filteredOptions = options.filter(
    (opt) => opt.toLowerCase().includes(query.toLowerCase()) && !selected.includes(opt)
  );

  const updateSelected = useCallback(
    (newSelected) => {
      if (!isControlled) setInternalSelected(newSelected);
      onChange?.(newSelected);
    },
    [isControlled, onChange]
  );

  const handleSelect = useCallback(
    (tag) => {
      if (maxItems && selected.length >= maxItems) return;
      updateSelected([...selected, tag]);
      setQuery("");
      setShowDropdown(false);
      setHighlightIndex(-1);
      inputRef.current?.focus();
    },
    [selected, maxItems, updateSelected]
  );

  const handleRemove = useCallback(
    (tag) => {
      updateSelected(selected.filter((t) => t !== tag));
      inputRef.current?.focus();
    },
    [selected, updateSelected]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !query && selected.length > 0) {
      handleRemove(selected[selected.length - 1]);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && filteredOptions[highlightIndex]) {
        handleSelect(filteredOptions[highlightIndex]);
      } else if (allowCustom && query.trim() && !selected.includes(query.trim())) {
        handleSelect(query.trim());
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, -1));
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
      setHighlightIndex(-1);
    }
  };

  // Click outside
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const atMax = maxItems && selected.length >= maxItems;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Tags + Input Container */}
      <div
        className={`flex flex-wrap items-center gap-1.5 px-3 py-2 min-h-[42px] border rounded-lg transition-colors ${
          disabled
            ? "bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed"
            : "bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
        }`}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {selected.map((tag) => (
          <span key={tag} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tagColor}`}>
            {tag}
            {!disabled && (
              <button onClick={(e) => { e.stopPropagation(); handleRemove(tag); }} className="hover:text-red-500 transition-colors">
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
        {!atMax && (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); setHighlightIndex(-1); }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder={selected.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="flex-1 min-w-[100px] bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none disabled:cursor-not-allowed"
          />
        )}
      </div>

      {/* Max indicator */}
      {maxItems && (
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right">
          {selected.length}/{maxItems}
        </div>
      )}

      {/* Dropdown */}
      {showDropdown && !disabled && (filteredOptions.length > 0 || (allowCustom && query.trim())) && (
        <ul className="absolute z-30 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg shadow-xl max-h-48 overflow-auto">
          {filteredOptions.map((opt, idx) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2.5 cursor-pointer text-sm text-gray-900 dark:text-gray-200 transition-colors ${
                idx === highlightIndex ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-50 dark:hover:bg-zinc-700"
              }`}
            >
              {opt}
            </li>
          ))}
          {allowCustom && query.trim() && !options.includes(query.trim()) && !selected.includes(query.trim()) && (
            <li
              onClick={() => handleSelect(query.trim())}
              className="px-4 py-2.5 cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-t border-gray-100 dark:border-zinc-700"
            >
              Create "{query.trim()}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

MultiSelectTagInput.displayName = "MultiSelectTagInput";

export { MultiSelectTagInput };
export default MultiSelectTagInput;
