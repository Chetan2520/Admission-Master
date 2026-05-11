import React from "react";
import { getProbabilityLabel } from "@/lib/predictorEngine";

export default function ProbabilityBadge({ score }: { score: number }) {
  const { label, color } = getProbabilityLabel(score);

  return (
    <div className="flex flex-col items-center md:items-end gap-2">
      <div className={`px-4 py-1.5 rounded-lg text-white text-xs font-black uppercase tracking-widest shadow-md ${color}`}>
        {label}
      </div>
      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
        {score}% Confidence Score
      </span>
    </div>
  );
}
