import { useState, useRef, useCallback, useMemo } from "react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * VirtualList - Efficiently renders large lists by only rendering visible items.
 */
/*
 * @param {Array} items - Full list of items
 * @param {number} itemHeight - Fixed height of each item in px
 * @param {number} height - Container height in px
 * @param {number} overscan - Number of extra items rendered above/below viewport
 * @param {Function} renderItem - Render function: (item, index, style) => JSX
 * @param {string} className - Additional CSS classes on the container
 * @param {Function} onEndReached - Callback when scrolled near the end
 * @param {number} endReachedThreshold - Px from bottom to trigger onEndReached
 * @param {boolean} showScrollbar - Show custom scrollbar styling
 */
const VirtualList = ({
  items = [],
  itemHeight = 60,
  height = 500,
  overscan = 5,
  renderItem,
  className = "",
  onEndReached,
  endReachedThreshold = 200,
  showScrollbar = true,
}) => {
  injectRuiStyles();
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const endReachedRef = useRef(false);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(height / itemHeight);

  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(items.length - 1, Math.floor(scrollTop / itemHeight) + visibleCount + overscan);
    const visible = [];
    for (let i = start; i <= end; i++) {
      visible.push({ item: items[i], index: i });
    }
    return { startIndex: start, endIndex: end, visibleItems: visible };
  }, [scrollTop, items, itemHeight, overscan, visibleCount]);

  const handleScroll = useCallback(
    (e) => {
      const st = e.target.scrollTop;
      setScrollTop(st);

      if (onEndReached) {
        const remaining = totalHeight - st - height;
        if (remaining < endReachedThreshold && !endReachedRef.current) {
          endReachedRef.current = true;
          onEndReached();
        } else if (remaining >= endReachedThreshold) {
          endReachedRef.current = false;
        }
      }
    },
    [totalHeight, height, endReachedThreshold, onEndReached]
  );

  const defaultRenderItem = useCallback(
    (item, index, style) => (
      <div
        key={index}
        style={style}
        className="flex items-center px-4 border-b border-gray-100 dark:border-zinc-700/50 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3 w-full">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {index + 1}
          </div>
          <span className="text-sm text-gray-900 dark:text-white truncate">
            {typeof item === "string" ? item : item?.label || item?.name || JSON.stringify(item)}
          </span>
        </div>
      </div>
    ),
    []
  );

  const renderer = renderItem || defaultRenderItem;

  return (
    <div className={`relative ${className}`}>
      {/* Info bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700 rounded-t-xl text-xs text-gray-500 dark:text-gray-400">
        <span>{items.length.toLocaleString()} items</span>
        <span>
          Showing {startIndex + 1}–{Math.min(endIndex + 1, items.length)}
        </span>
      </div>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`overflow-y-auto bg-white dark:bg-zinc-900 border border-t-0 border-gray-200 dark:border-zinc-700 rounded-b-xl ${
          showScrollbar ? "rui-scrollbar-thin" : "rui-scrollbar-hide"
        }`}
        style={{ height, position: "relative" }}
      >
        {/* Spacer for total scroll height */}
        <div style={{ height: totalHeight, position: "relative" }}>
          {visibleItems.map(({ item, index }) => {
            const style = {
              position: "absolute",
              top: index * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
            };
            return renderer(item, index, style);
          })}
        </div>
      </div>
    </div>
  );
};

VirtualList.displayName = "VirtualList";

export { VirtualList };
export default VirtualList;
