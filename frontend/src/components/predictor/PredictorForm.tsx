"use client";

import React from "react";
import { usePredictorContext } from "@/context/PredictorContext";
import {
  Search,
  ClipboardList,
  Target,
  User,
  ChevronDown,
  Globe,
  Users,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function PredictorForm() {
  const {
    exam, setExam,
    rank, setRank,
    category, setCategory,
    setIsLoading, setResults,
    setHasSearched, hasSearched,
    currentPage, setCurrentPage,
    setTotalPages,
    filters
  } = usePredictorContext();

  const fetchResults = async (pageNumber: number) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const typeParam = filters.type.join(',');
      const stateParam = filters.state.join(',');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predictor/predict?exam=${exam}&rank=${rank}&category=${category}&page=${pageNumber}&limit=10&type=${typeParam}&state=${stateParam}`,
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

  // Manual search button
  const handleSearch = () => {
    if (!rank) {
      toast.error("Please enter your rank");
      return;
    }
    setCurrentPage(1);
    fetchResults(1);
  };

  // Refetch on page change or filter change
  React.useEffect(() => {
    if (hasSearched && currentPage > 0) {
      fetchResults(currentPage);
    }
  }, [currentPage, filters]);

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 md:p-3 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Exam Selection */}
        <div className="flex flex-col bg-white border border-slate-200 p-4 text-left rounded-xl">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <ClipboardList className="w-3 h-3 text-blue-600" />
            Entrance Exam
          </label>
          <div className="relative">
            <select
              id="entrance-exam-select"
              suppressHydrationWarning
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
              <option value="NEET UG">NEET UG</option>
              <option value="NEET PG">NEET PG</option>
              <option value="CUET">CUET</option>
              <option value="CAT">CAT</option>
              <option value="GATE">GATE</option>
              <option value="CLAT">CLAT</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-300 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Rank Input */}
        <div className="flex flex-col bg-white border border-slate-200 p-4 text-left rounded-xl">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Target className="w-3 h-3 text-blue-600" />
            All India Rank
          </label>
          <input
            id="air-rank-input"
            suppressHydrationWarning
            autoComplete="off"
            type="number"
            placeholder="Enter Rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none placeholder:text-slate-200"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col bg-white border border-slate-200 p-4 text-left rounded-xl">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Users className="w-3 h-3 text-blue-600" />
            Category
          </label>
          <div className="relative">
            <select
              id="category-select"
              suppressHydrationWarning
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
              <option value="General-PWD">General-PWD</option>
              <option value="OBC-PWD">OBC-PWD</option>
              <option value="SC-PWD">SC-PWD</option>
              <option value="ST-PWD">ST-PWD</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-300 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSearch}
          suppressHydrationWarning
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-black py-4 px-8 text-xs transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-blue-900/10 uppercase tracking-[0.2em]"
        >
          <Search className="w-4 h-4" />
          Predict Now
        </button>
      </div>
    </div>
  );
}
