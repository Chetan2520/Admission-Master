"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Save, 
  Building2,
  Layers,
  Calendar,
  BarChart3,
  Target,
  ShieldCheck,
  RotateCcw,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function EditCutoffPage() {
  const router = useRouter();
  const params = useParams();
  const cutoffId = params.id;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colleges, setColleges] = useState<any[]>([]);
  const [data, setData] = useState<any>({
    collegeId: "",
    exam: "NEET UG",
    year: 2024,
    round: "1",
    course: "",
    branch: "",
    category: "General",
    quota: "AIQ",
    openingRank: 0,
    closingRank: 0,
    seats: 0
  });

  const selectedCollege = colleges.find(c => c._id === (data.collegeId?._id || data.collegeId));
  const availableCourses = selectedCollege?.courses || [];
  const selectedCourse = availableCourses.find((c: any) => c.name === data.course);
  const availableBranches = selectedCourse?.branches || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cutoffRes, collegeRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs/${cutoffId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?limit=100`)
        ]);
        const cutoffJson = await cutoffRes.json();
        const collegeJson = await collegeRes.json();
        
        if (cutoffJson.success) setData(cutoffJson.data);
        if (collegeJson.success) setColleges(collegeJson.data);
      } catch (err) {
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cutoffId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs/${cutoffId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Record updated");
        router.push("/admin/cut-offs");
      }
    } catch (err) { toast.error("Failed to update"); }
    finally { setIsSubmitting(false); }
  };

  if (loading) return <div className="p-20 text-center font-bold text-slate-300 uppercase tracking-widest">Loading Record...</div>;

  return (
    <div className="bg-[#fcfcfd] min-h-screen text-[#1a1a1a] font-sans antialiased p-8">
      <Toaster position="top-right" />
      
      {/* Minimal Header */}
      <div className="max-w-4xl mx-auto mb-12 flex justify-between items-end">
        <div>
           <Link href="/admin/cut-offs" className="flex items-center gap-1 text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-widest mb-4 transition-colors">
             <ArrowLeft className="w-4 h-4" /> Back to Records
           </Link>
           <h1 className="text-4xl font-light tracking-tight text-slate-900">Modify Cut-off Data</h1>
           <p className="text-slate-400 text-sm mt-1 font-medium italic">Refining admission threshold for {selectedCollege?.name}</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => router.back()} className="px-6 py-3 text-slate-400 font-bold text-sm hover:text-slate-900">Discard</button>
           <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-slate-900 text-white px-10 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-slate-900/10 hover:bg-black transition-all active:scale-95 disabled:opacity-30 flex items-center gap-2"
           >
             <RotateCcw className="w-4 h-4" /> {isSubmitting ? "Syncing..." : "Update Entry"}
           </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
         {/* 1. Context */}
         <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50 pb-3 flex items-center gap-2">
               <Layers className="w-4 h-4" /> Mapping & Context
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Institution</label>
                  <select 
                    value={data.collegeId?._id || data.collegeId}
                    onChange={(e) => setData({...data, collegeId: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                  >
                     {colleges.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Exam</label>
                     <select 
                       value={data.exam}
                       onChange={(e) => setData({...data, exam: e.target.value})}
                       className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                     >
                        <option>NEET UG</option><option>JEE Main</option><option>JEE Advanced</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Year</label>
                     <input 
                       type="number"
                       value={data.year}
                       onChange={(e) => setData({...data, year: parseInt(e.target.value)})}
                       className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                     />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Course</label>
                  <select 
                    value={data.course}
                    onChange={(e) => setData({...data, course: e.target.value, branch: ""})}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                  >
                     <option value="">-- Select Course --</option>
                     {availableCourses.map((c: any) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Branch / Specialization</label>
                  <select 
                    value={data.branch}
                    onChange={(e) => setData({...data, branch: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                  >
                     <option value="">-- Select Branch --</option>
                     {availableBranches.map((b: any) => <option key={b.name} value={b.name}>{b.name}</option>)}
                     {availableBranches.length === 0 && data.course && <option value="General">General</option>}
                  </select>
               </div>
            </div>
         </div>

         {/* 2. Ranks */}
         <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50 pb-3 flex items-center gap-2">
               <BarChart3 className="w-4 h-4" /> Threshold Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Counseling Round</label>
                  <input 
                    value={data.round}
                    onChange={(e) => setData({...data, round: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
                  <select 
                    value={data.category}
                    onChange={(e) => setData({...data, category: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                  >
                     <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Total Seats</label>
                  <input 
                    type="number"
                    value={data.seats}
                    onChange={(e) => setData({...data, seats: parseInt(e.target.value)})}
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold text-slate-800 outline-none"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Opening Rank</label>
                  <div className="relative">
                     <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                     <input 
                       type="number"
                       value={data.openingRank}
                       onChange={(e) => setData({...data, openingRank: parseInt(e.target.value)})}
                       className="w-full pl-12 pr-5 py-5 bg-slate-50 border-none rounded-2xl text-lg font-bold text-slate-800 outline-none"
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider ml-1">Closing Rank (Predictor)</label>
                  <div className="relative">
                     <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                     <input 
                       type="number"
                       value={data.closingRank}
                       onChange={(e) => setData({...data, closingRank: parseInt(e.target.value)})}
                       className="w-full pl-12 pr-5 py-5 bg-emerald-50/30 border border-emerald-50 rounded-2xl text-lg font-bold text-emerald-600 outline-none focus:ring-1 focus:ring-emerald-200 transition-all"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
