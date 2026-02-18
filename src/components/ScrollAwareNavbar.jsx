import React, { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";

/**
 * ScrollAwareNavbar - A smart, scroll-aware sticky navbar.
 */
/*
 * @param {Object[]} items - Array of { name|label, href, icon?: ReactNode|LucideIcon, active?: boolean }
 * @param {React.ReactNode|string} logo - Logo element or text
 * @param {React.ReactNode|Object} cta - CTA button: JSX or { label, onClick, variant? }
 * @param {"auto-hide"|"sticky"|"scroll-shadow"} behavior - Scroll behavior mode:
 *   "auto-hide" = hides on scroll down, shows on scroll up (default)
 *   "sticky" = always visible, gains shadow on scroll
 *   "scroll-shadow" = always visible, subtle entrance shadow after threshold
 * @param {number} scrollThreshold - Scroll distance before behavior activates (px)
 * @param {boolean} transparent - Transparent background when at top
 * @param {boolean} blur - Apply backdrop blur
 * @param {string} activeItem - name/label of the currently active nav item
 * @param {string} className - Additional CSS classes
 * @param {Function} onNavigate - Callback: (item) => void
 * @param {number} height - Navbar height in px (default 64)
 */
const ScrollAwareNavbar = ({
  items = [],
  logo,
  cta,
  behavior = "sticky",
  scrollThreshold = 10,
  transparent = false,
  blur = true,
  activeItem,
  className = "",
  onNavigate,
  height = 64,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const scrolled = y > scrollThreshold;
      setIsScrolled(scrolled);

      if (behavior === "auto-hide") {
        if (y < lastScrollY.current || y < scrollThreshold) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setIsMobileMenuOpen(false);
        }
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold, behavior]);

  const handleItemClick = useCallback(
    (item, e) => {
      setIsMobileMenuOpen(false);
      if (onNavigate) {
        e.preventDefault();
        onNavigate(item);
      }
    },
    [onNavigate]
  );

  // Render CTA: supports JSX elements or {label, onClick} objects
  const renderCta = (c) => {
    if (!c) return null;
    if (typeof c === "object" && c !== null && !React.isValidElement(c)) {
      return (
        <button
          type="button"
          onClick={c.onClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
        >
          {c.label || "Get Started"}
        </button>
      );
    }
    return c;
  };

  const isItemActive = (item) => {
    if (item.active) return true;
    if (activeItem) return (item.name || item.label) === activeItem;
    return false;
  };

  // Background: transparent at top (if enabled), solid with optional shadow when scrolled
  const bgClass = transparent && !isScrolled
    ? "bg-transparent"
    : "bg-white/90 dark:bg-zinc-900/90 border-b border-gray-200/50 dark:border-zinc-700/50";

  const shadowClass = isScrolled ? "shadow-md shadow-black/5 dark:shadow-black/20" : "";

  const translateClass = behavior === "auto-hide" && !isVisible ? "-translate-y-full" : "translate-y-0";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${translateClass} ${blur ? "backdrop-blur-lg" : ""} ${bgClass} ${shadowClass} ${className}`}
      style={{ height }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            {typeof logo === "string" ? (
              <span className="text-xl font-bold text-gray-900 dark:text-white">{logo}</span>
            ) : (
              logo || (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">ReadyUI</span>
                </div>
              )
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {items.map((item, idx) => {
              const active = isItemActive(item);
              return (
                <a
                  key={item.name || item.label || idx}
                  href={item.href || "#"}
                  onClick={(e) => handleItemClick(item, e)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    active
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {item.name || item.label}
                </a>
              );
            })}
            {cta && <div className="ml-4">{renderCta(cta)}</div>}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-t border-gray-200/30 dark:border-zinc-700/30">
          {items.map((item, idx) => {
            const icon = item.icon;
            const active = isItemActive(item);
            return (
              <a
                key={item.name || item.label || idx}
                href={item.href || "#"}
                onClick={(e) => handleItemClick(item, e)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  active
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {icon && (React.isValidElement(icon) ? icon : React.createElement(icon, { className: "h-5 w-5" }))}
                {item.name || item.label}
              </a>
            );
          })}
          {cta && <div className="pt-2">{renderCta(cta)}</div>}
        </div>
      </div>
    </nav>
  );
};

ScrollAwareNavbar.displayName = "ScrollAwareNavbar";

export { ScrollAwareNavbar };
export default ScrollAwareNavbar;
