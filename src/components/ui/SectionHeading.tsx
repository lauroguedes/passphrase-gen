import { type ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-800">
        {children}
      </h2>
      <div className="h-1 w-16 bg-gradient-to-r from-indigo-400 to-mint-400 rounded-full mt-3" />
    </div>
  );
}
