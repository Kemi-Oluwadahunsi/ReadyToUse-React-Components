import { useState, useCallback } from "react";
import { Star } from "lucide-react";

/**
 * RatingInput - Star/emoji/custom icon rating with hover preview.
 */
/*
 * @param {number} value - Controlled rating value
 * @param {Function} onChange - (newValue) => void
 * @param {number} max - Max stars (default 5)
 * @param {boolean} allowHalf - Enable half-star precision (default false)
 * @param {boolean} readOnly - Read-only display (default false)
 * @param {string} size - "sm" | "md" | "lg" | "xl" (default "md")
 * @param {string} color - Active star color (default "#f59e0b")
 * @param {string} emptyColor - Empty star color (default "#d1d5db")
 * @param {boolean} showValue - Show numeric value (default false)
 * @param {string[]} labels - Labels for each star (e.g. ["Terrible","Bad","Ok","Good","Excellent"])
 * @param {Function} renderIcon - Custom icon: (index, { isFilled, isHalf, isHovered }) => JSX
 * @param {boolean} allowClear - Click active star to clear (default true)
 * @param {string} className - Extra CSS
 * @param {number} defaultValue - Initial value if uncontrolled
 */
const RatingInput = ({
  value: controlledValue,
  onChange,
  max = 5,
  allowHalf = false,
  readOnly = false,
  size = "md",
  color = "#f59e0b",
  emptyColor = "#d1d5db",
  showValue = false,
  labels,
  renderIcon,
  allowClear = true,
  className = "",
  defaultValue = 0,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hovered, setHovered] = useState(0);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const displayValue = hovered || currentValue;

  const handleChange = useCallback(
    (val) => {
      if (readOnly) return;
      const newVal = allowClear && val === currentValue ? 0 : val;
      if (controlledValue !== undefined) {
        onChange?.(newVal);
      } else {
        setInternalValue(newVal);
        onChange?.(newVal);
      }
    },
    [readOnly, currentValue, allowClear, controlledValue, onChange]
  );

  const handleMouse = (idx, e) => {
    if (readOnly) return;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeft = e.clientX - rect.left < rect.width / 2;
      setHovered(isLeft ? idx + 0.5 : idx + 1);
    } else {
      setHovered(idx + 1);
    }
  };

  const handleClick = (idx, e) => {
    if (readOnly) return;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const isLeft = e.clientX - rect.left < rect.width / 2;
      handleChange(isLeft ? idx + 0.5 : idx + 1);
    } else {
      handleChange(idx + 1);
    }
  };

  const sizeMap = { sm: 16, md: 24, lg: 32, xl: 40 };
  const iconSize = sizeMap[size] || sizeMap.md;

  const label = labels && displayValue > 0 ? labels[Math.ceil(displayValue) - 1] : null;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div
        className="flex items-center"
        onMouseLeave={() => !readOnly && setHovered(0)}
        style={{ gap: iconSize * 0.15 }}
      >
        {Array.from({ length: max }, (_, idx) => {
          const isFull = displayValue >= idx + 1;
          const isHalf = allowHalf && !isFull && displayValue >= idx + 0.5;
          const isHoveredStar = hovered > 0 && (hovered >= idx + 1 || (allowHalf && hovered >= idx + 0.5));

          if (renderIcon) {
            return (
              <span
                key={idx}
                onMouseMove={(e) => handleMouse(idx, e)}
                onClick={(e) => handleClick(idx, e)}
                className={readOnly ? "" : "cursor-pointer"}
              >
                {renderIcon(idx, { isFilled: isFull, isHalf, isHovered: isHoveredStar })}
              </span>
            );
          }

          return (
            <span
              key={idx}
              onMouseMove={(e) => handleMouse(idx, e)}
              onClick={(e) => handleClick(idx, e)}
              className={`relative inline-block ${readOnly ? "" : "cursor-pointer"}`}
              style={{
                width: iconSize,
                height: iconSize,
                transition: "transform .15s",
                transform: isHoveredStar ? "scale(1.15)" : "scale(1)",
              }}
            >
              {/* Empty star */}
              <Star
                style={{ width: iconSize, height: iconSize, color: emptyColor, fill: emptyColor, position: "absolute", inset: 0 }}
              />
              {/* Filled overlay */}
              {(isFull || isHalf) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? "50%" : "100%" }}
                >
                  <Star
                    style={{ width: iconSize, height: iconSize, color, fill: color }}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Numeric value */}
      {showValue && currentValue > 0 && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{currentValue}</span>
      )}

      {/* Label */}
      {label && (
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{label}</span>
      )}
    </div>
  );
};

RatingInput.displayName = "RatingInput";

export { RatingInput };
export default RatingInput;
