"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  MapPin, 
  GraduationCap, 
  Upload,
  Info,
  Globe,
  Tag,
  ShieldCheck,
  Hash,
  Home,
  Wifi,
  Library,
  Image as ImageIcon,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddCollegePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    entranceExams: "", // Will be converted to array on save
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, logo: data.url }));
      } else {
        alert(data.message || 'Logo upload failed');
      }
    } catch (err) {
      console.error('Logo upload failed:', err);
      alert('Failed to upload logo');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        ...formData,
        entranceExams: formData.entranceExams ? formData.entranceExams.split(',').map(s => s.trim()) : []
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        alert('College added successfully!');
        router.push('/admin/colleges');
      } else {
        alert(data.message || 'Failed to save college');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Could not connect to the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter" suppressHydrationWarning>
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/admin/colleges" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-xs transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Add New College</h1>
            <p className="text-slate-500 font-medium text-sm">Fill in the comprehensive university details below</p>
          </div>
           <div className="flex gap-3">
              <button disabled={loading} onClick={() => router.back()} className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50">Cancel</button>
              <button disabled={loading} onClick={handleSave} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10 disabled:opacity-50">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {loading ? 'Saving...' : 'Save College'}
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         
         {/* Sidebar Left - Assets & Type */}
         <div className="lg:col-span-1 space-y-6">
            {/* Logo Upload */}
             <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
                <label className="text-sm font-bold text-slate-700 block">College Logo</label>
                <div className="space-y-3">
                   <label className={`relative border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-teal-50/50 cursor-pointer group transition-all ${uploadingLogo ? 'opacity-50 pointer-events-none' : ''}`}>
                      {uploadingLogo ? (
                         <div className="w-12 h-12 rounded-full border-4 border-teal-600 border-t-transparent animate-spin" />
                      ) : formData.logo ? (
                         <img src={formData.logo} alt="Preview" className="w-16 h-16 object-contain" />
                      ) : (
                         <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-all">
                            <Building2 className="w-6 h-6" />
                         </div>
                      )}
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {uploadingLogo ? 'Uploading...' : 'Click to Upload Logo'}
                      </p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                   </label>
                   <div className="flex items-center gap-2">
                      <div className="flex-1 h-[1px] bg-slate-100" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OR URL</span>
                      <div className="flex-1 h-[1px] bg-slate-100" />
                   </div>
                   <input 
                     name="logo"
                     value={formData.logo}
                     onChange={handleInputChange}
                     type="text" 
                     placeholder="Paste Image URL..." 
                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none" 
                   />
                </div>
             </div>

            {/* Images Upload */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
               <label className="text-sm font-bold text-slate-700 block">Campus Images</label>
               <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-teal-50/50 cursor-pointer group transition-all text-center">
                  <Upload className="w-6 h-6 text-slate-300 group-hover:text-teal-600" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Upload Multiple Images</p>
               </div>
            </div>

            {/* College Type & Affiliation */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
               <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> Classification
               </h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">College Type</label>
                     <select 
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none appearance-none"
                      >
                        <option value="Govt">Government</option>
                        <option value="Private">Private</option>
                        <option value="Semi-Govt">Semi-Government</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 block">Affiliation</label>
                     <input 
                        name="affiliatedWith"
                        value={formData.affiliatedWith}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="e.g. AICTE / UGC" 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                        suppressHydrationWarning 
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content Right - Details */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
               
               {/* Identity & Address */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                        <Info className="w-4 h-4 text-teal-600" /> Identity & Rank
                     </h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">College Name</label>
                              <input 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text" placeholder="Full name of university" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Short Name</label>
                              <input 
                                name="shortName"
                                value={formData.shortName}
                                onChange={handleInputChange}
                                type="text" placeholder="e.g. IIT-B" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                              />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">NIRF Ranking</label>
                              <input 
                                name="nirfRank"
                                value={formData.nirfRank}
                                onChange={handleInputChange}
                                type="number" 
                                placeholder="Rank" 
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                                suppressHydrationWarning
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Average Course Fees</label>
                              <input 
                                name="averageCourseFees"
                                value={formData.averageCourseFees}
                                onChange={handleInputChange}
                                type="text" 
                                placeholder="e.g. 1.5 Lakh/Year" 
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                              />
                           </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">Website URL</label>
                              <div className="relative">
                                 <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                 <input 
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    type="url" 
                                    placeholder="https://..." 
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                                 />
                              </div>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-700 block">Entrance Exams (Comma separated)</label>
                           <div className="relative">
                              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                 name="entranceExams"
                                 value={formData.entranceExams}
                                 onChange={handleInputChange}
                                 type="text" 
                                 placeholder="e.g. JEE Main, JEE Advanced, MHT-CET" 
                                 className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none border-dashed" 
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-wide">
                        <MapPin className="w-4 h-4 text-rose-500" /> Location Details
                     </h3>
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">City</label>
                              <input 
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                type="text" placeholder="City" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-700 block">State</label>
                              <input 
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                type="text" placeholder="State" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" 
                               />
                           </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-3 space-y-2">
                               <label className="text-xs font-bold text-slate-700 block">Full Address</label>
                               <input type="text" placeholder="Campus address..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" suppressHydrationWarning />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-bold text-slate-700 block">Pincode</label>
                               <input type="text" placeholder="Pincode" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" suppressHydrationWarning />
                            </div>
                         </div>
                     </div>
                  </div>
               </div>

               {/* Facilities Checklist */}
               <div className="space-y-6 border-t border-slate-100 pt-8">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                     <Home className="w-4 h-4 text-blue-600" /> Campus Facilities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                     {[
                        { name: "Hostel", icon: Home },
                        { name: "WiFi", icon: Wifi },
                        { name: "Library", icon: Library },
                        { name: "Gym", icon: Building2 },
                        { name: "Hospital", icon: ShieldCheck },
                        { name: "Sports", icon: GraduationCap }
                     ].map(f => (
                        <label key={f.name} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors border border-slate-100">
                           <input type="checkbox" className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500 cursor-pointer" />
                           <f.icon className="w-4 h-4 text-slate-400" />
                           <span className="text-[11px] font-bold text-slate-600">{f.name}</span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Description */}
               <div className="space-y-4 pt-4 border-t border-slate-100 pt-8">
                  <label className="text-sm font-bold text-slate-700 block">About College / Description</label>
                  <textarea rows={6} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500" placeholder="Write a detailed overview of the college, its heritage, and achievements..."></textarea>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
