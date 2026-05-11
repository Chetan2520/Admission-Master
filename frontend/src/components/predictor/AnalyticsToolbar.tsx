"use client";

import React from "react";
import { Building2, School, Percent, Filter, Landmark } from "lucide-react";
import { usePredictorContext } from "@/context/PredictorContext";

export default function AnalyticsToolbar() {
  const { results, filters, setFilters, sortBy, setSortBy } = usePredictorContext();

  const getCollegeType = (item: any) => {
    return 'collegeId' in item ? item.collegeId?.type : item.type;
  };

  const govtCount = results.filter(c => getCollegeType(c) === "Govt").length;
  const privateCount = results.filter(c => getCollegeType(c) === "Private").length;

  const stats = [
    { label: "Matches Found", value: results.length, icon: Building2, color: "text-blue-600" },
    { label: "Govt Institutes", value: govtCount, icon: Landmark, color: "text-emerald-600" },
    { label: "Private Institutes", value: privateCount, icon: School, color: "text-purple-600" },
    { label: "Success Prob", value: "84%", icon: Percent, color: "text-amber-600" },
  ];

  const handlePillClick = (pill: string) => {
    if (pill === "All Types") {
      setFilters({ ...filters, type: [] });
    } else if (pill === "Govt Only") {
      setFilters({ ...filters, type: ["Govt"] });
    } else if (pill === "Private Only") {
      setFilters({ ...filters, type: ["Private"] });
    } else if (pill === "Low Fees") {
      setSortBy("lowest_fees");
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary - Minimal */}
      <div className="flex flex-wrap items-center gap-12 bg-white border border-slate-200 px-8 py-4 rounded-lg">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-base font-medium text-slate-700 leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Strip - Minimal */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="flex items-center gap-2 text-slate-400 mr-2">
             <Filter className="w-3.5 h-3.5" />
             <span className="text-[10px] uppercase tracking-widest font-medium">Quick Filter:</span>
          </div>
          
          {["All Types", "Govt Only", "Private Only", "Low Fees"].map((pill) => (
            <button 
              key={pill}
              onClick={() => handlePillClick(pill)}
              className={`px-4 py-1.5 rounded text-[10px] font-medium transition-all uppercase tracking-widest border ${
                (pill === "All Types" && filters.type.length === 0) ||
                (pill === "Govt Only" && filters.type.includes("Govt")) ||
                (pill === "Private Only" && filters.type.includes("Private")) ||
                (pill === "Low Fees" && sortBy === "lowest_fees")
                ? "bg-slate-700 text-white border-slate-700"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

