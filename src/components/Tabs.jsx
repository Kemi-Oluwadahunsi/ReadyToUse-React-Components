import { useState, useRef, useEffect, useCallback, useId, isValidElement } from "react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * Tabs - Animated tab panels with sliding active indicator.
 */
/*
 * @param {Array} tabs - Array of { key, label, icon?, badge?, disabled?, content }
 * @param {string} activeKey - Controlled active tab key
 * @param {Function} onChange - Called with new tab key
 * @param {string} defaultKey - Initial tab if uncontrolled
 * @param {string} variant - "underline" | "pills" | "boxed" (default "underline")
 * @param {string} orientation - "horizontal" | "vertical" (default "horizontal")
 * @param {boolean} lazy - Only render active tab content (default false)
 * @param {boolean} animated - Animate indicator (default true)
 * @param {string} className - Extra CSS on wrapper
 * @param {string} tabsClassName - Extra CSS on the tab list
 * @param {string} panelClassName - Extra CSS on the content panels
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {boolean} fullWidth - Tabs take full width (default false)
 */
const Tabs = ({
  tabs = [],
  activeKey: controlledKey,
  onChange,
  defaultKey,
  variant = "underline",
  orientation = "horizontal",
  lazy = false,
  animated = true,
  className = "",
  tabsClassName = "",
  panelClassName = "",
  size = "md",
  fullWidth = false,
}) => {
  injectRuiStyles();
  const uid = useId();
  const [internalKey, setInternalKey] = useState(defaultKey || tabs[0]?.key || "");
  const activeKey = controlledKey !== undefined ? controlledKey : internalKey;
  const [indicator, setIndicator] = useState({ left: 0, width: 0, top: 0, height: 0 });
  const tabRefs = useRef({});
  const listRef = useRef(null);
  const [visited, setVisited] = useState(new Set([activeKey]));

  const handleChange = useCallback(
    (key) => {
      if (controlledKey !== undefined) {
        onChange?.(key);
      } else {
        setInternalKey(key);
        onChange?.(key);
      }
      setVisited((prev) => new Set([...prev, key]));
    },
    [controlledKey, onChange]
  );

  /* ── update indicator position ── */
  const updateIndicator = useCallback(() => {
    const el = tabRefs.current[activeKey];
    const list = listRef.current;
    if (!el || !list) return;

    const elRect = el.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    setIndicator({
      left: elRect.left - listRect.left + list.scrollLeft,
      width: elRect.width,
      top: elRect.top - listRect.top + list.scrollTop,
      height: elRect.height,
    });
  }, [activeKey]);

  useEffect(() => { updateIndicator(); }, [updateIndicator, tabs]);

  /* ── Recalculate indicator on resize ── */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(list);
    return () => ro.disconnect();
  }, [updateIndicator]);

  /* ── Keyboard navigation (WAI-ARIA Tabs pattern) ── */
  const enabledTabs = tabs.filter((t) => !t.disabled);
  const handleKeyDown = useCallback(
    (e) => {
      const isV = orientation === "vertical";
      const nextKey = isV ? "ArrowDown" : "ArrowRight";
      const prevKey = isV ? "ArrowUp" : "ArrowLeft";

      if (e.key !== nextKey && e.key !== prevKey && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();

      const curIdx = enabledTabs.findIndex((t) => t.key === activeKey);
      let newIdx = curIdx;

      if (e.key === nextKey) newIdx = (curIdx + 1) % enabledTabs.length;
      else if (e.key === prevKey) newIdx = (curIdx - 1 + enabledTabs.length) % enabledTabs.length;
      else if (e.key === "Home") newIdx = 0;
      else if (e.key === "End") newIdx = enabledTabs.length - 1;

      const newKey = enabledTabs[newIdx]?.key;
      if (newKey) {
        handleChange(newKey);
        tabRefs.current[newKey]?.focus();
      }
    },
    [orientation, activeKey, enabledTabs, handleChange]
  );

  const isV = orientation === "vertical";

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3",
  };

  return (
    <div className={`${isV ? "flex gap-6" : ""} ${className}`}>
      {/* Tab list */}
      <div
        ref={listRef}
        role="tablist"
        aria-orientation={isV ? "vertical" : "horizontal"}
        onKeyDown={handleKeyDown}
        className={`
          relative
          ${isV ? "flex flex-col flex-shrink-0 min-w-[160px]" : "flex overflow-x-auto"}
          ${variant === "underline" && !isV ? "border-b border-gray-200 dark:border-zinc-700" : ""}
          ${variant === "underline" && isV ? "border-r border-gray-200 dark:border-zinc-700 pr-0" : ""}
          ${variant === "pills" ? "gap-1 p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl" : ""}
          ${variant === "boxed" ? "gap-0 border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden" : ""}
          ${tabsClassName}
        `}
        style={{ scrollbarWidth: "none" }}
      >
        {/* Animated indicator */}
        {animated && variant === "underline" && (
          <div
            className="absolute bg-blue-600 dark:bg-blue-400 rounded-full"
            style={{
              transition: "all .25s cubic-bezier(.4,0,.2,1)",
              ...(isV
                ? { right: 0, width: 2, top: indicator.top, height: indicator.height }
                : { bottom: 0, height: 2, left: indicator.left, width: indicator.width }),
            }}
          />
        )}

        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              ref={(el) => { tabRefs.current[tab.key] = el; }}
              role="tab"
              id={`${uid}-tab-${tab.key}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${tab.key}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleChange(tab.key)}
              className={`
                relative inline-flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer
                ${sizeClasses[size]}
                ${fullWidth ? "flex-1 justify-center" : ""}
                ${tab.disabled ? "opacity-40 cursor-not-allowed" : ""}
                ${variant === "underline" ? (
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                ) : ""}
                ${variant === "pills" ? (
                  isActive
                    ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm rounded-lg font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg"
                ) : ""}
                ${variant === "boxed" ? (
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                ) : ""}
              `}
            >
              {Icon && (isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />)}
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                    : "bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className={`flex-1 ${!isV ? "mt-4" : ""} ${panelClassName}`}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          if (lazy && !visited.has(tab.key)) return null;
          return (
            <div
              key={tab.key}
              role="tabpanel"
              id={`${uid}-panel-${tab.key}`}
              aria-labelledby={`${uid}-tab-${tab.key}`}
              hidden={!isActive}
              style={{
                animation: isActive && animated ? "rui-tab-in .2s ease-out" : undefined,
              }}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Tabs.displayName = "Tabs";

export { Tabs };
export default Tabs;
