"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldIcon } from "@/components/illustrations/ShieldIcon";

const entropyData = [
  { words: 3, bits: 38.7 },
  { words: 4, bits: 51.7 },
  { words: 5, bits: 64.6 },
  { words: 6, bits: 77.5 },
  { words: 7, bits: 90.5 },
  { words: 8, bits: 103.4 },
  { words: 9, bits: 116.3 },
  { words: 10, bits: 129.2 },
];

export function WhyRandomPassphrases() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="p-6 md:p-10" hover>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Text content */}
          <div className="flex-1">
            <SectionHeading>Why Use a Random Passphrase?</SectionHeading>
            <div className="space-y-4 font-body text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              <p>
                Human-created passwords follow predictable patterns that
                attackers exploit. We substitute letters with numbers, append
                dates, and reuse familiar words — all patterns that modern
                cracking tools anticipate.
              </p>
              <p>
                A randomly generated passphrase from a 7,776-word list provides{" "}
                <strong className="text-slate-800 dark:text-white">~12.9 bits of entropy per word</strong>.
                That means each word you add multiplies the difficulty by nearly
                8,000x.
              </p>
              <p>
                Six random words give you approximately{" "}
                <strong className="text-slate-800 dark:text-white">77.5 bits of entropy</strong> — enough
                to resist brute-force attacks for decades, even against
                nation-state adversaries.
              </p>
            </div>

            {/* Entropy table */}
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="bg-indigo-50/50 dark:bg-indigo-950/50">
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300">
                      Words
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300">
                      Entropy (bits)
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300">
                      Strength
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entropyData.map((row) => (
                    <tr
                      key={row.words}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <td className="px-4 py-2 font-mono text-slate-700 dark:text-slate-300">
                        {row.words}
                      </td>
                      <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">
                        {row.bits.toFixed(1)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-mint-400"
                            style={{ width: `${Math.min(100, (row.bits / 129.2) * 100)}%` }}
                          />
                          <span className="text-xs text-slate-400 whitespace-nowrap">
                            {row.bits < 50
                              ? "Weak"
                              : row.bits < 65
                                ? "Moderate"
                                : row.bits < 80
                                  ? "Strong"
                                  : row.bits < 100
                                    ? "Very Strong"
                                    : "Excellent"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Illustration */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block flex-shrink-0"
          >
            <ShieldIcon className="w-32 h-36" />
          </motion.div>
        </div>
      </GlassCard>
    </motion.section>
  );
}
