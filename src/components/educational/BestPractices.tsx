"use client";

import { motion } from "framer-motion";
import { Shield, KeyRound, BookOpen, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiceCluster } from "@/components/illustrations/DiceCluster";

const tips = [
  {
    icon: Shield,
    title: "Protect What Matters",
    description:
      "Use passphrases for your most critical accounts: password managers, email, disk encryption, and financial services.",
  },
  {
    icon: KeyRound,
    title: "Never Reuse",
    description:
      "Generate a unique passphrase for each account. One breach shouldn't compromise everything.",
  },
  {
    icon: BookOpen,
    title: "Write It Down Initially",
    description:
      "It's OK to write a new passphrase on paper while memorizing it. Store it securely and destroy it once memorized.",
  },
  {
    icon: RefreshCw,
    title: "Use a Password Manager",
    description:
      "For per-site passwords, use a password manager locked with a strong passphrase from this generator.",
  },
];

export function BestPractices() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <GlassCard className="p-6 md:p-10 relative overflow-hidden" hover>
        {/* Watermark illustration */}
        <DiceCluster className="absolute -right-10 -bottom-10 w-48 h-40 opacity-[0.06] pointer-events-none" />

        <SectionHeading>Passphrase Best Practices</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 relative z-10">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 p-4 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/40"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
                <tip.icon size={20} className="text-indigo-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white mb-1">
                  {tip.title}
                </h3>
                <p className="font-body text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.section>
  );
}
