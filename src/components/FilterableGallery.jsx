import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useAnimatedList } from "./useAnimate";

/**
 * FilterableGallery - A filterable, animated image gallery with lightbox.
 */
/*
 * @param {Object[]} items - Array of { id, src, alt, title, categories: string[] }
 * @param {string[]} categories - Category filter buttons. Defaults to auto-extracted from items.
 * @param {number} columns - Grid columns (responsive): { sm, md, lg } or single number
 * @param {boolean} showLightbox - Enable lightbox on click
 * @param {string} className - Additional CSS classes
 * @param {Function} onFilter - Callback: (activeFilter: string) => void
 * @param {Function} onItemClick - Callback: (item) => void
 * @param {string} allLabel - Label for the "all" filter button
 */
const FilterableGallery = ({
  items = [],
  categories: categoriesProp,
  columns = 3,
  showLightbox = true,
  className = "",
  onFilter,
  onItemClick,
  allLabel = "All",
}) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedImage, setSelectedImage] = useState(null);

  // Extract unique categories from items (supports both `category` string and `categories` array)
  const extractedCategories = [
    ...new Set(
      items.flatMap((item) =>
        item.categories
          ? item.categories
          : item.category
          ? [item.category]
          : []
      )
    ),
  ];

  const displayCategories = [allLabel, ...(categoriesProp || extractedCategories)];

  // Helper: check if an item matches a category
  const itemMatchesCategory = (item, category) => {
    if (item.categories && Array.isArray(item.categories)) {
      return item.categories.some((c) => c.toLowerCase() === category.toLowerCase());
    }
    if (item.category) {
      return item.category.toLowerCase() === category.toLowerCase();
    }
    return false;
  };

  useEffect(() => {
    if (activeFilter === allLabel) {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => itemMatchesCategory(item, activeFilter)));
    }
  }, [activeFilter, items, allLabel]);

  const handleFilterClick = useCallback(
    (category) => {
      setActiveFilter(category);
      onFilter?.(category);
    },
    [onFilter]
  );

  const openLightbox = useCallback(
    (item) => {
      onItemClick?.(item);
      if (showLightbox) setSelectedImage(item);
    },
    [showLightbox, onItemClick]
  );

  const closeLightbox = () => setSelectedImage(null);

  // Animated list for smooth filter transitions
  const animatedItems = useAnimatedList(filteredItems, { key: "id", duration: 300 });

  // Static Tailwind column classes (dynamic interpolation breaks JIT)
  const colMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  };
  const colClass = colMap[columns] || colMap[3];

  return (
    <div className={className}>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-8">
        {displayCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeFilter === category
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={`grid ${colClass} gap-4 sm:gap-6`}>
          {animatedItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square relative overflow-hidden rounded-xl shadow-md bg-white dark:bg-zinc-800 group cursor-pointer"
              style={{
                opacity: item._animState === "present" ? 1 : 0,
                transform: item._animState === "present" ? "scale(1)" : "scale(0.92)",
                transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              }}
              onClick={() => openLightbox(item)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
              <img
                src={item.src}
                alt={item.alt || item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <h3 className="text-white text-sm font-medium">{item.title}</h3>
                {item.categories && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.categories.map((cat) => (
                      <span key={cat} className="text-xs bg-white/25 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No items found for this category.</p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors z-50"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt || selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white text-lg font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FilterableGallery.displayName = "FilterableGallery";

export { FilterableGallery };
export default FilterableGallery;
