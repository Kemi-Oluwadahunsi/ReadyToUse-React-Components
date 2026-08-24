import { useState } from "react";
import { TrendingUp, BarChart2, Calendar, ArrowUpRight } from "lucide-react";

export const ContributionBarChart = ({
  title = "Contribution History",
  subtitle = "Last 6 months of activity",
  data = [
    { label: "Dec", value: 65 },
    { label: "Jan", value: 85 },
    { label: "Feb", value: 70 },
    { label: "Mar", value: 92 },
    { label: "Apr", value: 50 },
    { label: "May", value: 78 },
  ],
  className = "",
}) => {
  const [activeIdx, setActiveIdx] = useState(3);
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">
            {title}
          </h3>
          <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
            +18.4% <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
      </div>

      {/* Bars container */}
      <div className="pt-6 pb-2 flex items-end justify-between gap-2.5 h-36">
        {data.map((item, index) => {
          const heightPct = (item.value / maxVal) * 100;
          const isSelected = activeIdx === index;
          return (
            <div
              key={item.label}
              onMouseEnter={() => setActiveIdx(index)}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end"
            >
              <div
                className="w-full relative flex items-end justify-center rounded-lg overflow-hidden transition-all duration-300"
                style={{ height: `${heightPct}%` }}
              >
                <div
                  className={`w-full h-full rounded-lg transition-colors duration-200 ${
                    isSelected
                      ? "bg-zinc-900 dark:bg-white shadow-md"
                      : "bg-zinc-200 dark:bg-zinc-700/80 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-medium transition-colors ${
                  isSelected
                    ? "text-zinc-900 dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom selected tooltip */}
      <div className="pt-3 mt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
        <span className="text-zinc-500 dark:text-zinc-400">
          Selected: <strong className="text-zinc-900 dark:text-white">{data[activeIdx]?.label}</strong>
        </span>
        <span className="font-mono font-semibold text-zinc-900 dark:text-white">
          {data[activeIdx]?.value} contributions
        </span>
      </div>
    </div>
  );
};

export const MiniSparkline = ({
  name = "Vanguard",
  shares = "450 Shares",
  data = [30, 40, 35, 50, 70, 85],
  _color = "emerald",
}) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800">
      <div>
        <div className="font-semibold text-xs text-zinc-900 dark:text-white">{name}</div>
        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{shares}</div>
      </div>
      <div className="flex items-end gap-1 h-6">
        {data.map((val, i) => (
          <div
            key={i}
            className="w-1.5 rounded-sm bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-900 dark:hover:bg-white transition-colors"
            style={{ height: `${(val / 100) * 24}px` }}
          />
        ))}
      </div>
    </div>
  );
};
