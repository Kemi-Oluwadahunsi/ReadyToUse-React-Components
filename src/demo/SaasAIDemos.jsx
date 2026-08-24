import { useState } from "react";
import { AIPromptInput, ChatMessageBubble } from "../components/AIPromptInput";
import { ContributionBarChart, MiniSparkline } from "../components/Charts";
import { SavingsTargetCard, MilestoneGoalCard, DividendIncomeCard } from "../components/KPICard";
import { QRCodeCard } from "../components/QRCodeCard";
import { PricingTable } from "../components/PricingTable";
import { AuthForm } from "../components/AuthForm";
import { LiveCursors } from "../components/LiveCursors";
import { CodeBlock } from "../components/CodeBlock";

export const AIPromptDemo = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your AI design assistant. How can I help you customize your ReadyUI components today?",
    },
  ]);

  const handleSend = ({ prompt, model }) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt },
      {
        role: "assistant",
        content: `Generated response using ${model}: Here is an optimized layout matching your criteria with full responsive breakpoints.`,
      },
    ]);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">AI Prompt Input & Chat UI</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Modern AI chat interface with model selection, attachments, voice input, and message bubbles.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="space-y-4 min-h-[220px]">
          {messages.map((m, i) => (
            <ChatMessageBubble key={i} role={m.role} content={m.content} />
          ))}
        </div>

        <AIPromptInput onSubmit={handleSend} />
      </div>
    </div>
  );
};

export const BarChartDemo = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Contribution & Bar Charts</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Lightweight SVG & Tailwind charts for activity metrics, savings history, and portfolio assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContributionBarChart />
        <DividendIncomeCard />
      </div>
    </div>
  );
};

export const KPICardDemo = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">KPI & Milestone Cards</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Financial savings targets, milestone goal setters, and portfolio allocation cards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SavingsTargetCard />
        <MilestoneGoalCard />
      </div>
    </div>
  );
};

export const QRCodeDemo = () => {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">QR Code Generator</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Interactive QR code card for seamless mobile pairing and two-factor auth sync.
        </p>
      </div>

      <div className="flex justify-center">
        <QRCodeCard className="w-full max-w-sm" />
      </div>
    </div>
  );
};

export const PricingTableDemo = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
          SaaS Pricing Table
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Configurable pricing tiers with annual/monthly discount switch and feature checklists.
        </p>
      </div>

      <PricingTable />
    </div>
  );
};

export const AuthFormDemo = () => {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Account Access & Auth</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Credential management, password verification, and danger zone security settings.
        </p>
      </div>

      <AuthForm />
    </div>
  );
};

export const LiveCursorsDemo = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Live Multiplayer Presence</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Real-time collaborative cursors and avatar presence indicators.
        </p>
      </div>

      <LiveCursors />
    </div>
  );
};

export const CodeBlockDemo = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Code Block & Syntax Display</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Syntax-styled code viewer with language badge, file name, and one-click copy.
        </p>
      </div>

      <CodeBlock />
    </div>
  );
};
