/**
 * Badge - Small count / status indicator that attaches to any child element.
 */
/*
 * @param {React.ReactNode} children - The element the badge is attached to
 * @param {number|string} content - Badge content (count or text). If omitted → dot mode
 * @param {string} variant - "default" | "dot" | "outline" (default auto: dot if no content)
 * @param {string} color - "red" | "blue" | "green" | "yellow" | "gray" | "purple" (default "red")
 * @param {number} max - Max count before showing `${max}+` (default 99)
 * @param {boolean} pulse - Animate with pulse (default false)
 * @param {string} position - "top-right" | "top-left" | "bottom-right" | "bottom-left" (default "top-right")
 * @param {boolean} show - Show/hide badge (default true)
 * @param {string} size - "sm" | "md" | "lg" (default "md")
 * @param {string} className - Extra CSS on badge element
 * @param {Function} onClick - Click handler on badge
 */

const colorMap = {
  red: { bg: "bg-red-500", text: "text-white", outline: "border-red-500 text-red-500", ring: "ring-red-500/40" },
  blue: { bg: "bg-blue-500", text: "text-white", outline: "border-blue-500 text-blue-500", ring: "ring-blue-500/40" },
  green: { bg: "bg-green-500", text: "text-white", outline: "border-green-500 text-green-500", ring: "ring-green-500/40" },
  yellow: { bg: "bg-yellow-500", text: "text-white", outline: "border-yellow-500 text-yellow-500", ring: "ring-yellow-500/40" },
  gray: { bg: "bg-gray-500", text: "text-white", outline: "border-gray-500 text-gray-500", ring: "ring-gray-500/40" },
  purple: { bg: "bg-purple-500", text: "text-white", outline: "border-purple-500 text-purple-500", ring: "ring-purple-500/40" },
};

const sizeMap = {
  sm: { dot: "w-2 h-2", badge: "min-w-[16px] h-4 text-[10px] px-1", font: "font-semibold" },
  md: { dot: "w-2.5 h-2.5", badge: "min-w-[20px] h-5 text-xs px-1.5", font: "font-semibold" },
  lg: { dot: "w-3 h-3", badge: "min-w-[24px] h-6 text-sm px-2", font: "font-bold" },
};

const positionMap = {
  "top-right": "top-0 right-0 -translate-y-1/2 translate-x-1/2",
  "top-left": "top-0 left-0 -translate-y-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0 translate-y-1/2 translate-x-1/2",
  "bottom-left": "bottom-0 left-0 translate-y-1/2 -translate-x-1/2",
};

const Badge = ({
  children,
  content,
  variant,
  color = "red",
  max = 99,
  pulse = false,
  position = "top-right",
  show = true,
  size = "md",
  className = "",
  onClick,
}) => {
  const isDot = variant === "dot" || (variant === undefined && content === undefined);
  const isOutline = variant === "outline";
  const c = colorMap[color] || colorMap.red;
  const s = sizeMap[size] || sizeMap.md;
  const pos = positionMap[position] || positionMap["top-right"];

  const displayContent = (() => {
    if (isDot) return null;
    if (typeof content === "number" && content > max) return `${max}+`;
    return content;
  })();

  if (!children) {
    // Standalone badge (no child)
    if (!show) return null;
    return (
      <span
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e); } } : undefined}
        className={`inline-flex items-center justify-center rounded-full ${s.font}
          ${isDot ? `${s.dot} ${c.bg}` : ""}
          ${!isDot && !isOutline ? `${s.badge} ${c.bg} ${c.text}` : ""}
          ${isOutline ? `${s.badge} bg-transparent border-2 ${c.outline}` : ""}
          ${pulse ? `animate-pulse` : ""}
          ${onClick ? "cursor-pointer" : ""}
          ${className}`}
      >
        {displayContent}
      </span>
    );
  }

  return (
    <span className="relative inline-flex">
      {children}
      {show && (
        <span
          onClick={onClick}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e); } } : undefined}
          className={`absolute z-10 ${pos} inline-flex items-center justify-center rounded-full
            ${isDot ? `${s.dot} ${c.bg}` : ""}
            ${!isDot && !isOutline ? `${s.badge} ${c.bg} ${c.text}` : ""}
            ${isOutline ? `${s.badge} bg-white dark:bg-zinc-900 border-2 ${c.outline}` : ""}
            ${pulse ? `animate-pulse ring-2 ${c.ring}` : ""}
            ${onClick ? "cursor-pointer hover:scale-110 transition-transform" : ""}
            ${className}`}
        >
          {displayContent}
        </span>
      )}
    </span>
  );
};

Badge.displayName = "Badge";

export { Badge };
export default Badge;
