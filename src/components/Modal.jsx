/**
 * Modal - Full-featured modal dialog with sizes, animations, and overlay dismiss.
 */
/*
 * @param {boolean} open - Show / hide modal
 * @param {Function} onClose - Called when modal should close
 * @param {string} title - Header title
 * @param {React.ReactNode} children - Body content
 * @param {React.ReactNode} footer - Footer content (buttons etc.)
 * @param {string} size - "sm" | "md" | "lg" | "xl" | "full" (default "md")
 * @param {boolean} closeOnOverlay - Close when clicking overlay (default true)
 * @param {boolean} closeOnEsc - Close on Escape key (default true)
 * @param {boolean} showCloseButton - Show X button in header (default true)
 * @param {string} animation - "scale" | "slide-up" | "slide-down" | "fade" | "none" (default "scale")
 * @param {boolean} centered - Vertically center modal (default true)
 * @param {string} className - Extra CSS on modal panel
 * @param {string} overlayClassName - Extra CSS on overlay
 */
import { useEffect, useCallback, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  animation = "scale",
  centered = true,
  className = "",
  overlayClassName = "",
}) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const panelRef = useRef(null);
  const titleId = useId();

  // Open / close lifecycle
  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    } else {
      setShow(false);
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return;
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
    // Auto-focus first focusable element
    const els = focusable();
    if (els.length) els[0].focus();
    return () => document.removeEventListener("keydown", handleTab);
  }, [open, show]);

  const handleOverlay = useCallback(() => {
    if (closeOnOverlay) onClose?.();
  }, [closeOnOverlay, onClose]);

  if (!visible) return null;

  const animStyles = (() => {
    const base = "transition-all duration-200 ease-out";
    switch (animation) {
      case "slide-up":
        return `${base} ${show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`;
      case "slide-down":
        return `${base} ${show ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`;
      case "fade":
        return `${base} ${show ? "opacity-100" : "opacity-0"}`;
      case "none":
        return "";
      default: // scale
        return `${base} ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`;
    }
  })();

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex ${centered ? "items-center" : "items-start pt-20"} justify-center p-4`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"} ${overlayClassName}`}
        onClick={handleOverlay}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`relative w-full ${sizeMap[size] || sizeMap.md} bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${animStyles} ${className}`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-zinc-800">
            {title && (
              <h3 id={titleId} className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto text-sm sm:text-base text-gray-700 dark:text-gray-300">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-end gap-2 sm:gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

Modal.displayName = "Modal";

export { Modal };
export default Modal;
