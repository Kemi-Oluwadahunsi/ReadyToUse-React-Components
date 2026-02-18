import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ScrollCarousel - A generic, responsive carousel with auto-scroll and snap scrolling.
 *
 * Works for any content — images, testimonials, product cards, text blocks, etc.
 * Pass `renderItem` for full control, or use the built-in default card which
 * renders any combination of: image, title, description, and footer content.
 */
/*
 * @param {Object[]} items - Array of items to display. Shape is up to you.
 * @param {Function} renderItem - Custom render: (item, index, isActive) => JSX. When provided, the default card is bypassed entirely.
 * @param {boolean} autoScroll - Enable auto-scrolling (default true)
 * @param {number} autoScrollInterval - Auto-scroll interval in ms (default 4000)
 * @param {boolean} showDots - Show page indicator dots (default true)
 * @param {boolean} showArrows - Show prev/next arrows (default true)
 * @param {string} className - Additional CSS classes for the wrapper
 * @param {number} pauseOnInteract - MS to pause auto-scroll after interaction (default 5000)
 * @param {number} itemsPerView - Items visible per page. Auto-responsive if not set.
 * @param {number} gap - Gap between items in px (default 24)
 * @param {boolean} scaleActive - Scale the center card up when 3+ items visible (default false)
 * @param {boolean} showEdgeFade - Show gradient fade at left/right edges (default true)
 * @param {string} cardClassName - Additional CSS classes applied to each default card
 */
