import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, X, Check } from "lucide-react";

/* Module-level SortIcon to avoid re-creation on every render */
const SortIcon = ({ sortKey: sk, sortDir: sd, colKey }) => {
  if (sk !== colKey) return <ChevronUp className="w-3.5 h-3.5 opacity-0 group-hover:opacity-30" />;
  return sd === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
    : <ChevronDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
};

/**
 * DataTable - Sortable, filterable, paginated table with row selection.
 */
/*
 * @param {Array} columns - Array of { key, label, sortable?, render?, width?, align? }
 * @param {Array} data - Array of row objects
 * @param {boolean} searchable - Show global search (default true)
 * @param {boolean} paginated - Enable pagination (default true)
 * @param {number} pageSize - Rows per page (default 10)
 * @param {number[]} pageSizeOptions - Dropdown options (default [5,10,20,50])
 * @param {boolean} selectable - Enable row checkboxes (default false)
 * @param {Function} onSelectionChange - Called with selected row array
 * @param {Function} onRowClick - Called when a row is clicked: (row) => void
 * @param {string} className - Extra CSS on table wrapper
 * @param {string} emptyMessage - Shown when no data
 * @param {boolean} striped - Striped rows (default true)
 * @param {boolean} hoverable - Highlight on hover (default true)
 * @param {boolean} stickyHeader - Sticky header (default true)
 * @param {Function} rowKey - Function to get unique key from row (default: row.id or index)
 */
const DataTable = ({
  columns = [],
  data = [],
  searchable = true,
  paginated = true,
  pageSize: defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  selectable = false,
  onSelectionChange,
  onRowClick,
  className = "",
  emptyMessage = "No data available",
  striped = true,
  hoverable = true,
  stickyHeader = true,
  rowKey = (row, idx) => row.id ?? idx,
}) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(defaultPageSize);
  const [selected, setSelected] = useState(new Set());

  /* ── filter ── */
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  /* ── sort ── */
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  /* ── paginate ── */
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paged = paginated ? sorted.slice(page * perPage, (page + 1) * perPage) : sorted;

  // reset page on filter change
  useEffect(() => setPage(0), [search, perPage, data]);

  /* ── sort handler ── */
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  /* ── selection ── */
  const toggleRow = useCallback(
    (key) => {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
      });
    },
    []
  );

  const toggleAll = useCallback(() => {
    if (selected.size === paged.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paged.map((r, i) => rowKey(r, i))));
    }
  }, [paged, selected, rowKey]);

  // Use ref to avoid stale callbacks in the effect
  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;

  useEffect(() => {
    const rows = data.filter((r, i) => selected.has(rowKey(r, i)));
    onSelectionChangeRef.current?.(rows);
  }, [selected, data, rowKey]);

  const alignClass = (a) => (a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left");

  return (
    <div className={`bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      {(searchable || selectable) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100 dark:border-zinc-800">
          {searchable ? (
            <div className="relative w-full sm:flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-8 py-1.5 sm:py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : <div />}
          {selectable && selected.size > 0 && (
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{selected.size} selected</span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
            <tr className="bg-gray-50 dark:bg-zinc-800/50">
              {selectable && (
                <th className="w-10 px-3 py-3">
                  <button onClick={toggleAll} className="cursor-pointer">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      selected.size > 0 && selected.size === paged.length
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 dark:border-zinc-600"
                    }`}>
                      {selected.size > 0 && selected.size === paged.length && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-2 sm:px-4 py-2 sm:py-3 font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 ${alignClass(col.align)} ${
                    col.sortable !== false ? "cursor-pointer select-none group" : ""
                  }`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && <SortIcon sortKey={sortKey} sortDir={sortDir} colKey={col.key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-16 text-center text-gray-400 dark:text-gray-500 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, ri) => {
                const key = rowKey(row, ri);
                const isSelected = selected.has(key);
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row)}
                    className={`border-t border-gray-50 dark:border-zinc-800 transition-colors ${
                      isSelected ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    } ${striped && ri % 2 === 1 && !isSelected ? "bg-gray-50/50 dark:bg-zinc-800/20" : ""} ${
                      hoverable ? "hover:bg-gray-50 dark:hover:bg-zinc-800/40" : ""
                    } ${onRowClick ? "cursor-pointer" : ""}`}
                  >
                    {selectable && (
                      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => toggleRow(key)} className="cursor-pointer">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-zinc-600"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={`px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 ${alignClass(col.align)}`}>
                        {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && sorted.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100 dark:border-zinc-800 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Rows per page:</span>
            <span className="sm:hidden">Per page:</span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="bg-transparent border border-gray-200 dark:border-zinc-700 rounded px-1 py-0.5 text-[10px] sm:text-xs cursor-pointer"
            >
              {pageSizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span>{page * perPage + 1}–{Math.min((page + 1) * perPage, sorted.length)} of {sorted.length}</span>
            {totalPages > 1 && (
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer disabled:cursor-default"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer disabled:cursor-default"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.displayName = "DataTable";

export { DataTable };
export default DataTable;
