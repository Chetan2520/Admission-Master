"use client";

import React from "react";
import { usePredictorContext } from "@/context/PredictorContext";
import { Check, Filter, MapPin, Building, SortAsc } from "lucide-react";

export default function FilterSidebar() {
  const { filters, setFilters, sortBy, setSortBy, results } = usePredictorContext();

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
    <div className="space-y-6 sticky top-24">
      
      {/* Sort Section - Formal */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <SortAsc className="w-3.5 h-3.5" />
          Ranking Order
        </h3>
        <div className="flex flex-col gap-1.5">
          {[
            { id: "best_match", label: "Best Match Probability" },
            { id: "govt_first", label: "Government Institutes First" },
            { id: "lowest_fees", label: "Lowest Annual Fees" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              className={`flex items-center justify-between px-3 py-2 text-xs rounded transition-all border ${
                sortBy === opt.id 
                ? "bg-slate-700 text-white border-slate-700" 
                : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
              }`}
            >
              {opt.label}
              {sortBy === opt.id && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Institution Type - Formal */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Building className="w-3.5 h-3.5" />
          Institute Type
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => toggleFilter('type', t)}
              className={`px-3 py-1.5 text-[10px] font-medium rounded transition-all border ${
                filters.type.includes(t)
                ? "bg-slate-700 text-white border-slate-700"
                : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Geography - Formal */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            Geography
          </h3>
          {filters.state.length > 0 && (
            <button 
              onClick={() => setFilters({ ...filters, state: [] })}
              className="text-[9px] font-medium text-blue-600 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-0.5 custom-scrollbar">
          {states.map((s) => (
            <label key={s} className="flex items-center gap-2.5 p-2 rounded cursor-pointer hover:bg-slate-50 transition-colors">
              <input 
                type="checkbox"
                checked={filters.state.includes(s)}
                onChange={() => toggleFilter('state', s)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-slate-700 focus:ring-slate-500 cursor-pointer"
              />
              <span className={`text-[11px] ${filters.state.includes(s) ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
