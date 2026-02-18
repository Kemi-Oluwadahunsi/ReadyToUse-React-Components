import { useId } from "react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * Spinner - Collection of loading animations with configurable size and color.
 */
/*
 * @param {string} variant - "ring" | "dots" | "bars" | "orbit" | "pulse" | "dual-ring" | "ripple" | "square-spin" | "gradient" (default "ring")
 * @param {number|string} size - Size in px (default 32)
 * @param {string} color - CSS color or Tailwind colour keyword (default "currentColor")
 * @param {number} speed - Animation duration in seconds (default 1)
 * @param {string} label - Accessible label (default "Loading")
 * @param {boolean} overlay - Show full-screen overlay behind spinner (default false)
 * @param {string} className - Extra CSS
 */

const Spinner = ({
  variant = "ring",
  size = 32,
  color = "currentColor",
  speed = 1,
  label = "Loading",
  overlay = false,
  className = "",
}) => {
  injectRuiStyles();
  const gradId = useId();
  const s = typeof size === "number" ? `${size}px` : size;
  const half = typeof size === "number" ? size / 2 : 16;

  const spinnerNode = (() => {
    switch (variant) {
      case "dots": {
        const dotSize = typeof size === "number" ? size * 0.25 : 8;
        return (
          <div
            className={`flex items-center gap-1 ${className}`}
            role="status"
            aria-label={label}
            style={{ height: s }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="rounded-full inline-block"
                style={{
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: color,
                  animation: `rui-bounce ${speed}s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        );
      }
      case "bars": {
        const barW = typeof size === "number" ? Math.max(3, size * 0.12) : 4;
        return (
          <div
            className={`flex items-end gap-[2px] ${className}`}
            role="status"
            aria-label={label}
            style={{ height: s }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="rounded-sm inline-block"
                style={{
                  width: barW,
                  backgroundColor: color,
                  animation: `rui-bars ${speed}s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        );
      }
      case "orbit": {
        const orbitDot = typeof size === "number" ? size * 0.2 : 6;
        return (
          <div
            className={`relative ${className}`}
            role="status"
            aria-label={label}
            style={{ width: s, height: s }}
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: orbitDot,
                  height: orbitDot,
                  backgroundColor: color,
                  top: "50%",
                  left: "50%",
                  marginTop: -orbitDot / 2,
                  marginLeft: -orbitDot / 2,
                  '--rui-orbit-r': `${half * 0.7}px`,
                  animation: `rui-orbit ${speed}s linear ${i * (speed / 2)}s infinite`,
                  opacity: i === 1 ? 0.5 : 1,
                }}
              />
            ))}
          </div>
        );
      }
      case "pulse":
        return (
          <div
            className={`rounded-full ${className}`}
            role="status"
            aria-label={label}
            style={{
              width: s,
              height: s,
              backgroundColor: color,
              opacity: 0.6,
              animation: `rui-pulse-grow ${speed}s ease-in-out infinite`,
            }}
          />
        );
      case "dual-ring": {
        const sw = typeof size === "number" ? Math.max(2, size * 0.1) : 3;
        return (
          <div
            className={`relative ${className}`}
            role="status"
            aria-label={label}
            style={{ width: s, height: s }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `${sw}px solid transparent`,
                borderTopColor: color,
                borderBottomColor: color,
                animation: `rui-dual-spin ${speed}s linear infinite`,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                inset: `${sw + 2}px`,
                border: `${sw}px solid transparent`,
                borderLeftColor: color,
                borderRightColor: color,
                opacity: 0.6,
                animation: `rui-dual-spin ${speed}s linear infinite reverse`,
              }}
            />
          </div>
        );
      }
      case "ripple":
        return (
          <div
            className={`relative ${className}`}
            role="status"
            aria-label={label}
            style={{ width: s, height: s }}
          >
            {[0, 1].map((i) => (
              <span
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${color}`,
                  animation: `rui-ripple ${speed * 1.5}s ease-out ${i * (speed * 0.75)}s infinite`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        );
      case "square-spin": {
        const sz = typeof size === "number" ? size * 0.6 : 19;
        return (
          <div
            className={`flex items-center justify-center ${className}`}
            role="status"
            aria-label={label}
            style={{ width: s, height: s }}
          >
            <div
              style={{
                width: sz,
                height: sz,
                backgroundColor: color,
                borderRadius: 3,
                animation: `rui-square-spin ${speed * 1.2}s ease-in-out infinite`,
              }}
            />
          </div>
        );
      }
      case "gradient": {
        const sw = typeof size === "number" ? Math.max(2, size * 0.1) : 3;
        const r = half - sw;
        const circ = 2 * Math.PI * r;
        return (
          <svg
            className={`${className}`}
            role="status"
            aria-label={label}
            width={s}
            height={s}
            viewBox={`0 0 ${half * 2} ${half * 2}`}
            fill="none"
            style={{ animation: `rui-dual-spin ${speed}s linear infinite` }}
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle
              cx={half}
              cy={half}
              r={r}
              stroke={`url(#${gradId})`}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
            />
          </svg>
        );
      }
      default: // ring
        return (
          <svg
            className={`animate-spin ${className}`}
            role="status"
            aria-label={label}
            width={s}
            height={s}
            viewBox={`0 0 ${half * 2} ${half * 2}`}
            fill="none"
            style={{ animationDuration: `${speed}s` }}
          >
            <circle
              cx={half}
              cy={half}
              r={half - 2}
              stroke={color}
              strokeWidth={typeof size === "number" ? Math.max(2, size * 0.1) : 3}
              strokeOpacity={0.2}
            />
            <circle
              cx={half}
              cy={half}
              r={half - 2}
              stroke={color}
              strokeWidth={typeof size === "number" ? Math.max(2, size * 0.1) : 3}
              strokeLinecap="round"
              strokeDasharray={`${(half - 2) * Math.PI * 1.4} ${(half - 2) * Math.PI * 2}`}
            />
          </svg>
        );
    }
  })();

  return (
    <>
      {overlay ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          {spinnerNode}
        </div>
      ) : (
        spinnerNode
      )}
    </>
  );
};

Spinner.displayName = "Spinner";

export { Spinner };
export default Spinner;
