"use client";

import { motion } from "framer-motion";
import { Dices } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
}

export function GenerateButton({ onClick, isGenerating }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating}
      className="brutal-btn bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 flex items-center justify-center gap-3 disabled:opacity-70"
    >
      <motion.div
        animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <Dices size={22} />
      </motion.div>
      <span className="text-lg">
        {isGenerating ? "Rolling..." : "Roll Passphrase"}
      </span>
    </button>
  );
}
