import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample image data with categories
const galleryItems = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Modern architecture",
    title: "Modern Building",
    categories: ["architecture", "modern"],
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Portrait photography",
    title: "Portrait Study",
    categories: ["portrait", "people"],
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Natural landscape",
    title: "Mountain Vista",
    categories: ["nature", "landscape"],
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Urban street photography",
    title: "City Streets",
    categories: ["urban", "street"],
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Product photography",
    title: "Product Showcase",
    categories: ["product", "commercial"],
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Abstract art",
    title: "Abstract Forms",
    categories: ["abstract", "art"],
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wildlife photography",
    title: "Wildlife Close-up",
    categories: ["nature", "wildlife"],
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Food photography",
    title: "Culinary Delight",
    categories: ["food", "commercial"],
  },
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Classic architecture",
    title: "Historic Building",
    categories: ["architecture", "classic"],
  },
  {
    id: 10,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Fashion photography",
    title: "Fashion Editorial",
    categories: ["fashion", "people"],
  },
  {
    id: 11,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Minimalist design",
    title: "Minimalist Space",
    categories: ["interior", "modern"],
  },
  {
    id: 12,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Travel photography",
    title: "Destination View",
    categories: ["travel", "landscape"],
  },
];

// Extract unique categories from gallery items
const allCategories = [
  "all",
  ...new Set(galleryItems.flatMap((item) => item.categories)),
];

export default function FilterableGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter items when activeFilter changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(galleryItems);
    } else {
      const filtered = galleryItems.filter((item) =>
        item.categories.includes(activeFilter)
      );
      setFilteredItems(filtered);
    }
  }, [activeFilter]);

  // Handle filter button click
  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  // Open image in lightbox
  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Gallery Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Image Gallery
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Browse our collection of high-quality images across various categories
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="aspect-square relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-zinc-800 group cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <h3 className="text-white text-sm font-medium">{item.title}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs bg-white/30 text-white px-2 py-0.5 rounded-full backdrop-blur-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No images found for this category.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            onClick={closeLightbox}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="max-w-4xl max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white text-lg font-medium">
                {selectedImage.title}
              </h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedImage.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs bg-white/30 text-white px-2 py-0.5 rounded-full backdrop-blur-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
