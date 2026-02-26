"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EntropyWave } from "@/components/illustrations/EntropyWave";

export function EffResearchSummary() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <GlassCard className="p-6 md:p-10 relative overflow-hidden" hover>
        {/* Decorative wave at top */}
        <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden opacity-40">
          <EntropyWave className="w-full h-full" />
        </div>

        <div className="relative pt-6">
          <SectionHeading>The EFF Dice-Roll Method</SectionHeading>

          <div className="space-y-4 font-body text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            <p>
              The Electronic Frontier Foundation (EFF) developed the dice-roll
              passphrase method to provide a simple, verifiable way for anyone to
              generate strong passwords without trusting software.
            </p>
            <p>
              Their curated wordlist of 7,776 common English words was
              specifically chosen for memorability — each word is distinct,
              easy to spell, and unlikely to be confused with others. By rolling
              five physical dice, you select a word with true hardware
              randomness.
            </p>
            <p>
              This generator reproduces that process digitally using{" "}
              <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">
                crypto.getRandomValues()
              </code>
              , the browser&apos;s cryptographic random number generator — the
              digital equivalent of perfectly fair dice.
            </p>
          </div>

          <a
            href="https://www.eff.org/dice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-body font-medium text-sm rounded-xl transition-colors border border-indigo-100 dark:border-indigo-800"
          >
            Read the EFF&apos;s Research
            <ExternalLink size={14} />
          </a>
        </div>
      </GlassCard>
    </motion.section>
  );
}