const ScrollCarousel = ({
  items = [],
  renderItem,
  autoScroll = true,
  autoScrollInterval = 4000,
  showDots = true,
  showArrows = true,
  className = "",
  pauseOnInteract = 5000,
  itemsPerView: fixedPerView,
  gap = 24,
  scaleActive = false,
  showEdgeFade = true,
  cardClassName = "",
}) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(autoScroll);
  const [perView, setPerView] = useState(fixedPerView || 1);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const dragRef = useRef({ startX: 0, scrollLeft: 0 });

  /* ── responsive items-per-view ── */
  useEffect(() => {
    if (fixedPerView) return;
    const onResize = () => {
      const w = window.innerWidth;
      setPerView(w >= 1280 ? 3 : w >= 768 ? 2 : 1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fixedPerView]);

  const maxPage = Math.max(0, items.length - perView);

  /* ── scroll to active ── */
  const scrollTo = useCallback(
    (idx) => {
      const el = trackRef.current;
      if (!el || !el.children[0]) return;
      const card = el.children[0].offsetWidth;
      el.scrollTo({ left: idx * (card + gap), behavior: "smooth" });
    },
    [gap]
  );

  /* ── auto-scroll ── */
  useEffect(() => {
    if (!playing || items.length <= perView) return;
    timerRef.current = setInterval(() => {
      setActive((p) => {
        const next = p >= maxPage ? 0 : p + 1;
        scrollTo(next);
        return next;
      });
    }, autoScrollInterval);
    return () => clearInterval(timerRef.current);
  }, [playing, maxPage, perView, items.length, autoScrollInterval, scrollTo]);

  const pauseAndGo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, maxPage));
    setActive(clamped);
    scrollTo(clamped);
    setPlaying(false);
    clearTimeout(timerRef.current);
    setTimeout(() => setPlaying(autoScroll), pauseOnInteract);
  };

  /* ── drag-to-scroll ── */
  const onPointerDown = (e) => {
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, scrollLeft: trackRef.current.scrollLeft };
    trackRef.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    trackRef.current.scrollLeft = dragRef.current.scrollLeft - dx;
  };
  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    syncFromScroll();
  };

  /* ── sync scroll position → active page ── */
  const syncFromScroll = () => {
    const el = trackRef.current;
    if (!el?.children[0]) return;
    const card = el.children[0].offsetWidth;
    const pg = Math.round(el.scrollLeft / (card + gap));
    if (pg !== active && pg >= 0 && pg <= maxPage) setActive(pg);
  };

  /* ── navigation ── */
  const goPrev = () => pauseAndGo(active <= 0 ? maxPage : active - 1);
  const goNext = () => pauseAndGo(active >= maxPage ? 0 : active + 1);

  /* ── generic default card ── */
  const defaultRender = (item, idx) => {
    const isCenter = scaleActive && perView >= 3 && idx === active + 1;
    const img = item.image || item.src || item.avatar;
    const title = item.title || item.name || item.author;
    const text = item.description || item.content || item.text || item.quote;
    const subtitle = item.subtitle || item.role || item.label;
    const footer = item.footer; // optional JSX or string

    return (
      <div
        className={`relative h-full rounded-2xl border border-gray-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-800 overflow-hidden flex flex-col ${cardClassName}`}
        style={{
          transform: isCenter ? "scale(1.03)" : "scale(1)",
          boxShadow: isCenter
            ? "0 20px 50px -12px rgba(0,0,0,.15)"
            : "0 4px 24px -4px rgba(0,0,0,.06)",
          transition: "transform .4s cubic-bezier(.4,0,.2,1), box-shadow .4s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Image — rendered if present */}
        {img && (
          <div className="w-full overflow-hidden">
            <img
              src={img}
              alt={title || ""}
              className="w-full h-auto object-cover"
              style={{ transition: "transform .4s ease" }}
              draggable={false}
            />
          </div>
        )}

        {/* Body — only when there's title, text, or subtitle */}
        {(title || text || subtitle || footer) && (
          <div className="flex flex-col flex-1 p-4 sm:p-6">
            {title && (
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3 truncate">
                {subtitle}
              </p>
            )}
            {text && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm flex-1">
                {text}
              </p>
            )}
            {footer && (
              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100 dark:border-zinc-700/50 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {footer}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  /* ── item width classes ── */
  const widthMap = {
    1: "100%",
    2: `calc(50% - ${gap / 2}px)`,
    3: `calc(33.333% - ${(gap * 2) / 3}px)`,
    4: `calc(25% - ${(gap * 3) / 4}px)`,
  };
  const itemWidth = widthMap[perView] || widthMap[1];

  return (
    <div className={`relative ${className}`}>
      {/* Edge fade masks */}
      {showEdgeFade && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10"
            style={{
              width: 48,
              background: "linear-gradient(90deg, var(--rui-carousel-bg, rgb(249 250 251)) 0%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10"
            style={{
              width: 48,
              background: "linear-gradient(270deg, var(--rui-carousel-bg, rgb(249 250 251)) 0%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* Arrows */}
      {showArrows && items.length > perView && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-11 h-11 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            style={{ transition: "transform .15s" }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-11 h-11 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            style={{ transition: "transform .15s" }}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </>
      )}

      {/* Carousel Track */}
      <div
        ref={trackRef}
        onScroll={syncFromScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-6"
        style={{
          gap: `${gap}px`,
          scrollbarWidth: "none",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id ?? idx}
            className="flex-none snap-center"
            style={{ width: itemWidth, transition: "width .3s ease" }}
          >
            {renderItem ? renderItem(item, idx, idx === active) : defaultRender(item, idx)}
          </div>
        ))}
      </div>

      {/* Dots + Controls */}
      {(showDots || autoScroll) && items.length > perView && (
        <div className="flex items-center justify-center gap-3 mt-5 sm:mt-8">
          {/* Auto-scroll indicator */}
          {autoScroll && (
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              style={{ transition: "color .2s" }}
              aria-label={playing ? "Pause auto-scroll" : "Play auto-scroll"}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: playing ? "#22c55e" : "#9ca3af",
                  boxShadow: playing ? "0 0 6px #22c55e80" : "none",
                  transition: "all .3s",
                }}
              />
              <span>{playing ? "Auto" : "Paused"}</span>
            </button>
          )}

          {/* Dot indicators */}
          {showDots && (
            <div className="flex items-center gap-1.5">
              {Array.from({ length: Math.min(maxPage + 1, items.length) }, (_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => pauseAndGo(i)}
                  className="rounded-full cursor-pointer"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    backgroundColor: i === active ? "#3b82f6" : "#d1d5db",
                    transition: "all .3s cubic-bezier(.4,0,.2,1)",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ScrollCarousel.displayName = "ScrollCarousel";

export { ScrollCarousel };
export default ScrollCarousel;
