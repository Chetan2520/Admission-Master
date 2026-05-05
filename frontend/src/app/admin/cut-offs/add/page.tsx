"use client";

import { 
  ArrowLeft, 
  Save, 
  Trophy,
  Calendar,
  Building2,
  Layers,
  Info,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  BookOpen,
  Target,
  Hash,
  Flag
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddCutoffPage() {
  const router = useRouter();

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/admin/cut-offs" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-xs transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Cut-offs
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Add Cut-off Entry</h1>
            <p className="text-slate-500 font-medium text-sm">Define Opening & Closing ranks for the Predictor algorithm</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
             <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10">
               <Save className="w-4 h-4" /> Save Record
             </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
         <div className="p-8 space-y-10">
            
            {/* Step 1: Mapping */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
                  <Layers className="w-4 h-4 text-teal-600" /> 1. Program Mapping
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Select College</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>AIIMS Delhi</option>
                        <option>IIT Bombay</option>
                        <option>MAMC Delhi</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Course Name</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>B.Tech</option>
                        <option>MBBS</option>
                        <option>BDS</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Branch Name</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>Computer Science</option>
                        <option>General Medicine</option>
                        <option>Information Technology</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Entrance Exam</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>NEET UG</option>
                        <option>JEE Advanced</option>
                        <option>CUET</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Step 2: Context */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
                  <Calendar className="w-4 h-4 text-blue-600" /> 2. Counseling Context
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Academic Year</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Counseling Round</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>Round 1</option>
                        <option>Round 2</option>
                        <option>Round 3</option>
                        <option>Mop-up Round</option>
                        <option>Stray Vacancy</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Category</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>GEN</option>
                        <option>OBC</option>
                        <option>SC</option>
                        <option>ST</option>
                        <option>EWS</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Quota</label>
                     <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option>All India Quota (AIQ)</option>
                        <option>Home State Quota (HS)</option>
                        <option>Other State Quota (OS)</option>
                        <option>Management Quota</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Step 3: Ranks */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
                  <BarChart3 className="w-4 h-4 text-emerald-600" /> 3. Rank Thresholds
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">Opening Rank</label>
                        <div className="relative">
                           <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <input type="number" placeholder="e.g. 1" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400">The rank of the first student admitted in this category</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block text-teal-700">Closing Rank (Predictor Threshold)</label>
                        <div className="relative">
                           <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600" />
                           <input type="number" placeholder="e.g. 50" className="w-full pl-10 pr-4 py-3 bg-teal-50 border border-teal-200 rounded-2xl text-sm font-black text-teal-900 outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                        </div>
                        <p className="text-[10px] font-bold text-teal-600/60 uppercase">Critical for prediction algorithm</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
