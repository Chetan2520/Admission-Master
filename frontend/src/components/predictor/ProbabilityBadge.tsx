import React from "react";
import { getProbabilityLabel } from "@/lib/predictorEngine";

export default function ProbabilityBadge({ score }: { score: number }) {
  const { label, color } = getProbabilityLabel(score);

  // Map utility colors to sharper ones if needed, but color is passed from engine.
  // Assuming color contains classes like 'bg-green-600'

  return (
    <div className="flex flex-col items-center md:items-end gap-1">
      <div className={`px-2 py-0.5 border text-white text-[10px] font-bold uppercase tracking-widest ${color}`}>
        {label}
      </div>
      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">
        {score}% Match Probability
      </span>
    </div>
  );
}
