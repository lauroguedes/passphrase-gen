"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Binary, Dice5, Timer, ExternalLink, Info } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { computeEntropy } from "@/lib/entropy";
import type { WordlistType } from "@/types";

interface EntropyStatsProps {
  wordCount: number;
  wordlistType: WordlistType;
}

export function EntropyStats({ wordCount, wordlistType }: EntropyStatsProps) {
  const entropy = useMemo(
    () => computeEntropy(wordCount, wordlistType),
    [wordCount, wordlistType],
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <GlassCard className="p-6 md:p-10" hover>
        <SectionHeading>Entropy Statistics</SectionHeading>

        {/* Zone 1 — Hero Stat */}
        <div className="mb-8">
          <div className="flex items-baseline gap-3 mb-3">
            <motion.span
              key={entropy.totalBits}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="font-display font-bold text-5xl md:text-6xl text-slate-800 dark:text-white tabular-nums"
            >
              {entropy.totalBits.toFixed(1)}
            </motion.span>
            <span className="font-body text-sm md:text-base text-slate-500 dark:text-slate-400">
              bits of entropy
            </span>
          </div>

          {/* Strength bar */}
          <div className="relative h-3 rounded-full bg-slate-200/60 dark:bg-slate-700/60 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-400 to-mint-400"
              initial={{ width: 0 }}
              animate={{ width: `${entropy.strength.percent}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span
              className={`font-display font-bold text-sm ${entropy.strength.color}`}
            >
              {entropy.strength.label}
            </span>
            <span className="font-mono text-xs text-slate-400">
              {entropy.strength.percent}%
            </span>
          </div>
        </div>

        {/* Zone 2 — Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
          {/* Keyspace */}
          <motion.div
            key={`keyspace-${entropy.keyspaceDisplay}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/40"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
              <Binary size={18} className="text-indigo-500" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Keyspace
              </p>
              <p className="font-mono text-sm text-slate-800 dark:text-slate-100 leading-snug break-all">
                {entropy.keyspaceDisplay}
              </p>
              <p className="font-body text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                combinations
              </p>
            </div>
          </motion.div>

          {/* Bits per Word */}
          <motion.div
            key={`bpw-${entropy.bitsPerWord}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/40"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-mint-50 dark:bg-emerald-950 flex items-center justify-center">
              <Dice5 size={18} className="text-mint-600 dark:text-mint-400" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Bits per Word
              </p>
              <p className="font-mono text-sm text-slate-800 dark:text-slate-100 leading-snug">
                ~{entropy.bitsPerWord.toFixed(1)} bits
              </p>
              <p className="font-body text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {entropy.wordlistSize.toLocaleString()} words
              </p>
            </div>
          </motion.div>

          {/* Crack Time */}
          <motion.div
            key={`crack-${entropy.crackDisplay.value}-${entropy.crackDisplay.unit}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/40"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
              <Timer size={18} className="text-amber-500" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Time to Crack
              </p>
              <p className="font-mono text-sm text-slate-800 dark:text-slate-100 leading-snug">
                {entropy.crackDisplay.value}{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  {entropy.crackDisplay.unit}
                </span>
              </p>
              <p className="font-body text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                at 10<sup>12</sup> guesses/sec
              </p>
            </div>
          </motion.div>
        </div>

        {/* Zone 3 — Context Note */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/40 dark:border-slate-700/30 mb-8">
          <Info size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="font-body text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Crack time assumes an attacker capable of 1 trillion (10
            <sup>12</sup>) guesses per second — comparable to a large-scale,
            state-sponsored operation. Average crack time is based on searching
            half the keyspace.
          </p>
        </div>

        {/* Zone 4 — Credits */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-4 border-t border-slate-200/40 dark:border-slate-700/40">
          <a
            href="https://diceware.rempe.us/#eff"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            Inspired by Glenn Rempe&apos;s Diceware
            <ExternalLink size={11} />
          </a>
          <a
            href="https://theworld.com/~reinhold/diceware.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            Diceware&trade; by Arnold G. Reinhold
            <ExternalLink size={11} />
          </a>
        </div>
      </GlassCard>
    </motion.section>
  );
}
