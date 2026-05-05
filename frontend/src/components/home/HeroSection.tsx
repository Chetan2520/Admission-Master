"use client";

import React, { useState } from "react";
import { Search, GraduationCap, MapPin, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const { setResults, setLoading, setError, setPagination, isLoading } = useStore();
  
  const [rank, setRank] = useState("");
  const [exam, setExam] = useState("NEET UG");
  const [category, setCategory] = useState("General");

  const handlePredict = async () => {
    if (!rank) return alert("Please enter your rank");

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictor/predict?exam=${exam}&rank=${rank}&category=${category}`);
      const data = await response.json();
      
      if (response.ok) {
        setResults(data.data);
        setPagination({
          totalResults: data.pagination.totalResults,
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages
        });
        router.push(`/colleges?exam=${exam}&rank=${rank}&category=${category}`); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full" suppressHydrationWarning>
      {/* Full-width Image Banner */}
      <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
        <Image 
          src="https://dfhe5ze0n4pxu.cloudfront.net/Sliders/Slider-Banner-1768037723948.webp" 
          fill
          className="object-cover" 
          alt="Hero Banner"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        {/* Hero Content on top of image */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-full border border-green-500/20 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest">Trusted by 50,000+ Students</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight">
            Find Your Dream College
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl font-medium">
            India's most accurate college predictor for NEET, JEE & CUET.
          </p>
        </div>
      </div>

      {/* Floating Predictor Bar (RedBus Style - Overlapping) */}
      <div className="relative z-30 -mt-12 px-6 max-w-7xl mx-auto">
        <div className="bg-white p-2 rounded-xl shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            
            {/* Exam Select */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Select Exam</label>
              <select 
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option>NEET UG</option>
                <option>JEE Main</option>
                <option>CUET</option>
              </select>
            </div>

            {/* Rank Input */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Your Rank</label>
              <input 
                type="number" 
                placeholder="Enter AIR Rank" 
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Category Select */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>EWS</option>
              </select>
            </div>

            {/* Action Button */}
            <button 
              onClick={handlePredict}
              disabled={isLoading}
              className="w-full md:w-auto h-[52px] px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Check Colleges
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Trust Labels */}
          {/* <div className="flex flex-wrap items-center justify-center gap-8 py-3 border-t border-gray-50 mt-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full" /> No registration required
            </span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full" /> Completely free
            </span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full" /> Instant results
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
