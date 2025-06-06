
import { useState } from "react";

export default function CustomToggleSwitch({
  defaultChecked = false,
  onChange,
  label = "Toggle",
  disabled = false,
}) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center justify-center h-[20rem]">
        <div className="flex items-center gap-3">
          <button
            role="switch"
            aria-checked={isChecked}
            aria-label={label}
            onClick={handleToggle}
            disabled={disabled}
            className={`relative inline-flex w-44 h-21 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isChecked ? "bg-blue-600" : "bg-gray-300 dark:bg-zinc-600"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span
              className={`inline-block w-20 h-20 bg-white rounded-full shadow-lg transform transition-transform duration-300 mt-0.5 ${
                isChecked ? "translate-x-23" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        </div>
    </div>
  );
}
