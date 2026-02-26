"use client";

import { motion } from "framer-motion";
import { ALargeSmall, Hash } from "lucide-react";

interface OptionSwitchesProps {
  capitalize: boolean;
  includeNumbers: boolean;
  onCapitalizeChange: (value: boolean) => void;
  onIncludeNumbersChange: (value: boolean) => void;
}

function Toggle({
  checked,
  onChange,
  label,
  icon: Icon,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  icon: React.ComponentType<{ size: number; strokeWidth: number; className?: string }>;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 py-1.5 cursor-pointer select-none group"
    >
      <div className="flex items-center gap-2">
        <Icon size={16} strokeWidth={2} className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
        <span className="text-sm font-body font-medium text-slate-700 dark:text-slate-200">
          {label}
        </span>
      </div>

      {/* Switch track */}
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
          checked ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        {/* Switch knob */}
        <motion.div
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-[2px] w-5 h-5 rounded-full bg-white"
          style={{
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
          }}
        />
      </div>
    </button>
  );
}

export function OptionSwitches({
  capitalize,
  includeNumbers,
  onCapitalizeChange,
  onIncludeNumbersChange,
}: OptionSwitchesProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-body font-medium text-slate-400 uppercase tracking-wider mb-1">
        Options
      </span>
      <div className="flex flex-col gap-1.5">
        <Toggle
          checked={capitalize}
          onChange={onCapitalizeChange}
          label="Capitalize Words"
          icon={ALargeSmall}
        />
        <Toggle
          checked={includeNumbers}
          onChange={onIncludeNumbersChange}
          label="Include Numbers"
          icon={Hash}
        />
      </div>
    </div>
  );
}
