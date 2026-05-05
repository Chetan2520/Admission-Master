"use client";

import { 
  ArrowLeft, 
  Save, 
  Building2, 
  MapPin, 
  GraduationCap, 
  Upload,
  Info,
  Globe,
  Tag,
  ShieldCheck,
  Hash,
  Home,
  Wifi,
  Library,
  Image as ImageIcon,
  BookOpen,
  RotateCcw,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditCollegePage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/admin/colleges" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-xs transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-3xl font-bold text-slate-900">Edit College</h1>
               <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                  {params.id || "COL-001"}
               </span>
            </div>
            <p className="text-slate-500 font-medium text-sm">Update the comprehensive university details and campus assets</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Discard</button>
             <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10">
               <RotateCcw className="w-4 h-4" /> Update Record
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         
         {/* Sidebar Left - Assets & Type */}
         <div className="lg:col-span-1 space-y-6">
            {/* Logo Upload */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
               <label className="text-sm font-bold text-slate-700 block">College Logo</label>
               <div className="relative h-24 w-full rounded-2xl overflow-hidden border border-slate-200 group cursor-pointer">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/IIT_Bombay_logo.svg/1200px-IIT_Bombay_logo.svg.png" alt="Logo" className="w-full h-full object-contain p-2 group-hover:blur-sm transition-all" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                     <Upload className="w-5 h-5 text-white" />
                  </div>
               </div>
            </div>

            {/* Images Upload */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
               <label className="text-sm font-bold text-slate-700 block">Campus Images</label>
               <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="aspect-square rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                     <Plus className="w-4 h-4 text-slate-300" />
                  </div>
               </div>
               <button className="w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:bg-slate-100 transition-colors">Manage Images</button>
            </div>

            {/* College Type & Affiliation */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
               <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> Classification
               </h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">College Type</label>
                     <select defaultValue="Govt" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none appearance-none">
                        <option>Government</option>
                        <option>Private</option>
                        <option>Deemed</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Affiliation</label>
                     <input type="text" defaultValue="UGC / AICTE" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content Right - Details */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
               
               {/* Identity & Address */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                        <Info className="w-4 h-4 text-teal-600" /> Identity & Rank
                     </h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">College Name</label>
                              <input type="text" defaultValue="IIT Bombay" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Short Name</label>
                              <input type="text" defaultValue="IIT-B" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">NIRF Ranking</label>
                              <input type="number" defaultValue="3" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Website URL</label>
                              <div className="relative">
                                 <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                 <input type="url" defaultValue="https://www.iitb.ac.in" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                        <MapPin className="w-4 h-4 text-rose-500" /> Location Details
                     </h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">City</label>
                              <input type="text" defaultValue="Mumbai" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">State</label>
                              <input type="text" defaultValue="Maharashtra" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                           <div className="md:col-span-3 space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Full Address</label>
                              <input type="text" defaultValue="Powai, Mumbai, Maharashtra 400076" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Pincode</label>
                              <input type="text" defaultValue="400076" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Facilities Checklist */}
               <div className="space-y-6 border-t border-slate-100 pt-8">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                     <Home className="w-4 h-4 text-blue-600" /> Campus Facilities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                     {[
                        { name: "Hostel", icon: Home },
                        { name: "WiFi", icon: Wifi },
                        { name: "Library", icon: Library },
                        { name: "Gym", icon: Building2 },
                        { name: "Hospital", icon: ShieldCheck },
                        { name: "Sports", icon: GraduationCap }
                     ].map(f => (
                        <label key={f.name} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors border border-slate-100">
                           <input type="checkbox" defaultChecked={f.name === "Hostel" || f.name === "WiFi" || f.name === "Library"} className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer" />
                           <f.icon className="w-4 h-4 text-slate-400" />
                           <span className="text-[11px] font-bold text-slate-600">{f.name}</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Description */}
               <div className="space-y-4 pt-4 border-t border-slate-100 pt-8">
                  <label className="text-sm font-bold text-slate-700 block">About College / Description</label>
                  <textarea rows={6} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500" defaultValue="Indian Institute of Technology Bombay is a public technical and research university located in Powai, Mumbai. It has been a world-class centre for technical education and research."></textarea>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
