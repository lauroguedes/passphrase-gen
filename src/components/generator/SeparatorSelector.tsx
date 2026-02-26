"use client";

import { motion } from "framer-motion";
import { SEPARATORS } from "@/lib/constants";
import { Tooltip } from "@/components/ui/Tooltip";
import type { SeparatorOption } from "@/types";

interface SeparatorSelectorProps {
  selected: SeparatorOption;
  onChange: (value: SeparatorOption) => void;
}

export function SeparatorSelector({
  selected,
  onChange,
}: SeparatorSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-body font-medium text-slate-400 uppercase tracking-wider">
        Separator
      </span>
      <div className="flex flex-wrap gap-1.5">
        {SEPARATORS.map((sep) => (
          <Tooltip key={sep.value} content={sep.tooltip}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onChange(sep.value)}
              className={`w-10 h-10 text-sm font-mono font-bold rounded-lg border-2 transition-colors duration-150 ${
                selected === sep.value
                  ? "bg-indigo-500 text-white border-indigo-600"
                  : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
              }`}
              style={
                selected === sep.value
                  ? { boxShadow: "var(--shadow-brutal-sm)" }
                  : {}
              }
              aria-label={sep.tooltip}
            >
              {sep.icon}
            </motion.button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
