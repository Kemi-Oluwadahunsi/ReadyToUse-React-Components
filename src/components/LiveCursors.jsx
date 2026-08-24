import { useState, useEffect } from "react";
import { MousePointer, Users, Sparkles } from "lucide-react";

export const LiveCursors = ({ className = "" }) => {
  const [cursors, setCursors] = useState([
    { id: "1", name: "Sarah (Design)", x: 28, y: 35, color: "bg-indigo-500", text: "text-indigo-400" },
    { id: "2", name: "Alex (Engineering)", x: 68, y: 55, color: "bg-emerald-500", text: "text-emerald-400" },
    { id: "3", name: "Elena (AI Lead)", x: 42, y: 78, color: "bg-pink-500", text: "text-pink-400" },
  ]);

  // Subtle floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursors((prev) =>
        prev.map((c) => ({
          ...c,
          x: Math.max(15, Math.min(85, c.x + (Math.random() * 8 - 4))),
          y: Math.max(20, Math.min(80, c.y + (Math.random() * 8 - 4))),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden min-h-[260px] flex flex-col justify-between select-none ${className}`}
    >
      <div className="flex items-center justify-between z-10">
        <div>
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-500" />
            Live Presence
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time collaborative cursors & active users.
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-semibold">
          3 Connected
        </span>
      </div>

      {/* Background Dot Canvas */}
      <div className="absolute inset-0 bg-dot-matrix opacity-60 pointer-events-none" />

      {/* Floating Cursors */}
      <div className="absolute inset-0 pointer-events-none">
        {cursors.map((cursor) => (
          <div
            key={cursor.id}
            className="absolute transition-all duration-1000 ease-out flex flex-col items-start"
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          >
            <svg
              className={`w-4 h-4 -rotate-45 fill-current ${cursor.text}`}
              viewBox="0 0 24 24"
            >
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
            <div
              className={`px-2 py-0.5 rounded-md text-[10px] text-white font-medium shadow-md ml-3 -mt-1 whitespace-nowrap ${cursor.color}`}
            >
              {cursor.name}
            </div>
          </div>
        ))}
      </div>

      <div className="z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
        <span>ReadyUI Multiplayer Room</span>
        <span className="font-mono text-[10px]">ws://room-901</span>
      </div>
    </div>
  );
};
