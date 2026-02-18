import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";

/**
 * ConfirmDialog - Promise-based confirmation modal.
 *
 * Usage:
 *   const { confirm, ConfirmDialogPortal } = useConfirm();
 *   const ok = await confirm({ title: "Delete?", message: "This cannot be undone.", variant: "danger" });
 *   if (ok) { ... }
 *
 * Or as a controlled component:
 *   <ConfirmDialog isOpen={open} onConfirm={handleConfirm} onCancel={handleCancel} ... />
 */

/* ── Controlled Component ── */
const ConfirmDialog = ({
  isOpen = false,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default", // "default" | "danger" | "warning" | "info" | "success"
  icon: CustomIcon,
  className = "",
  overlayClassName = "",
  showIcon = true,
  closeOnOverlay = true,
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onCancel?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  if (!mounted) return null;

  const variantConfig = {
    default: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", btn: "bg-blue-600 hover:bg-blue-700", Icon: Info },
    danger:  { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", btn: "bg-red-600 hover:bg-red-700", Icon: XCircle },
    warning: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", btn: "bg-amber-600 hover:bg-amber-700", Icon: AlertTriangle },
    info:    { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", btn: "bg-blue-600 hover:bg-blue-700", Icon: Info },
    success: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", btn: "bg-emerald-600 hover:bg-emerald-700", Icon: CheckCircle },
  };

  const v = variantConfig[variant] || variantConfig.default;
  const IconComp = CustomIcon || v.Icon;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${overlayClassName}`}
      style={{
        backgroundColor: `rgba(0,0,0,${visible ? .45 : 0})`,
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
        transition: "background-color .2s, backdrop-filter .2s",
      }}
      onClick={closeOnOverlay ? onCancel : undefined}
    >
      <div
        className={`w-full max-w-sm bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden ${className}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(.95) translateY(8px)",
          transition: "opacity .2s, transform .2s cubic-bezier(.4,0,.2,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          {showIcon && (
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${v.bg} ${v.text} mb-4`}>
              <IconComp className="w-6 h-6" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
          {message && <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{message}</p>}
          {children}
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white ${v.btn} transition-colors cursor-pointer`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ── Hook for promise-based usage ── */
const useConfirm = () => {
  const [state, setState] = useState({ isOpen: false, props: {}, resolve: null });
  const resolveRef = useRef(null);

  // Keep ref in sync
  resolveRef.current = state.resolve;

  const confirm = useCallback((props = {}) => {
    return new Promise((resolve) => {
      setState({ isOpen: true, props, resolve });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    resolveRef.current?.(true);
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const handleCancel = useCallback(() => {
    resolveRef.current?.(false);
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const ConfirmDialogPortal = (
    <ConfirmDialog
      isOpen={state.isOpen}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      {...state.props}
    />
  );

  return { confirm, dialog: ConfirmDialogPortal, ConfirmDialogPortal };
};

ConfirmDialog.displayName = "ConfirmDialog";

export { ConfirmDialog, useConfirm };
export default ConfirmDialog;
