"use client";

import { 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Building2, 
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  ChevronRight,
  Edit,
  Trash2,
  UploadCloud,
  FileSpreadsheet
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CutoffManagerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [cutoffData, setCutoffData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCutoffs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs?search=${searchTerm}`);
        const json = await res.json();
        if (json.success) setCutoffData(json.data);
      } catch (err) {
        console.error("Failed to fetch cutoffs", err);
        setError("Could not connect to the server. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchCutoffs();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload-cutoffs`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
      // Refresh data after upload
      window.location.reload();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage Cut-offs</h1>
          <p className="text-slate-500 font-medium text-sm">Centralized database for Opening & Closing ranks across all colleges</p>
        </div>
        <div className="flex gap-3">
           <label className={`cursor-pointer bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
             <UploadCloud className="w-4 h-4" /> 
             {isUploading ? 'Uploading...' : 'Bulk Upload (Excel/CSV)'}
             <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
           </label>
           <Link 
             href="/admin/cut-offs/add"
             className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10"
           >
             <Plus className="w-4 h-4" /> Add New Entry
           </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Filter by college, course or exam..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-teal-500" />
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <select className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider outline-none">
               <option>Year: 2024</option>
               <option>Year: 2023</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider outline-none">
               <option>All Rounds</option>
               <option>Round 1</option>
               <option>Round 2</option>
            </select>
            <button className="p-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100">
               <Filter className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">College & Program</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Exam & Year</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center">Round</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center">Category</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center">Quota</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center">Opening</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center underline decoration-teal-500/30">Closing</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-right">Actions</th>
              </tr>
            </thead>
             <tbody className="divide-y divide-slate-100">
               {loading ? (
                 <tr>
                   <td colSpan={8} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-slate-500 font-bold">Fetching cut-offs...</p>
                      </div>
                   </td>
                 </tr>
               ) : error ? (
                 <tr>
                   <td colSpan={8} className="px-6 py-20 text-center">
                      <div className="text-rose-500 font-bold bg-rose-50 p-4 rounded-xl inline-block">
                         {error}
                      </div>
                   </td>
                 </tr>
               ) : cutoffData.length === 0 ? (
                 <tr>
                   <td colSpan={8} className="px-6 py-20 text-center text-slate-500 font-bold">
                      No cut-off data found.
                   </td>
                 </tr>
               ) : (
                 cutoffData.map((data, i) => (
                   <tr key={data._id || i} className="hover:bg-slate-50/80 transition-colors group">
                     <td className="px-6 py-4">
                       <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{data.collegeId?.name || data.college || 'N/A'}</span>
                          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-tighter">{data.course} • {data.branch}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="text-slate-700 font-bold text-xs">{data.exam}</span>
                           <span className="text-[10px] font-bold text-slate-400">AY {data.year}</span>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-center font-bold text-slate-600">R-{data.round}</td>
                     <td className="px-6 py-4 text-center">
                       <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                          {data.category}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-center">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                         data.quota === 'AIQ' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                       }`}>
                         {data.quota}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-center font-bold text-slate-700">{data.openingRank}</td>
                     <td className="px-6 py-4 text-center font-black text-teal-700">{data.closingRank}</td>
                     <td className="px-6 py-4">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Link 
                           href={`/admin/cut-offs/edit/${data._id}`}
                           className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg"
                         >
                           <Edit className="w-4 h-4" />
                         </Link>
                         <button className="p-1.5 bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 transition-colors rounded-lg">
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
