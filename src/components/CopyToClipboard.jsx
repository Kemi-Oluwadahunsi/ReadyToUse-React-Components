import { useState, useCallback, useRef, useEffect } from "react";
import { Clipboard, Check, Copy } from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * CopyToClipboard - Click-to-copy with visual feedback.
 */
/*
 * @param {string} text - Text to copy
 * @param {ReactNode} children - Trigger element (if not using default button)
 * @param {Function} onCopy - (text, success) => void
 * @param {number} resetDelay - Feedback duration ms (default 2000)
 * @param {string} label - Button text (default "Copy")
 * @param {string} successLabel - Button text after copy (default "Copied!")
 * @param {string} variant - "button" | "icon" | "minimal" | "code" (default "button")
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {string} className - Extra CSS
 * @param {boolean} showTooltip - Show tooltip feedback (default true)
 */

const CopyToClipboard = ({
  text,
  children,
  onCopy,
  resetDelay = 2000,
  label = "Copy",
  successLabel = "Copied!",
  variant = "button",
  size = "md",
  className = "",
  showTooltip = true,
}) => {
  injectRuiStyles();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.(text, true);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      onCopy?.(text, true);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
  }, [text, onCopy, resetDelay]);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = { sm: 12, md: 16, lg: 20 };
  const iconSz = iconSizes[size] || 16;

  // If custom children - wrap them
  if (children) {
    return (
      <span className={`relative inline-flex ${className}`} onClick={handleCopy}>
        {children}
        {/* Tooltip feedback */}
        {showTooltip && copied && (
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium
              bg-green-600 text-white shadow-lg whitespace-nowrap"
            style={{
              animation: "rui-fade-in-up .2s ease-out",
            }}
          >
            {successLabel}
          </span>
        )}
      </span>
    );
  }

  // Code block variant
  if (variant === "code") {
    return (
      <div className={`relative group ${className}`}>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 pr-12 overflow-x-auto text-sm font-mono">
          <code>{text}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all
            ${copied
              ? "bg-green-500/20 text-green-400"
              : "bg-white/10 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:text-white"
            }`}
          title={copied ? successLabel : label}
        >
          {copied ? <Check style={{ width: iconSz, height: iconSz }} /> : <Copy style={{ width: iconSz, height: iconSz }} />}
        </button>
      </div>
    );
  }

  // Icon-only variant
  if (variant === "icon") {
    return (
      <button
        onClick={handleCopy}
        className={`relative inline-flex items-center justify-center rounded-lg transition-all
          ${copied
            ? "text-green-500 bg-green-50 dark:bg-green-900/20"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
          }
          ${sizeClasses[size]} ${className}`}
        title={copied ? successLabel : label}
      >
        {copied ? <Check style={{ width: iconSz, height: iconSz }} /> : <Copy style={{ width: iconSz, height: iconSz }} />}
        {showTooltip && copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs bg-gray-800 text-white shadow-lg whitespace-nowrap">
            {successLabel}
          </span>
        )}
      </button>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors ${className}`}
      >
        {copied ? <Check style={{ width: iconSz, height: iconSz }} /> : <Clipboard style={{ width: iconSz, height: iconSz }} />}
        <span className={sizeClasses[size]?.split(" ").find((c) => c.startsWith("text-")) || "text-sm"}>
          {copied ? successLabel : label}
        </span>
      </button>
    );
  }

  // Default button variant
  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center rounded-lg font-medium transition-all
        ${copied
          ? "bg-green-500 text-white shadow-green-200 dark:shadow-green-900/30"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }
        ${sizeClasses[size]} ${className}`}
    >
      {copied ? (
        <>
          <Check style={{ width: iconSz, height: iconSz }} />
          {successLabel}
        </>
      ) : (
        <>
          <Copy style={{ width: iconSz, height: iconSz }} />
          {label}
        </>
      )}
    </button>
  );
};

CopyToClipboard.displayName = "CopyToClipboard";

export { CopyToClipboard };
export default CopyToClipboard;
