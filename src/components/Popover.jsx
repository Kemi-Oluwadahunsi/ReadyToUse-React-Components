/**
 * Popover - Click or hover-triggered floating content panel with arrow and placement.
 */
/*
 * @param {React.ReactNode} trigger - The element that opens the popover
 * @param {React.ReactNode} children - Popover content
 * @param {string} triggerMode - "click" | "hover" (default "click")
 * @param {number} hoverDelay - Delay in ms before showing on hover (default 150)
 * @param {number} hoverCloseDelay - Delay in ms before hiding on hover leave (default 300)
 * @param {string} placement - "top" | "bottom" | "left" | "right" (default "bottom")
 * @param {string} align - "start" | "center" | "end" (default "center")
 * @param {boolean} showArrow - Show arrow pointer (default true)
 * @param {boolean} closeOnClickOutside - (default true)
 * @param {boolean} closeOnEsc - (default true)
 * @param {number} offset - Distance from trigger in px (default 8)
 * @param {boolean} open - Controlled open state (optional)
 * @param {Function} onOpenChange - (open: boolean) => void
 * @param {string} className - Extra CSS on content panel
 */
import { useState, useRef, useEffect, useCallback } from "react";

const Popover = ({
  trigger,
  children,
  triggerMode = "click",
  hoverDelay = 150,
  hoverCloseDelay = 300,
  placement = "bottom",
  align = "center",
  showArrow = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  offset = 8,
  open: controlledOpen,
  onOpenChange,
  className = "",
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const hoverTimerRef = useRef(null);

  const openPopover = useCallback(() => {
    if (!isControlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isOpen, isControlled, onOpenChange]);

  const close = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    if (triggerMode !== "hover") return;
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(openPopover, hoverDelay);
  }, [triggerMode, hoverDelay, openPopover]);

  const handleMouseLeave = useCallback(() => {
    if (triggerMode !== "hover") return;
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(close, hoverCloseDelay);
  }, [triggerMode, hoverCloseDelay, close]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearTimeout(hoverTimerRef.current);
  }, []);

  // Position calculation
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const tr = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = 0;
    let left = 0;

    if (placement === "bottom") {
      top = tr.bottom + offset;
      left = align === "start" ? tr.left : align === "end" ? tr.right : tr.left + tr.width / 2;
    } else if (placement === "top") {
      top = tr.top - offset;
      left = align === "start" ? tr.left : align === "end" ? tr.right : tr.left + tr.width / 2;
    } else if (placement === "left") {
      top = tr.top + tr.height / 2;
      left = tr.left - offset;
    } else {
      top = tr.top + tr.height / 2;
      left = tr.right + offset;
    }

    // Clamp
    top = Math.max(8, Math.min(top, vh - 8));
    left = Math.max(8, Math.min(left, vw - 8));

    setPos({ top, left });
  }, [isOpen, placement, align, offset]);

  // Click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;
    const handler = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        contentRef.current?.contains(e.target)
      ) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, closeOnClickOutside, close]);

  // Escape
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handler = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeOnEsc, close]);

  const transformOrigins = {
    bottom: "origin-top",
    top: "origin-bottom",
    left: "origin-right",
    right: "origin-left",
  };

  const arrowDir = {
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-white dark:border-b-zinc-800",
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-white dark:border-t-zinc-800",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-white dark:border-l-zinc-800",
    right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-white dark:border-r-zinc-800",
  };

  const translateMap = {
    bottom: align === "start" ? "" : align === "end" ? "-translate-x-full" : "-translate-x-1/2",
    top: align === "start" ? "-translate-y-full" : align === "end" ? "-translate-x-full -translate-y-full" : "-translate-x-1/2 -translate-y-full",
    left: "-translate-x-full -translate-y-1/2",
    right: "-translate-y-1/2",
  };

  return (
    <>
      <span
        ref={triggerRef}
        onClick={triggerMode === "click" ? toggle : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {trigger}
      </span>
      {isOpen && (
        <div
          ref={contentRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fixed z-50 ${translateMap[placement]} ${transformOrigins[placement]} animate-in fade-in-0 zoom-in-95 ${className}`}
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="relative bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-gray-200 dark:border-zinc-700 p-4">
            {showArrow && (
              <span
                className={`absolute w-0 h-0 border-[6px] ${arrowDir[placement]}`}
              />
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Popover.displayName = "Popover";

export { Popover };
export default Popover;
