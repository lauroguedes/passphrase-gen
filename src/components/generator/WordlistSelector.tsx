"use client";

import { motion } from "framer-motion";
import { WORDLISTS } from "@/lib/constants";
import { Tooltip } from "@/components/ui/Tooltip";
import type { WordlistType } from "@/types";

interface WordlistSelectorProps {
  selected: WordlistType;
  onChange: (value: WordlistType) => void;
}

export function WordlistSelector({ selected, onChange }: WordlistSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-body font-semibold text-slate-400 uppercase tracking-wider">
        Word List
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {WORDLISTS.map((wl) => (
          <Tooltip key={wl.value} content={wl.tooltip}>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onChange(wl.value)}
              className={`h-11 px-5 text-sm font-display font-bold rounded-xl border-2 transition-colors duration-150 ${
                selected === wl.value
                  ? "bg-indigo-500 text-white border-indigo-600"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
              }`}
              style={
                selected === wl.value
                  ? { boxShadow: "var(--shadow-brutal-sm)" }
                  : {}
              }
              aria-label={wl.tooltip}
            >
              {wl.icon}
            </motion.button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
