import { useState, useRef, useCallback, useEffect } from "react";

/**
 * OTPInput - One-time-password input with auto-focus advance & paste support.
 */
/*
 * @param {number} length - Number of digits (default 6)
 * @param {Function} onComplete - Called with full OTP string when all digits entered
 * @param {Function} onChange - Called on every change with current value string
 * @param {string} value - Controlled value
 * @param {boolean} autoFocus - Focus first input on mount (default true)
 * @param {boolean} masked - Show dots instead of digits (default false)
 * @param {string} type - Input type: "number" | "text" (default "number")
 * @param {boolean} disabled - Disable all inputs
 * @param {boolean} error - Show error state
 * @param {string} className - Extra CSS on wrapper
 * @param {string} inputClassName - Extra CSS on each input
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {string} placeholder - Placeholder for each input
 */
const OTPInput = ({
  length = 6,
  onComplete,
  onChange,
  value: controlledValue,
  autoFocus = true,
  masked = false,
  type = "number",
  disabled = false,
  error = false,
  className = "",
  inputClassName = "",
  size = "md",
  placeholder = "○",
}) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  // Sync controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      const arr = controlledValue.split("").slice(0, length);
      while (arr.length < length) arr.push("");
      setValues(arr);
    }
  }, [controlledValue, length]);

  const updateValues = useCallback(
    (newValues) => {
      setValues(newValues);
      const str = newValues.join("");
      onChange?.(str);
      if (str.length === length && newValues.every((v) => v !== "")) {
        onComplete?.(str);
      }
    },
    [length, onChange, onComplete]
  );

  const handleChange = (idx, e) => {
    const val = e.target.value;
    if (type === "number" && !/^\d*$/.test(val)) return;
    const char = val.slice(-1);
    const next = [...values];
    next[idx] = char;
    updateValues(next);
    if (char && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if (values[idx]) {
        const next = [...values];
        next[idx] = "";
        updateValues(next);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const next = [...values];
        next[idx - 1] = "";
        updateValues(next);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (idx, e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\s/g, "");
    if (type === "number" && !/^\d+$/.test(paste)) return;
    const chars = paste.slice(0, length - idx).split("");
    const next = [...values];
    chars.forEach((ch, i) => { if (idx + i < length) next[idx + i] = ch; });
    updateValues(next);
    const focusIdx = Math.min(idx + chars.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleFocus = (e) => e.target.select();

  const sizeStyles = {
    sm: "w-8 h-8 text-xs sm:w-9 sm:h-9 sm:text-sm",
    md: "w-10 h-10 text-base sm:w-12 sm:h-12 sm:text-lg",
    lg: "w-12 h-12 text-lg sm:w-14 sm:h-14 sm:text-xl",
  };

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2 ${className}`}>
      {values.map((val, idx) => (
        <span key={idx} className="flex items-center">
          {/* Separator dash at midpoint */}
          {idx === Math.floor(length / 2) && length > 3 && (
            <span className="mx-1 text-gray-300 dark:text-zinc-600 text-lg">—</span>
          )}
          <input
            ref={(el) => { inputRefs.current[idx] = el; }}
            type={masked ? "password" : type === "number" ? "tel" : "text"}
            inputMode={type === "number" ? "numeric" : "text"}
            pattern={type === "number" ? "[0-9]*" : undefined}
            maxLength={1}
            value={val}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus && idx === 0}
            onChange={(e) => handleChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={(e) => handlePaste(idx, e)}
            onFocus={handleFocus}
            className={`
              ${sizeStyles[size]}
              text-center font-semibold rounded-xl border-2 outline-none transition-all
              bg-white dark:bg-zinc-800 text-gray-900 dark:text-white
              placeholder-gray-300 dark:placeholder-zinc-600
              ${error
                ? "border-red-400 dark:border-red-500 focus:ring-red-500/30"
                : "border-gray-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"}
              ${inputClassName}
            `}
          />
        </span>
      ))}
    </div>
  );
};

OTPInput.displayName = "OTPInput";

export { OTPInput };
export default OTPInput;
