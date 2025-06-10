import { useState, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";

// Sample filter data
const filterOptions = {
  category: {
    label: "Category",
    type: "single", // single or multiple
    options: [
      { value: "electronics", label: "Electronics" },
      { value: "clothing", label: "Clothing" },
      { value: "books", label: "Books" },
      { value: "home", label: "Home & Garden" },
      { value: "sports", label: "Sports & Outdoors" },
    ],
  },
  price: {
    label: "Price Range",
    type: "single",
    options: [
      { value: "0-25", label: "Under $25" },
      { value: "25-50", label: "$25 - $50" },
      { value: "50-100", label: "$50 - $100" },
      { value: "100-200", label: "$100 - $200" },
      { value: "200+", label: "$200+" },
    ],
  },
  brand: {
    label: "Brand",
    type: "multiple",
    options: [
      { value: "apple", label: "Apple" },
      { value: "samsung", label: "Samsung" },
      { value: "nike", label: "Nike" },
      { value: "adidas", label: "Adidas" },
      { value: "sony", label: "Sony" },
    ],
  },
  rating: {
    label: "Customer Rating",
    type: "single",
    options: [
      { value: "4+", label: "4+ Stars" },
      { value: "3+", label: "3+ Stars" },
      { value: "2+", label: "2+ Stars" },
      { value: "1+", label: "1+ Stars" },
    ],
  },
  availability: {
    label: "Availability",
    type: "multiple",
    options: [
      { value: "in-stock", label: "In Stock" },
      { value: "on-sale", label: "On Sale" },
      { value: "free-shipping", label: "Free Shipping" },
      { value: "new-arrivals", label: "New Arrivals" },
    ],
  },
};

const FilterComponent = ({ onFiltersChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [openDropdowns, setOpenDropdowns] = useState(new Set());

  // Notify parent component of filter changes
  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  // Toggle dropdown open/close
  const toggleDropdown = (filterKey) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filterKey)) {
        newSet.delete(filterKey);
      } else {
        newSet.add(filterKey);
      }
      return newSet;
    });
  };

  // Handle filter selection
  const handleFilterChange = (filterKey, optionValue) => {
    const filterConfig = filterOptions[filterKey];

    setFilters((prev) => {
      const newFilters = { ...prev };

      if (filterConfig.type === "single") {
        // Single select - replace value
        newFilters[filterKey] = optionValue;
      } else {
        // Multiple select - toggle value in array
        if (!newFilters[filterKey]) {
          newFilters[filterKey] = [];
        }

        const currentValues = [...newFilters[filterKey]];
        const index = currentValues.indexOf(optionValue);

        if (index > -1) {
          currentValues.splice(index, 1);
        } else {
          currentValues.push(optionValue);
        }

        newFilters[filterKey] = currentValues;
      }

      return newFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({});
  };

  // Clear specific filter
  const clearFilter = (filterKey) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  };

  // Check if option is selected
  const isOptionSelected = (filterKey, optionValue) => {
    const filterConfig = filterOptions[filterKey];
    const currentValue = filters[filterKey];

    if (filterConfig.type === "single") {
      return currentValue === optionValue;
    } else {
      return Array.isArray(currentValue) && currentValue.includes(optionValue);
    }
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.keys(filters).reduce((count, key) => {
      const value = filters[key];
      if (Array.isArray(value)) {
        return count + value.length;
      } else if (value) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  // Get selected option labels for display
  const getSelectedLabels = (filterKey) => {
    const filterConfig = filterOptions[filterKey];
    const currentValue = filters[filterKey];

    if (!currentValue) return [];

    if (filterConfig.type === "single") {
      const option = filterConfig.options.find(
        (opt) => opt.value === currentValue
      );
      return option ? [option.label] : [];
    } else {
      return filterConfig.options
        .filter((opt) => currentValue.includes(opt.value))
        .map((opt) => opt.label);
    }
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="w-full max-w-[1024px] mx-auto">
      {/* Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Filters
          </h3>
          {activeFilterCount > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              {activeFilterCount} active
            </span>
          )}

          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
      {/* Mobile: Stacked Vertically */}
      <div className="block md:hidden space-y-4">
        {Object.entries(filterOptions).map(([filterKey, config]) => (
          <div key={filterKey} className="relative">
            <button
              onClick={() => toggleDropdown(filterKey)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={openDropdowns.has(filterKey)}
            >
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {config.label}
                </span>
                {filters[filterKey] && (
                  <div className="mt-1">
                    {getSelectedLabels(filterKey).map((label, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded mr-1 mb-1"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  openDropdowns.has(filterKey) ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Mobile Dropdown */}
            {openDropdowns.has(filterKey) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {config.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange(filterKey, option.value)}
                    className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex items-center flex-1">
                      {config.type === "multiple" ? (
                        <div
                          className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                            isOptionSelected(filterKey, option.value)
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300 dark:border-zinc-600"
                          }`}
                        >
                          {isOptionSelected(filterKey, option.value) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                      ) : (
                        <div
                          className={`w-4 h-4 border-2 rounded-full mr-3 ${
                            isOptionSelected(filterKey, option.value)
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300 dark:border-zinc-600"
                          }`}
                        >
                          {isOptionSelected(filterKey, option.value) && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                      )}
                      <span className="text-sm text-gray-900 dark:text-white">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Desktop: Horizontal */}
      <div className="hidden md:flex md:flex-wrap md:gap-4">
        {Object.entries(filterOptions).map(([filterKey, config]) => (
          <div key={filterKey} className="relative">
            <button
              onClick={() => toggleDropdown(filterKey)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={openDropdowns.has(filterKey)}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {config.label}
              </span>
              {filters[filterKey] && (
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-1.5 py-0.5 rounded">
                  {config.type === "single" ? 1 : filters[filterKey].length}
                </span>
              )}
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  openDropdowns.has(filterKey) ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Desktop Dropdown */}
            {openDropdowns.has(filterKey) && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-lg z-10 min-w-48 max-h-60 overflow-y-auto">
                {config.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange(filterKey, option.value)}
                    className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex items-center flex-1">
                      {config.type === "multiple" ? (
                        <div
                          className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                            isOptionSelected(filterKey, option.value)
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300 dark:border-zinc-600"
                          }`}
                        >
                          {isOptionSelected(filterKey, option.value) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                      ) : (
                        <div
                          className={`w-4 h-4 border-2 rounded-full mr-3 ${
                            isOptionSelected(filterKey, option.value)
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300 dark:border-zinc-600"
                          }`}
                        >
                          {isOptionSelected(filterKey, option.value) && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                      )}
                      <span className="text-sm text-gray-900 dark:text-white">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Active Filters:
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([filterKey, value]) => {
              if (!value) return null;
              const config = filterOptions[filterKey];
              const labels = getSelectedLabels(filterKey);
              return labels.map((label, index) => (
                <span
                  key={`${filterKey}-${index}`}
                  className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                >
                  <span>
                    {config.label}: {label}
                  </span>
                  <button
                    onClick={() => {
                      if (config.type === "single") {
                        clearFilter(filterKey);
                      } else {
                        const optionValue = config.options.find(
                          (opt) => opt.label === label
                        )?.value;
                        if (optionValue) {
                          handleFilterChange(filterKey, optionValue);
                        }
                      }
                    }}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
