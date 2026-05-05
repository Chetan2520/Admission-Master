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
  FileSpreadsheet,
  LayoutGrid,
  List as ListIcon
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function CutoffManagerContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isUploading, setIsUploading] = useState(false);
  const [cutoffData, setCutoffData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRound, setSelectedRound] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "college">(initialSearch ? "list" : "college");
  const [colleges, setColleges] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (viewMode === "list") {
          let url = `${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs?search=${searchTerm}`;
          if (selectedYear !== "All") url += `&year=${selectedYear}`;
          if (selectedRound !== "All") url += `&round=${selectedRound}`;
          
          const res = await fetch(url);
          const json = await res.json();
          if (json.success) setCutoffData(json.data);
        } else {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?search=${searchTerm}&limit=100`);
          const json = await res.json();
          if (json.success) setColleges(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedYear, selectedRound, viewMode]);

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
      
      if (data.errors && data.errors.length > 0) {
        const firstError = data.errors[0];
        alert(`${data.message}\n\nExample Error: Row ${firstError.row}: ${firstError.error}\n(Check console for all errors)`);
        console.table(data.errors);
      } else {
        alert(data.message);
      }
      
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
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Manage Cut-offs</h1>
          <p className="text-slate-500 font-medium text-sm">Centralized database for Opening & Closing ranks across all colleges</p>
        </div>
        <div className="flex gap-3">
           <label className={`cursor-pointer bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
             <UploadCloud className="w-4 h-4" /> 
             {isUploading ? 'Uploading...' : 'Bulk Upload'}
             <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
           </label>
           <Link 
             href="/admin/cut-offs/add"
             className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
           >
             <Plus className="w-4 h-4" /> Add New Entry
           </Link>
        </div>
      </div>

      {/* View Switcher & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
         <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex bg-slate-100 p-1 rounded-lg">
               <button 
                  onClick={() => setViewMode("college")}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${viewMode === "college" ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  <Building2 className="w-3.5 h-3.5" /> Colleges List
               </button>
               <button 
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${viewMode === "list" ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                  <ListIcon className="w-3.5 h-3.5" /> Records Table
               </button>
            </div>
            <div className="flex gap-2">
               <select 
                 value={selectedYear}
                 onChange={(e) => setSelectedYear(e.target.value)}
                 className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium outline-none cursor-pointer"
               >
                  <option value="All">All Years</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
               </select>
               <select 
                 value={selectedRound}
                 onChange={(e) => setSelectedRound(e.target.value)}
                 className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium outline-none cursor-pointer"
               >
                  <option value="All">All Rounds</option>
                  <option value="1">Round 1</option>
                  <option value="2">Round 2</option>
                  <option value="3">Round 3</option>
                  <option value="Mop-up">Mop-up</option>
               </select>
            </div>
         </div>

         <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={viewMode === "college" ? "Search colleges..." : "Filter records..."}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-1 focus:ring-teal-500 transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "college" ? (
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">College Name</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">Short Name</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                        <tr>
                           <td colSpan={4} className="px-6 py-10 text-center">
                              <div className="flex flex-col items-center gap-2">
                                 <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                                 <p className="text-slate-500 font-medium text-xs">Loading colleges...</p>
                              </div>
                           </td>
                        </tr>
                     ) : colleges.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium text-sm">No colleges found.</td>
                        </tr>
                     ) : (
                        colleges.map((college) => (
                           <tr key={college._id} className="hover:bg-slate-50/80 transition-colors group">
                              <td className="px-6 py-4 font-medium text-slate-900">{college.name}</td>
                              <td className="px-6 py-4">
                                 <span className="text-slate-500 font-medium">{college.shortName || '-'}</span>
                              </td>
                              <td className="px-6 py-4 text-slate-500 font-medium">{college.location}, {college.state}</td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex justify-end gap-3">
                                    <Link 
                                       href={`/admin/cut-offs/add?collegeId=${college._id}`}
                                       className="text-teal-600 hover:text-teal-700 font-medium text-xs flex items-center gap-1"
                                    >
                                       <Plus className="w-3.5 h-3.5" /> Add Cutoff
                                    </Link>
                                    <Link 
                                       href={`/admin/cut-offs?search=${college.shortName || college.name}`}
                                       onClick={() => setViewMode("list")}
                                       className="text-slate-400 hover:text-slate-600 font-medium text-xs flex items-center gap-1"
                                    >
                                       View History <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      ) : (
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">College & Program</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider">Exam & Year</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-center">Round</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-center">Category</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-center">Opening</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-center">Closing</th>
                        <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {loading ? (
                        <tr>
                           <td colSpan={7} className="px-6 py-10 text-center">
                              <div className="flex flex-col items-center gap-2">
                                 <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                                 <p className="text-slate-500 font-medium text-xs">Loading records...</p>
                              </div>
                           </td>
                        </tr>
                     ) : cutoffData.length === 0 ? (
                        <tr>
                           <td colSpan={7} className="px-6 py-10 text-center text-slate-400 font-medium text-sm">No records found.</td>
                        </tr>
                     ) : (
                        cutoffData.map((data, i) => (
                           <tr key={data._id || i} className="hover:bg-slate-50/80 transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="flex flex-col">
                                    <span className="font-medium text-slate-900">{data.collegeId?.name || data.college || 'N/A'}</span>
                                    <span className="text-[10px] font-medium text-teal-600 uppercase mt-0.5">{data.course} • {data.branch}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex flex-col">
                                    <span className="text-slate-700 font-medium text-xs">{data.exam}</span>
                                    <span className="text-[10px] font-medium text-slate-400">Class of {data.year}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-medium text-[10px] rounded border border-slate-200">Round {data.round}</span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <span className="text-teal-700 px-2 py-0.5 rounded text-[10px] font-medium uppercase">{data.category}</span>
                              </td>
                              <td className="px-6 py-4 text-center font-medium text-slate-600">{data.openingRank}</td>
                              <td className="px-6 py-4 text-center font-medium text-teal-700">{data.closingRank}</td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                    <Link 
                                       href={`/admin/cut-offs/edit/${data._id}`}
                                       className="p-1.5 text-slate-400 hover:text-teal-600 transition-colors"
                                    >
                                       <Edit className="w-4 h-4" />
                                    </Link>
                                    <button className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                                       <Trash2 className="w-4 h-4" />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        )
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}
    </div>
  );
}

export default function CutoffManagerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <CutoffManagerContent />
    </Suspense>
  );
}
