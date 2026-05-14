"use client";

import React from "react";
import { usePredictorContext } from "@/context/PredictorContext";
import {
  Search,
  ClipboardList,
  Target,
  ChevronDown,
  Users,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function PredictorForm() {
  const {
    exam,
    setExam,
    rank,
    setRank,
    category,
    setCategory,
    isLoading,
    setIsLoading,
    setResults,
    setHasSearched,
    hasSearched,
    currentPage,
    setCurrentPage,
    setTotalPages,
    filters,
    setFilters,
    marks,
    setMarks,
    setPredictionData,
  } = usePredictorContext();

  const fetchResults = async (pageNumber: number, targetRank?: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const typeParam = filters.type.join(",");
      const stateParam = filters.state.includes("all") ? "" : filters.state.join(",");
      const effectiveRank = targetRank || rank;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predictor/predict?exam=${exam}&rank=${effectiveRank}&category=${category}&page=${pageNumber}&limit=10&type=${typeParam}&state=${stateParam}`,
      );
      const json = await res.json();
      if (json.success) {
        setResults(json.data);
        setTotalPages(json.pagination?.totalPages || 1);
      } else {
        toast.error("Failed to fetch prediction data");
      }
    } catch (err) {
      toast.error("Connection error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!marks) {
      toast.error("Please enter your NEET marks");
      return;
    }

    if (parseInt(marks) > 720 || parseInt(marks) < 0) {
      toast.error("Marks must be between 0 and 720");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Predict Rank from Marks
      const rankRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictor/predict-rank?marks=${marks}&year=2025`);
      const rankJson = await rankRes.json();
      
      if (rankJson.success) {
        const prediction = rankJson.data;
        setPredictionData(prediction);
        setRank(prediction.avgRank.toString()); // Use avgRank for college prediction
        
        // 2. Fetch Colleges based on predicted avgRank
        setCurrentPage(1);
        await fetchResults(1, prediction.avgRank.toString());
      } else {
        toast.error(rankJson.message || "Failed to predict rank");
      }
    } catch (error) {
      toast.error("Failed to connect to prediction engine");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (hasSearched && currentPage > 0) {
      fetchResults(currentPage);
    }
  }, [currentPage, filters]);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Exam Selection */}
        <div className="flex flex-col p-2 lg:border-r border-slate-100 last:border-0">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
            Entrance Exam
          </label>
          <div className="relative group">
            <select
              id="entrance-exam-select"
              suppressHydrationWarning
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full text-sm font-bold text-slate-800 bg-slate-50 border border-transparent group-hover:border-slate-100 rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="NEET UG">NEET UG 2025</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

        {/* Marks Input */}
        <div className="flex flex-col p-2 lg:border-r border-slate-100 last:border-0">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
            NEET Marks (0-720)
          </label>
          <div className="relative group">
            <input
              id="marks-input"
              suppressHydrationWarning
              autoComplete="off"
              type="number"
              placeholder="Enter Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full text-sm font-bold text-slate-800 bg-slate-50 border border-transparent group-hover:border-slate-100 rounded-xl px-4 py-3 outline-none placeholder:text-slate-300 transition-all"
            />
            <Target className="w-4 h-4 text-slate-300 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-blue-400 transition-colors" />
          </div>
        </div>

        {/* State Selection */}
        <div className="flex flex-col p-2 lg:border-r border-slate-100 last:border-0">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
            Target State
          </label>
          <div className="relative group">
            <select
              id="state-select"
              suppressHydrationWarning
              value={filters.state[0] || "all"}
              onChange={(e) => setFilters({ ...filters, state: e.target.value === "all" ? ["all"] : [e.target.value] })}
              className="w-full text-sm font-bold text-slate-800 bg-slate-50 border border-transparent group-hover:border-slate-100 rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="all">All India</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Delhi">Delhi</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col p-2 lg:border-r border-slate-100 last:border-0">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">
            Category
          </label>
          <div className="relative group">
            <select
              id="category-select"
              suppressHydrationWarning
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm font-bold text-slate-800 bg-slate-50 border border-transparent group-hover:border-slate-100 rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-end p-2">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            suppressHydrationWarning
            className="w-full h-[48px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-blue-600/20"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Predict Colleges
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
