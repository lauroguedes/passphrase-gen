"use client";

import { motion } from "framer-motion";
import { Dices } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative">
      <header className="flex flex-col items-center pt-16 md:pt-24 pb-16 px-4">
        {/* Badge — centered above title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-8">
          <Dices size={14} className="text-indigo-500" />
          <span className="text-xs font-body font-semibold text-indigo-600 uppercase tracking-wider">
            EFF Dice-Roll Method
          </span>
        </div>

        {/* Title with animated dice behind, centered between words */}
        <div className="relative inline-block mb-6">
          {/* Dice floating behind the title, centered */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.10]"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Dices
              size={80}
              strokeWidth={1.5}
              className="text-indigo-500 md:w-[120px] md:h-[120px]"
            />
          </motion.div>

          <h1 className="relative text-5xl md:text-7xl tracking-tight">
            <span className="font-display font-bold text-slate-900">Passphrase</span>
            {" "}
            <span className="font-body font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-mint-500 bg-clip-text text-transparent italic">
              Generator
            </span>
          </h1>
        </div>

        <p className="font-body text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed text-center">
          Cryptographically secure passphrases you can actually remember.
        </p>
      </header>
    </div>
  );
}
