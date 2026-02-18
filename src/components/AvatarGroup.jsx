/**
 * AvatarGroup - Stacked user avatars with image/initials, status dot, and +N overflow.
 */
/*
 * @param {Array} avatars - Array of { src?, name, status? ("online"|"offline"|"busy"|"away") }
 * @param {number} max - Max visible avatars before "+N" badge (default 5)
 * @param {string} size - "xs" | "sm" | "md" | "lg" | "xl" (default "md")
 * @param {string} variant - "stack" | "grid" (default "stack")
 * @param {number} spacing - Negative overlap in px for stack (default varies by size)
 * @param {boolean} bordered - White ring around each avatar (default true)
 * @param {Function} onAvatarClick - (avatar, index) => void
 * @param {Function} onOverflowClick - (hiddenAvatars) => void
 * @param {string} className - Extra CSS
 */
import { useState } from "react";

const sizes = {
  xs: { wh: 24, text: "text-[10px]", dot: 6 },
  sm: { wh: 32, text: "text-xs", dot: 8 },
  md: { wh: 40, text: "text-sm", dot: 10 },
  lg: { wh: 48, text: "text-base", dot: 12 },
  xl: { wh: 56, text: "text-lg", dot: 14 },
};

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-yellow-500",
};

const bgColors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-rose-500",
  "bg-amber-500", "bg-cyan-500", "bg-pink-500", "bg-indigo-500",
  "bg-teal-500", "bg-orange-500",
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const Avatar = ({ avatar, index, sz, bordered, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const { wh, text, dot } = sz;
  const initials = getInitials(avatar.name);
  const bg = bgColors[index % bgColors.length];

  return (
    <button
      type="button"
      onClick={onClick ? () => onClick(avatar, index) : undefined}
      className={`relative flex-shrink-0 rounded-full ${onClick ? "cursor-pointer hover:z-30 hover:scale-110 transition-transform" : "cursor-default"} ${bordered ? "ring-2 ring-white dark:ring-zinc-900" : ""} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      style={{ width: wh, height: wh }}
      title={avatar.name}
    >
      {avatar.src && !imgError ? (
        <img
          src={avatar.src}
          alt={avatar.name}
          onError={() => setImgError(true)}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className={`w-full h-full rounded-full ${bg} flex items-center justify-center text-white font-semibold ${text}`}>
          {initials}
        </div>
      )}
      {avatar.status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ${statusColors[avatar.status] || "bg-gray-400"} border-2 border-white dark:border-zinc-900`}
          style={{ width: dot, height: dot }}
        />
      )}
    </button>
  );
};

const AvatarGroup = ({
  avatars = [],
  max = 5,
  size = "md",
  variant = "stack",
  spacing,
  bordered = true,
  onAvatarClick,
  onOverflowClick,
  className = "",
}) => {
  const sz = sizes[size] || sizes.md;
  const visible = avatars.slice(0, max);
  const hidden = avatars.slice(max);
  const overlap = spacing !== undefined ? spacing : -(sz.wh * 0.3);

  if (variant === "grid") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {visible.map((av, i) => (
          <Avatar key={i} avatar={av} index={i} sz={sz} bordered={bordered} onClick={onAvatarClick} />
        ))}
        {hidden.length > 0 && (
          <button
            type="button"
            onClick={onOverflowClick ? () => onOverflowClick(hidden) : undefined}
            className={`flex-shrink-0 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold ${sz.text} ${bordered ? "ring-2 ring-white dark:ring-zinc-900" : ""} ${onOverflowClick ? "cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors" : "cursor-default"}`}
            style={{ width: sz.wh, height: sz.wh }}
          >
            +{hidden.length}
          </button>
        )}
      </div>
    );
  }

  // Stack variant
  return (
    <div className={`flex items-center ${className}`}>
      {visible.map((av, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : overlap }} className="relative z-[1] hover:z-20">
          <Avatar avatar={av} index={i} sz={sz} bordered={bordered} onClick={onAvatarClick} />
        </div>
      ))}
      {hidden.length > 0 && (
        <button
          type="button"
          onClick={onOverflowClick ? () => onOverflowClick(hidden) : undefined}
          className={`relative z-[1] flex-shrink-0 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold ${sz.text} ${bordered ? "ring-2 ring-white dark:ring-zinc-900" : ""} ${onOverflowClick ? "cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors" : "cursor-default"}`}
          style={{ width: sz.wh, height: sz.wh, marginLeft: overlap }}
        >
          +{hidden.length}
        </button>
      )}
    </div>
  );
};

Avatar.displayName = "Avatar";
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
export default AvatarGroup;
