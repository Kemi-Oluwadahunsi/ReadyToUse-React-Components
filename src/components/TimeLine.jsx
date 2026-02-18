import { Calendar, MapPin } from "lucide-react";
import injectRuiStyles from "./injectRuiStyles";

/**
 * TimeLine - A vertical timeline component for displaying chronological events.
 */
/*
 * @param {Array} items - Timeline items: { id, title, description, date, icon?, color?, tag?, tagColor? }
 * @param {string} variant - "default" | "alternating" | "compact"
 * @param {string} lineColor - CSS color for the connecting line
 * @param {string} className - Additional CSS classes
 * @param {Function} renderItem - Custom item renderer: (item, index) => JSX
 * @param {boolean} animate - Enable fade-in animation
 */
const TimeLine = ({
  items = [],
  variant = "default",
  lineColor = "bg-blue-500",
  className = "",
  renderItem,
  animate = true,
}) => {
  injectRuiStyles();
  const colorMap = {
    blue: "bg-blue-500 ring-blue-100 dark:ring-blue-900/40",
    green: "bg-emerald-500 ring-emerald-100 dark:ring-emerald-900/40",
    red: "bg-red-500 ring-red-100 dark:ring-red-900/40",
    purple: "bg-purple-500 ring-purple-100 dark:ring-purple-900/40",
    orange: "bg-orange-500 ring-orange-100 dark:ring-orange-900/40",
    yellow: "bg-amber-500 ring-amber-100 dark:ring-amber-900/40",
    gray: "bg-gray-500 ring-gray-100 dark:ring-gray-800",
  };

  const tagColorMap = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  };

  const getAnimationDelay = (index) => (animate ? { animationDelay: `${index * 100}ms` } : {});

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-400 dark:text-gray-500 py-12 text-sm">
        No timeline items to display.
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`relative ${className}`}>
        <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${lineColor} opacity-20`} />
        <div className="space-y-3 sm:space-y-4">
          {items.map((item, idx) => (
            <div
              key={item.id ?? idx}
              className={`relative pl-8 sm:pl-10 ${animate ? "rui-animate-fade-in opacity-0" : ""}`}
              style={getAnimationDelay(idx)}
            >
              <div className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full ring-4 ${colorMap[item.color] || colorMap.blue}`} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                {item.date && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Line */}
      <div
        className={`absolute ${
          variant === "alternating" ? "left-4 sm:left-1/2 sm:-translate-x-1/2" : "left-4 sm:left-5"
        } top-0 bottom-0 w-0.5 ${lineColor} opacity-20`}
      />

      <div className="space-y-6 sm:space-y-8">
        {items.map((item, idx) => {
          if (renderItem) return renderItem(item, idx);

          const isLeft = variant === "alternating" && idx % 2 === 0;
          const isRight = variant === "alternating" && idx % 2 !== 0;

          return (
            <div
              key={item.id ?? idx}
              className={`relative flex items-start ${
                variant === "alternating" ? "justify-center" : ""
              } ${animate ? "rui-animate-fade-in opacity-0" : ""}`}
              style={getAnimationDelay(idx)}
            >
              {variant === "alternating" ? (
                <>
                  {/* Left content — hidden on mobile, shown on sm+ */}
                  <div className={`hidden sm:block w-5/12 ${isLeft ? "text-right pr-8" : ""}`}>
                    {isLeft && <TimelineCard item={item} colorMap={colorMap} tagColorMap={tagColorMap} align="right" />}
                  </div>

                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-4 flex items-center justify-center text-white ${
                        colorMap[item.color] || colorMap.blue
                      }`}
                    >
                      {item.icon || <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    </div>
                  </div>

                  {/* Right content — hidden on mobile, shown on sm+ */}
                  <div className={`hidden sm:block w-5/12 ${isRight ? "pl-8" : ""}`}>
                    {isRight && <TimelineCard item={item} colorMap={colorMap} tagColorMap={tagColorMap} align="left" />}
                  </div>

                  {/* Mobile: always show content to the right */}
                  <div className="sm:hidden ml-4 flex-1">
                    <TimelineCard item={item} colorMap={colorMap} tagColorMap={tagColorMap} />
                  </div>
                </>
              ) : (
                <>
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-4 flex items-center justify-center text-white ${
                        colorMap[item.color] || colorMap.blue
                      }`}
                    >
                      {item.icon || <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-4 sm:ml-6 flex-1">
                    <TimelineCard item={item} colorMap={colorMap} tagColorMap={tagColorMap} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TimelineCard = ({ item, tagColorMap }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 flex-wrap mb-1">
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{item.title}</h3>
      {item.tag && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColorMap[item.tagColor] || tagColorMap.blue}`}>
          {item.tag}
        </span>
      )}
    </div>
    {item.date && (
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1">
        <Calendar className="h-3 w-3" /> {item.date}
      </p>
    )}
    {item.description && <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>}
    {item.location && (
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
        <MapPin className="h-3 w-3" /> {item.location}
      </p>
    )}
  </div>
);

TimeLine.displayName = "TimeLine";
TimelineCard.displayName = "TimelineCard";

export { TimeLine, TimelineCard };
export default TimeLine;
