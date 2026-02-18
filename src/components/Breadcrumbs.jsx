import { useState, useRef, useEffect, isValidElement } from "react";
import { ChevronRight, MoreHorizontal, Home } from "lucide-react";

/**
 * Breadcrumbs - Auto-collapsing breadcrumb trail with overflow dropdown.
 */
/*
 * @param {Array} items - Array of { label, href?, icon?, onClick? }
 * @param {number} maxVisible - Max items before collapsing middle (default 4)
 * @param {React.ReactNode} separator - Custom separator (default ChevronRight icon)
 * @param {boolean} showHomeIcon - Show home icon for first item (default true)
 * @param {string} className - Extra CSS
 * @param {string} itemClassName - Extra CSS on each breadcrumb item
 * @param {string} activeClassName - Extra CSS on the last (active) item
 * @param {Function} renderItem - Custom item renderer: (item, index, isLast) => JSX
 */
const Breadcrumbs = ({
  items = [],
  maxVisible = 4,
  separator,
  showHomeIcon = true,
  className = "",
  itemClassName = "",
  activeClassName = "",
  renderItem,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (items.length === 0) return null;

  const shouldCollapse = items.length > maxVisible;
  const first = items[0];
  const collapsed = shouldCollapse ? items.slice(1, items.length - (maxVisible - 2)) : [];
  const visible = shouldCollapse
    ? [first, ...items.slice(items.length - (maxVisible - 2))]
    : items;

  const Sep = () => (
    <span className="mx-1.5 text-gray-300 dark:text-zinc-600 flex-shrink-0">
      {separator || <ChevronRight className="w-3.5 h-3.5" />}
    </span>
  );

  const ItemLink = ({ item, isLast, idx }) => {
    if (renderItem) return renderItem(item, idx, isLast);

    const Icon = item.icon;
    const isFirst = idx === 0;
    const content = (
      <span className="inline-flex items-center gap-1.5">
        {isFirst && showHomeIcon && !Icon && <Home className="w-3.5 h-3.5" />}
        {Icon && (isValidElement(Icon) ? Icon : <Icon className="w-3.5 h-3.5" />)}
        <span className={isLast ? "font-medium" : ""}>{item.label}</span>
      </span>
    );

    const cls = `text-sm transition-colors ${
      isLast
        ? `text-gray-900 dark:text-white cursor-default ${activeClassName}`
        : `text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ${itemClassName}`
    }`;

    if (item.href && !isLast) {
      return <a href={item.href} className={cls}>{content}</a>;
    }
    if (item.onClick && !isLast) {
      return <button type="button" onClick={item.onClick} className={cls}>{content}</button>;
    }
    return <span className={cls} aria-current={isLast ? "page" : undefined}>{content}</span>;
  };

  return (
    <nav className={`flex items-center flex-wrap ${className}`} aria-label="Breadcrumb">
      {visible.map((item, vi) => {
        const isLast = shouldCollapse
          ? vi === visible.length - 1
          : vi === items.length - 1;
        const originalIdx = shouldCollapse
          ? (vi === 0 ? 0 : items.length - (visible.length - vi))
          : vi;

        return (
          <span key={item.label || vi} className="flex items-center">
            {vi > 0 && <Sep />}

            {/* Insert collapsed dropdown after first item */}
            {shouldCollapse && vi === 1 && (
              <>
                <div ref={dropRef} className="relative inline-flex">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    aria-label="Show more"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 py-1 min-w-[160px] bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50">
                      {collapsed.map((dItem, di) => (
                        <button
                          key={dItem.label || di}
                          type="button"
                          onClick={() => { dItem.onClick?.(); setDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                          {dItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Sep />
              </>
            )}

            <ItemLink item={item} isLast={isLast} idx={originalIdx} />
          </span>
        );
      })}
    </nav>
  );
};

Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
export default Breadcrumbs;
