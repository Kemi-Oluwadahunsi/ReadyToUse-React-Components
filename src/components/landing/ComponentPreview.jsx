import { useState } from "react";
import {
  ChevronDown,
  Layers,
  Image,
  Calendar,
  CreditCard,
  Layout,
  Terminal,
  Upload,
  Search,
  Check,
  Star,
  Sparkles,
  MousePointerClick,
  Sliders,
  ShieldCheck,
  ChevronsLeftRight,
  Loader,
  GripVertical,
  CircleDot,
  LayoutGrid,
  FileText,
  Clock,
  Bell,
  PanelRight,
  FolderTree,
  Tags,
  BarChart3,
  PanelLeft,
  Navigation,
  KeyRound,
  Crop,
  AlertTriangle,
  ChevronRight,
  Bone,
  LayoutDashboard,
  MessageCircle,
  Hash,
  Copy,
  Users,
  PanelTop,
  Disc,
} from "lucide-react";

export const ComponentPreview = ({ type }) => {
  const [toggleState, setToggleState] = useState(true);
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [hoverRating, setHoverRating] = useState(4);
  const [sliderVal, setSliderVal] = useState(65);

  switch (type) {
    case "/accordion":
      return (
        <div className="w-full max-w-[200px] flex flex-col gap-2">
          <div 
            onClick={(e) => { e.preventDefault(); setAccordionOpen(!accordionOpen); }}
            className="flex items-center justify-between px-3 py-2 rounded-md bg-zinc-900/90 dark:bg-zinc-800/90 border border-zinc-700/60 cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              <div className="w-16 h-2 bg-zinc-300 dark:bg-zinc-200 rounded-full" />
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${accordionOpen ? "rotate-180" : ""}`} />
          </div>
          {accordionOpen && (
            <div className="px-3 py-2 rounded-md bg-zinc-950/60 dark:bg-zinc-900/60 border border-zinc-800/80 space-y-1.5 animate-fadeIn">
              <div className="w-full h-1.5 bg-zinc-400/40 rounded-full" />
              <div className="w-3/4 h-1.5 bg-zinc-400/30 rounded-full" />
            </div>
          )}
        </div>
      );

    case "/toggle":
      return (
        <div 
          onClick={(e) => { e.preventDefault(); setToggleState(!toggleState); }}
          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shadow-inner ${
            toggleState ? "bg-white dark:bg-zinc-200" : "bg-zinc-700 dark:bg-zinc-800"
          }`}
        >
          <div
            className={`bg-zinc-950 dark:bg-zinc-900 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              toggleState ? "translate-x-6" : "translate-x-0"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${toggleState ? "bg-emerald-400" : "bg-zinc-600"}`} />
          </div>
        </div>
      );

    case "/gallery":
      return (
        <div className="grid grid-cols-3 gap-1.5 w-full max-w-[190px]">
          <div className="h-12 rounded bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center">
            <Image className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="h-12 rounded bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center">
            <Image className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="h-12 rounded bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center">
            <Image className="w-4 h-4 text-zinc-400" />
          </div>
        </div>
      );

    case "/date-picker":
      return (
        <div className="flex flex-col items-center p-2.5 rounded-lg bg-zinc-900/90 dark:bg-zinc-800/80 border border-zinc-700/60 shadow-sm w-36">
          <div className="flex items-center justify-between w-full pb-1.5 mb-1.5 border-b border-zinc-700/50 text-[10px] text-zinc-300 font-medium">
            <span>Aug 2026</span>
            <Calendar className="w-3 h-3 text-zinc-400" />
          </div>
          <div className="grid grid-cols-5 gap-1 w-full text-center text-[9px] text-zinc-400">
            <span>12</span>
            <span>13</span>
            <span className="bg-white text-zinc-950 font-bold rounded-sm">14</span>
            <span>15</span>
            <span>16</span>
          </div>
        </div>
      );

    case "/avatar-group":
      return (
        <div className="flex items-center -space-x-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 border-2 border-zinc-950 flex items-center justify-center text-white text-xs font-bold shadow-md">
            JD
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 border-2 border-zinc-950 flex items-center justify-center text-white text-xs font-bold shadow-md">
            AK
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-zinc-950 flex items-center justify-center text-white text-xs font-bold shadow-md">
            MR
          </div>
          <div className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-zinc-300 text-[10px] font-semibold">
            +5
          </div>
        </div>
      );

    case "/kanban":
    case "/cards":
      return (
        <div className="w-full max-w-[210px] bg-dot-matrix p-2.5 rounded-lg border border-zinc-800/80 bg-black/40 flex gap-2">
          <div className="flex-1 space-y-1.5">
            <div className="w-8 h-1.5 bg-zinc-600 rounded-full" />
            <div className="h-7 bg-zinc-800/90 border border-zinc-700/60 rounded p-1 flex items-center">
              <div className="w-full h-1.5 bg-zinc-400 rounded-full" />
            </div>
            <div className="h-7 bg-zinc-800/90 border border-zinc-700/60 rounded p-1 flex items-center">
              <div className="w-3/4 h-1.5 bg-zinc-500 rounded-full" />
            </div>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="w-8 h-1.5 bg-zinc-600 rounded-full" />
            <div className="h-7 bg-zinc-800/90 border border-zinc-700/60 rounded p-1 flex items-center">
              <div className="w-5/6 h-1.5 bg-zinc-400 rounded-full" />
            </div>
          </div>
        </div>
      );

    case "/spotlight-card":
      return (
        <div className="w-full max-w-[190px] h-20 rounded-lg bg-zinc-900/90 border border-zinc-700/80 relative overflow-hidden flex items-center justify-center group-hover:border-zinc-500 transition-all">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)]" />
          <div className="relative z-10 flex items-center gap-2 text-xs font-medium text-white">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Spotlight Glow</span>
          </div>
        </div>
      );

    case "/command-palette":
      return (
        <div className="w-full max-w-[200px] p-2 rounded-lg bg-zinc-900/95 border border-zinc-700/80 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 text-xs">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-300">Type command...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-300 font-mono">⌘K</kbd>
        </div>
      );

    case "/rating":
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              className={`w-5 h-5 cursor-pointer transition-colors ${
                star <= hoverRating ? "text-amber-400 fill-amber-400" : "text-zinc-600"
              }`}
            />
          ))}
        </div>
      );

    case "/otp-input":
      return (
        <div className="flex items-center gap-2">
          {["4", "8", "9", "·"].map((digit, i) => (
            <div
              key={i}
              className={`w-8 h-10 rounded-md border flex items-center justify-center font-mono text-sm font-bold shadow-sm ${
                i === 3
                  ? "border-zinc-400 bg-zinc-900 text-zinc-400 animate-pulse"
                  : "border-zinc-700 bg-zinc-900 text-white"
              }`}
            >
              {digit}
            </div>
          ))}
        </div>
      );

    case "/toast":
      return (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-900/95 border border-zinc-700 shadow-xl max-w-[200px]">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <div className="text-[11px] text-zinc-200 font-medium">Changes saved successfully</div>
        </div>
      );

    case "/skeleton":
      return (
        <div className="w-full max-w-[180px] space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-zinc-800 animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="w-3/4 h-2 bg-zinc-800 rounded animate-pulse" />
              <div className="w-1/2 h-2 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-full h-8 bg-zinc-800/80 rounded animate-pulse" />
        </div>
      );

    case "/tabs":
      return (
        <div className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1">
          <div className="px-3 py-1 rounded-md bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white text-xs font-semibold shadow-sm">
            Overview
          </div>
          <div className="px-3 py-1 rounded-md text-zinc-400 text-xs font-medium">
            Analytics
          </div>
          <div className="px-3 py-1 rounded-md text-zinc-400 text-xs font-medium">
            Settings
          </div>
        </div>
      );

    case "/range-slider":
      return (
        <div className="w-full max-w-[180px] space-y-2">
          <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
            <span>Range</span>
            <span>{sliderVal}%</span>
          </div>
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              setSliderVal(Math.max(0, Math.min(100, pct)));
            }}
            className="h-2 w-full bg-zinc-800 rounded-full relative cursor-pointer"
          >
            <div 
              className="h-full bg-white dark:bg-zinc-200 rounded-full"
              style={{ width: `${sliderVal}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow border-2 border-zinc-900"
              style={{ left: `calc(${sliderVal}% - 8px)` }}
            />
          </div>
        </div>
      );

    case "/marquee":
      return (
        <div className="w-full max-w-[200px] overflow-hidden py-1 border-y border-zinc-800/80 bg-zinc-900/40">
          <div className="flex gap-4 items-center whitespace-nowrap text-[11px] font-mono text-zinc-300 animate-line-beam">
            <span>✦ REACT 19</span>
            <span>✦ TAILWIND V4</span>
            <span>✦ ACCESSIBLE</span>
          </div>
        </div>
      );

    case "/password-strength":
      return (
        <div className="w-full max-w-[180px] space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-zinc-400">Security</span>
            <span className="text-emerald-400 font-medium">Strong</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1.5">
            <div className="rounded-full bg-emerald-500" />
            <div className="rounded-full bg-emerald-500" />
            <div className="rounded-full bg-emerald-500" />
            <div className="rounded-full bg-emerald-500" />
          </div>
        </div>
      );

    case "/badge":
      return (
        <div className="flex flex-wrap items-center gap-1.5 justify-center">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/10 text-violet-300 border border-violet-500/30">
            Pro
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-400">
            v2.0
          </span>
        </div>
      );

    case "/spinner":
      return (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
          <Loader className="w-5 h-5 text-zinc-400 animate-spin" />
        </div>
      );

    case "/color-picker":
      return (
        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800">
          {["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"].map((col) => (
            <div
              key={col}
              className="w-5 h-5 rounded-full shadow-sm cursor-pointer border border-zinc-700/60 hover:scale-110 transition-transform"
              style={{ backgroundColor: col }}
            />
          ))}
        </div>
      );

    case "/data-table":
      return (
        <div className="w-full max-w-[190px] rounded border border-zinc-800 text-[9px] bg-zinc-900/60">
          <div className="grid grid-cols-3 p-1.5 border-b border-zinc-800 font-semibold text-zinc-300">
            <span>Name</span>
            <span>Status</span>
            <span>Role</span>
          </div>
          <div className="grid grid-cols-3 p-1.5 text-zinc-400 border-b border-zinc-800/40">
            <span>Alex</span>
            <span className="text-emerald-400">● Live</span>
            <span>Admin</span>
          </div>
          <div className="grid grid-cols-3 p-1.5 text-zinc-400">
            <span>Sarah</span>
            <span className="text-zinc-500">○ Away</span>
            <span>Dev</span>
          </div>
        </div>
      );

    case "/file-uploader":
      return (
        <div className="w-full max-w-[180px] p-2.5 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/40 flex flex-col items-center justify-center text-center gap-1">
          <Upload className="w-4 h-4 text-zinc-400" />
          <span className="text-[10px] text-zinc-300 font-medium">Drag & drop files</span>
        </div>
      );

    case "/stepper":
      return (
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-white text-zinc-950 font-bold text-[10px] flex items-center justify-center">1</div>
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 font-bold text-[10px] flex items-center justify-center border border-zinc-700">2</div>
          <div className="w-6 h-0.5 bg-zinc-700" />
          <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-500 font-bold text-[10px] flex items-center justify-center border border-zinc-700">3</div>
        </div>
      );

    case "/progress-bar":
      return (
        <div className="w-full max-w-[180px] space-y-1">
          <div className="flex justify-between text-[10px] text-zinc-400">
            <span>Uploading...</span>
            <span className="text-zinc-200">72%</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[72%]" />
          </div>
        </div>
      );

    case "/tree-view":
      return (
        <div className="w-full max-w-[160px] text-[10px] space-y-1 text-zinc-300 font-mono">
          <div className="flex items-center gap-1">
            <FolderTree className="w-3 h-3 text-amber-400" />
            <span>src/</span>
          </div>
          <div className="flex items-center gap-1 pl-3 border-l border-zinc-800">
            <FileText className="w-2.5 h-2.5 text-zinc-400" />
            <span>components/</span>
          </div>
          <div className="flex items-center gap-1 pl-3 border-l border-zinc-800">
            <FileText className="w-2.5 h-2.5 text-sky-400" />
            <span>ReadyUI.jsx</span>
          </div>
        </div>
      );

    case "/breadcrumbs":
      return (
        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
          <span>Home</span>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span>Docs</span>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-white font-medium">UI</span>
        </div>
      );

    case "/tooltip":
      return (
        <div className="relative flex flex-col items-center">
          <div className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-200 shadow-md mb-1.5 flex items-center gap-1">
            <span>Tooltip info</span>
          </div>
          <button className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-xs text-zinc-300">
            Hover me
          </button>
        </div>
      );

    case "/modal":
    case "/confirm-dialog":
      return (
        <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 shadow-2xl max-w-[190px] space-y-2">
          <div className="text-[11px] font-semibold text-white">Delete Project?</div>
          <div className="flex gap-2">
            <div className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-medium">Delete</div>
            <div className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">Cancel</div>
          </div>
        </div>
      );

    case "/multi-select":
      return (
        <div className="flex flex-wrap gap-1 p-1.5 rounded-md bg-zinc-900 border border-zinc-800 max-w-[190px]">
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[10px] flex items-center gap-1">
            React <span className="text-zinc-500">×</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[10px] flex items-center gap-1">
            Tailwind <span className="text-zinc-500">×</span>
          </span>
        </div>
      );

    case "/animated-counter":
      return (
        <div className="text-center font-mono font-bold text-2xl tracking-tight text-white flex items-center justify-center gap-1">
          <span className="text-zinc-400 text-sm">$</span>
          <span>12,450</span>
          <span className="text-emerald-400 text-xs font-sans font-semibold">↑ 24%</span>
        </div>
      );

    case "/copy-to-clipboard":
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700">
          <code className="text-[11px] text-zinc-300 font-mono">npm i readyui</code>
          <Copy className="w-3.5 h-3.5 text-zinc-400" />
        </div>
      );

    case "/timeline":
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="w-0.5 h-4 bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </div>
          <div className="text-[10px] text-zinc-400 space-y-1.5">
            <div className="text-zinc-200">v2.0 Released</div>
            <div>Drafting v2.1</div>
          </div>
        </div>
      );

    case "/ai-prompt":
      return (
        <div className="w-full max-w-[200px] p-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-md space-y-2">
          <div className="text-[10px] text-zinc-400 font-mono">Ask AI or model...</div>
          <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[9px] text-blue-400 font-medium">✦ Claude 3.5</span>
            <div className="w-4 h-4 rounded-md bg-white flex items-center justify-center text-zinc-950 text-[9px] font-bold">↑</div>
          </div>
        </div>
      );

    case "/charts":
      return (
        <div className="flex items-end gap-1.5 h-12 w-full max-w-[170px] justify-center">
          <div className="w-4 h-6 rounded-sm bg-zinc-700" />
          <div className="w-4 h-10 rounded-sm bg-zinc-600" />
          <div className="w-4 h-8 rounded-sm bg-zinc-700" />
          <div className="w-4 h-12 rounded-sm bg-white" />
          <div className="w-4 h-5 rounded-sm bg-zinc-700" />
        </div>
      );

    case "/kpi-card":
      return (
        <div className="w-full max-w-[180px] p-2 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1.5">
          <div className="flex justify-between text-[9px] font-mono text-zinc-400">
            <span>SAVINGS</span>
            <span className="text-emerald-400 font-bold">65%</span>
          </div>
          <div className="text-sm font-mono font-bold text-white">$420,000</div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full w-[65%]" />
          </div>
        </div>
      );

    case "/qr-code":
      return (
        <div className="p-2 rounded-lg bg-white border border-zinc-300 flex items-center justify-center shadow-sm">
          <div className="grid grid-cols-4 gap-0.5 w-10 h-10">
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-transparent" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-transparent" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-transparent" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-transparent" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-zinc-950 rounded-[1px]" />
            <div className="bg-zinc-950 rounded-[1px]" />
          </div>
        </div>
      );

    case "/pricing":
      return (
        <div className="w-full max-w-[180px] p-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-white">Pro Plan</span>
            <span className="font-mono text-xs text-white font-bold">$19/mo</span>
          </div>
          <div className="py-1 rounded bg-white text-zinc-950 text-[10px] font-semibold text-center">
            Upgrade
          </div>
        </div>
      );

    case "/auth-form":
      return (
        <div className="w-full max-w-[180px] p-2 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1.5">
          <div className="text-[10px] font-semibold text-white">Account Login</div>
          <div className="h-5 rounded bg-zinc-800 border border-zinc-700 px-1.5 flex items-center text-[9px] text-zinc-400">
            user@studio.inc
          </div>
          <div className="h-5 rounded bg-zinc-800 border border-zinc-700 px-1.5 flex items-center text-[9px] text-zinc-400">
            ••••••••
          </div>
        </div>
      );

    case "/live-cursors":
      return (
        <div className="w-full max-w-[180px] h-16 rounded-lg bg-zinc-900/90 border border-zinc-800 relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-2 left-4 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="px-1 py-0.2 rounded bg-indigo-600 text-[8px] text-white">Sarah</span>
          </div>
          <div className="absolute bottom-2 right-4 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="px-1 py-0.2 rounded bg-emerald-600 text-[8px] text-white">Alex</span>
          </div>
        </div>
      );

    case "/code-block":
      return (
        <div className="w-full max-w-[190px] rounded-md bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-300 p-2 space-y-1">
          <div className="flex justify-between text-zinc-500 pb-1 border-b border-zinc-800">
            <span>App.tsx</span>
            <span>Copy</span>
          </div>
          <div><span className="text-blue-400">import</span> &#123; ReadyUI &#125;</div>
        </div>
      );

    default:
      return (
        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
          <LayoutGrid className="w-5 h-5" />
        </div>
      );
  }
};
