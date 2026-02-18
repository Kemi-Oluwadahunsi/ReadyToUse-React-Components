import injectRuiStyles from "./injectRuiStyles";

/**
 * Skeleton - Content placeholder with pulse/wave animation.
 */
/*
 * @param {string} variant - "text" | "circle" | "rect" | "card" | "avatar" | "list" | "table" | "button" | "banner" | "profile" (default "text")
 * @param {string|number} width - CSS width (default "100%")
 * @param {string|number} height - CSS height (default varies by variant)
 * @param {number} lines - Number of text lines (variant="text", default 3)
 * @param {number} rows - Number of rows (variant="list"|"table", default 4)
 * @param {number} cols - Number of columns (variant="table", default 4)
 * @param {string} animation - "pulse" | "wave" | "none" (default "pulse")
 * @param {number} borderRadius - Border radius in px (default varies)
 * @param {string} className - Extra CSS
 * @param {React.ReactNode} children - When provided, skeleton shown until children render
 * @param {boolean} loading - If false, render children instead of skeleton
 */
const Skeleton = ({
  variant = "text",
  width,
  height,
  lines = 3,
  rows = 4,
  cols = 4,
  animation = "pulse",
  borderRadius,
  className = "",
  loading = true,
  children,
}) => {
  injectRuiStyles();
  if (!loading && children) return children;

  const baseColor = "bg-gray-200 dark:bg-zinc-700";
  const animClass = animation === "pulse" ? "animate-pulse" : animation === "wave" ? "rui-skeleton-wave" : "";

  const radius = borderRadius !== undefined
    ? borderRadius
    : variant === "circle" ? "50%" : variant === "text" ? 6 : 12;

  const radiusStyle = typeof radius === "number" ? `${radius}px` : radius;

  if (variant === "circle") {
    const size = width || height || 48;
    return (
      <div
        className={`${baseColor} ${animClass} flex-shrink-0 ${className}`}
        style={{ width: size, height: size, borderRadius: "50%" }}
      />
    );
  }

  if (variant === "rect") {
    return (
      <div
        className={`${baseColor} ${animClass} ${className}`}
        style={{
          width: width || "100%",
          height: height || 120,
          borderRadius: radiusStyle,
        }}
      />
    );
  }

  if (variant === "card") {
    return (
      <div className={`${baseColor} ${animClass} rounded-2xl overflow-hidden ${className}`} style={{ width: width || "100%" }}>
        {/* Image placeholder */}
        <div className="w-full bg-gray-300 dark:bg-zinc-600" style={{ height: height || 180 }} />
        {/* Text lines */}
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-3/4" />
          <div className="h-3 bg-gray-300 dark:bg-zinc-600 rounded w-full" />
          <div className="h-3 bg-gray-300 dark:bg-zinc-600 rounded w-2/3" />
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-zinc-600" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-300 dark:bg-zinc-600 rounded w-24" />
              <div className="h-2.5 bg-gray-300 dark:bg-zinc-600 rounded w-16" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---- avatar: circle + text lines side by side ---- */
  if (variant === "avatar") {
    const size = height || 48;
    return (
      <div className={`flex items-center gap-3 ${className}`} style={{ width: width || "100%" }}>
        <div
          className={`${baseColor} ${animClass} flex-shrink-0`}
          style={{ width: size, height: size, borderRadius: "50%" }}
        />
        <div className="flex-1 space-y-2">
          <div className={`${baseColor} ${animClass} rounded`} style={{ height: 14, width: "55%" }} />
          <div className={`${baseColor} ${animClass} rounded`} style={{ height: 10, width: "35%" }} />
        </div>
      </div>
    );
  }

  /* ---- list: multiple rows with icon-bullet + text ---- */
  if (variant === "list") {
    return (
      <div className={`space-y-3 ${className}`} style={{ width: width || "100%" }}>
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`${baseColor} ${animClass} flex-shrink-0 rounded`}
              style={{ width: 28, height: 28, borderRadius: 6 }}
            />
            <div className="flex-1 space-y-1.5">
              <div
                className={`${baseColor} ${animClass} rounded`}
                style={{ height: 12, width: i % 2 === 0 ? "80%" : "65%" }}
              />
              <div
                className={`${baseColor} ${animClass} rounded`}
                style={{ height: 10, width: i % 2 === 0 ? "50%" : "40%" }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ---- table: grid mimicking a data table ---- */
  if (variant === "table") {
    return (
      <div className={`${baseColor} ${animClass} rounded-xl overflow-hidden ${className}`} style={{ width: width || "100%" }}>
        {/* Header row */}
        <div className="flex gap-2 p-3 bg-gray-300 dark:bg-zinc-600">
          {Array.from({ length: cols }, (_, c) => (
            <div key={c} className="flex-1 h-3.5 bg-gray-400/40 dark:bg-zinc-500/50 rounded" />
          ))}
        </div>
        {/* Body rows */}
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} className={`flex gap-2 p-3 ${r % 2 === 0 ? "" : "bg-gray-300/30 dark:bg-zinc-600/30"}`}>
            {Array.from({ length: cols }, (_, c) => (
              <div
                key={c}
                className="flex-1 h-3 bg-gray-300 dark:bg-zinc-600 rounded"
                style={{ width: c === 0 ? "40%" : undefined }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  /* ---- button: button-shaped placeholder ---- */
  if (variant === "button") {
    return (
      <div
        className={`${baseColor} ${animClass} inline-block ${className}`}
        style={{
          width: width || 120,
          height: height || 40,
          borderRadius: borderRadius !== undefined ? radiusStyle : 8,
        }}
      />
    );
  }

  /* ---- banner: wide hero / banner area ---- */
  if (variant === "banner") {
    return (
      <div
        className={`${baseColor} ${animClass} rounded-xl overflow-hidden relative ${className}`}
        style={{ width: width || "100%", height: height || 200 }}
      >
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-zinc-600 rounded w-2/5" />
          <div className="h-3 bg-gray-300 dark:bg-zinc-600 rounded w-3/5" />
        </div>
      </div>
    );
  }

  /* ---- profile: avatar + name + bio + stat blocks ---- */
  if (variant === "profile") {
    const avatarSize = 80;
    return (
      <div className={`flex flex-col items-center text-center space-y-4 ${className}`} style={{ width: width || "100%" }}>
        <div
          className={`${baseColor} ${animClass} flex-shrink-0`}
          style={{ width: avatarSize, height: avatarSize, borderRadius: "50%" }}
        />
        <div className="space-y-2 w-full flex flex-col items-center">
          <div className={`${baseColor} ${animClass} rounded`} style={{ height: 16, width: "40%" }} />
          <div className={`${baseColor} ${animClass} rounded`} style={{ height: 10, width: "60%" }} />
        </div>
        <div className="flex gap-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div className={`${baseColor} ${animClass} rounded`} style={{ height: 18, width: 36 }} />
              <div className={`${baseColor} ${animClass} rounded`} style={{ height: 10, width: 44 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // variant === "text"
  const lineWidths = Array.from({ length: lines }, (_, i) =>
    i === lines - 1 ? "60%" : i % 2 === 0 ? "100%" : "85%"
  );

  return (
    <div className={`space-y-2.5 ${className}`} style={{ width: width || "100%" }}>
      {lineWidths.map((w, i) => (
        <div
          key={i}
          className={`${baseColor} ${animClass}`}
          style={{
            width: w,
            height: height || 12,
            borderRadius: radiusStyle,
          }}
        />
      ))}

    </div>
  );
};

/**
 * SkeletonGroup - Renders N skeleton copies for list placeholders.
 */
/*
 * @param {number} count - How many skeletons (default 3)
 * @param {Function} renderItem - (index) => JSX. If omitted, renders <Skeleton variant="text" />
 * @param {string} className - Extra CSS on wrapper
 * @param {number} gap - Gap in px between items (default 16)
 */
const SkeletonGroup = ({ count = 3, renderItem, className = "", gap = 16 }) => (
  <div className={className} style={{ display: "flex", flexDirection: "column", gap }}>
    {Array.from({ length: count }, (_, i) =>
      renderItem ? renderItem(i) : <Skeleton key={i} variant="text" lines={2} />
    )}
  </div>
);

Skeleton.displayName = "Skeleton";
SkeletonGroup.displayName = "SkeletonGroup";

export { Skeleton, SkeletonGroup };
export default Skeleton;
