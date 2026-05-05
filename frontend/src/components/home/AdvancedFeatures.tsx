"use client";

import React from "react";
import { Lock, BarChart2, Filter, Sparkles, Share2, UserCheck } from "lucide-react";
import Link from "next/link";

const features = [
  { title: "Admission Probability %", desc: "AI-calculated success chances for every institution.", icon: <BarChart2 size={24} /> },
  { title: "Smart Filters", desc: "Filter by total package, location, and rank range.", icon: <Filter size={24} /> },
  { title: "AI Recommendations", desc: "Personalized suggestions based on rank trends.", icon: <Sparkles size={24} /> },
  { title: "College Comparison", desc: "Side-by-side analysis of ROI and placements.", icon: <Share2 size={24} /> }
];

export default function AdvancedFeatures() {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Subtle Circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-900 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-900 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gray-900 rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mb-5">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Unlock Data-Driven Intelligence
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl text-lg">
          Basic predictor is free forever. Register now to access our most powerful admission tools.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feat, i) => (
          <div key={i} className="group p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 flex items-start gap-4">
            {/* Smaller Circular Icon Wrapper */}
            <div className="flex-shrink-0 w-12 h-12 bg-[#0F4C36] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
               {React.cloneElement(feat.icon as React.ReactElement, { size: 20 })}
            </div>
            
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight">{feat.title}</h3>
              <p className="text-gray-500 leading-relaxed text-xs font-medium ">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-20 text-center">
        <Link href="/register" className="inline-flex items-center gap-3 px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base shadow-xl transition-all hover:-translate-y-1">
           Register Now
        </Link>
      </div>
    </section>
  );
}
