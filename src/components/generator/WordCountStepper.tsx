"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { WORD_COUNT_MIN, WORD_COUNT_MAX } from "@/lib/constants";

interface WordCountStepperProps {
  count: number;
  onChange: (count: number) => void;
}

export function WordCountStepper({ count, onChange }: WordCountStepperProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-body font-semibold text-slate-400 uppercase tracking-wider">
        Word Count
      </span>
      <div className="flex items-center justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onChange(Math.max(WORD_COUNT_MIN, count - 1))}
          disabled={count <= WORD_COUNT_MIN}
          className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 font-bold transition-colors duration-150 ${
            count > WORD_COUNT_MIN
              ? "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
              : "bg-white/50 text-slate-300 border-slate-200 cursor-not-allowed"
          }`}
          aria-label="Decrease word count"
        >
          <Minus size={16} strokeWidth={2.5} />
        </motion.button>

        <div className="w-12 h-11 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.15 }}
              className="font-display font-bold text-2xl text-slate-800"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onChange(Math.min(WORD_COUNT_MAX, count + 1))}
          disabled={count >= WORD_COUNT_MAX}
          className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 font-bold transition-colors duration-150 ${
            count < WORD_COUNT_MAX
              ? "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
              : "bg-white/50 text-slate-300 border-slate-200 cursor-not-allowed"
          }`}
          aria-label="Increase word count"
        >
          <Plus size={16} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
