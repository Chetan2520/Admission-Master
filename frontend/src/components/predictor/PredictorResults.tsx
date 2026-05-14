"use client";

import React, { useMemo, useState } from "react";
import { usePredictorContext } from "@/context/PredictorContext";
import CollegeResultCard from "./CollegeResultCard";
import FilterSidebar from "./FilterSidebar";
import AnalyticsToolbar from "./AnalyticsToolbar";
import InsightsSection from "./InsightsSection";
import { calculateProbability } from "@/lib/predictorEngine";
import { BarChart3, TrendingUp, Info, ShieldCheck, Target, Sparkles, Search } from "lucide-react";

export default function PredictorResults() {
  const { 
    results, 
    isLoading, 
    hasSearched, 
    sortBy, 
    rank, 
    category, 
    exam, 
    currentPage, 
    setCurrentPage, 
    totalPages 
  } = usePredictorContext();
  
  const [activeTab, setActiveTab] = useState<"safe" | "target" | "dream">("safe");

  const sortedResults = useMemo(() => {
    let list = [...results];

    if (sortBy === "best_match") {
      list.sort((a, b) => {
        const scoreA = calculateProbability(a, parseInt(rank) || 0, category, exam);
        const scoreB = calculateProbability(b, parseInt(rank) || 0, category, exam);
        return scoreB - scoreA;
      });
    } else if (sortBy === "lowest_fees") {
      list.sort((a, b) => {
        const getFee = (item: any) => {
          const college = 'collegeId' in item ? item.collegeId : item;
          const clean = college?.averageCourseFees?.replace(/[^0-9]/g, "");
          return clean ? parseInt(clean) : Infinity;
        };
        return getFee(a) - getFee(b);
      });
    } else if (sortBy === "govt_first") {
      list.sort((a, b) => {
        const collA = 'collegeId' in a ? a.collegeId : a;
        const collB = 'collegeId' in b ? b.collegeId : b;
        return (collA?.type === "Govt" ? -1 : 1);
      });
    }

    return list;
  }, [results, sortBy, rank, category, exam]);

  const categorizedResults = useMemo(() => {
    const safe = sortedResults.filter(item => calculateProbability(item, parseInt(rank) || 0, category, exam) >= 85);
    const target = sortedResults.filter(item => {
      const score = calculateProbability(item, parseInt(rank) || 0, category, exam);
      return score >= 65 && score < 85;
    });
    const dream = sortedResults.filter(item => calculateProbability(item, parseInt(rank) || 0, category, exam) < 65);
    
    return { safe, target, dream };
  }, [sortedResults, rank, category, exam]);

  const displayResults = categorizedResults[activeTab];

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
          <Search className="w-12 h-12" />
        </div>
        <div className="max-w-md">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Predict Your College Probability</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Enter your NEET marks above to analyze admission possibilities across 500+ medical colleges in India.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:block lg:col-span-3">
        <FilterSidebar />
      </div>

      {/* Main Results Feed */}
      <div className="lg:col-span-9 space-y-8">
        
        {/* Prediction Summary Card */}
        {usePredictorContext().predictionData && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingUp className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">NEET 2025 Prediction Report</p>
                <h2 className="text-4xl font-black mb-2">
                  AIR {usePredictorContext().predictionData.minRank.toLocaleString()} - {usePredictorContext().predictionData.maxRank.toLocaleString()}
                </h2>
                <p className="text-slate-400 font-medium">Estimated Average Rank: <span className="text-white font-bold">{usePredictorContext().predictionData.avgRank.toLocaleString()}</span></p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase">Confidence</p>
                  <p className="text-xl font-black">{usePredictorContext().predictionData.isExact ? "100%" : "92%"}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Safe</p>
                <p className="text-xl font-bold text-emerald-400">{categorizedResults.safe.length}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target</p>
                <p className="text-xl font-bold text-blue-400">{categorizedResults.target.length}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dream</p>
                <p className="text-xl font-bold text-rose-400">{categorizedResults.dream.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab System for Categorization */}
        <div className="bg-white border-b border-slate-200 flex items-center gap-8 px-2 overflow-x-auto no-scrollbar sticky top-0 z-20">
          {[
            { id: "safe", label: "Safe Options", sub: "Very High Chance", icon: ShieldCheck, color: "text-emerald-500", count: categorizedResults.safe.length },
            { id: "target", label: "Target Colleges", sub: "Moderate/Good Chance", icon: Target, color: "text-blue-500", count: categorizedResults.target.length },
            { id: "dream", label: "Dream Picks", sub: "Aggressive/Reach", icon: Sparkles, color: "text-rose-500", count: categorizedResults.dream.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? "border-slate-900 text-slate-900 opacity-100" 
                : "border-transparent text-slate-400 opacity-60 hover:opacity-100"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ""}`} />
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold leading-tight">{tab.label}</span>
                <span className="text-[9px] font-medium opacity-70 leading-tight">{tab.sub}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 ${activeTab === tab.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
          {isLoading ? (
            <div className="p-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-medium text-sm">Analyzing institutional data...</p>
            </div>
          ) : displayResults.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {displayResults.map((item, idx) => (
                <CollegeResultCard key={idx} item={item} />
              ))}
            </div>
          ) : (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                <Info className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">No colleges in this category</h4>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">Try adjusting your filters or checking other categories.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 pt-4">
            <button
              disabled={currentPage === 1 || isLoading}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95 shadow-sm"
            >
              Previous
            </button>
            <div className="flex items-center px-4 text-xs font-bold text-slate-400">
              Page {currentPage} of {totalPages}
            </div>
            <button
              disabled={currentPage === totalPages || isLoading}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 disabled:opacity-50 transition-all active:scale-95 shadow-sm"
            >
              Next
            </button>
          </div>
        )}

        <InsightsSection />
      </div>
    </div>
  );
}
