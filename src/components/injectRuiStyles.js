/**
 * Singleton style injector — inserts shared RUI keyframes and utility
 * classes into <head> exactly once, no matter how many components mount.
 * SSR-safe (no-ops when `document` is unavailable).
 */

let injected = false;

const css = `
/* ─── Skeleton ─── */
.rui-skeleton-wave {
  background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,.15) 50%, transparent 75%);
  background-size: 200% 100%;
  animation: rui-wave 1.5s ease-in-out infinite;
}
@keyframes rui-wave {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ─── Spinner ─── */
@keyframes rui-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes rui-bars {
  0%, 100% { height: 30%; }
  50% { height: 100%; }
}
@keyframes rui-orbit {
  0%   { transform: rotate(0deg) translateX(var(--rui-orbit-r, 12px)); }
  100% { transform: rotate(360deg) translateX(var(--rui-orbit-r, 12px)); }
}
@keyframes rui-pulse-grow {
  0%, 100% { transform: scale(0.8); opacity: 0.4; }
  50% { transform: scale(1); opacity: 0.7; }
}
@keyframes rui-dual-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes rui-ripple {
  0%   { transform: scale(0.3); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0; }
}
@keyframes rui-square-spin {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(90deg) scale(0.7); }
  50%  { transform: rotate(180deg) scale(1); }
  75%  { transform: rotate(270deg) scale(0.7); }
  100% { transform: rotate(360deg) scale(1); }
}

/* ─── Toast ─── */
@keyframes rui-slide-in {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}
.rui-animate-slide-in { animation: rui-slide-in 0.3s ease; }

/* Toast enter/exit animations — directional */
@keyframes rui-toast-enter-right {
  from { opacity: 0; transform: translateX(24px) scale(0.96); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes rui-toast-enter-left {
  from { opacity: 0; transform: translateX(-24px) scale(0.96); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes rui-toast-enter-down {
  from { opacity: 0; transform: translateY(-16px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes rui-toast-enter-up {
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes rui-toast-exit-right {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to   { opacity: 0; transform: translateX(24px) scale(0.96); }
}
@keyframes rui-toast-exit-left {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to   { opacity: 0; transform: translateX(-24px) scale(0.96); }
}
@keyframes rui-toast-exit-up {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(-16px) scale(0.96); }
}
@keyframes rui-toast-backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.rui-toast-enter-right  { animation: rui-toast-enter-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.rui-toast-enter-left   { animation: rui-toast-enter-left 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.rui-toast-enter-down   { animation: rui-toast-enter-down 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.rui-toast-enter-up     { animation: rui-toast-enter-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.rui-toast-exit-right   { animation: rui-toast-exit-right 0.25s ease-in forwards; }
.rui-toast-exit-left    { animation: rui-toast-exit-left 0.25s ease-in forwards; }
.rui-toast-exit-up      { animation: rui-toast-exit-up 0.25s ease-in forwards; }
.rui-toast-backdrop-in  { animation: rui-toast-backdrop-in 0.3s ease forwards; }

/* ─── Timeline ─── */
@keyframes rui-fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.rui-animate-fade-in { animation: rui-fade-in 0.5s ease forwards; }

/* ─── Tabs ─── */
@keyframes rui-tab-in {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── Command Palette ─── */
@keyframes rui-cmd-in {
  from { opacity: 0; transform: translateY(-12px) scale(.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─── Copy to Clipboard ─── */
@keyframes rui-fade-in-up {
  from { opacity: 0; transform: translate(-50%, 4px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}

/* ─── DatePicker ─── */
@keyframes rui-dp-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── ImageCropper ─── */
@keyframes rui-crop-in {
  from { opacity: 0; transform: scale(.95); }
  to   { opacity: 1; transform: scale(1); }
}

/* ─── NotificationBell Modal ─── */
@keyframes rui-modal-in {
  from { opacity: 0; transform: translateY(12px) scale(.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ─── Tooltip ─── */
@keyframes rui-tt-in {
  from { opacity: 0; transform: translateY(2px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── VirtualList scrollbar ─── */
.rui-scrollbar-thin::-webkit-scrollbar { width: 6px; }
.rui-scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.rui-scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
.rui-scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .rui-scrollbar-thin::-webkit-scrollbar-thumb { background: #3f3f46; }
.dark .rui-scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #52525b; }
.rui-scrollbar-hide::-webkit-scrollbar { display: none; }
.rui-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

export default function injectRuiStyles() {
  if (injected || typeof document === "undefined") return;
  injected = true;

  // Skip if the pre-built styles.css is already loaded (it also contains these rules)
  if (document.querySelector('style[data-rui]') ||
      document.querySelector('link[href*="readyui"]') ||
      document.querySelector('link[href*="styles.css"]')) {
    return;
  }

  const el = document.createElement("style");
  el.setAttribute("data-rui", "");
  el.textContent = css;
  document.head.appendChild(el);
}
