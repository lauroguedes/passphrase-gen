"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const labels = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden />;
  }

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const key = (theme ?? "system") as keyof typeof icons;
  const Icon = icons[key] ?? Monitor;
  const label = labels[key] ?? "System";

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={cycleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors duration-200 hover:border-slate-400 dark:hover:border-slate-500"
      aria-label={`Current theme: ${label}. Click to cycle.`}
      title={`Theme: ${label}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={18} strokeWidth={2} />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
