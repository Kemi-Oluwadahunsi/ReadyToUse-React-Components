import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Bell, Check, Trash2, X, Clock, ArrowLeft } from "lucide-react";
import injectRuiStyles from "../injectRuiStyles";

/* ── tiny portal wrapper ── */
const Portal = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.body.appendChild(container);
    return () => document.body.removeChild(container);
  }, [container]);
  return createPortal(children, container);
};

/**
 * NotificationBell - Notification bell with dropdown panel and optional detail modal.
 *
 * ## Modal behaviour (reading a notification)
 * By default, clicking a notification opens a built-in detail modal.
 * To disable the modal and handle clicks yourself, pass `onNotificationClick`.
 */
/*
 * @param {Array}    notifications       - Array of { id, title, message, time, read?, avatar?, type?, body? }
 *                                          `body` is optional rich content (string/JSX) shown in the modal.
 * @param {Function} onRead              - Called when a notification is marked read: (id) => void
 * @param {Function} onReadAll           - Called when "mark all read" is pressed
 * @param {Function} onClear             - Called when "clear all" is pressed
 * @param {Function} onNotificationClick - **If provided**, the built-in modal is skipped and this
 *                                          callback receives the notification object. Use this when you
 *                                          want to navigate to a page, open a custom drawer, etc.
 * @param {Function} renderDetail        - Custom renderer for the detail modal body:
 *                                          (notification, { close }) => JSX.
 *                                          Only used when the built-in modal is active.
 * @param {Function} onDelete            - Called when a single notification is deleted: (id) => void
 * @param {string}   className           - Additional CSS classes for the wrapper
 * @param {number}   maxVisible          - Max items shown before "view all" (default 5)
 * @param {string}   emptyMessage        - Shown when no notifications
 * @param {string}   bellColor           - Tailwind color classes for the bell icon
 *
 * ## Style overrides
 * @param {string}   panelClassName      - Extra CSS classes on the dropdown panel
 * @param {string}   modalClassName      - Extra CSS classes on the modal card
 * @param {string}   modalOverlayClassName - Extra CSS classes on the modal backdrop
 * @param {Object}   modalStyle          - Inline styles on the modal card
 * @param {Object}   panelStyle          - Inline styles on the dropdown panel
 */
const NotificationBell = ({
  notifications = [],
  onRead,
  onReadAll,
  onClear,
  onNotificationClick,
  renderDetail,
  onDelete,
  className = "",
  maxVisible = 5,
  emptyMessage = "No new notifications",
  bellColor = "text-gray-600 dark:text-gray-300",
  panelClassName = "",
  modalClassName = "",
  modalOverlayClassName = "",
  modalStyle,
  panelStyle,
}) => {
  injectRuiStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null); // notification shown in modal
  const panelRef = useRef(null);
  const bellRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const visibleNotifications = notifications.slice(0, maxVisible);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        bellRef.current && !bellRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown & modal on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (selected) { setSelected(null); }
        else if (isOpen) { setIsOpen(false); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, selected]);

  const handleNotificationClick = useCallback(
    (notification) => {
      if (!notification.read) onRead?.(notification.id);
      // If the consumer provides onNotificationClick, delegate entirely — no modal.
      if (onNotificationClick) {
        onNotificationClick(notification);
        return;
      }
      // Otherwise open the built-in detail modal.
      setSelected(notification);
    },
    [onRead, onNotificationClick]
  );

  const closeModal = useCallback(() => setSelected(null), []);

  const typeColors = {
    info: "bg-blue-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  };

  return (
    <div className={`relative ${className}`}>
      {/* Bell button */}
      <button
        ref={bellRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${bellColor}`}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 ring-2 ring-white dark:ring-zinc-900">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className={`absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-2xl z-50 overflow-hidden ${panelClassName}`}
          style={panelStyle}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-zinc-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                  {unreadCount} new
                </span>
              )}
            </h3>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={() => onReadAll?.()}
                  className="p-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  title="Mark all as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={() => onClear?.()}
                  className="p-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  title="Clear all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto">
            {visibleNotifications.length === 0 ? (
              <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                {emptyMessage}
              </div>
            ) : (
              visibleNotifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors border-b border-gray-50 dark:border-zinc-700/30 last:border-0 ${
                    !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  {/* Avatar or type dot */}
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.avatar ? (
                      <img src={notification.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${typeColors[notification.type] || typeColors.info}`}>
                        {notification.title?.[0]?.toUpperCase() || "N"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.read ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      {notification.title}
                    </p>
                    {notification.message && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{notification.message}</p>
                    )}
                    {notification.time && (
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                    )}
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > maxVisible && (
            <div className="border-t border-gray-100 dark:border-zinc-700 px-4 py-2.5 text-center">
              <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                View all {notifications.length} notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selected && (
        <Portal>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${modalOverlayClassName}`}
            style={{ backgroundColor: "rgba(0,0,0,.45)", backdropFilter: "blur(4px)" }}
            onClick={closeModal}
          >
            {/* Modal card */}
            <div
              className={`relative w-full max-w-lg bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden ${modalClassName}`}
              style={{
                animation: "rui-modal-in .25s cubic-bezier(.4,0,.2,1)",
                ...modalStyle,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Custom renderer takes over if provided */}
              {renderDetail ? (
                renderDetail(selected, { close: closeModal })
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-start gap-3 p-4 sm:p-5 pb-0">
                    {/* Avatar / type badge */}
                    {selected.avatar ? (
                      <img src={selected.avatar} alt="" className="h-11 w-11 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className={`h-11 w-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
                        typeColors[selected.type] || typeColors.info
                      }`}>
                        {selected.title?.[0]?.toUpperCase() || "N"}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                        {selected.title}
                      </h3>
                      {selected.time && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                          <Clock className="w-3 h-3" /> {selected.time}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="px-4 sm:px-5 py-3 sm:py-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selected.body || selected.message || "No additional details."}
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-t border-gray-100 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="flex items-center gap-2">
                      {!selected.read && (
                        <button
                          type="button"
                          onClick={() => { onRead?.(selected.id); setSelected((s) => ({ ...s, read: true })); }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Mark read
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => { onDelete(selected.id); closeModal(); }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </Portal>
      )}
    </div>
  );
};

Portal.displayName = "Portal";
NotificationBell.displayName = "NotificationBell";

export { NotificationBell };
export default NotificationBell;
