import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Internal lightweight animation utilities for ReadyUI components.
 * Replaces framer-motion with zero external dependencies.
 */

// ─── useAnimate ──────────────────────────────────────────────────
// Animates a numeric value with CSS-transition-like easing.
// Returns [ref, { start, stop, value }]
export function useAnimate(initialValue = 0) {
  const [value, setValue] = useState(initialValue);
  const raf = useRef(null);
  const valueRef = useRef(initialValue);

  // Keep ref in sync
  useEffect(() => { valueRef.current = value; }, [value]);

  const start = useCallback((to, { duration = 300, easing = "ease-out" } = {}) => {
    return new Promise((resolve) => {
      const from = valueRef.current;
      const startTime = performance.now();
      const easeFn = EASING[easing] || EASING["ease-out"];

      const tick = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = easeFn(t);
        const newVal = from + (to - from) * easedT;
        setValue(newVal);
        valueRef.current = newVal;
        if (t < 1) {
          raf.current = requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(tick);
    });
  }, []); // no deps — uses valueRef instead of value

  const stop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { value, start, stop };
}

// ─── useTransition ───────────────────────────────────────────────
// Manages enter/exit state for a boolean trigger, providing
// CSS class names and mounted state for smooth transitions.
export function useTransition(isOpen, { duration = 200 } = {}) {
  const [mounted, setMounted] = useState(isOpen);
  const [stage, setStage] = useState(isOpen ? "entered" : "exited"); // "entering" | "entered" | "exiting" | "exited"

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setStage("entering");
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setStage("entered"));
      });
      return () => cancelAnimationFrame(id);
    } else {
      setStage("exiting");
      const timer = setTimeout(() => {
        setMounted(false);
        setStage("exited");
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  return { mounted, stage, isEntering: stage === "entering" || stage === "entered", isVisible: stage === "entered" };
}

// ─── useAnimatedList ─────────────────────────────────────────────
// Tracks items entering/exiting a list for staggered animations.
// Returns items with an `_animState` field: "entering" | "present" | "exiting"
export function useAnimatedList(items, { key = "id", duration = 300 } = {}) {
  const [displayItems, setDisplayItems] = useState([]);
  const prevKeys = useRef(new Set());
  const timeouts = useRef(new Map());

  useEffect(() => {
    const currentKeys = new Set(items.map((i) => i[key]));
    const entering = items.filter((i) => !prevKeys.current.has(i[key]));
    const exiting = [...prevKeys.current].filter((k) => !currentKeys.has(k));

    // Clear old exit timers for items that are re-entering
    entering.forEach((i) => {
      if (timeouts.current.has(i[key])) {
        clearTimeout(timeouts.current.get(i[key]));
        timeouts.current.delete(i[key]);
      }
    });

    // Build new list with animation states
    const newItems = items.map((i) => ({
      ...i,
      _animState: entering.some((e) => e[key] === i[key]) ? "entering" : "present",
    }));

    // Add exiting items — use functional setState to read current displayItems
    setDisplayItems((prev) => {
      const exitItems = prev
        .filter((d) => exiting.includes(d[key]))
        .map((d) => ({ ...d, _animState: "exiting" }));
      return [...newItems, ...exitItems];
    });

    // Promote entering → present
    if (entering.length > 0) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisplayItems((prev) =>
            prev.map((i) => (i._animState === "entering" ? { ...i, _animState: "present" } : i))
          );
        });
      });
    }

    // Remove exiting after duration
    exiting.forEach((k) => {
      const timer = setTimeout(() => {
        setDisplayItems((prev) => prev.filter((i) => i[key] !== k || i._animState !== "exiting"));
        timeouts.current.delete(k);
      }, duration);
      timeouts.current.set(k, timer);
    });

    prevKeys.current = currentKeys;
  }, [items, key, duration]);

  // Clean up timers only on unmount
  useEffect(() => {
    const timers = timeouts.current;
    return () => { timers.forEach((t) => clearTimeout(t)); };
  }, []);

  return displayItems;
}

// ─── useScrollState ──────────────────────────────────────────────
// Returns detailed scroll information for building scroll-aware UIs.
export function useScrollState({ threshold = 10 } = {}) {
  const [state, setState] = useState({
    y: 0,
    direction: "up",    // "up" | "down"
    isScrolled: false,
    atTop: true,
  });
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setState({
        y,
        direction: y > lastY.current ? "down" : "up",
        isScrolled: y > threshold,
        atTop: y < 5,
      });
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}

// ─── Easing functions ────────────────────────────────────────────
const EASING = {
  linear: (t) => t,
  "ease-in": (t) => t * t,
  "ease-out": (t) => t * (2 - t),
  "ease-in-out": (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  spring: (t) => 1 - Math.cos(t * Math.PI * 0.5) * Math.exp(-6 * t),
};

// ─── CSS transition helpers ──────────────────────────────────────
// Generate inline styles for common animation patterns.
export const animStyles = {
  fadeIn: (isVisible, duration = 300) => ({
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease-out`,
  }),
  fadeScale: (isVisible, duration = 300) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.92)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  }),
  slideDown: (isVisible, duration = 300) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-10px)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  }),
  slideUp: (isVisible, duration = 300) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(10px)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  }),
};

export default { useAnimate, useTransition, useAnimatedList, useScrollState, animStyles };
