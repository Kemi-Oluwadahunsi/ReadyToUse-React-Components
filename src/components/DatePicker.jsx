import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

const DEFAULT_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DEFAULT_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const fmt = (d, format = "yyyy-MM-dd") => {
  if (!d) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return format
    .replace("yyyy", d.getFullYear())
    .replace("MM", pad(d.getMonth() + 1))
    .replace("dd", pad(d.getDate()));
};

const isSame = (a, b) =>
  a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isBetween = (d, start, end) =>
  d && start && end && d > start && d < end;

const toMidnight = (d) => {
  if (!d) return null;
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
};

/**
 * DatePicker – Calendar dropdown with single / multiple / range selection,
 * RTL support, custom week start, unavailable dates, and date presets.
 */
/*
 * @param {Date|Date[]|{start:Date,end:Date}} value
 * @param {Function} onChange - Receives Date (single), Date[] (multiple), or {start,end} (range)
 * @param {string} mode - "single" | "multiple" | "range" (default "single")
 * @param {Date} min - Minimum selectable date
 * @param {Date} max - Maximum selectable date
 * @param {Date[]} unavailableDates - Specific dates to disable
 * @param {string} placeholder - Input placeholder
 * @param {string} format - Display format (default "yyyy-MM-dd")
 * @param {Function} disableDate - (date) => boolean to disable specific dates
 * @param {boolean} showToday - Highlight today (default true)
 * @param {boolean} rtl - Render in right-to-left direction (default false)
 * @param {number} weekStart - First day of week 0-6 (0=Sun, 1=Mon … default 0)
 * @param {string[]} dayLabels - Custom 7-char day header labels starting from Sunday
 * @param {string[]} monthLabels - Custom 12-string month names starting from January
 * @param {Array} presets - [{ label:string, value: Date|Date[]|{start,end} }]
 * @param {number} maxSelected - Max dates in multiple mode (default Infinity)
 * @param {string} className - Extra CSS on wrapper
 * @param {string} inputClassName - Extra CSS on trigger
 * @param {string} calendarClassName - Extra CSS on calendar dropdown
 */
