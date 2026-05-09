"use client";

import React, { useMemo } from "react";
import { usePredictorContext } from "@/context/PredictorContext";
import CollegeResultCard from "./CollegeResultCard";
import FilterSidebar from "./FilterSidebar";
import EmptyResults from "./EmptyResults";
import AnalyticsToolbar from "./AnalyticsToolbar";
import { calculateProbability } from "@/lib/predictorEngine";
import { BarChart3, TrendingUp, Info } from "lucide-react";

export default function PredictorResults() {
  const { results, isLoading, hasSearched, filters, sortBy, rank, category, exam, currentPage, setCurrentPage, totalPages } = usePredictorContext();

  const filteredAndSortedResults = useMemo(() => {
    let list = [...results];

    // 1. Apply Sorting (Filtering is now handled by Backend for pagination)
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(n => (
          <div key={n} className="h-40 bg-white border border-slate-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!hasSearched || filteredAndSortedResults.length === 0) {
    return <EmptyResults hasSearched={hasSearched} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:block lg:col-span-3">
        <FilterSidebar />
      </div>

      {/* Main Results Feed */}
      <div className="lg:col-span-9 space-y-10">
        
        {/* Advanced Analytics Toolbar */}
        <AnalyticsToolbar />

        {/* Results List */}
        <div className="space-y-4">
          {filteredAndSortedResults.map((item) => (
            <CollegeResultCard key={item._id} item={item} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-12 border-t border-slate-100">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Showing Page {currentPage} of {totalPages}
             </div>
             <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all border ${
                    currentPage === 1 
                    ? "text-slate-300 border-slate-100 cursor-not-allowed" 
                    : "text-slate-900 border-slate-200 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all border ${
                    currentPage === totalPages 
                    ? "text-slate-300 border-slate-100 cursor-not-allowed" 
                    : "text-slate-900 border-slate-200 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  Next
                </button>
             </div>
          </div>
        )}

        {/* Footer info */}
        <div className="py-10 border-t border-slate-200 text-center">
           <p className="text-[10px] font-bold text-slate-400  tracking-[0.3em]">End of Admission Probability Analysis</p>
        </div>
      </div>

    </div>
  );
}
