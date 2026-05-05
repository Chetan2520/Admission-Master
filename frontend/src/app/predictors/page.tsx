"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import { GraduationCap, ShieldCheck, Activity } from "lucide-react";

export default function PredictorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Reusing the HeroSection which contains the predictor */}
      <div className="pt-10">
        <HeroSection />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Why use our Predictor?</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Our algorithm uses 5 years of historical data to give you the most accurate college match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">High Accuracy</h3>
            <p className="text-slate-500 text-sm font-medium">98.5% accurate predictions based on current year trends and historical cut-offs.</p>
          </div>

          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Category Focused</h3>
            <p className="text-slate-500 text-sm font-medium">Dedicated filters for General, OBC, SC, ST, and EWS categories for precise results.</p>
          </div>

          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Live Updates</h3>
            <p className="text-slate-500 text-sm font-medium">Real-time adjustments as soon as official counseling rounds are announced.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
