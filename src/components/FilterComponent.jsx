import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronDown, X, Check } from "lucide-react";

/* ── Variant renderers ────────────────────────────────────────────── */

/** Classic dropdown list (default) */
const DropdownContent = ({ filterKey, config, currentFilters, handleFilterChange, isSelected, clearFilter }) => {
  if (!config.options?.length) return null;
  return (
    <div className="absolute top-full left-0 right-0 sm:right-auto sm:min-w-[220px] mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto w-[min(calc(100vw-2rem),20rem)] sm:w-auto">
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
                isSelected(filterKey, option.value) ? "border-blue-600" : "border-gray-300 dark:border-zinc-500"
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

/** Clickable chip / pill buttons */
const ChipsVariant = ({ filterKey, config, handleFilterChange, isSelected }) => {
  if (!config.options?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {config.options.map((option) => {
        const active = isSelected(filterKey, option.value);
        return (
          <button
            key={option.value}
            onClick={() => handleFilterChange(filterKey, option.value)}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              active
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {active && <Check className="inline h-3 w-3 mr-1 -ml-0.5" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

/** Radio button list (always visible) */
const RadioVariant = ({ filterKey, config, handleFilterChange, isSelected }) => {
  if (!config.options?.length) return null;
  return (
    <div className="flex flex-col gap-1.5">
      {config.options.map((option) => {
        const active = isSelected(filterKey, option.value);
        return (
          <label
            key={option.value}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors"
          >
            <span
              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                active ? "border-blue-600" : "border-gray-300 dark:border-zinc-500"
              }`}
            >
              {active && <span className="w-2 h-2 bg-blue-600 rounded-full" />}
            </span>
            <span className="text-sm text-gray-900 dark:text-white">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

/** Checkbox list (always visible) */
const CheckboxVariant = ({ filterKey, config, handleFilterChange, isSelected }) => {
  if (!config.options?.length) return null;
  return (
    <div className="flex flex-col gap-1.5">
      {config.options.map((option) => {
        const active = isSelected(filterKey, option.value);
        return (
          <label
            key={option.value}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700/50 cursor-pointer transition-colors"
          >
            <span
              className={`w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 transition-colors ${
                active ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-zinc-500"
              }`}
            >
              {active && <Check className="h-3 w-3 text-white" />}
            </span>
            <span className="text-sm text-gray-900 dark:text-white">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

/** iOS-style segmented control */
const SegmentedVariant = ({ filterKey, config, handleFilterChange, isSelected }) => {
  if (!config.options?.length) return null;
  return (
    <div className="inline-flex flex-wrap bg-gray-100 dark:bg-zinc-700 rounded-lg p-0.5 max-w-full">
      {config.options.map((option) => {
        const active = isSelected(filterKey, option.value);
        return (
          <button
            key={option.value}
            onClick={() => handleFilterChange(filterKey, option.value)}
            className={`px-2.5 py-1.5 sm:px-3.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              active
                ? "bg-white dark:bg-zinc-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

/** Inline underlined text links */
const InlineVariant = ({ filterKey, config, handleFilterChange, isSelected }) => {
  if (!config.options?.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {config.options.map((option) => {
        const active = isSelected(filterKey, option.value);
        return (
          <button
            key={option.value}
            onClick={() => handleFilterChange(filterKey, option.value)}
            className={`text-sm transition-colors cursor-pointer py-0.5 ${
              active
                ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

/* ── Layout classes ───────────────────────────────────────────────── */

const layoutClasses = {
  horizontal: {
    wrapper: "flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 items-stretch sm:items-start",
    filterGroup: "relative min-w-0",
  },
  vertical: {
    wrapper: "flex flex-col gap-4",
    filterGroup: "relative min-w-0",
  },
  inline: {
    wrapper: "flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4",
    filterGroup: "relative min-w-0 flex items-center gap-2",
  },
};

/* ── Variant map ──────────────────────────────────────────────────── */
const VARIANT_MAP = {
  dropdown: "dropdown",
  chips: "chips",
  radio: "radio",
  checkbox: "checkbox",
  segmented: "segmented",
  inline: "inline",
};

/**
 * FilterPanel - A flexible multi-category filter component with multiple display variants and layouts.
 *
 * @param {Object|Array} filters - Filter configuration. Object map `{ [key]: config }` or array `[{ id, ...config }]`.
 * @param {string} [filters[].label] - Display label for the filter.
 * @param {string} [filters[].type] - Filter type: `"select"` | `"single"` | `"multiple"` | `"toggle"`.
 * @param {string} [filters[].variant] - Display variant: `"dropdown"` | `"chips"` | `"radio"` | `"checkbox"` | `"segmented"` | `"inline"`. Defaults to `"dropdown"`.
 * @param {Array} [filters[].options] - Array of strings or `{ value, label }` objects.
 * @param {Object} [value] - Controlled filter state.
 * @param {Function} [onChange] - Callback when filters change.
 * @param {Object} [initialValue={}] - Initial filter state (uncontrolled mode).
 * @param {string} [layout="horizontal"] - Panel layout: `"horizontal"` | `"vertical"` | `"inline"`.
 * @param {string} [className] - Additional CSS classes.
 * @param {boolean} [showActiveCount=true] - Show active filter count badge.
 * @param {string} [clearAllLabel="Clear all"] - Label for the clear-all button.
 * @param {boolean} [showHeader=true] - Show the header with title, count, and clear button.
 * @param {boolean} [showActiveTags=true] - Show removable tags for active filters.
 * @param {string} [title="Filters"] - Header title text.
 */
const FilterPanel = ({
  filters: filtersProp = {},
  value: controlledValue,
  onChange,
  initialValue = {},
  layout = "horizontal",
  className = "",
  showActiveCount = true,
  clearAllLabel = "Clear all",
  showHeader = true,
  showActiveTags = true,
  title = "Filters",
}) => {
  /* ── Normalize filters ────────────────────────────────────────── */
  const filters = Array.isArray(filtersProp)
    ? filtersProp.reduce((acc, f) => {
        acc[f.id] = { ...f };
        return acc;
      }, {})
    : filtersProp;

  Object.keys(filters).forEach((key) => {
    const config = filters[key];
    if (config.options && Array.isArray(config.options)) {
      config.options = config.options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
      );
    }
    if (config.type === "select") config.type = "single";
    if (!config.variant) config.variant = "dropdown";
  });

  /* ── State ────────────────────────────────────────────────────── */
  const [internalFilters, setInternalFilters] = useState(initialValue);
  const [openDropdowns, setOpenDropdowns] = useState(new Set());

  const isControlled = controlledValue !== undefined;
  const currentFilters = isControlled ? controlledValue : internalFilters;

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

  /* ── Handlers ─────────────────────────────────────────────────── */
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

  /* ── Derived ──────────────────────────────────────────────────── */
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

  /* ── Variant renderers ────────────────────────────────────────── */
  const sharedProps = { currentFilters, handleFilterChange, isSelected, clearFilter };

  const renderVariant = (filterKey, config) => {
    const variant = VARIANT_MAP[config.variant] || "dropdown";
    const vProps = { filterKey, config, ...sharedProps };

    switch (variant) {
      case "chips":
        return (
          <div>
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
              {config.label}
            </span>
            <ChipsVariant {...vProps} />
          </div>
        );

      case "radio":
        return (
          <div>
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
              {config.label}
            </span>
            <RadioVariant {...vProps} />
          </div>
        );

      case "checkbox":
        return (
          <div>
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
              {config.label}
            </span>
            <CheckboxVariant {...vProps} />
          </div>
        );

      case "segmented":
        return (
          <div>
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
              {config.label}
            </span>
            <SegmentedVariant {...vProps} />
          </div>
        );

      case "inline":
        return (
          <div>
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">
              {config.label}
            </span>
            <InlineVariant {...vProps} />
          </div>
        );

      case "dropdown":
      default:
        return (
          <>
            <button
              onClick={() => toggleDropdown(filterKey)}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full sm:w-auto"
              aria-expanded={openDropdowns.has(filterKey)}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">{config.label}</span>
              {currentFilters[filterKey] && (
                <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {Array.isArray(currentFilters[filterKey]) ? currentFilters[filterKey].length : 1}
                </span>
              )}
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ml-auto sm:ml-0 ${openDropdowns.has(filterKey) ? "rotate-180" : ""}`}
              />
            </button>
            {openDropdowns.has(filterKey) && <DropdownContent filterKey={filterKey} config={config} {...sharedProps} />}
          </>
        );
    }
  };

  /* ── Layout ───────────────────────────────────────────────────── */
  const lc = layoutClasses[layout] || layoutClasses.horizontal;

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          {showActiveCount && activeCount > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
              {activeCount} active
            </span>
          )}
          {activeCount > 0 && (
            <button onClick={clearAll} className="text-sm text-blue-600 dark:text-blue-400 hover:underline ml-auto cursor-pointer">
              {clearAllLabel}
            </button>
          )}
        </div>
      )}

      {/* Active Filter Tags */}
      {showActiveTags && activeCount > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {Object.entries(filters).map(([key, config]) =>
            getSelectedLabels(key).map((label) => (
              <span
                key={`${key}-${label}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-[11px] sm:text-xs font-medium rounded-full max-w-full"
              >
                <span className="truncate">{config.label}: {label}</span>
                <button
                  onClick={() => {
                    if (config.type === "toggle") handleToggle(key);
                    else {
                      const opt = config.options?.find((o) => o.label === label);
                      if (opt) handleFilterChange(key, opt.value);
                    }
                  }}
                  className="hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {/* Filter Controls */}
      <div className={lc.wrapper}>
        {Object.entries(filters).map(([filterKey, config]) => (
          <div key={filterKey} className={lc.filterGroup}>
            {config.type === "toggle" ? (
              <button
                onClick={() => handleToggle(filterKey)}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 border rounded-lg transition-colors cursor-pointer w-full sm:w-auto ${
                  currentFilters[filterKey]
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
                }`}
              >
                <span className="text-sm font-medium">{config.label}</span>
                {currentFilters[filterKey] && <Check className="h-4 w-4" />}
              </button>
            ) : (
              renderVariant(filterKey, config)
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
