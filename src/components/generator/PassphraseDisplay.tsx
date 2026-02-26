"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { GeneratedWord, SeparatorOption } from "@/types";

interface PassphraseDisplayProps {
  words: GeneratedWord[];
  separator: SeparatorOption;
  generationKey: number;
}

const wordVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15 },
  },
};

export function PassphraseDisplay({
  words,
  separator,
  generationKey,
}: PassphraseDisplayProps) {
  return (
    <div className="min-h-[120px] flex items-center justify-center py-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={generationKey}
          className="flex flex-wrap items-baseline justify-center gap-x-1 gap-y-3"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {words.map((item, i) => (
            <motion.span
              key={`${generationKey}-${i}`}
              custom={i}
              variants={wordVariants}
              className="inline-flex items-baseline"
            >
              {i > 0 && separator && (
                <span className="text-indigo-400 font-mono text-xl md:text-2xl mx-1 select-none">
                  {separator}
                </span>
              )}
              <span className="font-mono text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-100">
                {item.display}
              </span>
              <sub className="text-[10px] md:text-xs text-slate-400 font-mono ml-0.5 select-none">
                {item.diceIndex}
              </sub>
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
