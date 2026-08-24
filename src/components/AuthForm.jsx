import { useState } from "react";
import { Lock, Mail, Github, ShieldAlert, ArrowRight, Check, Eye, EyeOff } from "lucide-react";

export const AuthForm = ({ className = "" }) => {
  const [email, setEmail] = useState("artist@studio.inc");
  const [password, setPassword] = useState("••••••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }, 1000);
  };

  return (
    <div
      className={`p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div>
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">
          Account Access
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Update your credentials or re-authenticate.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white outline-none focus:border-zinc-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                Current Password
              </label>
              <button
                type="button"
                className="text-[10px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 uppercase font-mono"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1.5 pr-8 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white outline-none focus:border-zinc-400 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            {loading ? (
              <span>Updating...</span>
            ) : success ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Security Updated</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Update Security</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-1 text-red-500/80 hover:text-red-500 cursor-pointer">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Danger Zone</span>
        </div>
        <span className="text-[10px] text-zinc-400">Archive or delete</span>
      </div>
    </div>
  );
};
