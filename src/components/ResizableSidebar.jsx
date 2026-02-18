import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Menu, Search } from "lucide-react";

/**
 * ResizableSidebar - A collapsible, resizable sidebar navigation component.
 */
/*
 * @param {Object[]} items - Array of { icon: LucideIcon, label, href?, active?, badge?, onClick? }
 * @param {string} header - Sidebar header text
 * @param {number} defaultWidth - Default width in px
 * @param {number} minWidth - Minimum width in px
 * @param {number} maxWidth - Maximum width in px
 * @param {boolean} defaultCollapsed - Start collapsed
 * @param {boolean} showSearch - Show search input
 * @param {boolean} resizable - Enable drag-to-resize
 * @param {string} className - Additional CSS classes
 * @param {Function} onCollapse - Callback: (isCollapsed: boolean) => void
 * @param {Function} onResize - Callback: (width: number) => void
 * @param {React.ReactNode} footer - Custom footer content
 */
const ResizableSidebar = ({
  items = [],
  header = "Menu",
  defaultWidth = 260,
  minWidth = 200,
  maxWidth = 400,
  defaultCollapsed = false,
  showSearch = true,
  resizable = true,
  className = "",
  onCollapse,
  onResize,
  footer,
  children,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isResizingRef = useRef(false);

  const collapsedWidth = 60;

  const handleMouseDown = (e) => {
    if (!resizable) return;
    e.preventDefault();
    setIsResizing(true);
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, e.clientX));
      setSidebarWidth(newWidth);
      onResize?.(newWidth);
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      isResizingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth, onResize]);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      onCollapse?.(!prev);
      return !prev;
    });
  }, [onCollapse]);

  const currentWidth = isCollapsed ? collapsedWidth : sidebarWidth;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg sm:hidden border border-gray-200 dark:border-zinc-700"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 transition-all duration-300 z-50 flex flex-col ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:z-auto ${className}`}
        style={{ width: currentWidth }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700 flex-shrink-0">
          {!isCollapsed && (
            <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate">{header}</h2>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors flex-shrink-0"
            aria-label={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Search */}
        {showSearch && !isCollapsed && (
          <div className="p-3 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((item, idx) => {
            const icon = item.icon;
            return (
              <a
                key={item.label || idx}
                href={item.href || "#"}
                onClick={item.onClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  item.active
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {icon && (React.isValidElement(icon) ? <span className="flex-shrink-0">{icon}</span> : React.createElement(icon, { className: "h-5 w-5 flex-shrink-0" }))}
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">{item.badge}</span>
                    )}
                  </>
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        {footer && !isCollapsed && (
          <div className="p-3 border-t border-gray-200 dark:border-zinc-700 flex-shrink-0">{footer}</div>
        )}

        {/* Resize Handle */}
        {resizable && !isCollapsed && (
          <div
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors hidden sm:block"
            onMouseDown={handleMouseDown}
          />
        )}
      </aside>

      {/* Content Area */}
      {children && (
        <div className="flex-1 sm:ml-0" style={{ marginLeft: typeof window !== "undefined" && window.innerWidth >= 640 ? currentWidth : 0 }}>
          {children}
        </div>
      )}
    </>
  );
};

ResizableSidebar.displayName = "ResizableSidebar";

export { ResizableSidebar };
export default ResizableSidebar;
