import {
  useState,
  useCallback,
  useRef,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Check,
  XCircle,
  Bell,
} from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * Toast notification system — 3 design variants via React context.
 *
 * Variants:
 *   "minimal"  – Clean, compact toast with colored left border (classic)
 *   "modern"   – Rich card with gradient accent, auto-dismiss progress bar
 *   "alert"    – Prominent full-width alert card, optional backdrop overlay, centerable
 *
 * Usage:
 *   <ToastProvider variant="modern" position="top-right">
 *     <App />
 *   </ToastProvider>
 *
 *   const { addToast } = useToast();
 *   addToast({ title: "Saved!", type: "success" });
 *
 * @param {"minimal"|"modern"|"alert"} variant - Design variant
 * @param {string} position - Toast stack position
 * @param {number} maxToasts - Max visible toasts
 * @param {number} defaultDuration - Auto-dismiss ms (0 = persistent)
 * @param {boolean} backdrop - Show backdrop overlay (best with "center" + "alert")
 */

const ToastContext = createContext(null);

/* ─── Type configuration ─── */
const typeConfig = {
  success: {
    icon: CheckCircle,
    solidIcon: Check,
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
    leftBorder: "border-l-emerald-500",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    ringColor: "ring-emerald-500/20",
    progressColor: "bg-emerald-500",
    label: "Success",
  },
  error: {
    icon: XCircle,
    solidIcon: AlertCircle,
    gradient: "from-red-500 to-rose-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
    leftBorder: "border-l-red-500",
    iconBg: "bg-red-100 dark:bg-red-900/50",
    iconColor: "text-red-600 dark:text-red-400",
    ringColor: "ring-red-500/20",
    progressColor: "bg-red-500",
    label: "Error",
  },
  warning: {
    icon: AlertTriangle,
    solidIcon: AlertTriangle,
    gradient: "from-amber-500 to-orange-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    leftBorder: "border-l-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    ringColor: "ring-amber-500/20",
    progressColor: "bg-amber-500",
    label: "Warning",
  },
  info: {
    icon: Info,
    solidIcon: Bell,
    gradient: "from-blue-500 to-indigo-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    leftBorder: "border-l-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    ringColor: "ring-blue-500/20",
    progressColor: "bg-blue-500",
    label: "Info",
  },
};

const positions = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center",
};

/* Slide direction based on position */
const getSlideClass = (pos, exiting) => {
  if (exiting) {
    if (pos.includes("right")) return "rui-toast-exit-right";
    if (pos.includes("left")) return "rui-toast-exit-left";
    return "rui-toast-exit-up";
  }
  if (pos.includes("right")) return "rui-toast-enter-right";
  if (pos.includes("left")) return "rui-toast-enter-left";
  if (pos.includes("bottom")) return "rui-toast-enter-up";
  return "rui-toast-enter-down";
};

/* ═══════════════════════════════════════════════════════
   VARIANT 1: MINIMAL — Clean compact toast, left accent
   ═══════════════════════════════════════════════════════ */
