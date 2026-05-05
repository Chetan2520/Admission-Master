"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  GraduationCap, 
  Lock, 
  MapPin, 
  Search, 
  Sparkles, 
  Trophy, 
  Users, 
  Calculator,
  LayoutGrid,
  HeartHandshake
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ExamDetails() {
  const params = useParams();
  const examId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Mock data for the exam
  const examData = {
    title: examId?.toUpperCase().replace("-", " ") || "NEET UG",
    description: "National Eligibility cum Entrance Test (Undergraduate) is the sole entrance examination for admission to MBBS and BDS courses in India.",
    eligibility: [
      "Must have passed 10+2 or equivalent with Physics, Chemistry, Biology/Biotechnology and English.",
      "Minimum 50% marks for general category in PCB.",
      "Age must be at least 17 years as on December 31 of the year of admission."
    ],
    pattern: [
      { label: "Mode", value: "Offline (Pen and Paper)" },
      { label: "Duration", value: "3 Hours 20 Minutes" },
      { label: "Questions", value: "200 (180 to be attempted)" },
      { label: "Total Marks", value: "720" }
    ],
    dates: [
      { event: "Registration Starts", date: "February 2026" },
      { event: "Admit Card Release", date: "April 2026" },
      { event: "Exam Date", date: "May 5, 2026" },
      { event: "Result Declaration", date: "June 2026" }
    ],
    cutoffs: [
      { year: "2025", general: "720-164", obc: "163-129", sc: "163-129" },
      { year: "2024", general: "720-137", obc: "136-107", sc: "136-107" }
    ],
    colleges: [
      { name: "AIIMS New Delhi", location: "Delhi", rank: "#1" },
      { name: "Maulana Azad Medical College", location: "Delhi", rank: "#2" },
      { name: "CMC Vellore", location: "Vellore", rank: "#3" },
      { name: "JIPMER Puducherry", location: "Puducherry", rank: "#4" }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-slate-900 overflow-hidden">
         <div className="absolute inset-0 grid-texture opacity-20 pointer-events-none"></div>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00A3FF]/20 rounded-full blur-[120px] -mr-[400px] -mt-[400px]"></div>
         
         <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full mb-8">
                 <Sparkles size={12} className="text-blue-400" />
                 <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Entrance Exam Guide 2026</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                {examData.title}
              </h1>
              <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                {examData.description}
              </p>
            </motion.div>
         </div>
      </section>

      {/* Overview Grid */}
      <section className="relative z-20 -mt-16 pb-24">
         <div className="max-w-[1440px] mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
               
               {/* Left: Exam Details */}
               <div className="lg:col-span-2 space-y-12">
                  
                  {/* Important Dates */}
                  <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-50">
                     <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#00A3FF]">
                           <Calendar size={24} />
                        </div>
                        <h3 className="text-slate-900 text-2xl font-black uppercase tracking-tight italic">Important Dates</h3>
                     </div>
                     <div className="grid sm:grid-cols-2 gap-6">
                        {examData.dates.map((item, i) => (
                           <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                              <div>
                                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.event}</p>
                                 <p className="text-slate-900 font-bold text-sm">{item.date}</p>
                              </div>
                              <Clock size={20} className="text-blue-200" />
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Eligibility & Syllabus */}
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-slate-50 rounded-[3rem] p-10 shadow-xl border border-slate-100">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00A3FF] mb-8 shadow-sm">
                           <Users size={24} />
                        </div>
                        <h4 className="text-slate-900 font-black text-xl uppercase tracking-tight mb-6 italic">Eligibility</h4>
                        <ul className="space-y-4">
                           {examData.eligibility.map((item, i) => (
                              <li key={i} className="flex gap-3 text-slate-500 text-sm font-medium leading-relaxed">
                                 <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                                 {item}
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="bg-slate-900 rounded-[3rem] p-10 shadow-xl border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 grid-texture opacity-10"></div>
                        <div className="relative z-10">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8">
                              <FileText size={24} />
                           </div>
                           <h4 className="text-white font-black text-xl uppercase tracking-tight mb-6 italic">Syllabus</h4>
                           <p className="text-white/40 text-sm font-medium leading-relaxed mb-8">Comprehensive coverage of Physics, Chemistry, and Biology from Class 11 and 12 NCERT curriculum.</p>
                           <button className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group">
                              Download PDF <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Exam Pattern */}
                  <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-50">
                     <h3 className="text-slate-900 text-2xl font-black uppercase tracking-tight mb-10 italic">Exam Pattern</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {examData.pattern.map((item, i) => (
                           <div key={i} className="text-center">
                              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{item.label}</p>
                              <p className="text-slate-900 font-black text-lg">{item.value}</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Previous Year Cutoff */}
                  <div className="bg-slate-50 rounded-[3rem] p-10 md:p-14 border border-slate-100">
                     <h3 className="text-slate-900 text-2xl font-black uppercase tracking-tight mb-10 italic">Previous Year Cutoff</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="border-b border-slate-200">
                                 <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Year</th>
                                 <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">General</th>
                                 <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">OBC</th>
                                 <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">SC/ST</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                              {examData.cutoffs.map((item, i) => (
                                 <tr key={i}>
                                    <td className="py-6 font-black text-slate-900">{item.year}</td>
                                    <td className="py-6 font-bold text-slate-600">{item.general}</td>
                                    <td className="py-6 font-bold text-slate-600">{item.obc}</td>
                                    <td className="py-6 font-bold text-slate-600">{item.sc}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>

               {/* Right: Sidebar / Locked Features */}
               <div className="space-y-8">
                  
                  {/* Top Colleges */}
                  <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border border-slate-50">
                     <h4 className="text-slate-900 font-black text-lg uppercase tracking-tight mb-8 italic">Top Colleges</h4>
                     <div className="space-y-6">
                        {examData.colleges.map((college, i) => (
                           <div key={i} className="flex items-center justify-between group cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#00A3FF] transition-colors">
                                    <GraduationCap size={20} />
                                 </div>
                                 <div>
                                    <p className="text-slate-900 font-bold text-sm leading-none mb-1">{college.name}</p>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                       <MapPin size={10} /> {college.location}
                                    </p>
                                 </div>
                              </div>
                              <span className="text-[#00A3FF] font-black text-xs">{college.rank}</span>
                           </div>
                        ))}
                     </div>
                     <button className="w-full mt-10 bg-slate-50 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm">
                        View All Colleges
                     </button>
                  </div>

                  {/* Locked Advanced Predictor */}
                  <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 shadow-3xl border border-white/10 relative overflow-hidden">
                     <div className="absolute inset-0 grid-texture opacity-10"></div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-6 w-fit">
                           <Lock size={10} className="text-blue-400" />
                           <span className="text-blue-400 text-[8px] font-black uppercase tracking-[0.2em]">Locked Feature</span>
                        </div>
                        <h4 className="text-white text-2xl font-black uppercase tracking-tighter leading-tight mb-6">Advanced <br /> Predictor</h4>
                        <div className="space-y-4 mb-8">
                           {[
                             "Admission Probability (%)",
                             "Rank & Budget Filters",
                             "AI-based Recommendations",
                             "Personalized Roadmap"
                           ].map((item, i) => (
                             <div key={i} className="flex items-center gap-3 text-white/40 text-[11px] font-medium">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                {item}
                             </div>
                           ))}
                        </div>
                        <button className="w-full bg-[#00A3FF] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-transform">
                           Unlock After Registration
                        </button>
                     </div>
                  </div>

                  {/* Free Counselling CTA */}
                  <div className="bg-[#87CEEB] rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                     <div className="absolute inset-0 grid-texture opacity-20"></div>
                     <div className="relative z-10 text-white">
                        <HeartHandshake size={32} className="mb-6" />
                        <h4 className="text-xl font-black uppercase tracking-tight mb-4 italic">Free Expert <br /> Counselling</h4>
                        <p className="text-white/80 text-xs font-medium leading-relaxed mb-8">Talk to our mentors and clarify your doubts about the admission process.</p>
                        <button className="bg-white text-[#00A3FF] px-8 py-3 rounded-full font-black uppercase tracking-widest text-[9px] shadow-xl hover:scale-105 transition-transform">
                           Book Free Slot
                        </button>
                     </div>
                  </div>

                  {/* Scholarship Opportunity */}
                  <div className="bg-blue-50 rounded-[3rem] p-8 md:p-10 border border-blue-100 relative overflow-hidden">
                     <div className="relative z-10">
                        <Trophy size={32} className="text-[#00A3FF] mb-6" />
                        <h4 className="text-slate-900 text-xl font-black uppercase tracking-tight mb-4 italic">Scholarship <br /> Hunt</h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8">Discover scholarship schemes matching your eligibility for {examData.title}.</p>
                        <button className="text-[#00A3FF] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group">
                           Explore Now <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 bg-slate-50">
         <div className="max-w-[1440px] mx-auto px-6">
            <div className="bg-[#00A3FF] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-3xl">
               <div className="absolute inset-0 grid-texture opacity-20"></div>
               <div className="relative z-10">
                  <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                     Start Your Free <br /> Prediction Now
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                     <button className="bg-white text-[#00A3FF] px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-transform">
                        Check Eligibility
                     </button>
                     <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                        Talk to Mentor
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
