"use client";

import { 
  Search, 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  FileSpreadsheet, 
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  X,
  TrendingUp,
  Award,
  Hash
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as xlsx from 'xlsx';

interface RankData {
  _id: string;
  year: number;
  marks: number;
  minRank: number;
  maxRank: number;
  avgRank: number;
  percentile?: number;
  totalStudents?: number;
}

export default function ManageRankPage() {
  const [ranks, setRanks] = useState<RankData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentRank, setCurrentRank] = useState<Partial<RankData>>({
    year: 2025,
    marks: 0,
    minRank: 0,
    maxRank: 0,
    avgRank: 0
  });

  const fetchRanks = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        year: selectedYear,
        search: searchTerm
      });
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/ranks?${queryParams}`);
      const result = await response.json();
      
      if (result.success) {
        setRanks(result.data);
        setTotalPages(result.pagination.pages);
        setTotalRecords(result.pagination.total);
      } else {
        toast.error(result.message || "Failed to fetch ranks");
      }
    } catch (error) {
      console.error("Error fetching ranks:", error);
      toast.error("An error occurred while fetching rank data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanks();
  }, [page, selectedYear]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchRanks();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this rank record?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/ranks/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Rank record deleted successfully");
        fetchRanks();
      } else {
        toast.error(result.message || "Failed to delete record");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the record");
    }
  };

  const handleAddRank = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/ranks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentRank),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Rank data added successfully");
        setIsAddModalOpen(false);
        fetchRanks();
      } else {
        toast.error(result.message || "Failed to add rank data");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleUpdateRank = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/ranks/${currentRank._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentRank),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Rank data updated successfully");
        setIsEditModalOpen(false);
        fetchRanks();
      } else {
        toast.error(result.message || "Failed to update rank data");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast.loading("Uploading and processing file...", { id: "upload" });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/ranks/bulk-upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message, { id: "upload" });
        setIsUploadModalOpen(false);
        fetchRanks();
      } else {
        toast.error(result.message || "Upload failed", { id: "upload" });
      }
    } catch (error) {
      toast.error("An error occurred during upload", { id: "upload" });
    }
  };

  const downloadSample = () => {
    const sampleData = [
      { Year: 2025, Marks: 720, MinRank: 1, MaxRank: 1, AvgRank: 1, Percentile: 100, TotalStudents: 2400000 },
      { Year: 2025, Marks: 715, MinRank: 2, MaxRank: 15, AvgRank: 8, Percentile: 99.99, TotalStudents: 2400000 },
      { Year: 2025, Marks: 700, MinRank: 100, MaxRank: 150, AvgRank: 125, Percentile: 99.9, TotalStudents: 2400000 },
    ];
    const ws = xlsx.utils.json_to_sheet(sampleData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "RankData");
    xlsx.writeFile(wb, "NEET_Rank_Sample.xlsx");
  };

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage Rank Data</h1>
          <p className="text-slate-500 font-medium text-sm">Configure Marks vs AIR Rank mappings for predictive analysis</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-100 transition-all active:scale-95 shadow-sm"
          >
            <Upload className="w-4 h-4" /> Bulk Upload
          </button>
          <button 
            onClick={() => {
              setCurrentRank({ year: 2025, marks: 0, minRank: 0, maxRank: 0, avgRank: 0 });
              setIsAddModalOpen(true);
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-slate-900/10"
          >
            <Plus className="w-4 h-4" /> Add Rank Record
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
               <TrendingUp className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Total Records</p>
               <p className="text-2xl font-bold text-slate-900">{totalRecords}</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
               <Award className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Top Marks</p>
               <p className="text-2xl font-bold text-slate-900">{ranks.length > 0 ? Math.max(...ranks.map(r => r.marks)) : "N/A"}</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
               <Hash className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Active Year</p>
               <p className="text-2xl font-bold text-slate-900">{selectedYear}</p>
            </div>
         </div>
      </div>

      {/* Filters and Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="number" 
              placeholder="Search by marks..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2025">Year: 2025</option>
              <option value="2024">Year: 2024</option>
              <option value="2023">Year: 2023</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 uppercase text-[10px] tracking-wider">Year</th>
                <th className="px-6 py-4 uppercase text-[10px] tracking-wider">Marks</th>
                <th className="px-6 py-4 uppercase text-[10px] tracking-wider">Rank Range (Min - Max)</th>
                <th className="px-6 py-4 uppercase text-[10px] tracking-wider">Avg Rank</th>
                <th className="px-6 py-4 uppercase text-[10px] tracking-wider">Percentile</th>
                <th className="px-6 py-4 uppercase text-[10px] tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">
                    Loading rank data...
                  </td>
                </tr>
              ) : ranks.length > 0 ? (
                ranks.map((rank) => (
                  <tr key={rank._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                       <span className="font-bold text-slate-900">{rank.year}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                             {rank.marks}
                          </div>
                          <span className="font-semibold text-slate-700">Marks</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-slate-600 font-medium">{rank.minRank.toLocaleString()} - {rank.maxRank.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs">
                          {rank.avgRank.toLocaleString()}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-slate-500">{rank.percentile ? `${rank.percentile}%` : "-"}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => {
                              setCurrentRank(rank);
                              setIsEditModalOpen(true);
                            }}
                            className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-xl shadow-sm"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(rank._id)}
                            className="p-2 bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 transition-colors rounded-xl shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">
                    No rank records found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase">
            Showing {ranks.length} of {totalRecords} records
          </p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-slate-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">{isAddModalOpen ? "Add Rank Record" : "Edit Rank Record"}</h2>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={isAddModalOpen ? handleAddRank : handleUpdateRank} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                  <input 
                    type="number" 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={currentRank.year}
                    onChange={(e) => setCurrentRank({...currentRank, year: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Marks (0-720)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    max="720"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={currentRank.marks}
                    onChange={(e) => setCurrentRank({...currentRank, marks: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Min Rank</label>
                  <input 
                    type="number" 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={currentRank.minRank}
                    onChange={(e) => setCurrentRank({...currentRank, minRank: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Max Rank</label>
                  <input 
                    type="number" 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={currentRank.maxRank}
                    onChange={(e) => setCurrentRank({...currentRank, maxRank: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Avg Rank</label>
                <input 
                  type="number" 
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={currentRank.avgRank}
                  onChange={(e) => setCurrentRank({...currentRank, avgRank: parseInt(e.target.value)})}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                >
                  {isAddModalOpen ? "Create Record" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Bulk Upload Rank Data</h2>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-4">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-blue-900">Important Instruction</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Please use our Excel template to ensure data compatibility. Columns required: Year, Marks, MinRank, MaxRank, AvgRank.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 bg-slate-50/50 group hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".xlsx, .xls"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-bold text-slate-900 mb-1">Click or Drop File</p>
                <p className="text-xs text-slate-400 font-medium">Supports .XLSX, .XLS files</p>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={downloadSample}
                  className="w-full px-6 py-3 border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                >
                  <Download className="w-4 h-4" /> Download Sample Format
                </button>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="w-full px-6 py-3 text-slate-400 text-xs font-bold hover:text-slate-600"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
