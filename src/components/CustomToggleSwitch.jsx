import { useState, useCallback } from "react";

/**
 * ToggleSwitch - A polished, accessible toggle switch component.
 */
/*
 * @param {boolean} checked - Controlled checked state
 * @param {boolean} defaultChecked - Initial checked state (uncontrolled)
 * @param {Function} onChange - Callback: (checked: boolean) => void
 * @param {string} label - Label text displayed beside the toggle
 * @param {boolean} disabled - Disable the toggle
 * @param {"sm"|"md"|"lg"} size - Toggle size
 * @param {string} onColor - Tailwind bg class when on (e.g. "bg-blue-600")
 * @param {string} offColor - Tailwind bg class when off
 * @param {string} className - Additional CSS classes
 * @param {string} labelPosition - "left" | "right"
 */
const ToggleSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  onColor = "bg-blue-600",
  offColor = "bg-gray-300 dark:bg-zinc-600",
  className = "",
  labelPosition = "right",
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, isControlled, onChange]);

  const sizes = {
    sm: { track: "w-9 h-5", thumb: "w-4 h-4", translate: "translate-x-4", offset: "translate-x-0.5" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5", offset: "translate-x-0.5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7", offset: "translate-x-0.5" },
  };

  const s = sizes[size] || sizes.md;

  const toggle = (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={label || "Toggle"}
      onClick={handleToggle}
      disabled={disabled}
      className={`relative inline-flex ${s.track} rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
        isChecked ? onColor : offColor
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block ${s.thumb} bg-white rounded-full shadow-md transform transition-transform duration-300 mt-0.5 ${
          isChecked ? s.translate : s.offset
        }`}
      />
    </button>
  );

  if (!label) return <div className={className}>{toggle}</div>;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {labelPosition === "left" && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">{label}</span>
      )}
      {toggle}
      {labelPosition === "right" && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">{label}</span>
      )}
    </div>
  );
};

ToggleSwitch.displayName = "ToggleSwitch";

export { ToggleSwitch };
export default ToggleSwitch;
