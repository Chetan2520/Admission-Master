"use client";

import React from "react";
import { usePredictorContext } from "@/context/PredictorContext";
import { Check } from "lucide-react";

export default function FilterSidebar() {
  const { filters, setFilters, sortBy, setSortBy, results } = usePredictorContext();

  // Extract unique states from results (handling both College and Cutoff objects)
  const states = Array.from(
    new Set(results.map(c => ('collegeId' in c ? c.collegeId?.state : c.state)).filter(Boolean))
  ).sort() as string[];
  const types = ["Govt", "Private", "Semi-Govt"];

  const toggleFilter = (key: keyof typeof filters, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFilters({ ...filters, [key]: updated });
  };

  return (
    <div className="space-y-10 sticky top-24">
      
      {/* Sort Options */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">
          Sort Analysis By
        </h3>
        <div className="flex flex-col gap-1">
          {[
            { id: "best_match", label: "Probability: High to Low" },
            { id: "govt_first", label: "Type: Government First" },
            { id: "lowest_fees", label: "Financial: Lowest Fees" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              suppressHydrationWarning
              className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-bold transition-all border ${
                sortBy === opt.id 
                ? "bg-slate-900 text-white border-slate-900" 
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              {opt.label}
              {sortBy === opt.id && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* College Type Filter */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">
          Institution Type
        </h3>
        <div className="flex flex-wrap gap-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => toggleFilter('type', t)}
              suppressHydrationWarning
              className={`px-3 py-1.5 text-[10px] font-bold transition-all border ${
                filters.type.includes(t)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* State Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
            Geographic Filter
          </h3>
          {filters.state.length > 0 && (
            <button 
              onClick={() => setFilters({ ...filters, state: [] })}
              suppressHydrationWarning
              className="text-[9px] font-bold text-blue-600 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="max-h-[350px] overflow-y-auto pr-2 space-y-0.5 custom-scrollbar">
          {states.map((s) => (
            <label key={s} className="flex items-center gap-3 p-2 hover:bg-slate-50 cursor-pointer group transition-colors border border-transparent hover:border-slate-100">
              <input 
                type="checkbox"
                suppressHydrationWarning
                checked={filters.state.includes(s)}
                onChange={() => toggleFilter('state', s)}
                className="w-3.5 h-3.5 rounded-none border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
              />
              <span className={`text-[11px] font-semibold ${filters.state.includes(s) ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
