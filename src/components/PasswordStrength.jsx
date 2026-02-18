/**
 * PasswordStrength - Password input with real-time strength meter and rule checklist.
 */
/*
 * @param {string} value - Controlled password value
 * @param {Function} onChange - (value: string) => void
 * @param {string} placeholder - (default "Enter password")
 * @param {boolean} showRules - Show checklist of rules (default true)
 * @param {boolean} showMeter - Show strength bar (default true)
 * @param {boolean} showToggle - Show visibility toggle (default true)
 * @param {number} minLength - Minimum length for "weak" (default 8)
 * @param {Array} customRules - [{ label, test: (pw) => bool }] to override defaults
 * @param {Function} onStrengthChange - ("empty"|"weak"|"fair"|"strong"|"very-strong") => void
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {boolean} disabled - (default false)
 * @param {string} className - Extra CSS
 */
import { useState, useMemo, useEffect, useRef } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

const defaultRules = (minLen) => [
  { label: `At least ${minLen} characters`, test: (pw) => pw.length >= minLen },
  { label: "Uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { label: "Number", test: (pw) => /\d/.test(pw) },
  { label: "Special character (!@#$…)", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const strengthLevels = [
  { key: "empty", label: "", color: "", width: "0%" },
  { key: "weak", label: "Weak", color: "bg-red-500", width: "25%" },
  { key: "fair", label: "Fair", color: "bg-orange-500", width: "50%" },
  { key: "strong", label: "Strong", color: "bg-yellow-500", width: "75%" },
  { key: "very-strong", label: "Very strong", color: "bg-green-500", width: "100%" },
];

const inputSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-2.5 text-base",
};

const PasswordStrength = ({
  value = "",
  onChange,
  placeholder = "Enter password",
  showRules = true,
  showMeter = true,
  showToggle = true,
  minLength = 8,
  customRules,
  onStrengthChange,
  size = "md",
  disabled = false,
  className = "",
}) => {
  const [visible, setVisible] = useState(false);
  const rules = customRules || defaultRules(minLength);
  const onStrengthChangeRef = useRef(onStrengthChange);
  onStrengthChangeRef.current = onStrengthChange;

  const { strength, passed } = useMemo(() => {
    if (!value) return { strength: 0, passed: [] };
    const p = rules.map((r) => r.test(value));
    const count = p.filter(Boolean).length;
    const ratio = count / rules.length;
    let s = 1;
    if (ratio >= 0.4) s = 2;
    if (ratio >= 0.7) s = 3;
    if (ratio >= 1) s = 4;
    return { strength: s, passed: p };
  }, [value, rules]);

  useEffect(() => {
    onStrengthChangeRef.current?.(strengthLevels[strength].key);
  }, [strength]);

  const lvl = strengthLevels[strength];

  return (
    <div className={`w-full ${className}`}>
      {/* Input */}
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${inputSizes[size]} bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${showToggle ? "pr-10" : ""}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Strength meter */}
      {showMeter && value && (
        <div className="mt-2">
          <div className="h-1.5 w-full bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${lvl.color} rounded-full transition-all duration-300`}
              style={{ width: lvl.width }}
            />
          </div>
          <p className={`mt-1 text-xs font-medium ${
            strength === 1 ? "text-red-500" :
            strength === 2 ? "text-orange-500" :
            strength === 3 ? "text-yellow-600 dark:text-yellow-400" :
            strength === 4 ? "text-green-600 dark:text-green-400" :
            "text-gray-400"
          }`}>
            {lvl.label}
          </p>
        </div>
      )}

      {/* Rules checklist */}
      {showRules && value && (
        <ul className="mt-3 space-y-1">
          {rules.map((rule, i) => {
            const ok = passed[i];
            return (
              <li key={i} className="flex items-center gap-2 text-xs">
                {ok ? (
                  <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                )}
                <span className={ok ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                  {rule.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

PasswordStrength.displayName = "PasswordStrength";

export { PasswordStrength };
export default PasswordStrength;
