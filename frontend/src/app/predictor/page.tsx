"use client";

import React, { useState, useEffect } from "react";
import { PredictorProvider } from "@/context/PredictorContext";
import PredictorForm from "@/components/predictor/PredictorForm";
import PredictorResults from "@/components/predictor/PredictorResults";
import { Landmark, GraduationCap, ShieldCheck } from "lucide-react";

export default function PredictorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PredictorProvider>
      <div className="min-h-screen bg-[#fafafa] font-inter">
        {/* Formal Institutional Header */}
        <div className="bg-[#1e293b] py-12 border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-medium text-white mb-2 tracking-tight">
              Academic Admission Predictor
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl font-normal leading-relaxed">
              Official institutional portal for historical cutoff analysis and college placement projections. 
              Data verified against government counseling records.
            </p>
          </div>
        </div>

        {/* Compact Form Container */}
        <div className="max-w-7xl mx-auto px-6 -mt-6">
          {mounted ? <PredictorForm /> : (
            <div className="w-full h-16 bg-white border border-slate-200 animate-pulse rounded-lg" />
          )}
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-wrap items-center gap-10 mb-10 text-[11px] text-slate-500 uppercase tracking-widest font-medium border-b border-slate-200 pb-6">
             <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4" />
                University Database v2.1
             </div>
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Encrypted Data Protocol
             </div>
             <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Professional Counseling Support
             </div>
          </div>

          {mounted ? <PredictorResults /> : (
             <div className="space-y-4 animate-pulse">
                {[1,2,3,4,5].map(n => <div key={n} className="h-20 bg-white border border-slate-100 rounded-lg" />)}
             </div>
          )}
        </div>
      </div>
    </PredictorProvider>
  );
}
