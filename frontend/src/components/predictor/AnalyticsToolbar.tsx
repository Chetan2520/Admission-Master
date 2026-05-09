"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, School, GraduationCap, Percent, Filter, Search, ChevronDown, Landmark } from "lucide-react";
import { usePredictorContext } from "@/context/PredictorContext";

export default function AnalyticsToolbar() {
  const { results, filters, setFilters, sortBy, setSortBy } = usePredictorContext();

  const getCollegeType = (item: any) => {
    return 'collegeId' in item ? item.collegeId?.type : item.type;
  };

  const govtCount = results.filter(c => getCollegeType(c) === "Govt").length;
  const privateCount = results.filter(c => getCollegeType(c) === "Private").length;

  const stats = [
    { label: "Matching Colleges", value: results.length, icon: Building2, color: "from-blue-500 to-indigo-600" },
    { label: "Govt Colleges", value: govtCount, icon: Landmark, color: "from-emerald-500 to-teal-600" },
    { label: "Private Colleges", value: privateCount, icon: School, color: "from-purple-500 to-pink-600" },
    { label: "Avg Match Prob", value: "84%", icon: Percent, color: "from-orange-500 to-amber-600" },
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
    // "Top NIRF" logic could be added if nirf field is available
  };

  return (
    <div className="space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group cursor-default"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-3xl transition-opacity duration-500`} />
            <div className="relative p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm group-hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/10`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time</div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Row */}
      <div className="bg-white/5 border border-white/10 p-4 rounded-full backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 mr-4">
             <Filter className="w-4 h-4 text-blue-400" />
             <span className="text-xs font-black text-white uppercase tracking-widest">Filters</span>
          </div>
          
          {/* Filter Pills */}
          {["All Types", "Govt Only", "Private Only", "Top NIRF", "Low Fees"].map((pill) => (
            <button 
              key={pill}
              onClick={() => handlePillClick(pill)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold transition-all uppercase tracking-widest ${
                (pill === "All Types" && filters.type.length === 0) ||
                (pill === "Govt Only" && filters.type.includes("Govt")) ||
                (pill === "Private Only" && filters.type.includes("Private")) ||
                (pill === "Low Fees" && sortBy === "lowest_fees")
                ? "bg-blue-600 text-white border-blue-600"
                : "text-slate-400 hover:text-white border border-white/5 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 flex-1 lg:flex-none">
           <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search Institutions..."
                className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-12 pr-6 text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
              />
           </div>
           <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/10">
              {sortBy === 'best_match' ? 'Best Match' : sortBy === 'lowest_fees' ? 'Lowest Fees' : 'Govt First'}
              <ChevronDown className="w-3.5 h-3.5" />
           </button>
        </div>
      </div>
    </div>
  );
}

