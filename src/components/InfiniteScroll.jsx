import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp, Loader } from "lucide-react";

/**
 * InfiniteScroll - Scroll-triggered data loading with skeletons & scroll-to-top.
 */
/*
 * @param {Array} items - Current items to display
 * @param {Function} renderItem - (item, index) => JSX
 * @param {Function} loadMore - Async function called when user scrolls near bottom. Return false to signal "no more".
 * @param {boolean} hasMore - Whether more data is available (default true)
 * @param {boolean} loading - External loading state
 * @param {number} threshold - Pixels from bottom to trigger load (default 200)
 * @param {React.ReactNode} loader - Custom loading indicator
 * @param {React.ReactNode} endMessage - Shown when no more items
 * @param {React.ReactNode} errorMessage - Shown on error
 * @param {boolean} showScrollTop - Show scroll-to-top button (default true)
 * @param {number} scrollTopAt - Show button after scrolling this many px (default 400)
 * @param {string} className - Extra CSS on wrapper
 * @param {string} itemClassName - Extra CSS on each item wrapper
 * @param {string|number} height - Container height (e.g. 400, "50vh", "100%")
 * @param {string|number} width - Container width (e.g. "100%", 600)
 * @param {object} style - Inline styles on the container
 * @param {number} skeletonCount - Number of skeleton rows to show while loading (default 3)
 * @param {Function} renderSkeleton - Custom skeleton renderer: (index) => JSX
 * @param {Function} itemKey - (item, index) => unique key
 */
const InfiniteScroll = ({
  items = [],
  renderItem,
  loadMore,
  hasMore = true,
  loading: externalLoading,
  threshold = 200,
  loader,
  endMessage,
  errorMessage,
  showScrollTop = true,
  scrollTopAt = 400,
  className = "",
  itemClassName = "",
  height,
  width,
  style: styleProp,
  skeletonCount = 3,
  renderSkeleton,
  itemKey = (item, idx) => item?.id ?? idx,
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const sentinelRef = useRef(null);
  const containerRef = useRef(null);
  const loading = externalLoading !== undefined ? externalLoading : internalLoading;

  const triggerLoad = useCallback(async () => {
    if (loading || !hasMore) return;
    setInternalLoading(true);
    setError(false);
    try {
      await loadMore?.();
    } catch {
      setError(true);
    } finally {
      setInternalLoading(false);
    }
  }, [loading, hasMore, loadMore]);

  /* ── intersection observer for sentinel ── */
  useEffect(() => {
    if (!hasMore || loading) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          triggerLoad();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, threshold, triggerLoad]);

  /* ── scroll-to-top visibility ── */
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > scrollTopAt);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [scrollTopAt]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ── default skeleton ── */
  const defaultSkeleton = (i) => (
    <div key={i} className="flex gap-3 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-zinc-700 flex-shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${height || styleProp?.height || styleProp?.maxHeight ? 'overflow-auto' : ''} ${className}`}
      style={{
        ...(height != null ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
        ...(width != null ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
        ...styleProp,
      }}
    >
      {/* Items */}
      {items.map((item, idx) => (
        <div key={itemKey(item, idx)} className={itemClassName}>
          {renderItem(item, idx)}
        </div>
      ))}

      {/* Loading skeletons */}
      {loading && (
        loader || (
          <div className="space-y-1">
            {Array.from({ length: skeletonCount }, (_, i) =>
              renderSkeleton ? renderSkeleton(i) : defaultSkeleton(i)
            )}
          </div>
        )
      )}

      {/* Error */}
      {error && !loading && (
        <div className="py-8 text-center">
          {errorMessage || (
            <div className="space-y-2">
              <p className="text-sm text-red-500">Failed to load more items</p>
              <button
                type="button"
                onClick={triggerLoad}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}

      {/* End message */}
      {!hasMore && !loading && items.length > 0 && (
        <div className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
          {endMessage || "You've reached the end"}
        </div>
      )}

      {/* Sentinel for intersection observer */}
      {hasMore && <div ref={sentinelRef} className="h-1" />}

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95"
          style={{
            opacity: showTop ? 1 : 0,
            pointerEvents: showTop ? "auto" : "none",
            transition: "opacity .3s, transform .15s",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </div>
  );
};

InfiniteScroll.displayName = "InfiniteScroll";

export { InfiniteScroll };
export default InfiniteScroll;
