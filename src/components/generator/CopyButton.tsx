"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
}

export function CopyButton({ copied, onCopy }: CopyButtonProps) {
  return (
    <motion.button
      onClick={onCopy}
      animate={copied ? { scale: [1, 1.15, 0.95, 1] } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="brutal-btn bg-mint-500 hover:bg-mint-600 text-white px-6 py-4 flex items-center justify-center gap-2"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <Check size={20} />
            <span className="text-lg">Copied!</span>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <Copy size={20} />
            <span className="text-lg">Copy</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
