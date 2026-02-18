import { useRef, useState, useEffect } from "react";

/**
 * Marquee - Auto-scrolling content strip with pause-on-hover.
 */
/*
 * @param {ReactNode} children - Content to scroll
 * @param {string} direction - "left" | "right" | "up" | "down" (default "left")
 * @param {number} speed - Pixels per second (default 50)
 * @param {boolean} pauseOnHover - Pause animation on hover (default true)
 * @param {number} gap - Gap between repeats in px (default 40)
 * @param {boolean} reverse - Reverse direction (default false)
 * @param {boolean} gradient - Show edge fade gradients (default true)
 * @param {number} gradientWidth - Gradient width in px (default 60)
 * @param {string} gradientColor - Gradient base color (default "white")
 * @param {string} className - Extra CSS
 */

const Marquee = ({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  gap = 40,
  reverse = false,
  gradient = true,
  gradientWidth = 60,
  // gradientColor - reserved for future use
  className = "",
}) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isVertical = direction === "up" || direction === "down";
  const effectiveReverse = (direction === "right" || direction === "down") ? !reverse : reverse;

  // Measure content
  useEffect(() => {
    if (!innerRef.current) return;
    const el = innerRef.current.firstElementChild;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (!el) return;
      setContentWidth(el.scrollWidth);
      setContentHeight(el.scrollHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  const size = isVertical ? contentHeight : contentWidth;
  const duration = size > 0 ? (size + gap) / speed : 10;

  const animName = isVertical ? "marquee-vertical" : "marquee-horizontal";
  const distance = size + gap;

  const gradientStyle = gradient
    ? {
        maskImage: isVertical
          ? `linear-gradient(to bottom, transparent, black ${gradientWidth}px, black calc(100% - ${gradientWidth}px), transparent)`
          : `linear-gradient(to right, transparent, black ${gradientWidth}px, black calc(100% - ${gradientWidth}px), transparent)`,
        WebkitMaskImage: isVertical
          ? `linear-gradient(to bottom, transparent, black ${gradientWidth}px, black calc(100% - ${gradientWidth}px), transparent)`
          : `linear-gradient(to right, transparent, black ${gradientWidth}px, black calc(100% - ${gradientWidth}px), transparent)`,
      }
    : {};

  const keyframesStyle = `
    @keyframes ${animName} {
      from { transform: ${isVertical ? `translateY(0)` : `translateX(0)`}; }
      to { transform: ${isVertical 
        ? `translateY(${effectiveReverse ? distance : -distance}px)` 
        : `translateX(${effectiveReverse ? distance : -distance}px)`}; }
    }
  `;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={gradientStyle}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <style>{keyframesStyle}</style>
      <div
        ref={innerRef}
        className={`flex ${isVertical ? "flex-col" : "flex-row"} w-max`}
        style={{
          animation: `${animName} ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          gap: `${gap}px`,
        }}
      >
        <div className={`flex ${isVertical ? "flex-col" : "flex-row"} shrink-0`} style={{ gap: `${gap}px` }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className={`flex ${isVertical ? "flex-col" : "flex-row"} shrink-0`} aria-hidden style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
};

Marquee.displayName = "Marquee";

export { Marquee };
export default Marquee;
