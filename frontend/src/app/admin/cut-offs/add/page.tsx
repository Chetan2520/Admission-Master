"use client";

import React, { useState, useEffect, Suspense } from "react";
import { 
  ArrowLeft, 
  Save, 
  Building2,
  Trash2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  PlusCircle,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const DEFAULT_CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];
const INITIAL_ROUNDS = ["1", "2", "3"];

function AddCutoffForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCollegeId = searchParams.get("collegeId") || "";

  const [colleges, setColleges] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeRounds, setActiveRounds] = useState<string[]>(INITIAL_ROUNDS);
  
  const [metaData, setMetaData] = useState({
    collegeId: initialCollegeId,
    exam: "NEET UG",
    year: new Date().getFullYear(),
    quota: "AIQ",
    status: "Published"
  });

  // Matrix Data map: { [course_branch_key]: { [category]: { seats: "", rounds: { [round]: { ... } } } } }
  const [matrix, setMatrix] = useState<any>({});
  const [collapsedItems, setCollapsedItems] = useState<Record<string, boolean>>({});

  const selectedCollege = colleges.find(c => c._id === metaData.collegeId);
  
  // Flatten courses and branches for entry
  const flatPrograms = React.useMemo(() => {
    if (!selectedCollege?.courses) return [];
    const flat: any[] = [];
    selectedCollege.courses.forEach((course: any) => {
      if (course.branches && course.branches.length > 0) {
        course.branches.forEach((branch: any) => {
          flat.push({
            courseName: course.name,
            branchName: branch.name,
            key: `${course.name} - ${branch.name}`
          });
        });
      } else {
        flat.push({
          courseName: course.name,
          branchName: "General",
          key: `${course.name} - General`
        });
      }
    });
    return flat;
  }, [selectedCollege]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?limit=100`);
        const json = await res.json();
        if (json.success) {
          setColleges(json.data);
          if (json.data.length > 0 && !initialCollegeId) {
            setMetaData(prev => ({ ...prev, collegeId: json.data[0]._id }));
          }
        }
      } catch (err) {}
    };
    fetchColleges();
  }, [initialCollegeId]);

  // Initialize matrix for flat programs
  useEffect(() => {
    if (flatPrograms.length > 0) {
      setMatrix((prev: any) => {
        const next = { ...prev };
        flatPrograms.forEach((prog: any) => {
          if (!next[prog.key]) {
            next[prog.key] = {};
            DEFAULT_CATEGORIES.forEach(cat => {
              next[prog.key][cat] = { seats: "", rounds: {} };
              activeRounds.forEach(round => {
                next[prog.key][cat].rounds[round] = { openingRank: "", closingRank: "" };
              });
            });
          }
        });
        return next;
      });
    }
  }, [flatPrograms, activeRounds]);

  const handleSeatChange = (key: string, category: string, value: string) => {
    setMatrix((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [category]: { ...prev[key][category], seats: value }
      }
    }));
  };

  const handleRankChange = (key: string, category: string, round: string, field: string, value: string) => {
    setMatrix((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [category]: {
          ...prev[key][category],
          rounds: {
            ...prev[key][category].rounds,
            [round]: { ...prev[key][category].rounds[round], [field]: value }
          }
        }
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!metaData.collegeId) { toast.error("Select a College"); return; }

    const items: any[] = [];
    flatPrograms.forEach(prog => {
      const categories = matrix[prog.key];
      if (!categories) return;

      Object.entries(categories).forEach(([category, data]: [string, any]) => {
        activeRounds.forEach(round => {
          const ranks = data.rounds[round];
          if (ranks && (ranks.openingRank || ranks.closingRank)) {
            items.push({
              ...metaData,
              course: prog.courseName,
              branch: prog.branchName,
              category,
              round,
              seats: data.seats || 0,
              openingRank: ranks.openingRank || 0,
              closingRank: ranks.closingRank || 0,
            });
          }
        });
      });
    });

    if (items.length === 0) { toast.error("No entries found"); return; }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Added ${data.count} records`);
        router.push("/admin/cut-offs");
      }
    } catch (err) { toast.error("Failed to save"); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-[#fcfcfd] min-h-screen text-[#1a1a1a] font-sans antialiased p-8">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-end">
        <div>
           <Link href="/admin/cut-offs" className="flex items-center gap-1 text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-widest mb-4 transition-colors">
             <ArrowLeft className="w-4 h-4" /> Back to Records
           </Link>
           <h1 className="text-4xl font-light tracking-tight text-slate-900">Configure Admission Matrix</h1>
           <p className="text-slate-400 text-sm mt-1 font-medium italic">Define seats and cut-off ranks for every specialization.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => router.back()} className="px-6 py-3 text-slate-400 font-bold text-sm hover:text-slate-900">Discard</button>
           <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-slate-900/10 hover:bg-black transition-all active:scale-95 disabled:opacity-30"
           >
             {isSubmitting ? "Processing..." : "Publish Matrix"}
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Configuration Sidebar */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm space-y-6">
               <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Global Settings</h3>
               
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Select Institution</label>
                  <select 
                    name="collegeId"
                    value={metaData.collegeId}
                    onChange={(e) => setMetaData({...metaData, collegeId: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-800 focus:ring-1 focus:ring-slate-100 outline-none transition-all"
                  >
                     {colleges.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Entrance Exam</label>
                  <select 
                    value={metaData.exam}
                    onChange={(e) => setMetaData({...metaData, exam: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-800 focus:ring-1 focus:ring-slate-100 outline-none transition-all"
                  >
                     <option>NEET UG</option><option>JEE Main</option><option>JEE Advanced</option><option>CUET</option>
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Academic Session</label>
                  <input 
                    type="number"
                    value={metaData.year}
                    onChange={(e) => setMetaData({...metaData, year: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold text-slate-800 focus:ring-1 focus:ring-slate-100 outline-none transition-all"
                  />
               </div>

               <div className="pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => setActiveRounds([...activeRounds, (activeRounds.length + 1).toString()])}
                    className="w-full py-3 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                     <PlusCircle className="w-4 h-4" /> Add Round
                  </button>
               </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-900/10">
               <h4 className="text-xs font-bold uppercase tracking-widest mb-2 opacity-50">Current Progress</h4>
               <p className="text-2xl font-light">{flatPrograms.length} <span className="text-xs opacity-50 font-bold uppercase">Specializations</span></p>
               <p className="text-[10px] mt-4 opacity-40 italic">Ensure you have saved all individual branch ranks before publishing.</p>
            </div>
         </div>

         {/* Entry Area */}
         <div className="lg:col-span-3 space-y-6">
            {flatPrograms.length === 0 ? (
               <div className="bg-white rounded-[32px] p-20 text-center border-2 border-dashed border-slate-100">
                  <Building2 className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                  <p className="text-slate-300 font-medium italic">No programs defined for this college. Add them in the Courses section first.</p>
               </div>
            ) : (
               flatPrograms.map((prog) => (
                  <div key={prog.key} className="bg-white rounded-3xl border border-slate-50 shadow-sm overflow-hidden transition-all hover:shadow-md">
                     <div 
                      className="px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
                      onClick={() => setCollapsedItems(prev => ({ ...prev, [prog.key]: !prev[prog.key] }))}
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                              <BookOpen className="w-5 h-5" />
                           </div>
                           <div>
                              <h3 className="text-lg font-semibold text-slate-800">{prog.courseName}</h3>
                              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{prog.branchName}</p>
                           </div>
                        </div>
                        {collapsedItems[prog.key] ? <ChevronDown className="w-5 h-5 text-slate-300" /> : <ChevronUp className="w-5 h-5 text-slate-300" />}
                     </div>

                     {!collapsedItems[prog.key] && (
                        <div className="overflow-x-auto custom-scrollbar">
                           <table className="w-full text-sm">
                              <thead>
                                 <tr className="bg-slate-50/30 text-[10px] font-bold text-slate-300 uppercase tracking-widest border-y border-slate-50">
                                    <th className="px-8 py-4 text-left w-40">Category</th>
                                    <th className="px-8 py-4 text-left w-32 border-x border-slate-50">Seats</th>
                                    {activeRounds.map(round => (
                                       <th key={round} className="px-8 py-4 text-center min-w-[200px]">
                                          <div className="flex items-center justify-center gap-2">
                                             Round {round}
                                             <button onClick={(e) => { e.stopPropagation(); setActiveRounds(activeRounds.filter(r => r !== round)) }} className="text-slate-200 hover:text-rose-400"><X className="w-3 h-3" /></button>
                                          </div>
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                 {DEFAULT_CATEGORIES.map(cat => (
                                    <tr key={cat} className="hover:bg-slate-50/20">
                                       <td className="px-8 py-4 font-semibold text-slate-600">{cat}</td>
                                       <td className="px-8 py-4 border-x border-slate-50">
                                          <input 
                                            value={matrix[prog.key]?.[cat]?.seats || ""}
                                            onChange={(e) => handleSeatChange(prog.key, cat, e.target.value)}
                                            placeholder="0"
                                            className="w-full px-3 py-2 bg-slate-50 border-none rounded-lg text-sm font-bold text-slate-800 outline-none focus:ring-1 focus:ring-slate-100 transition-all text-center"
                                          />
                                       </td>
                                       {activeRounds.map(round => (
                                          <td key={round} className="px-6 py-4">
                                             <div className="flex gap-2">
                                                <input 
                                                  value={matrix[prog.key]?.[cat]?.rounds[round]?.openingRank || ""}
                                                  onChange={(e) => handleRankChange(prog.key, cat, round, "openingRank", e.target.value)}
                                                  placeholder="OR"
                                                  className="w-full px-2 py-2 bg-slate-50 border-none rounded-lg text-[11px] font-bold text-slate-400 focus:text-slate-900 focus:ring-1 focus:ring-slate-100 outline-none text-center"
                                                />
                                                <input 
                                                  value={matrix[prog.key]?.[cat]?.rounds[round]?.closingRank || ""}
                                                  onChange={(e) => handleRankChange(prog.key, cat, round, "closingRank", e.target.value)}
                                                  placeholder="CR"
                                                  className="w-full px-2 py-2 bg-slate-50 border-none rounded-lg text-[11px] font-bold text-slate-400 focus:text-slate-900 focus:ring-1 focus:ring-slate-100 outline-none text-center"
                                                />
                                             </div>
                                          </td>
                                       ))}
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     )}
                  </div>
               ))
            )}
         </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default function AddCutoffPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-white"><div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>}>
      <AddCutoffForm />
    </Suspense>
  );
}
