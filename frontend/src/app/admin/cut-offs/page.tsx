"use client";

import { 
  Search, 
  UploadCloud, 
  Building2, 
  Plus,
  ArrowRight,
  AlertTriangle,
  ChevronDown,
  Edit3,
  Trash2,
  BookOpen,
  Info,
  Layers,
  ChevronUp,
  Filter,
  Download
} from "lucide-react";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

function CutoffManagerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isUploading, setIsUploading] = useState(false);
  const [cutoffData, setCutoffData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("All");
  const [expandedColleges, setExpandedColleges] = useState<Set<string>>(new Set());

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs?search=${searchTerm}`;
      if (selectedYear !== "All") url += `&year=${selectedYear}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) setCutoffData(json.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedYear]);

  const groupedRecords = useMemo(() => {
    const groups: Record<string, any> = {};
    cutoffData.forEach(record => {
      const collegeId = record.collegeId?._id || 'manual-' + (record.college || 'na');
      if (!groups[collegeId]) {
        groups[collegeId] = {
          id: collegeId,
          college: record.collegeId || { name: record.college || 'Unknown College' },
          programs: {}
        };
      }
      const programKey = `${record.course} - ${record.branch}`;
      if (!groups[collegeId].programs[programKey]) {
        groups[collegeId].programs[programKey] = [];
      }
      groups[collegeId].programs[programKey].push(record);
    });
    return Object.values(groups);
  }, [cutoffData]);

  const toggleCollege = (id: string) => {
    const next = new Set(expandedColleges);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedColleges(next);
  };

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
      if (data.success) {
        toast.success(data.message);
        fetchData();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("CRITICAL: Delete ALL cutoff records permanently?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs/bulk/delete-all`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("All records cleared");
        fetchData();
      }
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  const handleDeleteOne = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/cutoffs/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setCutoffData(prev => prev.filter(r => r._id !== id));
        toast.success("Record deleted");
      }
    } catch (err) { toast.error("Error deleting"); }
  };

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      <Toaster position="top-right" />
      
      {/* Header - Styled like Manage Colleges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage Cut-offs</h1>
          <p className="text-slate-500 font-medium text-sm">Monitor and update entrance rank thresholds and seat availability</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleDeleteAll}
            className="px-4 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-rose-100 transition-all active:scale-95 shadow-sm"
          >
            <AlertTriangle className="w-4 h-4" /> Clear All
          </button>
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <label className={`cursor-pointer bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm ${isUploading ? 'opacity-50' : ''}`}>
            <UploadCloud className="w-4 h-4" /> 
            {isUploading ? 'Uploading...' : 'Bulk Import'}
            <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
          </label>
          <Link 
            href="/admin/cut-offs/add"
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10"
          >
            <Plus className="w-4 h-4" /> Add Record
          </Link>
        </div>
      </div>

      {/* Main Container - Table Layout */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by college, course or branch..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-teal-500/20 outline-none"
            >
              <option value="All">All Years</option>
              <option>2026</option><option>2025</option><option>2024</option>
            </select>
            <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 shadow-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Institution</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Indexed Programs</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Record Count</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Compiling threshold data...</p>
                    </div>
                  </td>
                </tr>
              ) : groupedRecords.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-medium italic">No cutoff records found.</td>
                </tr>
              ) : (
                groupedRecords.map((group: any) => (
                  <React.Fragment key={group.id}>
                    <tr 
                      className="hover:bg-teal-50/20 transition-colors cursor-pointer group" 
                      onClick={() => toggleCollege(group.id)}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                            {group.college.logo ? <img src={group.college.logo} className="w-full h-full object-contain p-1" /> : <Building2 className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{group.college.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group.college.location}, {group.college.state}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                           {Object.keys(group.programs).slice(0, 2).map((p, i) => (
                             <span key={i} className="px-2 py-1 bg-white border border-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">{p}</span>
                           ))}
                           {Object.keys(group.programs).length > 2 && <span className="text-[10px] text-slate-400 font-bold">+{Object.keys(group.programs).length - 2} more</span>}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <span className="font-bold text-teal-600">{Object.values(group.programs).reduce((a: number, b: any) => a + b.length, 0)} Ranks</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className={`w-8 h-8 rounded-full border border-slate-100 inline-flex items-center justify-center transition-all ${expandedColleges.has(group.id) ? 'bg-teal-600 text-white border-teal-600' : 'text-slate-300'}`}>
                           {expandedColleges.has(group.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </td>
                    </tr>
                    {expandedColleges.has(group.id) && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={4} className="p-8">
                           <div className="space-y-6">
                              {Object.entries(group.programs).map(([progKey, records]: [string, any]) => (
                                <div key={progKey} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                   <div className="px-5 py-3 bg-slate-50/50 border-b border-slate-50 flex justify-between items-center">
                                      <div className="flex items-center gap-2">
                                         <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                                         <h4 className="text-[13px] font-black text-slate-700 tracking-tight">{progKey}</h4>
                                      </div>
                                      <Link href={`/admin/cut-offs/add?collegeId=${group.college._id}`} className="text-[10px] font-bold text-teal-600 hover:underline">Update Matrix</Link>
                                   </div>
                                   <div className="overflow-x-auto">
                                      <table className="w-full text-xs">
                                         <thead>
                                            <tr className="text-slate-300 font-bold uppercase tracking-widest border-b border-slate-50">
                                               <th className="px-6 py-3 text-left">Category / Round</th>
                                               <th className="px-6 py-3 text-center">Year</th>
                                               <th className="px-6 py-3 text-center">Seats</th>
                                               <th className="px-6 py-3 text-center text-teal-600">Opening Rank</th>
                                               <th className="px-6 py-3 text-center text-slate-900">Closing Rank</th>
                                               <th className="px-6 py-3 text-right">Actions</th>
                                            </tr>
                                         </thead>
                                         <tbody className="divide-y divide-slate-50">
                                            {records.map((data: any) => (
                                              <tr key={data._id} className="hover:bg-slate-50/30 group/row">
                                                 <td className="px-6 py-3">
                                                    <div className="flex items-center gap-3">
                                                       <div className="w-7 h-7 rounded bg-slate-50 text-[10px] font-black text-slate-400 flex items-center justify-center">R{data.round}</div>
                                                       <span className="font-bold text-slate-700">{data.category}</span>
                                                    </div>
                                                 </td>
                                                 <td className="px-6 py-3 text-center font-bold text-slate-400">{data.year}</td>
                                                 <td className="px-6 py-3 text-center font-bold text-slate-600">{data.seats || 0}</td>
                                                 <td className="px-6 py-3 text-center font-bold text-teal-600">{data.openingRank}</td>
                                                 <td className="px-6 py-3 text-center font-bold text-slate-900">{data.closingRank}</td>
                                                 <td className="px-6 py-3 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-row-hover:opacity-100 transition-opacity">
                                                       <Link href={`/admin/cut-offs/edit/${data._id}`} className="text-slate-300 hover:text-teal-600"><Edit3 className="w-3.5 h-3.5" /></Link>
                                                       <button onClick={() => handleDeleteOne(data._id)} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
                                                    </div>
                                                 </td>
                                              </tr>
                                            ))}
                                         </tbody>
                                      </table>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function CutoffManagerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-white"><div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <CutoffManagerContent />
    </Suspense>
  );
}
