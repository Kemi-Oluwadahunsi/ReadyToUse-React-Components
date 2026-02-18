import { useState, useRef, useEffect, useCallback, isValidElement } from "react";
import { Plus, X } from "lucide-react";

/**
 * FloatingActionButton - Expandable FAB with configurable sub-actions.
 */
/*
 * @param {Object[]} actions - Array of { id, icon: LucideIcon, label, color?, onClick }
 * @param {"bottom-right"|"bottom-left"|"top-right"|"top-left"} position - Screen position
 * @param {string} mainColor - Tailwind bg class for the main button
 * @param {boolean} hideOnScroll - Hide FAB when scrolling down
 * @param {boolean} showBackdrop - Show backdrop overlay when expanded
 * @param {string} className - Additional CSS classes
 * @param {string} size - "sm" | "md" | "lg"
 */
const FloatingActionButton = ({
  actions = [],
  position = "bottom-right",
  mainColor = "bg-blue-600 hover:bg-blue-700",
  hideOnScroll = true,
  showBackdrop = true,
  className = "",
  size = "md",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const fabRef = useRef(null);

  const sizes = {
    sm: { main: "w-12 h-12", action: "w-10 h-10", icon: "h-5 w-5", actionIcon: "h-4 w-4" },
    md: { main: "w-14 h-14", action: "w-12 h-12", icon: "h-6 w-6", actionIcon: "h-5 w-5" },
    lg: { main: "w-16 h-16", action: "w-14 h-14", icon: "h-7 w-7", actionIcon: "h-5 w-5" },
  };

  const positions = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  const isBottom = position.startsWith("bottom");
  const isRight = position.endsWith("right");
  const s = sizes[size] || sizes.md;

  useEffect(() => {
    if (!hideOnScroll) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastScrollYRef.current || y < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
      lastScrollYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideOnScroll]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (fabRef.current && !fabRef.current.contains(e.target)) setIsExpanded(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleActionClick = useCallback((action) => {
    action.onClick?.();
    setIsExpanded(false);
  }, []);

  return (
    <div
      ref={fabRef}
      className={`fixed ${positions[position] || positions["bottom-right"]} z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : `${isBottom ? "translate-y-20" : "-translate-y-20"} opacity-0 pointer-events-none`
      } ${className}`}
    >
      {/* Sub-actions */}
      <div
        className={`absolute ${isBottom ? "bottom-16" : "top-16"} ${isRight ? "right-0" : "left-0"} space-y-3 transition-all duration-300 ${
          isExpanded ? "opacity-100 translate-y-0" : `opacity-0 ${isBottom ? "translate-y-4" : "-translate-y-4"} pointer-events-none`
        }`}
      >
        {actions.map((action, index) => {
          const icon = action.icon;
          // Support both JSX elements and component references
          const renderedIcon = isValidElement(icon)
              ? icon
              : (() => { const IconComp = icon; return <IconComp className={s.actionIcon} />; })();
          return (
            <div
              key={action.id || index}
              className={`flex items-center gap-3 ${isRight ? "" : "flex-row-reverse"}`}
              style={{ transitionDelay: isExpanded ? `${index * 60}ms` : "0ms" }}
            >
              <div className="bg-gray-900 dark:bg-zinc-700 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                {action.label}
              </div>
              <button
                onClick={() => handleActionClick(action)}
                className={`${s.action} rounded-full shadow-lg text-white transition-all duration-200 transform hover:scale-110 cursor-pointer flex items-center justify-center ${
                  action.color || "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                {renderedIcon}
              </button>
            </div>
          );
        })}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${s.main} ${mainColor} text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center ${
          isExpanded ? "rotate-45" : "rotate-0"
        }`}
      >
        {isExpanded ? <X className={s.icon} /> : <Plus className={s.icon} />}
      </button>

      {/* Backdrop */}
      {showBackdrop && isExpanded && (
        <div className="fixed inset-0 bg-black/20 -z-10" onClick={() => setIsExpanded(false)} />
      )}
    </div>
  );
};

FloatingActionButton.displayName = "FloatingActionButton";

export { FloatingActionButton };
export default FloatingActionButton;
