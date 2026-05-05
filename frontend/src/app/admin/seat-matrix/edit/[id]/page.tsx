"use client";

import { 
  ArrowLeft, 
  Save, 
  Building2, 
  Layers, 
  Target, 
  PieChart,
  Plus,
  ShieldCheck,
  Users,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditSeatMatrixPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/admin/seat-matrix" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-xs transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Seat Matrix
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-3xl font-bold text-slate-900">Edit Seat Distribution</h1>
               <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                  {params.id || "SM-001"}
               </span>
            </div>
            <p className="text-slate-500 font-medium text-sm">Update the verified seat matrix for AIIMS Delhi - MBBS</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Discard</button>
             <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10">
               <RotateCcw className="w-4 h-4" /> Update Matrix
             </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-8 space-y-10">
         
         {/* Step 1: Mapping */}
         <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
               <Layers className="w-4 h-4 text-teal-600" /> Program Mapping
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Select College</label>
                  <select defaultValue="AIIMS Delhi" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                     <option>AIIMS Delhi</option>
                     <option>IIT Bombay</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Course Name</label>
                  <select defaultValue="MBBS" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                     <option>MBBS</option>
                     <option>B.Tech</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Branch Name</label>
                  <select defaultValue="General Medicine" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                     <option>General Medicine</option>
                     <option>Computer Science</option>
                  </select>
               </div>
            </div>
         </div>

         {/* Step 2: Distribution */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Category Wise */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
                  <Users className="w-4 h-4 text-blue-600" /> Category-wise Distribution
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase">GEN Seats</label>
                     <input type="number" defaultValue="51" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase">OBC Seats</label>
                     <input type="number" defaultValue="27" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase">SC Seats</label>
                     <input type="number" defaultValue="15" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase">ST Seats</label>
                     <input type="number" defaultValue="8" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase">EWS Seats</label>
                     <input type="number" defaultValue="10" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                  </div>
               </div>
            </div>

            {/* Quota Wise */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
                  <PieChart className="w-4 h-4 text-purple-600" /> Quota-wise Distribution
               </h3>
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">AIQ Seats</label>
                        <input type="number" defaultValue="125" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">State Quota Seats</label>
                        <input type="number" defaultValue="0" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                     </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                     <label className="text-sm font-bold text-slate-700 block mb-2">Total Combined Seats</label>
                     <div className="bg-slate-900 text-white p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">Verified Matrix Sum</span>
                        <span className="text-2xl font-black">125</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
