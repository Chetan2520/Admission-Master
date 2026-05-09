"use client";

import { 
  Search, 
  Plus, 
  Building2, 
  Edit, 
  Trash2, 
  ArrowRight,
  BookOpen,
  Filter,
  Download,
  UploadCloud,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X,
  PlusCircle,
  Clock,
  CreditCard
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

export default function ManageCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [expandedCollegeId, setExpandedCollegeId] = useState<string | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState<any>(null);
  const [courseData, setCourseData] = useState<any[]>([]);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges?limit=100&search=${searchTerm}`);
      const json = await res.json();
      if (json.success) setColleges(json.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchColleges();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleEditClick = (college: any) => {
    setEditingCollege(college);
    setCourseData(college.courses || []);
    setShowModal(true);
  };

  const addCourse = () => {
    setCourseData([...courseData, { name: "", branches: [{ name: "", duration: "", fees: "" }] }]);
  };

  const removeCourse = (idx: number) => {
    setCourseData(courseData.filter((_, i) => i !== idx));
  };

  const addBranch = (courseIdx: number) => {
    const newData = [...courseData];
    newData[courseIdx].branches.push({ name: "", duration: "", fees: "" });
    setCourseData(newData);
  };

  const removeBranch = (courseIdx: number, branchIdx: number) => {
    const newData = [...courseData];
    newData[courseIdx].branches = newData[courseIdx].branches.filter((_: any, i: number) => i !== branchIdx);
    setCourseData(newData);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges/${editingCollege._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courses: courseData })
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Courses updated successfully");
        setShowModal(false);
        fetchColleges();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleBulkImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload-courses`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message || "Bulk import successful!");
        fetchColleges();
      } else {
        toast.error(data.message || "Bulk import failed");
      }
    } catch (error) {
      console.error("Bulk Import Error:", error);
      toast.error("An error occurred during bulk import");
    } finally {
      setIsUploading(false);
      // Reset input value to allow re-uploading same file if needed
      event.target.value = '';
    }
  };

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      <Toaster position="top-right" />
      
      {/* Header - Styled like Manage Colleges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage Courses</h1>
          <p className="text-slate-500 font-medium text-sm">Define and organize academic programs and specializations</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-rose-100 transition-all active:scale-95 shadow-sm">
            <AlertTriangle className="w-4 h-4" /> Reset All
          </button>
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <label className={`cursor-pointer bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
            <UploadCloud className="w-4 h-4" /> 
            {isUploading ? "Uploading..." : "Bulk Import"}
            <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleBulkImport} />
          </label>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10">
            <Plus className="w-4 h-4" /> New Mapping
          </button>
        </div>
      </div>

      {/* Main Container - Table Layout */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by college or course..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Institution Details</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Active Courses</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800">Total Branches</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Scanning academic database...</p>
                    </div>
                  </td>
                </tr>
              ) : colleges.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-medium italic">No results found for your search.</td>
                </tr>
              ) : (
                colleges.map((college) => (
                  <React.Fragment key={college._id}>
                    <tr className="hover:bg-teal-50/20 transition-colors cursor-pointer group" onClick={() => setExpandedCollegeId(expandedCollegeId === college._id ? null : college._id)}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 overflow-hidden">
                            {college.logo ? <img src={college.logo} className="w-full h-full object-cover" /> : <Building2 className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{college.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{college.location}, {college.state}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          {(college.courses || []).slice(0, 3).map((c: any, i: number) => (
                            <span key={i} className="px-2 py-1 bg-white border border-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">{c.name}</span>
                          ))}
                          {college.courses?.length > 3 && <span className="text-[10px] text-slate-400 font-bold">+{college.courses.length - 3} more</span>}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-bold text-teal-600">
                        {college.courses?.reduce((acc: number, curr: any) => acc + (curr.branches?.length || 0), 0) || 0} Specializations
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEditClick(college); }}
                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedCollegeId === college._id && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={4} className="px-10 py-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {college.courses?.map((course: any, cIdx: number) => (
                                <div key={cIdx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                   <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-2">
                                      <BookOpen className="w-4 h-4 text-teal-600" />
                                      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{course.name}</h4>
                                   </div>
                                   <div className="space-y-3">
                                      {course.branches?.map((branch: any, bIdx: number) => (
                                        <div key={bIdx} className="flex justify-between items-start group/branch">
                                           <div>
                                              <p className="text-xs font-bold text-slate-700">{branch.name}</p>
                                              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><Clock className="w-2.5 h-2.5" /> {branch.duration}</p>
                                           </div>
                                           <div className="text-right">
                                              <p className="text-xs font-black text-slate-900">₹{branch.fees}</p>
                                           </div>
                                        </div>
                                      ))}
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

      {/* Modal - Keeps its intuitive functional logic but updated style */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Configure Academic Structure</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Managing {editingCollege?.name}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {courseData.map((course, cIdx) => (
                <div key={cIdx} className="bg-slate-50 rounded-3xl p-6 relative border border-slate-100">
                  <button onClick={() => removeCourse(cIdx)} className="absolute -top-2 -right-2 w-8 h-8 bg-white text-rose-500 rounded-full shadow-md flex items-center justify-center hover:bg-rose-50 transition-colors border border-rose-100"><X className="w-4 h-4" /></button>
                  
                  <div className="space-y-4 mb-6">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Parent Course Name</label>
                    <input 
                      value={course.name}
                      onChange={(e) => {
                        const newData = [...courseData];
                        newData[cIdx].name = e.target.value;
                        setCourseData(newData);
                      }}
                      placeholder="e.g. B.Tech, MBBS, MBA"
                      className="w-full px-5 py-4 bg-white border-none rounded-2xl text-sm font-bold text-slate-800 outline-none shadow-sm focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                       <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Branches & Specializations</h5>
                       <button onClick={() => addBranch(cIdx)} className="text-[10px] font-bold text-teal-600 hover:underline flex items-center gap-1"><PlusCircle className="w-3.5 h-3.5" /> ADD BRANCH</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                      {course.branches.map((branch: any, bIdx: number) => (
                        <div key={bIdx} className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm items-center">
                          <input 
                            placeholder="Branch Name (e.g. CS, ME)"
                            value={branch.name}
                            onChange={(e) => {
                              const newData = [...courseData];
                              newData[cIdx].branches[bIdx].name = e.target.value;
                              setCourseData(newData);
                            }}
                            className="flex-1 w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none"
                          />
                          <input 
                            placeholder="Duration"
                            value={branch.duration}
                            onChange={(e) => {
                              const newData = [...courseData];
                              newData[cIdx].branches[bIdx].duration = e.target.value;
                              setCourseData(newData);
                            }}
                            className="w-full md:w-32 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none text-center"
                          />
                          <input 
                            placeholder="Annual Fees"
                            value={branch.fees}
                            onChange={(e) => {
                              const newData = [...courseData];
                              newData[cIdx].branches[bIdx].fees = e.target.value;
                              setCourseData(newData);
                            }}
                            className="w-full md:w-40 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none text-center"
                          />
                          <button onClick={() => removeBranch(cIdx, bIdx)} className="text-slate-300 hover:text-rose-500 p-2"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={addCourse} className="w-full py-6 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold hover:bg-slate-50 hover:border-teal-200 hover:text-teal-600 transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> ADD NEW PROGRAM
              </button>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 text-slate-500 font-bold text-sm">Cancel</button>
              <button onClick={handleSave} className="bg-teal-600 text-white px-10 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-teal-600/20 hover:bg-teal-700 transition-all active:scale-95">Commit Changes</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
