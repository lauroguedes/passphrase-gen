"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

interface ToastProps {
  show: boolean;
  text: string | null;
}

export function Toast({ show, text }: ToastProps) {
  return (
    <AnimatePresence>
      {show && text && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, x: 80, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 80, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
          }}
          className="fixed bottom-6 right-6 z-[9999] max-w-sm"
        >
          <div
            className="rounded-2xl px-4 py-3 flex items-start gap-3"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(20, 184, 166, 0.25)",
              boxShadow:
                "0 16px 48px rgba(99, 102, 241, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-mint-500 flex items-center justify-center mt-0.5">
              <Check size={14} strokeWidth={3} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-display font-bold text-slate-800">
                Copied
              </p>
              <p className="text-xs font-mono text-slate-500 mt-0.5 break-all line-clamp-2">
                {text}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
