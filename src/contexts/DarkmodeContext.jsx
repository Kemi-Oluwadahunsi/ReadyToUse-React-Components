import { createContext, useContext, useState, useEffect, useCallback } from "react";

const DarkModeContext = createContext(null);

/**
 * DarkModeProvider - Context provider for managing dark mode state.
 *
 * @param {React.ReactNode} children
 * @param {string} defaultMode - Initial mode: "light" | "dark" | "system"
 * @param {string} storageKey - localStorage key for persistence
 */
const DarkModeProvider = ({ children, defaultMode = "system", storageKey = "readyui-theme" }) => {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return defaultMode;
    return localStorage.getItem(storageKey) || defaultMode;
  });

  const resolvedDark = (() => {
    if (mode === "dark") return true;
    if (mode === "light") return false;
    if (typeof window !== "undefined") return window.matchMedia("(prefers-color-scheme: dark)").matches;
    return false;
  })();

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [resolvedDark]);

  // Persist
  useEffect(() => {
    localStorage.setItem(storageKey, mode);
  }, [mode, storageKey]);

  // Listen for system changes when mode is "system"
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const root = document.documentElement;
      if (mq.matches) root.classList.add("dark");
      else root.classList.remove("dark");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  const toggleDarkMode = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <DarkModeContext.Provider value={{ mode, setMode, isDark: resolvedDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

/**
 * useDarkMode - Hook to access dark mode context.
 * @returns {{ mode: string, setMode: Function, isDark: boolean, toggleDarkMode: Function }}
 */
const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("useDarkMode must be used within a <DarkModeProvider>");
  return context;
};

export { DarkModeProvider, useDarkMode, DarkModeContext };
export default DarkModeProvider;
