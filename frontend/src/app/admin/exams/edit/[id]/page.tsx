"use client";

import { 
  ArrowLeft, 
  Save, 
  Award,
  Calendar,
  Monitor,
  PenTool,
  Clock,
  Info,
  ShieldCheck,
  Target,
  RotateCcw
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function EditExamPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    authority: "",
    mode: "Online (CBT)",
    totalMarks: "",
    examDate: "",
    expectedResultDate: "",
    status: "Upcoming",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchExamDetails();
    }
  }, [params.id]);

  const fetchExamDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/exams/${params.id}`);
      const result = await response.json();
      if (result.success) {
        const data = result.data;
        // Format dates for input type="date"
        if (data.examDate) data.examDate = data.examDate.split('T')[0];
        if (data.expectedResultDate) data.expectedResultDate = data.expectedResultDate.split('T')[0];
        
        setFormData({
          name: data.name || "",
          authority: data.authority || "",
          mode: data.mode || "Online (CBT)",
          totalMarks: data.totalMarks || "",
          examDate: data.examDate || "",
          expectedResultDate: data.expectedResultDate || "",
          status: data.status || "Upcoming",
          description: data.description || ""
        });
      } else {
        toast.error(result.message || "Failed to fetch exam details");
      }
    } catch (error) {
      console.error("Error fetching exam details:", error);
      toast.error("An error occurred while fetching exam details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/exams/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Exam updated successfully");
        setTimeout(() => router.push("/admin/exams"), 1500);
      } else {
        toast.error(result.message || "Failed to update exam");
      }
    } catch (error) {
      console.error("Error updating exam:", error);
      toast.error("An error occurred while updating the exam");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500 font-medium">Loading exam details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/admin/exams" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-xs transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-3xl font-bold text-slate-900">Edit Exam Record</h1>
               <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                  {params.id}
               </span>
            </div>
            <p className="text-slate-500 font-medium text-sm">Update the scheduling and pattern for {formData.name}</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Discard</button>
             <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10 disabled:opacity-50"
             >
               <RotateCcw className="w-4 h-4" /> {isSubmitting ? "Updating..." : "Update Record"}
             </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-8 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Details */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
                  <Award className="w-4 h-4 text-indigo-600" /> Exam Identity
               </h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Exam Name</label>
                     <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Conducting Authority</label>
                     <input 
                        type="text" 
                        name="authority"
                        value={formData.authority}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">Exam Mode</label>
                        <select 
                           name="mode"
                           value={formData.mode}
                           onChange={handleChange}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none"
                        >
                           <option>Online (CBT)</option>
                           <option>Offline (OMR)</option>
                           <option>Hybrid</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">Total Marks</label>
                        <input 
                           type="text" 
                           name="totalMarks"
                           value={formData.totalMarks}
                           onChange={handleChange}
                           className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Schedule */}
            <div className="space-y-6">
               <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-widest">
                  <Calendar className="w-4 h-4 text-rose-500" /> Schedule & Dates
               </h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Exam Date</label>
                     <input 
                        type="date" 
                        name="examDate"
                        value={formData.examDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Expected Result Date</label>
                     <input 
                        type="date" 
                        name="expectedResultDate"
                        value={formData.expectedResultDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Current Status</label>
                     <select 
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none"
                     >
                        <option>Upcoming</option>
                        <option>Ongoing</option>
                        <option>Completed</option>
                        <option>Postponed</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>

         {/* Description */}
         <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">About the Examination</h3>
            <textarea 
               rows={5} 
               name="description"
               value={formData.description}
               onChange={handleChange}
               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
         </div>
      </div>
    </div>
  );
}
