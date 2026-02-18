import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Accordion - Configurable, accessible accordion/collapsible panel component.
 */
/*
 * @param {Object[]} items - Array of { id, title, content } objects. Content can be string or JSX.
 * @param {boolean} allowMultiple - Allow multiple panels open simultaneously
 * @param {string} className - Additional CSS classes for the container
 * @param {"default"|"bordered"|"separated"} variant - Visual style variant
 * @param {"sm"|"md"|"lg"} size - Sizing variant
 * @param {Function} onToggle - Callback: (id, isOpen) => void
 * @param {Array} defaultOpen - Array of IDs for initially open panels
 * @param {"left"|"right"} iconPosition - Chevron icon placement
 */
const Accordion = ({
  items = [],
  allowMultiple = false,
  className = "",
  variant = "default",
  size = "md",
  onToggle,
  defaultOpen = [],
  iconPosition = "right",
}) => {
  const [openItems, setOpenItems] = useState(() => new Set(defaultOpen));

  const toggleItem = useCallback(
    (id) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (allowMultiple) {
          next.has(id) ? next.delete(id) : next.add(id);
        } else {
          const wasOpen = next.has(id);
          next.clear();
          if (!wasOpen) next.add(id);
        }
        onToggle?.(id, next.has(id));
        return next;
      });
    },
    [allowMultiple, onToggle]
  );

  const isOpen = (id) => openItems.has(id);

  const sizes = {
    sm: { btn: "px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm", body: "px-3 pb-2.5 text-xs sm:px-4 sm:pb-3 sm:text-sm" },
    md: { btn: "px-3 py-3 text-sm sm:px-4 sm:py-3.5 md:px-6 md:py-4 md:text-base", body: "px-3 pb-3 text-sm sm:px-4 sm:pb-3.5 md:px-6 md:pb-4 md:text-base" },
    lg: { btn: "px-4 py-3.5 text-base sm:px-6 sm:py-4 md:px-8 md:py-5 md:text-lg", body: "px-4 pb-4 text-base sm:px-6 sm:pb-4 md:px-8 md:pb-5 md:text-lg" },
  };

  const variants = {
    default: "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm",
    bordered: "border border-gray-300 dark:border-zinc-600 rounded-lg",
    separated: "bg-gray-50 dark:bg-zinc-800/60 rounded-xl",
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.default;

  return (
    <div className={`space-y-3 ${className}`} role="region">
      {items.map((item) => (
        <div key={item.id} className={`overflow-hidden transition-shadow duration-200 ${v}`}>
          <button
            onClick={() => toggleItem(item.id)}
            className={`w-full text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset cursor-pointer ${s.btn} ${iconPosition === "left" ? "flex-row-reverse" : ""}`}
            aria-expanded={isOpen(item.id)}
            aria-controls={`accordion-panel-${item.id}`}
            id={`accordion-btn-${item.id}`}
          >
            <span className="font-medium text-gray-900 dark:text-white flex-1 pr-2">
              {item.title}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                isOpen(item.id) ? "rotate-180" : ""
              } ${iconPosition === "left" ? "mr-3" : "ml-3"}`}
            />
          </button>
          <div
            id={`accordion-panel-${item.id}`}
            role="region"
            aria-labelledby={`accordion-btn-${item.id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen(item.id) ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className={s.body}>
              <div className="border-t border-gray-200 dark:border-zinc-700 pt-3">
                {typeof item.content === "string" ? (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Accordion.displayName = "Accordion";

export { Accordion };
export default Accordion;
