import { useState, useEffect, useRef, useCallback } from "react";

/**
 * AnimatedCounter - Number that animates from start to end.
 */
/*
 * @param {number} end - Target value
 * @param {number} start - Start value (default 0)
 * @param {number} duration - Animation duration ms (default 2000)
 * @param {string} easing - "linear" | "easeOut" | "easeInOut" | "spring" (default "easeOut")
 * @param {string} prefix - Text before number (e.g. "$")
 * @param {string} suffix - Text after number (e.g. "%")
 * @param {number} decimals - Decimal places (default 0)
 * @param {string} separator - Thousands separator (default ",")
 * @param {boolean} triggerOnView - Start on viewport enter (default true)
 * @param {number} delay - Delay before start ms (default 0)
 * @param {Function} formatValue - Custom format: (value) => string
 * @param {string} className - Extra CSS
 * @param {Function} onComplete - Called when animation ends
 */

const easings = {
  linear: (t) => t,
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  spring: (t) => 1 - Math.pow(Math.cos(t * Math.PI * 0.5), 3) * Math.exp(-t * 4),
};

const AnimatedCounter = ({
  end,
  start = 0,
  duration = 2000,
  easing = "easeOut",
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  triggerOnView = true,
  delay = 0,
  formatValue,
  className = "",
  onComplete,
}) => {
  const [displayValue, setDisplayValue] = useState(start);
  const [hasStarted, setHasStarted] = useState(!triggerOnView);
  const elRef = useRef(null);
  const rafRef = useRef(null);

  // IntersectionObserver to trigger on viewport enter
  useEffect(() => {
    if (!triggerOnView || !elRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(elRef.current);
    return () => obs.disconnect();
  }, [triggerOnView]);

  // Animate
  useEffect(() => {
    if (!hasStarted) return;
    const easeFn = easings[easing] || easings.easeOut;
    let startTime = null;
    let delayTimeout = null;

    const animate = () => {
      delayTimeout = setTimeout(() => {
        const tick = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeFn(progress);
          const current = start + (end - start) * eased;
          setDisplayValue(current);

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setDisplayValue(end);
            onComplete?.();
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      }, delay);
    };
    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (delayTimeout) clearTimeout(delayTimeout);
    };
  }, [hasStarted, start, end, duration, easing, delay, onComplete]);

  const formatNumber = useCallback(
    (val) => {
      if (formatValue) return formatValue(val);
      const fixed = val.toFixed(decimals);
      if (!separator) return `${prefix}${fixed}${suffix}`;
      const [intPart, decPart] = fixed.split(".");
      const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return `${prefix}${formatted}${decPart !== undefined ? `.${decPart}` : ""}${suffix}`;
    },
    [formatValue, decimals, separator, prefix, suffix]
  );

  return (
    <span ref={elRef} className={`tabular-nums ${className}`}>
      {formatNumber(displayValue)}
    </span>
  );
};

AnimatedCounter.displayName = "AnimatedCounter";

export { AnimatedCounter };
export default AnimatedCounter;
