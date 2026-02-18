import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const fmt = (d, format = "yyyy-MM-dd") => {
  if (!d) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return format
    .replace("yyyy", d.getFullYear())
    .replace("MM", pad(d.getMonth() + 1))
    .replace("dd", pad(d.getDate()));
};

const isSame = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const isBetween = (d, start, end) => d && start && end && d > start && d < end;

/**
 * DatePicker - Calendar dropdown with single/range selection.
 */
/*
 * @param {Date} value - Selected date (single mode)
 * @param {Function} onChange - Called with Date (single) or { start, end } (range)
 * @param {string} mode - "single" | "range" (default "single")
 * @param {Date} min - Minimum selectable date
 * @param {Date} max - Maximum selectable date
 * @param {string} placeholder - Input placeholder
 * @param {string} format - Display format (default "yyyy-MM-dd")
 * @param {Function} disableDate - (date) => boolean to disable specific dates
 * @param {boolean} showToday - Highlight today (default true)
 * @param {string} className - Extra CSS
 * @param {string} inputClassName - Extra CSS on input
 * @param {string} calendarClassName - Extra CSS on calendar dropdown
 */
const DatePicker = ({
  value,
  onChange,
  mode = "single",
  min,
  max,
  placeholder,
  format = "yyyy-MM-dd",
  disableDate,
  showToday = true,
  className = "",
  inputClassName = "",
  calendarClassName = "",
}) => {
  injectRuiStyles();
  const [open, setOpen] = useState(false);
  const initialView = mode === "range"
    ? (value?.start instanceof Date ? value.start : new Date())
    : (value instanceof Date ? value : new Date());
  const [viewDate, setViewDate] = useState(initialView);
  const [rangeStart, setRangeStart] = useState(value?.start || null);
  const [rangeEnd, setRangeEnd] = useState(value?.end || null);
  const [hoverDate, setHoverDate] = useState(null);
  const ref = useRef(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const days = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDay = first.getDay();
    const cells = [];
    // previous month fill
    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      cells.push({ date: d, outside: true });
    }
    // current month
    for (let i = 1; i <= last.getDate(); i++) {
      cells.push({ date: new Date(year, month, i), outside: false });
    }
    // next month fill
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ date: new Date(year, month + 1, i), outside: true });
    }
    return cells;
  }, [year, month]);

  const isDisabled = (d) => {
    if (min && d < min) return true;
    if (max && d > max) return true;
    if (disableDate?.(d)) return true;
    return false;
  };

  const handleSelect = useCallback(
    (d) => {
      if (isDisabled(d)) return;
      if (mode === "range") {
        if (!rangeStart || rangeEnd) {
          setRangeStart(d);
          setRangeEnd(null);
        } else {
          const [s, e] = d < rangeStart ? [d, rangeStart] : [rangeStart, d];
          setRangeStart(s);
          setRangeEnd(e);
          onChange?.({ start: s, end: e });
          setOpen(false);
        }
      } else {
        onChange?.(d);
        setOpen(false);
      }
    },
    [mode, rangeStart, rangeEnd, onChange] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const displayValue = mode === "range"
    ? rangeStart ? `${fmt(rangeStart, format)}${rangeEnd ? ` → ${fmt(rangeEnd, format)}` : ""}` : ""
    : fmt(value, format);

  const effectiveEnd = rangeEnd || hoverDate;

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Input */}
      <div
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 cursor-pointer hover:border-gray-300 dark:hover:border-zinc-600 transition-colors ${inputClassName}`}
      >
        <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        <span className={`text-sm ${displayValue ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
          {displayValue || placeholder || (mode === "range" ? "Select date range" : "Select a date")}
        </span>
      </div>

      {/* Calendar dropdown */}
      {open && (
        <div
          className={`absolute z-50 mt-2 p-2.5 sm:p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-2xl w-[260px] sm:w-[300px] ${calendarClassName}`}
          style={{ animation: "rui-dp-in .15s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {MONTHS[month]} {year}
            </span>
            <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-0 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[11px] font-medium text-gray-400 dark:text-gray-500 py-1">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0">
            {days.map(({ date: d, outside }, i) => {
              const disabled = isDisabled(d);
              const selected = mode === "single"
                ? isSame(d, value)
                : isSame(d, rangeStart) || isSame(d, rangeEnd);
              const inRange = mode === "range" && rangeStart && effectiveEnd && isBetween(d, rangeStart < effectiveEnd ? rangeStart : effectiveEnd, rangeStart < effectiveEnd ? effectiveEnd : rangeStart);
              const isToday = showToday && isSame(d, today);

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(d)}
                  onMouseEnter={() => mode === "range" && rangeStart && !rangeEnd && setHoverDate(d)}
                  disabled={disabled}
                  className={`
                    relative w-full aspect-square flex items-center justify-center text-xs sm:text-sm rounded-lg transition-colors cursor-pointer
                    ${outside ? "text-gray-300 dark:text-zinc-600" : ""}
                    ${disabled ? "opacity-30 cursor-not-allowed" : ""}
                    ${selected ? "bg-blue-600 text-white font-semibold" : ""}
                    ${inRange && !selected ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : ""}
                    ${!selected && !inRange && !outside && !disabled ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700" : ""}
                  `}
                >
                  {d.getDate()}
                  {isToday && !selected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Today button */}
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-700 flex justify-center">
            <button
              type="button"
              onClick={() => { setViewDate(new Date()); if (mode === "single") handleSelect(today); }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
export default DatePicker;
