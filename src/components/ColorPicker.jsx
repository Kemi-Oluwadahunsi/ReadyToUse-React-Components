import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Pipette, Copy, Check } from "lucide-react";

/**
 * ColorPicker - HSL/RGB/HEX picker with saturation pad, hue slider.
 */
/*
 * @param {string} value - Controlled hex color (e.g. "#ff0000")
 * @param {Function} onChange - (hexColor) => void
 * @param {string} defaultValue - Initial color if uncontrolled (default "#3b82f6")
 * @param {string[]} presets - Preset swatches
 * @param {boolean} showInput - Show hex input (default true)
 * @param {boolean} showPresets - Show preset swatches (default true)
 * @param {boolean} showAlpha - Show alpha slider (default false)
 * @param {string} triggerClassName - Trigger button CSS
 * @param {string} popoverClassName - Popover CSS
 * @param {boolean} inline - Show picker inline (no popover)
 * @param {string} className - Wrapper CSS
 */

/* --- Color Conversion Utilities --- */
function hexToHSL(hex) {
  let r = 0, g = 0, b = 0;
  const h6 = hex.replace("#", "");
  if (h6.length === 3) {
    r = parseInt(h6[0] + h6[0], 16);
    g = parseInt(h6[1] + h6[1], 16);
    b = parseInt(h6[2] + h6[2], 16);
  } else {
    r = parseInt(h6.substring(0, 2), 16);
    g = parseInt(h6.substring(2, 4), 16);
    b = parseInt(h6.substring(4, 6), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, sat = 0;
  const lit = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = lit > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hue = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: hue = ((b - r) / d + 2) / 6; break;
      case b: hue = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(hue * 360), s: Math.round(sat * 100), l: Math.round(lit * 100) };
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const rr = Math.round((r + m) * 255).toString(16).padStart(2, "0");
  const gg = Math.round((g + m) * 255).toString(16).padStart(2, "0");
  const bb = Math.round((b + m) * 255).toString(16).padStart(2, "0");
  return `#${rr}${gg}${bb}`;
}

function hslToRGB(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
  "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e",
  "#000000", "#6b7280", "#9ca3af", "#d1d5db", "#ffffff",
];

const ColorPicker = ({
  value: controlledValue,
  onChange,
  defaultValue = "#3b82f6",
  presets = DEFAULT_PRESETS,
  showInput = true,
  showPresets = true,
  showAlpha = false,
  triggerClassName = "",
  popoverClassName = "",
  inline = false,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [alpha, setAlpha] = useState(1);
  const [hexInput, setHexInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState({});
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const satPadRef = useRef(null);
  const hueRef = useRef(null);
  const draggingSat = useRef(false);
  const draggingHue = useRef(false);

  const currentHex = controlledValue !== undefined ? controlledValue : internalValue;
  const hsl = useMemo(() => hexToHSL(currentHex), [currentHex]);

  useEffect(() => { setHexInput(currentHex); }, [currentHex]);

  const updateColor = useCallback(
    (hex) => {
      if (controlledValue !== undefined) {
        onChange?.(hex);
      } else {
        setInternalValue(hex);
        onChange?.(hex);
      }
    },
    [controlledValue, onChange]
  );

  /* --- Saturation Pad --- */
  const handleSatPad = useCallback(
    (e) => {
      if (!satPadRef.current) return;
      const rect = satPadRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      // Convert SV (saturation-value like photoshop) to HSL
      // Saturation pad: x = saturation (0-100), y = brightness (100 top to 0 bottom)
      // We map to HSL where L = brightness(1-s/2), S is more complex
      // Simpler: use HSB to HSL conversion
      const v = 1 - y / rect.height;
      const sv = x / rect.width;
      const ll = v * (1 - sv / 2);
      const ss = ll === 0 || ll === 1 ? 0 : (v - ll) / Math.min(ll, 1 - ll);
      updateColor(hslToHex(hsl.h, Math.round(ss * 100), Math.round(ll * 100)));
    },
    [hsl.h, updateColor]
  );

  /* --- Hue Slider --- */
  const handleHue = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const h = Math.round((x / rect.width) * 360);
      updateColor(hslToHex(h, hsl.s, hsl.l));
    },
    [hsl.s, hsl.l, updateColor]
  );

  /* --- Mouse events --- */
  useEffect(() => {
    const onMove = (e) => {
      if (draggingSat.current) handleSatPad(e);
      if (draggingHue.current) {
        const el = hueRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
          const h = Math.round((x / rect.width) * 360);
          updateColor(hslToHex(h, hsl.s, hsl.l));
        }
      }
    };
    const onUp = () => { draggingSat.current = false; draggingHue.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [handleSatPad, hsl.s, hsl.l, updateColor]);

  /* --- Click outside --- */
  useEffect(() => {
    if (!isOpen || inline) return;
    const handler = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, inline]);

  /* --- Position popover --- */
  useEffect(() => {
    if (!isOpen || inline || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const goUp = rect.bottom + 320 > window.innerHeight;
    setPopoverStyle({
      position: "fixed",
      left: rect.left,
      top: goUp ? rect.top - 8 : rect.bottom + 8,
      transform: goUp ? "translateY(-100%)" : undefined,
      zIndex: 9999,
    });
  }, [isOpen, inline]);

  /* --- Compute saturation-pad cursor --- */
  // HSL -> HSB: V = L + S * min(L, 1-L), Sv = V === 0 ? 0 : 2*(1 - L/V)
  const ll = hsl.l / 100;
  const ss = hsl.s / 100;
  const v = ll + ss * Math.min(ll, 1 - ll);
  const sv = v === 0 ? 0 : 2 * (1 - ll / v);
  const cursorX = sv * 100; // percent
  const cursorY = (1 - v) * 100;

  const handleHexSubmit = () => {
    const clean = hexInput.startsWith("#") ? hexInput : `#${hexInput}`;
    if (/^#[0-9a-f]{6}$/i.test(clean)) updateColor(clean.toLowerCase());
  };

  const copyColor = () => {
    navigator.clipboard?.writeText(currentHex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const rgb = hslToRGB(hsl.h, hsl.s, hsl.l);

  const pickerContent = (
    <div
      ref={!inline ? popoverRef : undefined}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3 w-64 ${popoverClassName}`}
      style={!inline ? popoverStyle : undefined}
    >
      {/* Saturation Pad */}
      <div
        ref={satPadRef}
        className="relative w-full h-40 rounded-lg cursor-crosshair mb-3 border border-gray-200 dark:border-gray-600"
        style={{
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))`,
        }}
        onMouseDown={(e) => { draggingSat.current = true; handleSatPad(e); }}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${cursorX}%`,
            top: `${cursorY}%`,
            background: currentHex,
          }}
        />
      </div>

      {/* Hue Slider */}
      <div
        ref={hueRef}
        data-hue-slider
        className="relative w-full h-3 rounded-full cursor-pointer mb-3"
        style={{
          background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
        }}
        onMouseDown={(e) => { draggingHue.current = true; handleHue(e); }}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${(hsl.h / 360) * 100}%`,
            background: `hsl(${hsl.h}, 100%, 50%)`,
          }}
        />
      </div>

      {/* Alpha slider */}
      {showAlpha && (
        <div className="relative w-full h-3 rounded-full cursor-pointer mb-3"
          style={{
            background: `linear-gradient(to right, transparent, ${currentHex}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 8px 8px`,
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setAlpha(Math.round(((e.clientX - rect.left) / rect.width) * 100) / 100);
          }}
        >
          <div
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${alpha * 100}%`, background: currentHex }}
          />
        </div>
      )}

      {/* Color preview + Input */}
      {showInput && (
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 shrink-0"
            style={{ background: currentHex }}
          />
          <div className="flex-1 flex items-center rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-50 dark:bg-gray-700">
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              onBlur={handleHexSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleHexSubmit()}
              className="flex-1 px-2 py-1 text-sm bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 font-mono"
              maxLength={7}
            />
            <button
              onClick={copyColor}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Copy"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
      )}

      {/* RGB display */}
      <div className="flex gap-2 mb-3 text-xs text-gray-500 dark:text-gray-400">
        <span>R: {rgb.r}</span>
        <span>G: {rgb.g}</span>
        <span>B: {rgb.b}</span>
        <span className="ml-auto">H: {hsl.h}°</span>
      </div>

      {/* Presets */}
      {showPresets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((hex) => (
            <button
              key={hex}
              onClick={() => updateColor(hex)}
              className={`w-6 h-6 rounded-md border-2 transition-transform hover:scale-110 ${
                currentHex === hex ? "border-blue-500 scale-110" : "border-gray-200 dark:border-gray-600"
              }`}
              style={{ background: hex }}
              title={hex}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (inline) {
    return <div className={className}>{pickerContent}</div>;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${triggerClassName}`}
      >
        <div
          className="w-6 h-6 rounded-md border border-gray-200 dark:border-gray-600"
          style={{ background: currentHex }}
        />
        <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{currentHex}</span>
        <Pipette className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && createPortal(pickerContent, document.body)}
    </div>
  );
};

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
export default ColorPicker;
