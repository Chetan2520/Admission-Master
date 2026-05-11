"use client";

import React from "react";
import { College, Cutoff, calculateProbability } from "@/lib/predictorEngine";
import { usePredictorContext } from "@/context/PredictorContext";
import { MapPin, GraduationCap, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CollegeResultCard({ item }: { item: College | Cutoff }) {
  const { rank, category, exam } = usePredictorContext();
  
  if (!item) return null;

  const score = calculateProbability(item, parseInt(rank) || 0, category, exam);
  
  const isCutoff = 'collegeId' in item;
  const college = isCutoff ? (item as Cutoff).collegeId : (item as College);
  const cutoff = isCutoff ? (item as Cutoff) : null;

  const getProbabilityTheme = (s: number) => {
    if (s >= 85) return { color: "#10b981", label: "Safe" };
    if (s >= 65) return { color: "#3b82f6", label: "Moderate" };
    return { color: "#f43f5e", label: "Dream" };
  };

  const theme = getProbabilityTheme(score);

  // Robust check for college object
  if (!college || typeof college === 'string') {
    return (
      <div className="bg-white border-b border-slate-100 py-3 px-2 text-slate-800 font-semibold text-xs italic">
        Data processing error: College information not available.
      </div>
    );
  }

  // Use college image if available, fallback to logo, then placeholder
  const displayImage = (Array.isArray(college.images) && college.images[0]) || college.logo || "/placeholder-college.jpg";
  const validScore = isNaN(score) ? 0 : score;

  return (
    <div className="bg-white border-b border-slate-100 py-3 px-2 hover:bg-slate-50 transition-colors">
      <div className="flex flex-col md:flex-row items-center gap-5">
        
        {/* Real College Image - Formal Compact */}
        <div className="w-16 h-12 flex-shrink-0 bg-slate-100 rounded overflow-hidden relative border border-slate-100 shadow-sm">
          <Image 
            src={displayImage} 
            alt={college.name} 
            fill 
            className="object-cover" 
          />
        </div>

        {/* Info Area */}
        <div className="flex-1 min-w-0">
           <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="text-[15px] font-medium text-slate-800 truncate">
                {college.name}
              </h3>
              <span className="text-[9px] text-slate-800 font-semibold uppercase tracking-tighter border border-slate-100 px-1.5 rounded bg-white">
                {college.type}
              </span>
           </div>
           
           <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-slate-500 font-normal">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-800 font-semibold" /> {college.location}</span>
              {cutoff && (
                <span className="flex items-center gap-1 text-slate-800 font-semibold">
                  <GraduationCap className="w-3 h-3" />
                  {cutoff.course} | {cutoff.branch}
                </span>
              )}
           </div>
        </div>

        {/* Tabular Data */}
        <div className="flex items-center gap-10">
           {cutoff && (
             <div className="min-w-[90px]">
                <p className="text-[9px] text-slate-800 font-semibold uppercase mb-0.5 ">Closing Rank</p>
                <p className="text-xs text-slate-700">{cutoff.closingRank.toLocaleString()}</p>
             </div>
           )}
           <div className="min-w-[90px]">
              <p className="text-[9px] text-slate-800 font-semibold uppercase mb-0.5 ">Annual Fees</p>
              <p className="text-xs text-slate-700">{college.averageCourseFees || "N/A"}</p>
           </div>
           
           {/* Score Circle Indicator */}
           <div className="flex items-center gap-3 min-w-[110px]">
              <div className="relative w-8 h-8">
                 <svg className="w-full h-full -rotate-90">
                    <circle cx="16" cy="16" r="14" className="stroke-slate-100 fill-none" strokeWidth="3" />
                    <circle 
                      cx="16" 
                      cy="16" 
                      r="14" 
                      className="fill-none transition-all duration-700" 
                      stroke={theme.color} 
                      strokeWidth="3" 
                      strokeDasharray="87.9"
                      strokeDashoffset={87.9 - (87.9 * validScore) / 100}
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-slate-600">{validScore}%</span>
                 </div>
              </div>
              <div className="flex flex-col">
                 <p className="text-[9px] text-slate-800 font-semibold uppercase  leading-none mb-1">Match Score</p>
                 <p className="text-[11px] font-medium leading-none" style={{color: theme.color}}>{theme.label}</p>
              </div>
           </div>
        </div>

        {/* Action */}
        <Link 
          href={`/colleges/${college._id}`}
          className="text-slate-800 font-semibold hover:text-blue-600 transition-colors p-1"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  );
}
