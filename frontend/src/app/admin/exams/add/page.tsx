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
  Target
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function AddExamPage() {
  const router = useRouter();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.authority || !formData.examDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/exams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Exam added successfully");
        setTimeout(() => router.push("/admin/exams"), 1500);
      } else {
        toast.error(result.message || "Failed to add exam");
      }
    } catch (error) {
      console.error("Error adding exam:", error);
      toast.error("An error occurred while adding the exam");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Add New Exam</h1>
            <p className="text-slate-500 font-medium text-sm">Register a national or state level entrance examination</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
             <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10 disabled:opacity-50"
             >
               <Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Save Exam"}
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
                        placeholder="e.g. JEE Main, NEET UG" 
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
                        placeholder="e.g. NTA, MCC" 
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
                           placeholder="e.g. 300, 720" 
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
               placeholder="Describe the exam pattern, eligibility criteria, and other important details..."
            ></textarea>
         </div>
      </div>
    </div>
  );
}
