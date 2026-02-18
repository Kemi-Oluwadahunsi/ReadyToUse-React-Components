import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronDown, X, Check } from "lucide-react";

/* Module-level DropdownContent to avoid re-creation each render */
const DropdownContent = ({ filterKey, config, currentFilters, handleFilterChange, isSelected, clearFilter }) => {
  if (!config.options || !config.options.length) return null;
  return (
    <div className="absolute top-full left-0 right-0 md:right-auto md:min-w-[220px] mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
      {config.options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilterChange(filterKey, option.value)}
          className="w-full flex items-center px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          {config.type === "multiple" ? (
            <div
              className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center transition-colors ${
                isSelected(filterKey, option.value)
                  ? "bg-blue-600 border-blue-600"
                  : "border-gray-300 dark:border-zinc-500"
              }`}
            >
              {isSelected(filterKey, option.value) && <Check className="h-3 w-3 text-white" />}
            </div>
          ) : (
            <div
              className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center transition-colors ${
                isSelected(filterKey, option.value)
                  ? "border-blue-600"
                  : "border-gray-300 dark:border-zinc-500"
              }`}
            >
              {isSelected(filterKey, option.value) && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
            </div>
          )}
          <span className="text-sm text-gray-900 dark:text-white">{option.label}</span>
        </button>
      ))}
      {currentFilters[filterKey] && (
        <button
          onClick={() => clearFilter(filterKey)}
          className="w-full px-4 py-2 text-left text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-gray-100 dark:border-zinc-700"
        >
          Clear this filter
        </button>
      )}
    </div>
  );
};

/**
 * FilterPanel - A professional multi-category filter component with dropdowns.
 *
 * Accepts `filters` as either:
 *   - An object map: { [key]: { label, type, options } }
 *   - An array: [{ id, label, type, options }]
 *
 * Options can be:
 *   - Array of strings: ["Option A", "Option B"]
 *   - Array of objects: [{ value: "a", label: "Option A" }]
 *
 * Types: "select" | "single" | "multiple" | "toggle"
 */
const FilterPanel = ({
  filters: filtersProp = {},
  value: controlledValue,
  onChange,
  initialValue = {},
  className = "",
  showActiveCount = true,
  clearAllLabel = "Clear all",
}) => {
  // Normalize filters: always work with an object map internally
  const filters = Array.isArray(filtersProp)
    ? filtersProp.reduce((acc, f) => {
        acc[f.id] = { ...f };
        return acc;
      }, {})
    : filtersProp;

  // Normalize options: ensure each option is { value, label }
  Object.keys(filters).forEach((key) => {
    const config = filters[key];
    if (config.options && Array.isArray(config.options)) {
      config.options = config.options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
      );
    }
    // Normalize type aliases
    if (config.type === "select") config.type = "single";
  });

  const [internalFilters, setInternalFilters] = useState(initialValue);
  const [openDropdowns, setOpenDropdowns] = useState(new Set());

  const isControlled = controlledValue !== undefined;
  const currentFilters = isControlled ? controlledValue : internalFilters;

  // Close dropdowns on outside click
  const containerRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDropdowns(new Set());
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const updateFilters = useCallback(
    (newFilters) => {
      if (!isControlled) setInternalFilters(newFilters);
      onChange?.(newFilters);
    },
    [isControlled, onChange]
  );

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleToggle = (filterKey) => {
    const newFilters = { ...currentFilters };
    if (newFilters[filterKey]) {
      delete newFilters[filterKey];
    } else {
      newFilters[filterKey] = true;
    }
    updateFilters(newFilters);
  };

  const handleFilterChange = (filterKey, optionValue) => {
    const config = filters[filterKey];
    const newFilters = { ...currentFilters };

    if (config.type === "single") {
      newFilters[filterKey] = newFilters[filterKey] === optionValue ? undefined : optionValue;
    } else {
      const arr = [...(newFilters[filterKey] || [])];
      const idx = arr.indexOf(optionValue);
      idx > -1 ? arr.splice(idx, 1) : arr.push(optionValue);
      newFilters[filterKey] = arr.length ? arr : undefined;
    }

    // Clean undefined
    Object.keys(newFilters).forEach((k) => {
      if (newFilters[k] === undefined || (Array.isArray(newFilters[k]) && !newFilters[k].length)) {
        delete newFilters[k];
      }
    });

    updateFilters(newFilters);
  };

  const clearAll = () => updateFilters({});
  const clearFilter = (key) => {
    const next = { ...currentFilters };
    delete next[key];
    updateFilters(next);
  };

  const isSelected = (filterKey, optionValue) => {
    const val = currentFilters[filterKey];
    if (!val) return false;
    return Array.isArray(val) ? val.includes(optionValue) : val === optionValue;
  };

  const activeCount = Object.keys(currentFilters).reduce((c, k) => {
    const v = currentFilters[k];
    return c + (Array.isArray(v) ? v.length : v ? 1 : 0);
  }, 0);

  const getSelectedLabels = (filterKey) => {
    const config = filters[filterKey];
    const val = currentFilters[filterKey];
    if (!val) return [];
    if (config.type === "toggle") return val ? [config.label] : [];
    if (!config.options) return [];
    if (config.type === "single") {
      const opt = config.options.find((o) => o.value === val);
      return opt ? [opt.label] : [];
    }
    return config.options.filter((o) => val.includes(o.value)).map((o) => o.label);
  };

  const ddProps = { currentFilters, handleFilterChange, isSelected, clearFilter };

  const DropdownContentLocal = ({ filterKey, config }) => (
    <DropdownContent filterKey={filterKey} config={config} {...ddProps} />
  );

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        {showActiveCount && activeCount > 0 && (
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
            {activeCount} active
          </span>
        )}
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-sm text-blue-600 dark:text-blue-400 hover:underline ml-auto">
            {clearAllLabel}
          </button>
        )}
      </div>

      {/* Active Filter Tags */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(filters).map(([key, config]) =>
            getSelectedLabels(key).map((label) => (
              <span
                key={`${key}-${label}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
              >
                {config.label}: {label}
                <button
                  onClick={() => {
                    if (config.type === "toggle") handleToggle(key);
                    else {
                      const opt = config.options?.find((o) => o.label === label);
                      if (opt) handleFilterChange(key, opt.value);
                    }
                  }}
                  className="hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {Object.entries(filters).map(([filterKey, config]) => (
          <div key={filterKey} className="relative">
            {config.type === "toggle" ? (
              <button
                onClick={() => handleToggle(filterKey)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors cursor-pointer ${
                  currentFilters[filterKey]
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
                }`}
              >
                <span className="text-sm font-medium">{config.label}</span>
                {currentFilters[filterKey] && <Check className="h-4 w-4" />}
              </button>
            ) : (
              <>
                <button
                  onClick={() => toggleDropdown(filterKey)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  aria-expanded={openDropdowns.has(filterKey)}
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{config.label}</span>
                  {currentFilters[filterKey] && (
                    <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {Array.isArray(currentFilters[filterKey]) ? currentFilters[filterKey].length : 1}
                    </span>
                  )}
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openDropdowns.has(filterKey) ? "rotate-180" : ""}`} />
                </button>
                {openDropdowns.has(filterKey) && <DropdownContentLocal filterKey={filterKey} config={config} />}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

FilterPanel.displayName = "FilterPanel";

export { FilterPanel };
export default FilterPanel;
