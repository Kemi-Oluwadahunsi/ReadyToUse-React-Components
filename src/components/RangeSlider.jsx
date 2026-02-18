/**
 * RangeSlider - Draggable track with single or dual handles, step snapping, labels.
 */
/*
 * @param {number} min - Minimum value (default 0)
 * @param {number} max - Maximum value (default 100)
 * @param {number} step - Step increment (default 1)
 * @param {number|Array} value - Single number or [low, high] for range mode
 * @param {Function} onChange - (value) => void
 * @param {boolean} range - Dual-handle mode (default false)
 * @param {boolean} showTooltip - Show value tooltips on drag (default true)
 * @param {boolean} showLabels - Show min/max labels (default false)
 * @param {boolean} showValue - Show value below track (default false)
 * @param {number} minGap - Min gap between handles in range mode (default step)
 * @param {boolean} disabled - (default false)
 * @param {string} color - Tailwind color name (default "blue")
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {Function} formatValue - (v) => string for display
 * @param {string} className - Extra CSS
 */
import { useState, useRef, useCallback, useEffect } from "react";

const trackSizes = { sm: "h-1", md: "h-2", lg: "h-3" };
const thumbSizes = { sm: 14, md: 20, lg: 26 };

/* Module-level Thumb to avoid re-creation each render */
const Thumb = ({ val, handleIdx, dragging, hovered, disabled, pct, thumbSize, sc, startDrag, setHovered, showTooltip, formatValue }) => {
  const isActive = dragging === handleIdx || hovered === handleIdx;
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 z-10 ${disabled ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"}`}
      style={{ left: `${pct(val)}%`, marginLeft: -thumbSize / 2 }}
      onMouseDown={startDrag(handleIdx)}
      onTouchStart={startDrag(handleIdx)}
      onMouseEnter={() => setHovered(handleIdx)}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className={`rounded-full ${sc.bg} border-2 border-white dark:border-zinc-900 shadow-md transition-transform ${isActive ? "scale-125" : ""}`}
        style={{ width: thumbSize, height: thumbSize }}
      />
      {showTooltip && isActive && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 rounded-md bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium whitespace-nowrap">
          {formatValue(val)}
        </div>
      )}
    </div>
  );
};

/* Dynamic Tailwind color lookup — JIT can't resolve interpolated class names */
const sliderColorMap = {
  blue:   { bg: "bg-blue-500",   ring: "ring-blue-500/30" },
  indigo: { bg: "bg-indigo-500", ring: "ring-indigo-500/30" },
  purple: { bg: "bg-purple-500", ring: "ring-purple-500/30" },
  green:  { bg: "bg-green-500",  ring: "ring-green-500/30" },
  red:    { bg: "bg-red-500",    ring: "ring-red-500/30" },
  amber:  { bg: "bg-amber-500",  ring: "ring-amber-500/30" },
  teal:   { bg: "bg-teal-500",   ring: "ring-teal-500/30" },
  pink:   { bg: "bg-pink-500",   ring: "ring-pink-500/30" },
  gray:   { bg: "bg-gray-500",   ring: "ring-gray-500/30" },
};

const RangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  range = false,
  showTooltip = true,
  showLabels = false,
  showValue = false,
  minGap,
  disabled = false,
  color = "blue",
  size = "md",
  formatValue = (v) => v,
  className = "",
}) => {
  const gap = minGap !== undefined ? minGap : step;
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(null); // null | 0 | 1
  const [hovered, setHovered] = useState(null);
  const sc = sliderColorMap[color] || sliderColorMap.blue;

  const low = range ? (Array.isArray(value) ? value[0] : min) : (value ?? min);
  const high = range ? (Array.isArray(value) ? value[1] : max) : max;

  const snap = (v) => {
    const snapped = Math.round((v - min) / step) * step + min;
    return Math.max(min, Math.min(max, snapped));
  };

  const pct = (v) => ((v - min) / (max - min)) * 100;

  const getValueFromEvent = useCallback(
    (clientX) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return snap(min + ratio * (max - min));
    },
    [min, max, step] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const emitChange = useCallback(
    (newLow, newHigh) => {
      if (range) {
        onChange?.([newLow, newHigh]);
      } else {
        onChange?.(newLow);
      }
    },
    [range, onChange]
  );

  const handleMove = useCallback(
    (clientX) => {
      const v = getValueFromEvent(clientX);
      if (!range) {
        emitChange(v, high);
        return;
      }
      if (dragging === 0) {
        emitChange(Math.min(v, high - gap), high);
      } else if (dragging === 1) {
        emitChange(low, Math.max(v, low + gap));
      }
    },
    [range, dragging, low, high, gap, getValueFromEvent, emitChange]
  );

  // Mouse / touch handlers
  useEffect(() => {
    if (dragging === null) return;
    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      handleMove(cx);
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, handleMove]);

  const startDrag = (handle) => (e) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(handle);
  };

  const handleTrackClick = (e) => {
    if (disabled) return;
    const v = getValueFromEvent(e.clientX);
    if (!range) {
      emitChange(v, high);
      return;
    }
    // Click closer handle
    const distLow = Math.abs(v - low);
    const distHigh = Math.abs(v - high);
    if (distLow <= distHigh) {
      emitChange(Math.min(v, high - gap), high);
    } else {
      emitChange(low, Math.max(v, low + gap));
    }
  };

  const thumbSize = thumbSizes[size];
  const thumbProps = { dragging, hovered, disabled, pct, thumbSize, sc, startDrag, setHovered, showTooltip, formatValue };

  return (
    <div className={`w-full ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}>
      {showLabels && (
        <div className="flex justify-between mb-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
      <div
        ref={trackRef}
        className={`relative w-full ${trackSizes[size]} bg-gray-200 dark:bg-zinc-700 rounded-full cursor-pointer select-none`}
        onClick={handleTrackClick}
      >
        {/* Filled track */}
        <div
          className={`absolute ${trackSizes[size]} ${sc.bg} rounded-full`}
          style={{
            left: range ? `${pct(low)}%` : "0%",
            right: range ? `${100 - pct(high)}%` : `${100 - pct(low)}%`,
          }}
        />
        <Thumb val={low} handleIdx={0} {...thumbProps} />
        {range && <Thumb val={high} handleIdx={1} {...thumbProps} />}
      </div>
      {showValue && (
        <div className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
          {range ? `${formatValue(low)} – ${formatValue(high)}` : formatValue(low)}
        </div>
      )}
    </div>
  );
};

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
export default RangeSlider;
