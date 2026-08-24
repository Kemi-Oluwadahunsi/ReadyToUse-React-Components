import { useState } from "react";
import { Target, TrendingUp, DollarSign, Calendar, ArrowRight, ShieldAlert } from "lucide-react";
import { MiniSparkline } from "./Charts";

export const SavingsTargetCard = ({
  title = "Savings Targets",
  subtitle = "Active milestones for 2026 across your portfolio. Monitor how close you are to each savings goal.",
  targets = [
    { name: "RETIREMENT", current: "$273,000", total: "$420,000", pct: 65 },
    { name: "REAL ESTATE", current: "$27,200", total: "$85,000", pct: 32 },
  ],
  className = "",
}) => {
  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div>
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-5 space-y-4">
          {targets.map((t) => (
            <div key={t.name} className="space-y-1.5">
              <div className="text-[10px] font-mono tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
                {t.name}
              </div>
              <div className="text-xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                {t.total}
              </div>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-500"
                  style={{ width: `${t.pct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                <span>{t.pct}% achieved</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300 font-medium">{t.current}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] text-zinc-400">
        You are pacing ahead of your targets for this year.
      </div>
    </div>
  );
};

export const MilestoneGoalCard = ({
  title = "Set a new milestone",
  subtitle = "Define your financial target and we'll help you pace your savings.",
  className = "",
}) => {
  const [goalName, setGoalName] = useState("Home Downpayment");
  const [amount, setAmount] = useState("$15,000");
  const [date, setDate] = useState("Dec 2026");

  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div>
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Target Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-white outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                Target Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white outline-none focus:border-zinc-400"
              />
            </div>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm">
        Save Threshold
      </button>
    </div>
  );
};

export const DividendIncomeCard = ({ className = "" }) => {
  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 ${className}`}
    >
      <div>
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">
          Q2 Dividend Income
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Quarterly dividend payouts across portfolio holdings.
        </p>
      </div>

      <div className="space-y-2 pt-1">
        <MiniSparkline name="Vanguard Total" shares="450 Shares" data={[30, 45, 60, 50, 75, 90]} />
        <MiniSparkline name="S&P 500 VOO" shares="112 Shares" data={[40, 55, 50, 65, 80, 85]} />
        <MiniSparkline name="Apple AAPL" shares="85 Shares" data={[50, 40, 70, 85, 75, 95]} />
      </div>
    </div>
  );
};
