"use client";

import { 
  Search, 
  Plus, 
  Calendar, 
  Award,
  Edit,
  Trash2,
  Clock,
  AlertTriangle
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

interface Exam {
  _id: string;
  name: string;
  authority: string;
  description?: string;
  mode: string;
  totalMarks: string;
  examDate: string;
  expectedResultDate?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Postponed';
}

export default function ManageExamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExams = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/exams`);
      const result = await response.json();
      if (result.success) {
        setExams((result.data || []).map((data: any) => {
          if (data.examDate) data.examDate = data.examDate.split('T')[0];
          if (data.expectedResultDate) data.expectedResultDate = data.expectedResultDate.split('T')[0];
          return data;
        }));
      } else {
        toast.error(result.message || "Failed to fetch exams");
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
      toast.error("An error occurred while fetching exams");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/exams/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Exam deleted successfully");
        fetchExams();
      } else {
        toast.error(result.message || "Failed to delete exam");
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error("An error occurred while deleting the exam");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("CRITICAL WARNING: This will permanently delete ALL entrance exams. This action cannot be undone. Are you absolutely sure?")) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/exams/bulk/delete-all`, {
        method: "DELETE"
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        fetchExams();
      } else {
        toast.error(json.message || "Failed to delete exams");
      }
    } catch (err) {
      toast.error("An error occurred during deletion");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExams = (exams || []).filter(e => 
    (e.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.authority || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage Entrance Exams</h1>
          <p className="text-slate-500 font-medium text-sm">Schedule and manage national & state level entrance examinations</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={handleDeleteAll}
             className="px-4 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-rose-100 transition-all active:scale-95 shadow-sm"
           >
             <AlertTriangle className="w-4 h-4" /> Delete All
           </button>
           <Link href="/admin/exams/add">
             <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10">
               <Plus className="w-4 h-4" /> Add New Exam
             </button>
           </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
               <Award className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Active Exams</p>
               <p className="text-2xl font-bold text-slate-900">{exams.length}</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
               <Calendar className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Completed</p>
               <p className="text-2xl font-bold text-slate-900">{exams.filter(e => e.status === 'Completed').length}</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Upcoming</p>
               <p className="text-2xl font-bold text-slate-900">{exams.filter(e => e.status === 'Upcoming').length}</p>
            </div>
         </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by exam name..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Exam Name</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Conducted By</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">About Exam</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Mode & Marks</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Exam Dates</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">
                    Loading exams...
                  </td>
                </tr>
              ) : filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                  <tr key={exam._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                       <span className="font-bold text-slate-900 block">{exam.name}</span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{exam.authority}</span>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-xs text-slate-500 line-clamp-2 max-w-[180px]">
                          {exam.description || "No description provided."}
                       </p>
                    </td>
                    <td className="px-6 py-4">
                       <div className="space-y-1 text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                          {exam.mode} <br/> {exam.totalMarks} Marks
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                             <span className="text-slate-400 w-12">EXAM:</span> {new Date(exam.examDate).toLocaleDateString()}
                          </div>
                          {exam.expectedResultDate && (
                            <div className="flex items-center gap-2 text-[10px] font-bold text-orange-600">
                               <span className="text-orange-400 w-12">EXPECTED:</span> {new Date(exam.expectedResultDate).toLocaleDateString()}
                            </div>
                          )}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-3">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                            exam.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 
                            exam.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                            exam.status === 'Ongoing' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {exam.status}
                          </span>
                          <div className="flex gap-2 transition-opacity">
                            <Link href={`/admin/exams/edit/${exam._id}`}>
                              <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg shadow-sm">
                                <Edit className="w-4 h-4" />
                              </button>
                            </Link>
                            <button 
                              onClick={() => handleDelete(exam._id)}
                              className="p-1.5 bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 transition-colors rounded-lg shadow-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">
                    No exams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
