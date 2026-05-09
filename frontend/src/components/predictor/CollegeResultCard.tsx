"use client";

import React from "react";
import { College, Cutoff, calculateProbability } from "@/lib/predictorEngine";
import { usePredictorContext } from "@/context/PredictorContext";
import { MapPin, GraduationCap, ChevronRight, Trophy, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CollegeResultCard({ item }: { item: College | Cutoff }) {
  const { rank, category, exam } = usePredictorContext();
  
  if (!item) return null;

  const score = calculateProbability(item, parseInt(rank) || 0, category, exam);
  
  // Determine if it's a Cutoff or College object to extract college details
  const isCutoff = 'collegeId' in item;
  const college = isCutoff ? (item as Cutoff).collegeId : (item as College);
  const cutoff = isCutoff ? (item as Cutoff) : null;

  const getProbabilityTheme = (s: number) => {
    if (s >= 85) return { stroke: "stroke-emerald-400", text: "text-emerald-600", label: "Safe" };
    if (s >= 65) return { stroke: "stroke-amber-400", text: "text-amber-600", label: "Moderate" };
    return { stroke: "stroke-rose-400", text: "text-rose-600", label: "Dream" };
  };

  const theme = getProbabilityTheme(score);

  if (!college) return null;

  return (
    <div className="group bg-white border-b border-slate-100 hover:bg-slate-50 transition-all duration-200">
      <div className="max-w-full px-6 py-4 flex items-center gap-6">
        
        {/* Compact Logo */}
        <div className="w-10 h-10 flex-shrink-0 bg-white border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden relative">
          {college.logo ? (
            <Image src={college.logo} alt={college.name} fill className="object-contain p-2" />
          ) : (
            <div className="text-[10px] font-bold text-slate-300">{college.name[0]}</div>
          )}
        </div>

        {/* Institutional & Course Info */}
        <div className="flex-1 min-w-0">
           <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xs md:text-lg font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                {college.name}
              </h3>
              <span className="text-[7px] font-black text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded uppercase tracking-widest whitespace-nowrap">
                {college.type}
              </span>
           </div>
           
           <div className="flex items-center gap-4 text-[9px] font-medium text-slate-500">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 opacity-50" /> {college.location}</span>
              {cutoff && (
                <span className="flex items-center gap-1 font-bold text-slate-900">
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  {cutoff.course} ({cutoff.branch})
                </span>
              )}
           </div>
        </div>

        {/* Cutoff Insights - Desktop Only */}
        {cutoff && (
          <div className="hidden lg:block w-32">
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Closing Rank</p>
             <p className="text-[10px] font-bold text-slate-700">{cutoff.closingRank.toLocaleString()}</p>
          </div>
        )}

        {/* Fees */}
        <div className="hidden md:block w-28">
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Fees</p>
           <p className="text-[10px] font-bold text-slate-700">{college.averageCourseFees || "N/A"}</p>
        </div>

        {/* Probability Meter */}
        <div className="flex items-center gap-4 w-32 justify-end md:justify-start">
           <div className="relative w-9 h-9 flex-shrink-0">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="18" cy="18" r="15" className="stroke-slate-50 fill-none" strokeWidth="3" />
                 <motion.circle 
                    cx="18" cy="18" r="15" 
                    className={`fill-none ${theme.stroke}`} 
                    strokeWidth="3" 
                    strokeDasharray="94.2"
                    initial={{ strokeDashoffset: 94.2 }}
                    whileInView={{ strokeDashoffset: 94.2 - (94.2 * score) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeLinecap="round"
                 />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className={`text-[8px] font-black ${theme.text}`}>{score}%</span>
              </div>
           </div>
           <div className="hidden sm:block">
              <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Match</p>
              <p className={`text-[9px] font-bold uppercase ${theme.text}`}>{theme.label}</p>
           </div>
        </div>

        {/* Action */}
        <div className="w-12 flex justify-end">
           <Link 
             href={`/colleges/${college._id}`}
             className="w-7 h-7 bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-all"
           >
             <ArrowUpRight className="w-3.5 h-3.5" />
           </Link>
        </div>

      </div>
    </div>
  );
}
