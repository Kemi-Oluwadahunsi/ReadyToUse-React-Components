/**
 * Pagination - Numbered page navigation with ellipsis, page-size selector, jump-to.
 */
/*
 * @param {number} currentPage - Current active page (1-based)
 * @param {number} totalPages - Total number of pages
 * @param {Function} onPageChange - (page: number) => void
 * @param {number} siblingCount - Pages shown around current (default 1)
 * @param {boolean} showFirstLast - Show first/last page buttons (default true)
 * @param {boolean} showPrevNext - Show prev/next arrows (default true)
 * @param {boolean} showPageSize - Show page-size dropdown (default false)
 * @param {Array} pageSizeOptions - [10, 20, 50, 100] (default)
 * @param {number} pageSize - Current page size
 * @param {Function} onPageSizeChange - (size: number) => void
 * @param {boolean} showJumpTo - Show "Go to page" input (default false)
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {string} variant - "default" | "outline" | "minimal" (default "default")
 * @param {boolean} disabled - (default false)
 * @param {string} className - Extra CSS
 */
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const sizeMap = {
  sm: { btn: "h-7 min-w-[28px] text-xs px-1.5", text: "text-xs" },
  md: { btn: "h-9 min-w-[36px] text-sm px-2", text: "text-sm" },
  lg: { btn: "h-11 min-w-[44px] text-base px-3", text: "text-base" },
};

function buildRange(currentPage, totalPages, siblingCount) {
  const totalNumbers = siblingCount * 2 + 5; // first + last + current + 2 siblings + 2 ellipsis
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const pages = [1];
  if (showLeftDots) pages.push("...");
  for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
  if (showRightDots) pages.push("...");
  pages.push(totalPages);

  return pages;
}

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  showPageSize = false,
  pageSizeOptions = [10, 20, 50, 100],
  pageSize,
  onPageSizeChange,
  showJumpTo = false,
  size = "md",
  variant = "default",
  disabled = false,
  className = "",
}) => {
  const [jumpVal, setJumpVal] = useState("");
  const sz = sizeMap[size];

  const pages = useMemo(
    () => buildRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );

  const go = (p) => {
    if (p < 1 || p > totalPages || p === currentPage || disabled) return;
    onPageChange?.(p);
  };

  const handleJump = (e) => {
    e.preventDefault();
    const p = parseInt(jumpVal, 10);
    if (!isNaN(p)) go(p);
    setJumpVal("");
  };

  const baseBtnClass = (active) => {
    const base = `${sz.btn} rounded-lg font-medium inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`;
    if (disabled) return `${base} opacity-50 cursor-not-allowed`;
    if (active) {
      if (variant === "outline") return `${base} border-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent`;
      if (variant === "minimal") return `${base} text-blue-600 dark:text-blue-400 font-bold bg-transparent`;
      return `${base} bg-blue-600 text-white shadow-sm`;
    }
    if (variant === "outline") return `${base} border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800`;
    if (variant === "minimal") return `${base} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white`;
    return `${base} bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700`;
  };

  const navBtn = `${sz.btn} rounded-lg inline-flex items-center justify-center transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Page size selector */}
      {showPageSize && (
        <div className="flex items-center gap-1.5 mr-2">
          <span className={`${sz.text} text-gray-500 dark:text-gray-400`}>Show</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            disabled={disabled}
            className={`${sz.btn} bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-300 outline-none`}
          >
            {pageSizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}

      {/* Navigation buttons */}
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {showFirstLast && (
          <button type="button" className={navBtn} onClick={() => go(1)} disabled={disabled || currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </button>
        )}
        {showPrevNext && (
          <button type="button" className={navBtn} onClick={() => go(currentPage - 1)} disabled={disabled || currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className={`${sz.btn} inline-flex items-center justify-center text-gray-400`}>…</span>
          ) : (
            <button
              key={p}
              type="button"
              className={baseBtnClass(p === currentPage)}
              onClick={() => go(p)}
              disabled={disabled}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}

        {showPrevNext && (
          <button type="button" className={navBtn} onClick={() => go(currentPage + 1)} disabled={disabled || currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        {showFirstLast && (
          <button type="button" className={navBtn} onClick={() => go(totalPages)} disabled={disabled || currentPage === totalPages}>
            <ChevronsRight className="h-4 w-4" />
          </button>
        )}
      </nav>

      {/* Jump to page */}
      {showJumpTo && (
        <form onSubmit={handleJump} className="flex items-center gap-1.5 ml-2">
          <span className={`${sz.text} text-gray-500 dark:text-gray-400`}>Go to</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpVal}
            onChange={(e) => setJumpVal(e.target.value)}
            disabled={disabled}
            className={`${sz.btn} w-16 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-center text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </form>
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";

export { Pagination };
export default Pagination;
