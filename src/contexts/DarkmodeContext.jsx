import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved ? saved === "true" : systemDark);
    setIsInit(true);
  }, []);

  useEffect(() => {
    if (!isInit) return;

    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", isDark);
  }, [isDark, isInit]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within DarkModeProvider");
  return context;
};
