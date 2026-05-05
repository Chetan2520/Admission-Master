"use client";

import { 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Layers,
  Edit,
  Trash2,
  ChevronRight,
  UploadCloud,
  Building2,
  Globe,
  PlusCircle,
  Tag
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManageCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?search=${searchTerm}&page=${currentPage}&limit=10`);
        const json = await res.json();
        if (json.success) {
          setColleges(json.data);
          setTotalPages(json.pagination.pages);
          setTotalCount(json.pagination.total);
        }
      } catch (err) {
        console.error("Failed to fetch colleges", err);
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchColleges();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, currentPage]);

  const handleBulkUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload-courses`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert(`${data.updatedCount} colleges updated with new courses!`);
        window.location.reload();
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const [addingToCollege, setAddingToCollege] = useState<string | null>(null);
  const [newCourseName, setNewCourseName] = useState("");

  const handleAddManualCourse = async (collegeId: string) => {
    if (!newCourseName) return;

    try {
      // Parse input as comma separated
      const courseNames = newCourseName.split(',').map(s => s.trim()).filter(s => s !== "");
      if (courseNames.length === 0) return;

      const college = colleges.find(c => c._id === collegeId);
      
      // Prevent duplicates by name
      const existingNames = (college.courses || []).map((c: any) => c.name.toLowerCase());
      const uniqueNewCourses = courseNames
        .filter(name => !existingNames.includes(name.toLowerCase()))
        .map(name => ({ name, duration: "4 Years", fees: "N/A" }));

      if (uniqueNewCourses.length === 0) {
        alert("Courses already exist!");
        return;
      }

      const updatedCourses = [...(college.courses || []), ...uniqueNewCourses];

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges/${collegeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses: updatedCourses }),
      });
      const data = await res.json();
      if (data.success) {
        setColleges(prev => prev.map(c => c._id === collegeId ? data.data : c));
        setAddingToCollege(null);
        setNewCourseName("");
      }
    } catch (err) {
      console.error("Failed to add course", err);
      alert("Failed to add course.");
    }
  };

  const handleDeleteCourse = async (collegeId: string, courseIndex: number) => {
    if (!confirm("Are you sure you want to remove this course?")) return;

    try {
      const college = colleges.find(c => c._id === collegeId);
      const updatedCourses = college.courses.filter((_: any, idx: number) => idx !== courseIndex);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges/${collegeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses: updatedCourses }),
      });
      const data = await res.json();
      if (data.success) {
        setColleges(prev => prev.map(c => c._id === collegeId ? data.data : c));
      }
    } catch (err) {
      console.error("Failed to delete course", err);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage College Courses</h1>
          <p className="text-slate-500 font-medium text-sm">Add and manage academic programs for each university</p>
        </div>
        <div className="flex gap-3">
           <label className={`cursor-pointer bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
             <UploadCloud className="w-4 h-4" /> 
             {isUploading ? 'Uploading...' : 'Bulk Upload Courses'}
             <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleBulkUpload} />
           </label>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search college to add courses..." 
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
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">College</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Active Courses</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Short Name</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800 text-right">Actions</th>
              </tr>
            </thead>
             <tbody className="divide-y divide-slate-100">
               {loading ? (
                 <tr>
                   <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                         <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                         <p className="text-slate-500 font-bold">Loading colleges...</p>
                      </div>
                   </td>
                 </tr>
               ) : colleges.length === 0 ? (
                 <tr>
                   <td colSpan={4} className="px-6 py-20 text-center text-slate-500 font-bold">
                      No colleges found.
                   </td>
                 </tr>
               ) : (
                 colleges.map((college, i) => (
                   <tr key={college._id || i} className="hover:bg-teal-50/30 transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex-shrink-0 flex items-center justify-center p-1 shadow-sm">
                           {college.logo ? (
                             <img src={college.logo} alt="" className="w-full h-full object-contain" />
                           ) : (
                             <Building2 className="w-5 h-5 text-slate-300" />
                           )}
                         </div>
                         <div className="flex flex-col">
                           <span className="font-bold text-slate-900">{college.name}</span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{college.location}, {college.state}</span>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2 max-w-xl">
                           {college.courses && college.courses.length > 0 ? (
                             college.courses.map((course: any, idx: number) => (
                               <span key={idx} className="px-2.5 py-1.5 bg-white border border-slate-200 text-slate-900 rounded-md text-[10px] font-bold flex items-center gap-2 shadow-sm hover:border-teal-200 group/badge transition-all">
                               
                                 {course.name}
                                 <button 
                                   onClick={() => handleDeleteCourse(college._id, idx)}
                                   className="opacity-0 group-hover/badge:opacity-100 hover:text-rose-500 transition-all ml-1"
                                 >
                                   <Trash2 className="w-3 h-3" />
                                 </button>
                               </span>
                             ))
                           ) : (
                             <span className="text-xs text-slate-400 font-medium italic">No programs listed yet.</span>
                           )}
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-700">{college.shortName || '—'}</span>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex justify-end items-center gap-3">
                           {addingToCollege === college._id ? (
                             <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-300">
                               <div className="relative">
                                 <input 
                                   autoFocus
                                   type="text" 
                                   placeholder="e.g. B.Tech, MBA..." 
                                   className="px-4 py-2 bg-white border border-teal-500/30 rounded-md text-xs font-bold outline-none ring-4 ring-teal-500/5 w-64 shadow-xl"
                                   value={newCourseName}
                                   onChange={(e) => setNewCourseName(e.target.value)}
                                   onKeyDown={(e) => e.key === 'Enter' && handleAddManualCourse(college._id)}
                                 />
                                 <div className="absolute -top-6 left-0 text-[9px]  font-bold text-teal-600   tracking-widest bg-teal-50 px-2 py-0.5 rounded-t-lg border-x border-t border-teal-500/30">
                                   Comma separated entry
                                 </div>
                               </div>
                               <div className="flex gap-1">
                                 <button 
                                   onClick={() => handleAddManualCourse(college._id)}
                                   className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 shadow-lg shadow-teal-600/20 flex items-center gap-1 text-[10px] font-bold   tracking-wider"
                                 >
                                   Add
                                 </button>
                                 <button 
                                   onClick={() => { setAddingToCollege(null); setNewCourseName(""); }}
                                   className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                 >
                                   <Trash2 className="w-4 h-4" />
                                 </button>
                               </div>
                             </div>
                           ) : (
                             <button 
                               onClick={() => setAddingToCollege(college._id)}
                               className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-900 rounded-md text-xs font-bold hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm group"
                             >
                                <PlusCircle className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" /> 
                                Add Courses
                             </button>
                           )}
                        </div>
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total {totalCount} Colleges
            </p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === page 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
