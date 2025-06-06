"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp } from "lucide-react";

// Sample data for suggestions
const sampleData = [
  "React components",
  "JavaScript tutorials",
  "CSS animations",
  "Next.js routing",
  "Tailwind CSS",
  "TypeScript basics",
  "Node.js API",
  "MongoDB queries",
  "GraphQL mutations",
  "Vue.js composition",
  "Angular services",
  "Python Django",
  "Express middleware",
  "React hooks",
  "CSS Grid layout",
];

const recentSearches = [
  "React hooks tutorial",
  "CSS flexbox guide",
  "JavaScript promises",
];

const trendingSearches = [
  "AI development",
  "Web3 programming",
  "Machine learning",
  "Blockchain basics",
];

export default function SearchBarSuggestions() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce function
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedQuery = useDebounce(query, 300);

  // Fetch suggestions based on debounced query
  useEffect(() => {
    if (debouncedQuery.trim()) {
      const filtered = sampleData.filter((item) =>
        item.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setIsOpen(false);
    setSelectedIndex(-1);
    // Simulate search action
    console.log("Searching for:", suggestion);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSuggestionClick(query);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle focus
  const handleFocus = () => {
    if (query.trim() && suggestions.length > 0) {
      setIsOpen(true);
    } else if (!query.trim()) {
      setIsOpen(true); // Show recent/trending when empty
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Search with Live Suggestions
        </h2>

        {/* Search Container */}
        <div className="relative">
          {/* Search Input */}
          <div ref={searchRef} className="relative flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              placeholder="Search for tutorials, guides, and more..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Suggestions Dropdown */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            >
              {/* Query-based suggestions */}
              {suggestions.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-zinc-700">
                    Suggestions
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-3 ${
                        selectedIndex === index
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {suggestion}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Recent searches when no query */}
              {!query.trim() && (
                <>
                  <div>
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-zinc-700">
                      Recent Searches
                    </div>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-3"
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {search}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div>
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-zinc-700">
                      Trending
                    </div>
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center gap-3"
                      >
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {search}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* No results */}
              {query.trim() && suggestions.length === 0 && (
                <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  No suggestions found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Tips */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-zinc-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Features:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Live suggestions with 300ms debouncing</li>
            <li>• Keyboard navigation (↑↓ arrows, Enter, Escape)</li>
            <li>• Recent and trending searches when empty</li>
            <li>• Click outside to close</li>
            <li>• Responsive dropdown positioning</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
