"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { Tooltip } from "@/components/ui/Tooltip";
import type { Language } from "@/types";

interface LanguageSelectorProps {
  selected: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSelector({ selected, onChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = LANGUAGES.find((l) => l.value === selected) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative inline-flex">
      <Tooltip content="Select Language">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-body font-medium
                     rounded-xl border-2 border-slate-300 dark:border-slate-600
                     bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200
                     hover:border-slate-400 dark:hover:border-slate-500
                     transition-colors duration-200"
          aria-label={`Language: ${current.label}`}
        >
          <span className="text-base leading-none">{current.flag}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </motion.button>
      </Tooltip>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 z-50
                       bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600
                       rounded-xl overflow-hidden shadow-lg min-w-[140px]"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                onClick={() => {
                  onChange(lang.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-body
                           transition-colors
                           ${
                             selected === lang.value
                               ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300"
                               : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                           }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
