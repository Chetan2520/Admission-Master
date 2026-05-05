"use client";

import React, { useState, useEffect, Suspense } from "react";
import { 
  ArrowLeft, 
  Save, 
  Trophy,
  Calendar,
  Building2,
  Layers,
  Info,
  ShieldCheck,
  Target,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

function AddCutoffForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCollegeId = searchParams.get("collegeId") || "";

  const [colleges, setColleges] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    collegeId: initialCollegeId,
    exam: "NEET UG",
    year: new Date().getFullYear(),
    round: "1",
    course: "",
    branch: "General",
    category: "General",
    quota: "AIQ",
    openingRank: "",
    closingRank: "",
    status: "Published"
  });

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?limit=100`);
        const json = await res.json();
        if (json.success) {
          setColleges(json.data);
          if (json.data.length > 0 && !initialCollegeId) {
            setFormData(prev => ({ ...prev, collegeId: json.data[0]._id }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      }
    };
    fetchColleges();
  }, [initialCollegeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.collegeId || !formData.course || !formData.openingRank || !formData.closingRank) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Cut-off record added successfully!");
        setTimeout(() => router.push("/admin/cut-offs"), 1500);
      } else {
        toast.error(data.message || "Failed to add record");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      <Toaster position="top-right" />
      
      <div className="flex flex-col gap-4">
        <Link href="/admin/cut-offs" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-medium text-xs transition-colors w-fit uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Cut-offs
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-1">Add Cut-off Entry</h1>
            <p className="text-slate-500 font-medium text-sm">Define Opening & Closing ranks for the Predictor algorithm</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
             <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
             >
               <Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Save Record"}
             </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
         <div className="p-8 space-y-10">
            
            <div className="space-y-6">
               <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                  <Layers className="w-4 h-4 text-teal-600" /> 1. Program Mapping
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Select College</label>
                     <select 
                        name="collegeId"
                        value={formData.collegeId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     >
                        {colleges.map(c => (
                          <option key={c._id} value={c._id}>{c.shortName ? `${c.shortName} - ${c.name}` : c.name}</option>
                        ))}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Course Name</label>
                     <input 
                        type="text"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        placeholder="e.g. MBBS, B.Tech"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Branch Name</label>
                     <input 
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        placeholder="e.g. CSE, General Medicine"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Entrance Exam</label>
                     <select 
                        name="exam"
                        value={formData.exam}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     >
                        <option>NEET UG</option>
                        <option>JEE Main</option>
                        <option>JEE Advanced</option>
                        <option>CUET</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                  <Calendar className="w-4 h-4 text-blue-600" /> 2. Counseling Context
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Academic Year</label>
                     <input 
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Counseling Round</label>
                     <select 
                        name="round"
                        value={formData.round}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     >
                        <option value="1">Round 1</option>
                        <option value="2">Round 2</option>
                        <option value="3">Round 3</option>
                        <option value="Mop-up">Mop-up Round</option>
                        <option value="Stray">Stray Vacancy</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Category</label>
                     <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     >
                        <option>General</option>
                        <option>OBC</option>
                        <option>SC</option>
                        <option>ST</option>
                        <option>EWS</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Quota</label>
                     <select 
                        name="quota"
                        value={formData.quota}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none"
                     >
                        <option value="AIQ">All India Quota (AIQ)</option>
                        <option value="HS">Home State Quota (HS)</option>
                        <option value="OS">Other State Quota (OS)</option>
                        <option value="MQ">Management Quota</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                  <BarChart3 className="w-4 h-4 text-emerald-600" /> 3. Rank Thresholds
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-tight block">Opening Rank</label>
                        <div className="relative">
                           <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <input 
                              type="number" 
                              name="openingRank"
                              value={formData.openingRank}
                              onChange={handleChange}
                              placeholder="e.g. 1" 
                              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:ring-1 focus:ring-teal-500 transition-all" 
                           />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-medium text-teal-700 uppercase tracking-tight block">Closing Rank (Cut-off)</label>
                        <div className="relative">
                           <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600" />
                           <input 
                              type="number" 
                              name="closingRank"
                              value={formData.closingRank}
                              onChange={handleChange}
                              placeholder="e.g. 50" 
                              className="w-full pl-10 pr-4 py-2.5 bg-teal-50 border border-teal-200 rounded-lg text-sm font-medium text-teal-900 outline-none focus:ring-1 focus:ring-teal-500 transition-all" 
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

export default function AddCutoffPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <AddCutoffForm />
    </Suspense>
  );
}