const DatePicker = ({
  value,
  onChange,
  mode = "single",
  min,
  max,
  unavailableDates = [],
  placeholder,
  format = "yyyy-MM-dd",
  disableDate,
  showToday = true,
  rtl = false,
  weekStart = 0,
  dayLabels,
  monthLabels,
  presets = [],
  maxSelected = Infinity,
  className = "",
  inputClassName = "",
  calendarClassName = "",
}) => {
  injectRuiStyles();

  /* ── state ── */
  const [open, setOpen] = useState(false);
  const initialView =
    mode === "range"
      ? value?.start instanceof Date ? value.start : new Date()
      : mode === "multiple"
        ? Array.isArray(value) && value.length ? value[0] : new Date()
        : value instanceof Date ? value : new Date();
  const [viewDate, setViewDate] = useState(initialView);
  const [rangeStart, setRangeStart] = useState(value?.start || null);
  const [rangeEnd, setRangeEnd] = useState(value?.end || null);
  const [hoverDate, setHoverDate] = useState(null);
  const ref = useRef(null);

  /* ── labels ── */
  const DAYS = useMemo(() => {
    const base = dayLabels && dayLabels.length === 7 ? dayLabels : DEFAULT_DAYS;
    const ws = ((weekStart % 7) + 7) % 7;
    return [...base.slice(ws), ...base.slice(0, ws)];
  }, [dayLabels, weekStart]);

  const MONTHS = monthLabels && monthLabels.length === 12 ? monthLabels : DEFAULT_MONTHS;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  /* ── unavailable set (for O(1) lookup) ── */
  const unavailableSet = useMemo(() => {
    const s = new Set();
    unavailableDates.forEach((d) => {
      if (d instanceof Date) s.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    });
    return s;
  }, [unavailableDates]);

  /* ── click outside ── */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  /* ── calendar grid ── */
  const days = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const ws = ((weekStart % 7) + 7) % 7;
    let startOffset = first.getDay() - ws;
    if (startOffset < 0) startOffset += 7;

    const cells = [];
    // previous month fill
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push({ date: new Date(year, month, -i), outside: true });
    }
    // current month
    for (let i = 1; i <= last.getDate(); i++) {
      cells.push({ date: new Date(year, month, i), outside: false });
    }
    // next month fill (always fill to 42 for 6 rows)
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ date: new Date(year, month + 1, i), outside: true });
    }
    return cells;
  }, [year, month, weekStart]);

  /* ── disabled check ── */
  const isDisabled = useCallback(
    (d) => {
      if (min && d < toMidnight(min)) return true;
      if (max && d > toMidnight(max)) return true;
      if (unavailableSet.has(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)) return true;
      if (disableDate?.(d)) return true;
      return false;
    },
    [min, max, unavailableSet, disableDate],
  );

  /* ── select handler ── */
  const handleSelect = useCallback(
    (d) => {
      if (isDisabled(d)) return;

      if (mode === "multiple") {
        const current = Array.isArray(value) ? value : [];
        const idx = current.findIndex((s) => isSame(s, d));
        let next;
        if (idx >= 0) {
          next = current.filter((_, i) => i !== idx);
        } else {
          if (current.length >= maxSelected) return;
          next = [...current, d];
        }
        onChange?.(next);
      } else if (mode === "range") {
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
        // single
        onChange?.(d);
        setOpen(false);
      }
    },
    [mode, value, rangeStart, rangeEnd, onChange, isDisabled, maxSelected],
  );

  /* ── preset handler ── */
  const applyPreset = (preset) => {
    if (mode === "range" && preset.value?.start) {
      const s = toMidnight(preset.value.start);
      const e = toMidnight(preset.value.end);
      setRangeStart(s);
      setRangeEnd(e);
      onChange?.({ start: s, end: e });
      setViewDate(s);
      setOpen(false);
    } else if (mode === "multiple" && Array.isArray(preset.value)) {
      onChange?.(preset.value.map(toMidnight));
      setViewDate(toMidnight(preset.value[0]) || new Date());
      setOpen(false);
    } else if (preset.value instanceof Date) {
      const d = toMidnight(preset.value);
      onChange?.(d);
      setViewDate(d);
      setOpen(false);
    }
  };

  /* ── navigation ── */
  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  /* ── display value ── */
  const displayValue = useMemo(() => {
    if (mode === "range") {
      return rangeStart
        ? `${fmt(rangeStart, format)}${rangeEnd ? ` → ${fmt(rangeEnd, format)}` : ""}`
        : "";
    }
    if (mode === "multiple") {
      const arr = Array.isArray(value) ? value : [];
      if (arr.length === 0) return "";
      if (arr.length <= 2) return arr.map((d) => fmt(d, format)).join(", ");
      return `${arr.length} dates selected`;
    }
    return fmt(value, format);
  }, [mode, value, rangeStart, rangeEnd, format]);

  const effectiveEnd = rangeEnd || hoverDate;

  /* ── multiple-mode helpers ── */
  const isMultiSelected = useCallback(
    (d) => mode === "multiple" && Array.isArray(value) && value.some((s) => isSame(s, d)),
    [mode, value],
  );

  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;

  const hasPresets = presets.length > 0;

  return (
    <div ref={ref} dir={rtl ? "rtl" : undefined} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 cursor-pointer hover:border-gray-300 dark:hover:border-zinc-600 transition-colors ${inputClassName}`}
      >
        <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        <span
          className={`text-sm ${displayValue ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}
        >
          {displayValue ||
            placeholder ||
            (mode === "range"
              ? "Select date range"
              : mode === "multiple"
                ? "Select dates"
                : "Select a date")}
        </span>
      </div>

      {/* Calendar dropdown */}
      {open && (
        <div
          className={`absolute z-50 mt-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden ${hasPresets ? "flex flex-col sm:flex-row" : ""} ${calendarClassName}`}
          style={{ animation: "rui-dp-in .15s ease-out" }}
        >
          {/* Presets sidebar */}
          {hasPresets && (
            <div className="flex sm:flex-col gap-1.5 px-2.5 py-2.5 sm:py-4 sm:px-3 sm:border-e border-b sm:border-b-0 border-gray-100 dark:border-zinc-700 overflow-x-auto sm:overflow-x-visible sm:min-w-[130px]">
              {presets.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="whitespace-nowrap text-xs sm:text-sm text-start px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Calendar body */}
          <div className="p-2.5 sm:p-4 w-[260px] sm:w-[300px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
              >
                <PrevIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {MONTHS[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
              >
                <NextIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0 mb-1">
              {DAYS.map((d, i) => (
                <div
                  key={`${d}-${i}`}
                  className="text-center text-[11px] font-medium text-gray-400 dark:text-gray-500 py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-0">
              {days.map(({ date: d, outside }, i) => {
                const disabled = isDisabled(d);
                const selectedSingle = mode === "single" && isSame(d, value);
                const selectedMulti = isMultiSelected(d);
                const selectedRange =
                  mode === "range" && (isSame(d, rangeStart) || isSame(d, rangeEnd));
                const selected = selectedSingle || selectedMulti || selectedRange;
                const inRange =
                  mode === "range" &&
                  rangeStart &&
                  effectiveEnd &&
                  isBetween(
                    d,
                    rangeStart < effectiveEnd ? rangeStart : effectiveEnd,
                    rangeStart < effectiveEnd ? effectiveEnd : rangeStart,
                  );
                const isToday = showToday && isSame(d, today);

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(d)}
                    onMouseEnter={() =>
                      mode === "range" && rangeStart && !rangeEnd && setHoverDate(d)
                    }
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
                onClick={() => {
                  setViewDate(new Date());
                  if (mode === "single") handleSelect(today);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Today
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
export default DatePicker;
