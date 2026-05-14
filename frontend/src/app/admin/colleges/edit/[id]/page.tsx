"use client";

import { 
  ArrowLeft, 
  Save, 
  Building2, 
  MapPin, 
  Upload,
  Info,
  Globe,
  Tag,
  ShieldCheck,
  Home,
  Wifi,
  Library,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function EditCollegePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    location: "",
    state: "",
    type: "Govt",
    rating: 0,
    seats: 0,
    averageCourseFees: "",
    website: "",
    description: "",
    nirfRank: "",
    logo: "",
    affiliatedWith: "",
    entranceExams: "", 
  });

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges/${params.id}`);
        const json = await res.json();
        if (json.success) {
          const college = json.data;
          setFormData({
            name: college.name || "",
            shortName: college.shortName || "",
            location: college.location || "",
            state: college.state || "",
            type: college.type || "Govt",
            rating: college.rating || 0,
            seats: college.seats || 0,
            averageCourseFees: college.averageCourseFees || "",
            website: college.website || "",
            description: college.description || "",
            nirfRank: college.nirfRank || "",
            logo: college.logo || "",
            affiliatedWith: college.affiliatedWith || "",
            entranceExams: college.entranceExams ? college.entranceExams.join(", ") : "",
          });
        }
      } catch (err) {
        toast.error("Failed to fetch college details");
      } finally {
        setFetching(false);
      }
    };


    if (params.id) {
      fetchCollege();
    }
  }, [params.id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload-image`, {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setFormData(prev => ({ ...prev, logo: json.url }));
        toast.success("Logo uploaded");
      }
    } catch (err) {
      toast.error("Logo upload failed");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const payload = {
        ...formData,
        entranceExams: formData.entranceExams ? formData.entranceExams.split(',').map(s => s.trim()) : []
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('College updated successfully!');
        router.push('/admin/colleges');
      } else {
        toast.error(data.message || 'Failed to update college');
      }
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      <Toaster position="top-right" />
      <div className="flex flex-col gap-4">
        <Link href="/admin/colleges" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-xs transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Edit College</h1>
            <p className="text-slate-500 font-medium text-sm">Update the comprehensive university details</p>
          </div>
          <div className="flex gap-3">
             <button disabled={loading} onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
             <button disabled={loading} onClick={handleUpdate} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg">
               {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
               {loading ? 'Updating...' : 'Update College'}
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
                <label className="text-sm font-bold text-slate-700 block">College Logo</label>
                <div className="space-y-3">
                   <label className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-teal-50/50 cursor-pointer group transition-all">
                      {uploadingLogo ? (
                         <div className="w-12 h-12 rounded-full border-4 border-teal-600 border-t-transparent animate-spin" />
                      ) : formData.logo ? (
                         <img src={formData.logo} alt="Preview" className="w-16 h-16 object-contain" />
                      ) : (
                         <Building2 className="w-6 h-6 text-slate-300" />
                      )}
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Change Logo</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                   </label>
                   <input name="logo" value={formData.logo} onChange={handleInputChange} type="text" placeholder="Logo URL" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none" />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
               <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> Classification
               </h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">College Type</label>
                     <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                        <option value="Govt">Government</option>
                        <option value="Private">Private</option>
                        <option value="Semi-Govt">Semi-Government</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Affiliation</label>
                     <input name="affiliatedWith" value={formData.affiliatedWith} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                        <Info className="w-4 h-4 text-teal-600" /> Identity & Rank
                     </h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">College Name</label>
                              <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Short Name</label>
                              <input name="shortName" value={formData.shortName} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">NIRF Ranking</label>
                              <input name="nirfRank" value={formData.nirfRank} onChange={handleInputChange} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Total Seats</label>
                              <input name="seats" value={formData.seats} onChange={handleInputChange} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="md:col-span-1 space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Avg Fees</label>
                              <input name="averageCourseFees" value={formData.averageCourseFees} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-700 block">Website URL</label>
                           <input name="website" value={formData.website} onChange={handleInputChange} type="url" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-700 block">Entrance Exams</label>
                           <input name="entranceExams" value={formData.entranceExams} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none border-dashed" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                        <MapPin className="w-4 h-4 text-rose-500" /> Location Details
                     </h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">City</label>
                              <input name="location" value={formData.location} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">State</label>
                              <input name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-700 block">About College</label>
                           <textarea name="description" value={formData.description} onChange={handleInputChange} rows={6} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none"></textarea>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