const MinimalToast = ({ toast, onClose, position }) => {
  const { title, message, type = "info", action, exiting } = toast;
  const cfg = typeConfig[type] || typeConfig.info;
  const Icon = cfg.icon;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border-l-4 ${cfg.leftBorder} border border-gray-100 dark:border-zinc-700/60 bg-white dark:bg-zinc-800 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 ${getSlideClass(position, exiting)}`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
            {title}
          </p>
        )}
        {message && (
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
            {message}
          </p>
        )}
        {action && (
          <button
            onClick={() => { action.onClick?.(); onClose(); }}
            className={`text-sm font-semibold ${cfg.iconColor} hover:underline mt-1.5 cursor-pointer`}
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5 text-gray-400" />
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   VARIANT 2: MODERN — Gradient accent, progress bar, rich card
   ═══════════════════════════════════════════════════════════════ */
const ModernToast = ({ toast, onClose, position, duration }) => {
  const { title, message, type = "info", action, exiting, id } = toast;
  const cfg = typeConfig[type] || typeConfig.info;
  const Icon = cfg.solidIcon;
  const progressRef = useRef(null);

  useEffect(() => {
    if (!progressRef.current || !duration || duration <= 0) return;
    const el = progressRef.current;
    el.style.transition = "none";
    el.style.width = "100%";
    void el.offsetWidth; // force reflow
    el.style.transition = `width ${duration}ms linear`;
    el.style.width = "0%";
  }, [duration, id]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700/50 shadow-xl shadow-black/8 dark:shadow-black/30 transition-all duration-300 ${getSlideClass(position, exiting)}`}
      role="alert"
    >
      {/* Top gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.gradient}`} />

      <div className="flex items-start gap-3 p-4">
        {/* Icon with colored rounded background */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center ring-1 ${cfg.ringColor}`}>
          <Icon className={`h-5 w-5 ${cfg.iconColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {title && (
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  {title}
                </p>
              )}
              {message && (
                <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {message}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer -mt-0.5 -mr-1"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5 text-gray-400" />
            </button>
          </div>

          {action && (
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => { action.onClick?.(); onClose(); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-gradient-to-r ${cfg.gradient} hover:opacity-90 transition-opacity cursor-pointer shadow-sm`}
              >
                {action.label}
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Auto-dismiss progress bar */}
      {duration > 0 && (
        <div className="h-0.5 w-full bg-gray-100 dark:bg-zinc-800">
          <div
            ref={progressRef}
            className={`h-full ${cfg.progressColor} opacity-60 rounded-full`}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   VARIANT 3: ALERT — Prominent card with backdrop, centerable
   ═══════════════════════════════════════════════════════════════════ */
const AlertToast = ({ toast, onClose, position }) => {
  const { title, message, type = "info", action, exiting } = toast;
  const cfg = typeConfig[type] || typeConfig.info;
  const Icon = cfg.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${cfg.bg} border ${cfg.border} shadow-2xl shadow-black/10 dark:shadow-black/40 transition-all duration-300 min-w-[320px] max-w-[440px] ${getSlideClass(position, exiting)}`}
      role="alert"
    >
      {/* Decorative background blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-[0.06] blur-2xl`} />
        <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-tr ${cfg.gradient} opacity-[0.04] blur-xl`} />
      </div>

      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Large icon circle */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${cfg.iconBg} flex items-center justify-center ring-2 ${cfg.ringColor}`}>
            <Icon className={`h-6 w-6 ${cfg.iconColor}`} />
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            {/* Type label */}
            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest ${cfg.iconColor} mb-1`}>
              {cfg.label}
            </span>
            {title && (
              <p className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </p>
            )}
            {message && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed">
                {message}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer -mt-0.5"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </button>
        </div>

        {action && (
          <div className="mt-4 flex items-center gap-2 ml-16">
            <button
              onClick={() => { action.onClick?.(); onClose(); }}
              className={`px-4 py-2 text-sm font-semibold rounded-xl text-white bg-gradient-to-r ${cfg.gradient} hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-black/10`}
            >
              {action.label}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.gradient} opacity-40`} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   TOAST PROVIDER
   ═══════════════════════════════════════════════════════ */
const ToastProvider = ({
  children,
  variant = "minimal",
  position = "top-right",
  maxToasts = 5,
  defaultDuration = 4000,
  backdrop = false,
}) => {
  injectRuiStyles();
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());
  const idRef = useRef(0);

  useEffect(() => {
    const timers = timersRef.current;
    return () => { timers.forEach((tid) => clearTimeout(tid)); timers.clear(); };
  }, []);

  const removeToast = useCallback((id) => {
    const tid = timersRef.current.get(id);
    if (tid) { clearTimeout(tid); timersRef.current.delete(id); }
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
    const exitTimer = setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350);
    timersRef.current.set(`exit-${id}`, exitTimer);
  }, []);

  const addToast = useCallback(
    ({ title, message, type = "info", duration, action }) => {
      const id = ++idRef.current;
      const d = duration ?? defaultDuration;
      const toast = { id, title, message, type, action, exiting: false, duration: d };
      setToasts((prev) => [toast, ...prev].slice(0, maxToasts));
      if (d > 0) {
        const tid = setTimeout(() => removeToast(id), d);
        timersRef.current.set(id, tid);
      }
      return id;
    },
    [maxToasts, defaultDuration, removeToast]
  );

  const contextValue = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  const ToastComponent = variant === "modern" ? ModernToast : variant === "alert" ? AlertToast : MinimalToast;
  const isCenter = position === "center";
  const hasToasts = toasts.length > 0;
  const showBackdrop = backdrop && hasToasts;

  const containerWidth =
    variant === "alert"
      ? "max-w-[440px] min-w-[280px] sm:min-w-[360px]"
      : variant === "modern"
        ? "max-w-[400px] min-w-[280px] sm:min-w-[340px]"
        : "max-w-[380px] min-w-[260px] sm:min-w-[280px]";

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Backdrop overlay */}
      {showBackdrop && (
        <div className="fixed inset-0 z-[9998] bg-black/20 dark:bg-black/40 backdrop-blur-[2px] rui-toast-backdrop-in" />
      )}

      <div
        className={`fixed z-[9999] flex flex-col gap-3 w-[calc(100vw-2rem)] sm:w-auto ${containerWidth} ${positions[position] || positions["top-right"]} ${isCenter ? "pointer-events-none" : ""}`}
      >
        {toasts.map((toast) => (
          <div key={toast.id} className={isCenter ? "pointer-events-auto" : ""}>
            <ToastComponent
              toast={toast}
              onClose={() => removeToast(toast.id)}
              position={position}
              duration={toast.duration}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * useToast — Hook to trigger toasts from any child component.
 * @returns {{ addToast: Function, removeToast: Function }}
 */
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a <ToastProvider>");
  return context;
};

const ToastItem = MinimalToast;

ToastProvider.displayName = "ToastProvider";
MinimalToast.displayName = "MinimalToast";
ModernToast.displayName = "ModernToast";
AlertToast.displayName = "AlertToast";

export { ToastProvider, useToast, ToastItem, MinimalToast, ModernToast, AlertToast };
export default ToastProvider;
