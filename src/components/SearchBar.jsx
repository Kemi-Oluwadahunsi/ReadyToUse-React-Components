import { useState, useEffect, useRef, useCallback, useId } from "react";
import { Search, Clock, TrendingUp } from "lucide-react";

/**
 * SearchBar - A search bar with live suggestions, keyboard navigation, and debounce.
 */
/*
 * @param {string[]} suggestions - Array of searchable suggestion strings
 * @param {Function} onSearch - Callback when search is submitted: (query: string) => void
 * @param {Function} onSuggestionSelect - Callback: (suggestion: string) => void
 * @param {string} placeholder - Input placeholder
 * @param {number} debounceMs - Debounce delay in ms
 * @param {number} maxSuggestions - Max visible suggestions
 * @param {string[]} recentSearches - Recent search list
 * @param {string[]} trendingSearches - Trending search list
 * @param {string} className - Additional CSS classes
 * @param {string} value - Controlled input value
 * @param {boolean} showIcon - Show search icon in input
 */
const SearchBar = ({
  suggestions: dataProp = [],
  onSearch,
  onSuggestionSelect,
  placeholder = "Search...",
  debounceMs = 300,
  maxSuggestions = 6,
  recentSearches = [],
  trendingSearches = [],
  className = "",
  value: controlledValue,
  showIcon = true,
}) => {
  const [query, setQuery] = useState(controlledValue || "");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);
  const listId = useId();

  // Sync controlled value
  useEffect(() => {
    if (controlledValue !== undefined) setQuery(controlledValue);
  }, [controlledValue]);

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query.trim()) {
        const filtered = dataProp
          .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
          .slice(0, maxSuggestions);
        setResults(filtered);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
      setSelectedIndex(-1);
    }, debounceMs);
    return () => clearTimeout(debounceRef.current);
  }, [query, dataProp, debounceMs, maxSuggestions]);

  const handleSelect = useCallback(
    (suggestion) => {
      setQuery(suggestion);
      setIsOpen(false);
      setSelectedIndex(-1);
      onSuggestionSelect?.(suggestion);
      onSearch?.(suggestion);
    },
    [onSearch, onSuggestionSelect]
  );

  const handleKeyDown = (e) => {
    if (!isOpen && e.key !== "Enter") return;
    const list = results.length > 0 ? results : [];

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, list.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && list[selectedIndex]) handleSelect(list[selectedIndex]);
        else if (query.trim()) { onSearch?.(query); setIsOpen(false); }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Click outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFocus = () => {
    if (query.trim() && results.length > 0) setIsOpen(true);
    else if (!query.trim() && (recentSearches.length > 0 || trendingSearches.length > 0)) setIsOpen(true);
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={searchRef} className="relative flex items-center">
        {showIcon && <Search className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />}
        <input
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-activedescendant={selectedIndex >= 0 ? `${listId}-opt-${selectedIndex}` : undefined}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`w-full ${showIcon ? "pl-10" : "pl-4"} pr-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm`}
        />
      </div>

      {isOpen && (
        <div ref={dropdownRef} id={listId} role="listbox" className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {/* Suggestions */}
          {results.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-zinc-700">
                Suggestions
              </div>
              {results.map((suggestion, idx) => (
                <button
                  key={idx}
                  id={`${listId}-opt-${idx}`}
                  role="option"
                  aria-selected={selectedIndex === idx}
                  onClick={() => handleSelect(suggestion)}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors text-sm ${
                    selectedIndex === idx ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-50 dark:hover:bg-zinc-700"
                  }`}
                >
                  <Search className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                  <span className="text-gray-900 dark:text-white">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!query.trim() && recentSearches.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-zinc-700">
                Recent
              </div>
              {recentSearches.map((item, idx) => (
                <button key={idx} onClick={() => handleSelect(item)} className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors text-sm">
                  <Clock className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </button>
              ))}
            </div>
          )}

          {/* Trending */}
          {!query.trim() && trendingSearches.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-zinc-700">
                Trending
              </div>
              {trendingSearches.map((item, idx) => (
                <button key={idx} onClick={() => handleSelect(item)} className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors text-sm">
                  <TrendingUp className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchBar.displayName = "SearchBar";

export { SearchBar };
export default SearchBar;
