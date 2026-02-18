import { Sun, Moon, Monitor } from "lucide-react";

/**
 * DarkModeToggle - A theme toggle button supporting light, dark, and system modes.
 */
/*
 * @param {string} mode - Current mode: "light" | "dark" | "system"
 * @param {Function} onChange - Callback: (mode: string) => void
 * @param {string} variant - "icon" | "switch" | "segmented"
 * @param {string} size - "sm" | "md" | "lg"
 * @param {string} className - Additional CSS classes
 * @param {boolean} showSystem - Whether to include system option
 */
const DarkModeToggle = ({
  mode = "light",
  onChange,
  variant = "segmented",
  size = "md",
  className = "",
  showSystem = true,
}) => {
  const sizes = {
    sm: { icon: "h-3.5 w-3.5", padding: "px-2 py-1", text: "text-xs" },
    md: { icon: "h-4 w-4", padding: "px-3 py-1.5", text: "text-sm" },
    lg: { icon: "h-5 w-5", padding: "px-4 py-2", text: "text-base" },
  };

  const s = sizes[size] || sizes.md;

  const options = [
    { key: "light", icon: Sun, label: "Light" },
    { key: "dark", icon: Moon, label: "Dark" },
    ...(showSystem ? [{ key: "system", icon: Monitor, label: "System" }] : []),
  ];

  if (variant === "icon") {
    const next = mode === "light" ? "dark" : mode === "dark" ? (showSystem ? "system" : "light") : "light";
    const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;
    return (
      <button
        onClick={() => onChange?.(next)}
        className={`p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 transition-all ${className}`}
        aria-label={`Switch to ${next} mode`}
      >
        <Icon className={s.icon} />
      </button>
    );
  }

  if (variant === "switch") {
    const isDark = mode === "dark";
    return (
      <button
        onClick={() => onChange?.(isDark ? "light" : "dark")}
        className={`relative inline-flex items-center ${
          size === "sm" ? "h-6 w-11" : size === "lg" ? "h-8 w-14" : "h-7 w-12"
        } rounded-full transition-colors ${
          isDark ? "bg-blue-600" : "bg-gray-300 dark:bg-zinc-600"
        } ${className}`}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <span
          className={`inline-flex items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
            size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
          } ${
            isDark
              ? size === "sm" ? "translate-x-6" : size === "lg" ? "translate-x-7" : "translate-x-6"
              : "translate-x-1"
          }`}
        >
          {isDark ? (
            <Moon className="h-3 w-3 text-blue-600" />
          ) : (
            <Sun className="h-3 w-3 text-amber-500" />
          )}
        </span>
      </button>
    );
  }

  // Segmented control (default)
  return (
    <div className={`inline-flex items-center bg-gray-100 dark:bg-zinc-800 rounded-xl p-1 gap-0.5 ${className}`}>
      {options.map(({ key, icon: Icon, label }) => ( // eslint-disable-line no-unused-vars
        <button
          key={key}
          onClick={() => onChange?.(key)}
          className={`flex items-center gap-1.5 ${s.padding} ${s.text} rounded-lg font-medium transition-all ${
            mode === key
              ? "bg-white dark:bg-zinc-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          aria-label={`${label} mode`}
        >
          <Icon className={s.icon} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

DarkModeToggle.displayName = "DarkModeToggle";

export { DarkModeToggle };
export default DarkModeToggle;
