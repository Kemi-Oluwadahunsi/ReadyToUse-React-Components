import { useState } from "react";
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  ChevronDown,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

export const AIPromptInput = ({
  onSubmit,
  placeholder = "Ask anything or type a prompt...",
  models = ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 2.5 Flash", "DeepSeek R1"],
  defaultModel = "Claude 3.5 Sonnet",
  className = "",
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return;
    onSubmit?.({ prompt, model: selectedModel, files: attachedFiles });
    setPrompt("");
    setAttachedFiles([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={`w-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all focus-within:border-zinc-400 dark:focus-within:border-zinc-700 focus-within:ring-2 focus-within:ring-zinc-950/5 dark:focus-within:ring-white/5 ${className}`}
    >
      {/* Attached Files Pills */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4 pt-3">
          {attachedFiles.map((file, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
            >
              <Paperclip className="w-3 h-3 text-zinc-400" />
              <span className="truncate max-w-[120px]">{file}</span>
              <button
                onClick={() =>
                  setAttachedFiles(attachedFiles.filter((_, idx) => idx !== i))
                }
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Main Textarea */}
      <div className="p-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          className="w-full resize-none bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none"
        />
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5 relative">
          {/* Model Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{selectedModel}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showModelDropdown && (
              <div className="absolute bottom-full mb-1 left-0 z-20 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg p-1 space-y-0.5 animate-fadeIn">
                {models.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedModel(m);
                      setShowModelDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedModel === m
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <span>{m}</span>
                    {selectedModel === m && (
                      <Check className="w-3.5 h-3.5 text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Attach Button */}
          <button
            type="button"
            onClick={() => {
              const fileName = `document_${attachedFiles.length + 1}.pdf`;
              setAttachedFiles([...attachedFiles, fileName]);
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Input */}
          <button
            type="button"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!prompt.trim()}
          className={`p-2 rounded-xl transition-all flex items-center justify-center ${
            prompt.trim()
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
          }`}
          title="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const ChatMessageBubble = ({
  role = "assistant",
  content,
  timestamp = "Just now",
  isStreaming = false,
}) => {
  const [copied, setCopied] = useState(false);
  const isAssistant = role === "assistant" || role === "ai";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 w-full ${isAssistant ? "justify-start" : "justify-end"}`}>
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 flex-shrink-0 shadow-sm">
          <Bot className="w-4 h-4 text-blue-500" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col ${isAssistant ? "items-start" : "items-end"}`}>
        <div
          className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
            isAssistant
              ? "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm"
              : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-tr-sm shadow-sm"
          }`}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          {isStreaming && (
            <span className="inline-block w-1.5 h-3.5 ml-1 bg-blue-500 animate-pulse align-middle" />
          )}
        </div>

        {/* Action meta bar */}
        <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-zinc-400">
          <span>{timestamp}</span>
          {isAssistant && (
            <>
              <span>•</span>
              <button
                onClick={handleCopy}
                className="hover:text-zinc-600 dark:hover:text-zinc-200 flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {!isAssistant && (
        <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
