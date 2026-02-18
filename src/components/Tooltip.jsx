import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import injectRuiStyles from "./injectRuiStyles";

/**
 * Tooltip - Smart-positioned tooltip with auto-flip and rich content.
 */
/*
 * @param {React.ReactNode} children - Trigger element
 * @param {React.ReactNode} content - Tooltip content (string or JSX)
 * @param {string} position - "top" | "bottom" | "left" | "right" (default "top"). Auto-flips.
 * @param {number} delay - Show delay in ms (default 200)
 * @param {number} hideDelay - Hide delay in ms (default 100)
 * @param {boolean} arrow - Show arrow pointer (default true)
 * @param {string} className - Extra CSS on tooltip bubble
 * @param {string} trigger - "hover" | "click" | "focus" (default "hover")
 * @param {boolean} disabled - Disable tooltip
 * @param {number} offset - Distance from trigger in px (default 8)
 * @param {number} maxWidth - Max width in px (default 240)
 */
const Tooltip = ({
  children,
  content,
  position: preferredPos = "top",
  delay = 200,
  hideDelay = 100,
  arrow = true,
  className = "",
  trigger = "hover",
  disabled = false,
  offset = 8,
  maxWidth = 240,
}) => {
  injectRuiStyles();
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [actualPos, setActualPos] = useState(preferredPos);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const showTimer = useRef(null);
  const hideTimer = useRef(null);

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), hideDelay);
  }, [hideDelay]);

  /* ── position calculation ── */
  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;

    const trig = triggerRef.current.getBoundingClientRect();
    const tt = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let pos = preferredPos;

    // Auto-flip
    if (pos === "top" && trig.top - tt.height - offset < 0) pos = "bottom";
    else if (pos === "bottom" && trig.bottom + tt.height + offset > vh) pos = "top";
    else if (pos === "left" && trig.left - tt.width - offset < 0) pos = "right";
    else if (pos === "right" && trig.right + tt.width + offset > vw) pos = "left";

    let x, y;
    switch (pos) {
      case "top":
        x = trig.left + trig.width / 2 - tt.width / 2;
        y = trig.top - tt.height - offset;
        break;
      case "bottom":
        x = trig.left + trig.width / 2 - tt.width / 2;
        y = trig.bottom + offset;
        break;
      case "left":
        x = trig.left - tt.width - offset;
        y = trig.top + trig.height / 2 - tt.height / 2;
        break;
      case "right":
        x = trig.right + offset;
        y = trig.top + trig.height / 2 - tt.height / 2;
        break;
    }

    // Clamp to viewport
    x = Math.max(4, Math.min(x, vw - tt.width - 4));
    y = Math.max(4, Math.min(y, vh - tt.height - 4));

    setCoords({ x, y });
    setActualPos(pos);
  }, [visible, preferredPos, offset]);

  /* ── cleanup ── */
  useEffect(() => () => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
  }, []);

  if (disabled || !content) return children;

  const triggerProps = {};
  if (trigger === "hover") {
    triggerProps.onMouseEnter = show;
    triggerProps.onMouseLeave = hide;
    triggerProps.onFocus = show;
    triggerProps.onBlur = hide;
  } else if (trigger === "click") {
    triggerProps.onClick = () => setVisible((v) => !v);
  } else if (trigger === "focus") {
    triggerProps.onFocus = show;
    triggerProps.onBlur = hide;
  }

  const arrowStyles = {
    top:    { bottom: -4, left: "50%", transform: "translateX(-50%) rotate(45deg)" },
    bottom: { top: -4, left: "50%", transform: "translateX(-50%) rotate(45deg)" },
    left:   { right: -4, top: "50%", transform: "translateY(-50%) rotate(45deg)" },
    right:  { left: -4, top: "50%", transform: "translateY(-50%) rotate(45deg)" },
  };

  return (
    <>
      <span ref={triggerRef} className="inline-flex" {...triggerProps}>
        {children}
      </span>

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className={`fixed z-[99999] ${className}`}
            style={{
              left: coords.x,
              top: coords.y,
              maxWidth,
              animation: "rui-tt-in .15s ease-out",
            }}
            onMouseEnter={trigger === "hover" ? show : undefined}
            onMouseLeave={trigger === "hover" ? hide : undefined}
          >
            <div className="relative px-3 py-2 text-xs leading-relaxed text-white bg-gray-900 dark:bg-zinc-700 rounded-lg shadow-lg">
              {content}
              {arrow && (
                <div
                  className="absolute w-2 h-2 bg-gray-900 dark:bg-zinc-700"
                  style={arrowStyles[actualPos]}
                />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

Tooltip.displayName = "Tooltip";

export { Tooltip };
export default Tooltip;
