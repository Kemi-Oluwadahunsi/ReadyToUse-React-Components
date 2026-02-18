import { useState, useCallback, useRef, useEffect, createContext, useContext } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * Toast notification system using React context (no external dependencies).
 *
 * Usage:
 *   <ToastProvider position="top-right" maxToasts={5}>
 *     <App />
 *   </ToastProvider>
 *
 *   const { addToast } = useToast();
 *   addToast({ title: "Saved!", type: "success" });
 */

const ToastContext = createContext(null);

const icons = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const bgColors = {
  success: "border-emerald-200 dark:border-emerald-800",
  error: "border-red-200 dark:border-red-800",
  warning: "border-amber-200 dark:border-amber-800",
  info: "border-blue-200 dark:border-blue-800",
};

const positions = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

/**
 * ToastProvider - Wraps your app and provides toast functionality via context.
 */
/*
 * @param {string} position - "top-right"|"top-left"|"top-center"|"bottom-right"|"bottom-left"|"bottom-center"
 * @param {number} maxToasts - Max visible toasts
 * @param {number} defaultDuration - Default auto-dismiss time in ms (0 = persistent)
 */
const ToastProvider = ({
  children,
  position = "top-right",
  maxToasts = 5,
  defaultDuration = 4000,
}) => {
  injectRuiStyles();
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());
  const idRef = useRef(0);

  // Cleanup all timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => { timers.forEach((tid) => clearTimeout(tid)); timers.clear(); };
  }, []);

  const removeToast = useCallback((id) => {
    // Clear any pending timer for this toast
    const tid = timersRef.current.get(id);
    if (tid) { clearTimeout(tid); timersRef.current.delete(id); }
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    const exitTimer = setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300);
    timersRef.current.set(`exit-${id}`, exitTimer);
  }, []);

  const addToast = useCallback(
    ({ title, message, type = "info", duration, action }) => {
      const id = ++idRef.current;
      const toast = { id, title, message, type, action, exiting: false };

      setToasts((prev) => {
        const next = [toast, ...prev];
        return next.slice(0, maxToasts);
      });

      const d = duration ?? defaultDuration;
      if (d > 0) {
        const tid = setTimeout(() => removeToast(id), d);
        timersRef.current.set(id, tid);
      }

      return id;
    },
    [maxToasts, defaultDuration, removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className={`fixed z-[9999] flex flex-col gap-2 sm:gap-3 w-[calc(100vw-2rem)] sm:w-auto ${positions[position] || positions["top-right"]}`} style={{ maxWidth: 380, minWidth: 280 }}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const { title, message, type, action, exiting } = toast;

  return (
    <div
      className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border bg-white dark:bg-zinc-800 shadow-lg transition-all duration-300 ${
        bgColors[type] || bgColors.info
      } ${exiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0 rui-animate-slide-in"}`}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type] || icons.info}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{title}</p>}
        {message && <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5">{message}</p>}
        {action && (
          <button
            onClick={() => { action.onClick?.(); onClose(); }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1.5"
          >
            {action.label}
          </button>
        )}
      </div>
      <button onClick={onClose} className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
        <X className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
};

/**
 * useToast - Hook to access toast functions.
 * @returns {{ addToast: Function, removeToast: Function }}
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a <ToastProvider>");
  return context;
};

ToastProvider.displayName = "ToastProvider";
ToastItem.displayName = "ToastItem";

export { ToastProvider, useToast, ToastItem };
export default ToastProvider;
