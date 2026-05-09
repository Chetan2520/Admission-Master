"use client";

import React, { useState, useEffect } from "react";
import { PredictorProvider } from "@/context/PredictorContext";
import PredictorForm from "@/components/predictor/PredictorForm";
import PredictorResults from "@/components/predictor/PredictorResults";
import { Sparkles, GraduationCap, Target, ShieldCheck } from "lucide-react";

export default function PredictorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PredictorProvider>
      <div className="min-h-screen bg-[#fcfdfe] font-inter pb-24">
        {/* Institutional Hero Section */}
        <div className="relative bg-slate-900 pt-32 pb-48 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Institutional Admission Engine v4.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
              College <span className="text-blue-500">Predictor</span> 2026
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Utilizing verified historical cutoffs and algorithmic modeling to identify your optimal academic path. Enter your credentials below to begin the analysis.
            </p>
          </div>
        </div>

        {/* Search Interface - Floating */}
        <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
          {mounted ? <PredictorForm /> : (
            <div className="w-full h-24 bg-white border border-slate-200 animate-pulse rounded-xl" />
          )}
        </div>

        {/* Features / Trust Badges */}
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap items-center justify-center gap-12 border-b border-slate-100 mb-16">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                 <Target className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Precision</p>
                 <p className="text-[9px] text-slate-500">Rank-specific matching</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                 <ShieldCheck className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Verified</p>
                 <p className="text-[9px] text-slate-500">Official cutoff database</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                 <GraduationCap className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Counseling</p>
                 <p className="text-[9px] text-slate-500">Expert admission guidance</p>
              </div>
           </div>
        </div>

        {/* Results Feed */}
        <div className="max-w-7xl mx-auto px-6">
          {mounted ? <PredictorResults /> : (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
                <div className="hidden lg:block lg:col-span-3 h-96 bg-slate-50 rounded-xl" />
                <div className="lg:col-span-9 space-y-4">
                   {[1,2,3].map(n => <div key={n} className="h-20 bg-slate-50 rounded-xl" />)}
                </div>
             </div>
          )}
        </div>
      </div>
    </PredictorProvider>
  );
}
