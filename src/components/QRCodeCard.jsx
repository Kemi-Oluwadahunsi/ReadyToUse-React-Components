import { useState } from "react";
import { QrCode, Smartphone, Copy, Check, Share2, Download } from "lucide-react";

export const QRCodeCard = ({
  _title = "Mobile Authentication",
  subtitle = "Scan to connect your mobile device",
  url = "https://readyui.dev/auth/connect?session=8f9a2b",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center justify-between ${className}`}
    >
      <div className="w-full flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium font-mono text-zinc-400">READYUI CONNECT</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      {/* SVG QR Code Pattern Representation */}
      <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-inner my-2 relative group">
        <svg
          viewBox="0 0 120 120"
          className="w-32 h-32 text-zinc-950 fill-current"
        >
          {/* Top-left position block */}
          <rect x="10" y="10" width="30" height="30" rx="4" />
          <rect x="16" y="16" width="18" height="18" fill="white" rx="2" />
          <rect x="20" y="20" width="10" height="10" rx="1" />

          {/* Top-right position block */}
          <rect x="80" y="10" width="30" height="30" rx="4" />
          <rect x="86" y="16" width="18" height="18" fill="white" rx="2" />
          <rect x="90" y="20" width="10" height="10" rx="1" />

          {/* Bottom-left position block */}
          <rect x="10" y="80" width="30" height="30" rx="4" />
          <rect x="16" y="86" width="18" height="18" fill="white" rx="2" />
          <rect x="20" y="90" width="10" height="10" rx="1" />

          {/* Matrix data dots */}
          <rect x="48" y="12" width="6" height="6" rx="1" />
          <rect x="58" y="18" width="6" height="6" rx="1" />
          <rect x="68" y="12" width="6" height="6" rx="1" />
          <rect x="48" y="32" width="6" height="6" rx="1" />
          <rect x="60" y="32" width="6" height="6" rx="1" />

          <rect x="12" y="48" width="6" height="6" rx="1" />
          <rect x="24" y="58" width="6" height="6" rx="1" />
          <rect x="34" y="48" width="6" height="6" rx="1" />
          <rect x="48" y="48" width="8" height="8" rx="1" />
          <rect x="62" y="48" width="6" height="6" rx="1" />
          <rect x="74" y="54" width="6" height="6" rx="1" />
          <rect x="86" y="48" width="6" height="6" rx="1" />
          <rect x="98" y="54" width="6" height="6" rx="1" />

          <rect x="48" y="66" width="6" height="6" rx="1" />
          <rect x="58" y="74" width="6" height="6" rx="1" />
          <rect x="70" y="66" width="8" height="8" rx="1" />
          <rect x="88" y="74" width="6" height="6" rx="1" />

          <rect x="48" y="88" width="6" height="6" rx="1" />
          <rect x="62" y="96" width="8" height="8" rx="1" />
          <rect x="76" y="88" width="6" height="6" rx="1" />
          <rect x="92" y="94" width="6" height="6" rx="1" />
          <rect x="102" y="88" width="6" height="6" rx="1" />
        </svg>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-xs font-semibold text-zinc-900 dark:text-white flex items-center justify-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
          {subtitle}
        </p>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Point camera to sync session instantly
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 w-full flex items-center justify-between gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 py-1.5 px-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 transition-colors flex items-center justify-center gap-1"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied Link" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
};
