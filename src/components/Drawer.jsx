import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Drawer - Slide-in panel from any edge with backdrop & swipe-to-dismiss.
 */
/*
 * @param {boolean} isOpen - Controlled open state
 * @param {Function} onClose - Called when drawer should close
 * @param {string} position - "left" | "right" | "top" | "bottom" (default "right")
 * @param {string|number} size - Width (left/right) or height (top/bottom). Default "380px"
 * @param {boolean} showOverlay - Show backdrop (default true)
 * @param {boolean} closeOnOverlay - Close when clicking overlay (default true)
 * @param {boolean} closeOnEsc - Close on Escape (default true)
 * @param {boolean} showCloseButton - Show X button (default true)
 * @param {React.ReactNode} children - Drawer content
 * @param {React.ReactNode} header - Optional header content
 * @param {React.ReactNode} footer - Optional footer content
 * @param {string} className - Extra CSS on the drawer panel
 * @param {string} overlayClassName - Extra CSS on the backdrop
 * @param {Object} style - Inline styles on the drawer panel
 */
const Drawer = ({
  isOpen = false,
  onClose,
  position = "right",
  size = "380px",
  showOverlay = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  children,
  header,
  footer,
  className = "",
  overlayClassName = "",
  style,
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef(null);
  const dragRef = useRef({ startPos: 0, current: 0, dragging: false });

  /* ── mount / unmount lifecycle ── */
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* ── ESC ── */
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeOnEsc, isOpen, onClose]);

  /* ── lock body scroll ── */
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mounted]);

  /* ── focus trap ── */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = () => panel.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
    );
    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      const els = focusable();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleTab);
    const els = focusable();
    if (els.length) els[0].focus();
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen, visible]);

  /* ── swipe to dismiss (touch) ── */
  const isHorizontal = position === "left" || position === "right";

  const onTouchStart = (e) => {
    const pos = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
    dragRef.current = { startPos: pos, current: pos, dragging: true };
  };

  const onTouchMove = (e) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.current = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
    const diff = dragRef.current.current - dragRef.current.startPos;
    const panel = panelRef.current;
    if (!panel) return;

    let translate = 0;
    if (position === "right" && diff > 0) translate = diff;
    else if (position === "left" && diff < 0) translate = diff;
    else if (position === "bottom" && diff > 0) translate = diff;
    else if (position === "top" && diff < 0) translate = diff;

    if (translate !== 0) {
      const prop = isHorizontal ? "translateX" : "translateY";
      panel.style.transform = `${prop}(${translate}px)`;
      panel.style.transition = "none";
    }
  };

  const onTouchEnd = () => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const panel = panelRef.current;
    if (!panel) return;

    const diff = Math.abs(dragRef.current.current - dragRef.current.startPos);
    panel.style.transition = "";
    panel.style.transform = "";

    if (diff > 100) onClose?.();
  };

  if (!mounted) return null;

  /* ── position styles ── */
  const sizeVal = typeof size === "number" ? `${size}px` : size;
  const posStyles = {
    left:   { left: 0, top: 0, bottom: 0, width: sizeVal, maxWidth: "100vw", transform: visible ? "translateX(0)" : "translateX(-100%)" },
    right:  { right: 0, top: 0, bottom: 0, width: sizeVal, maxWidth: "100vw", transform: visible ? "translateX(0)" : "translateX(100%)" },
    top:    { top: 0, left: 0, right: 0, height: sizeVal, maxHeight: "100vh", transform: visible ? "translateY(0)" : "translateY(-100%)" },
    bottom: { bottom: 0, left: 0, right: 0, height: sizeVal, maxHeight: "100vh", transform: visible ? "translateY(0)" : "translateY(100%)" },
  };

  const roundedMap = {
    left: "rounded-r-2xl",
    right: "rounded-l-2xl",
    top: "rounded-b-2xl",
    bottom: "rounded-t-2xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-[9998]">
      {/* Overlay */}
      {showOverlay && (
        <div
          className={`absolute inset-0 ${overlayClassName}`}
          style={{
            backgroundColor: "rgba(0,0,0,.4)",
            backdropFilter: "blur(2px)",
            opacity: visible ? 1 : 0,
            transition: "opacity .3s ease",
          }}
          onClick={closeOnOverlay ? onClose : undefined}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className={`absolute bg-white dark:bg-zinc-900 shadow-2xl flex flex-col ${roundedMap[position]} ${className}`}
        style={{
          ...posStyles[position],
          transition: "transform .3s cubic-bezier(.4,0,.2,1)",
          ...style,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Header */}
        {(header || showCloseButton) && (
          <div className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 dark:border-zinc-800 flex-shrink-0">
            <div className="flex-1 min-w-0 text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {header}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-t border-gray-100 dark:border-zinc-800 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

Drawer.displayName = "Drawer";

export { Drawer };
export default Drawer;
