import { useState } from "react";
import { Check, Copy, Terminal, Code2 } from "lucide-react";

export const CodeBlock = ({
  code = `import { AIPromptInput, ContributionBarChart } from "readyui-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ContributionBarChart />
      <AIPromptInput onSubmit={(data) => console.log(data)} />
    </div>
  );
}`,
  language = "tsx",
  title = "Dashboard.tsx",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-xl overflow-hidden ${className}`}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-zinc-400" />
          <span className="font-mono text-zinc-300 font-medium">{title}</span>
          <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] text-zinc-400 font-mono uppercase">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto font-mono text-xs text-zinc-300 leading-relaxed bg-[#0c0c0e]">
        <pre>{code}</pre>
      </div>
    </div>
  );
};
