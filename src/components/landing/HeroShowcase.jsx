import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Check,
  Sparkles,
  Sliders,
  Bell,
  Lock,
  ChevronRight,
  ChevronDown,
  Layers,
  Bot,
  User,
  Send,
  Smartphone,
  ShieldAlert,
} from "lucide-react";
import { ContributionBarChart, MiniSparkline } from "../Charts";
import {
  SavingsTargetCard,
  MilestoneGoalCard,
  DividendIncomeCard,
} from "../KPICard";
import { QRCodeCard } from "../QRCodeCard";
import { AuthForm } from "../AuthForm";
import { AIPromptInput, ChatMessageBubble } from "../AIPromptInput";

export const HeroShowcase = () => {
  const [toggleVal, setToggleVal] = useState(true);
  const [radioVal, setRadioVal] = useState("a");
  const [promptText, setPromptText] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content:
        "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time a new message comes in, it jumps.",
    },
  ]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          {/* Buttons Row */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/accordion"
              className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-medium text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1 shadow-sm"
            >
              <span>Button</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
              Secondary
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              Outline
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Name..."
              defaultValue=""
              className="w-full pl-3 pr-8 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-400"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Message Textarea */}
          <div>
            <textarea
              placeholder="Message..."
              rows={2}
              defaultValue=""
              className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none resize-none focus:border-zinc-400"
            />
          </div>

          {/* Badges & Radios */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-semibold">
                Badge
              </span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-medium border border-zinc-200 dark:border-zinc-700">
                Secondary
              </span>
            </div>

            {/* Toggle switch mini */}
            <div
              onClick={() => setToggleVal(!toggleVal)}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                toggleVal
                  ? "bg-zinc-900 dark:bg-white"
                  : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white dark:bg-zinc-950 shadow-sm transform transition-transform ${
                  toggleVal ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <Link
              to="/confirm-dialog"
              className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              Alert Dialog →
            </Link>
            <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden text-[10px]">
              <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 font-medium">
                Left
              </span>
              <span className="px-2 py-0.5 border-l border-zinc-200 dark:border-zinc-800 text-zinc-400">
                Right
              </span>
            </div>
          </div>
        </div>

        <ContributionBarChart />
        <MilestoneGoalCard />
        <QRCodeCard />
      </div>

      {/* Second Row of Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start mt-6">
        <SavingsTargetCard />

        <DividendIncomeCard />

        <AuthForm />

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-medium text-zinc-400">
                AI STREAMING CHAT
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                GPT-4o
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed border border-zinc-200/80 dark:border-zinc-800">
              {chatHistory[0].content}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Ask follow-up..."
                className="flex-1 px-2 text-xs bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 outline-none"
              />
              <button
                onClick={() => {
                  if (!promptText.trim()) return;
                  setChatHistory([
                    ...chatHistory,
                    { role: "user", content: promptText },
                  ]);
                  setPromptText("");
                }}
                className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center text-xs"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
