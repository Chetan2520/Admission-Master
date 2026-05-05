"use client";

import { useState } from "react";
import { UserCircle, BookOpen, FileBadge, Users, Bell, Edit3, Plus } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: UserCircle },
    { id: "academic", label: "Academic Info", icon: BookOpen },
    { id: "exams", label: "Exam Results", icon: FileBadge },
    { id: "parent", label: "Parent Access", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">My Profile</h1>
          <p className="text-slate-500">Manage your personal information and preferences</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hidden-scrollbar border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        
        {/* Personal Info */}
        {activeTab === "personal" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Full Name", value: "Rahul Sharma" },
                { label: "Email Address", value: "rahul.sharma@email.com" },
                { label: "Phone Number", value: "+91 98765 43210" },
                { label: "Date of Birth", value: "15-08-2005" },
                { label: "Gender", value: "Male" },
                { label: "Category", value: "General" },
                { label: "State", value: "Maharashtra" },
                { label: "City", value: "Mumbai" },
                { label: "Pincode", value: "400001" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{field.label}</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={field.value} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic Info */}
        {activeTab === "academic" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Current Class", value: "12th Pass" },
                { label: "School Name", value: "Delhi Public School" },
                { label: "Board", value: "CBSE" },
                { label: "Stream", value: "Science (PCM)" },
                { label: "10th Percentage", value: "92.5" },
                { label: "12th Percentage", value: "88.7" },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{field.label}</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={field.value} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Results */}
        {activeTab === "exams" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Exam Results</h2>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Exam Result
              </button>
            </div>
            
            <div className="space-y-6">
              {[
                { name: "JEE Main 2024", year: "2024", rank: "12450", score: "245", percentile: "98.5%" },
                { name: "JEE Advanced 2024", year: "2024", rank: "8920", score: "198", percentile: "96.2%" },
                { name: "MHT-CET 2024", year: "2024", rank: "3450", score: "178", percentile: "99.1%" },
              ].map((exam, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{exam.name}</h3>
                      <p className="text-sm text-slate-500">{exam.year}</p>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Rank</p>
                      <p className="text-2xl font-bold text-slate-900">{exam.rank}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Score</p>
                      <p className="text-2xl font-bold text-slate-900">{exam.score}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wider">Percentile</p>
                      <p className="text-2xl font-bold text-blue-700">{exam.percentile}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Notification Preferences</h2>
              <p className="text-slate-500 text-sm mb-6">Choose how you want to receive updates</p>
              
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Communication Channels</h3>
              <div className="space-y-4">
                {[
                  { name: "Email Notifications", checked: true },
                  { name: "SMS Notifications", checked: false },
                  { name: "WhatsApp Notifications", checked: true },
                ].map((channel, i) => (
                  <label key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-700">{channel.name}</span>
                    <div className={`w-11 h-6 rounded-full relative transition-colors ${channel.checked ? 'bg-blue-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${channel.checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Notification Types</h3>
              <div className="space-y-4">
                {[
                  { title: "Application Updates", desc: "Get notified about application status changes", checked: true },
                  { title: "Counselling Alerts", desc: "Important counselling dates and deadlines", checked: true },
                  { title: "Scholarship Alerts", desc: "New scholarship opportunities matching your profile", checked: false },
                  { title: "Exam Reminders", desc: "Upcoming exam dates and registration deadlines", checked: true },
                ].map((type, i) => (
                  <label key={i} className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="checkbox" defaultChecked={type.checked} className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-900">{type.title}</p>
                      <p className="text-sm text-slate-500">{type.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                 Save Preferences
               </button>
            </div>
          </div>
        )}

        {/* Parent Access */}
        {activeTab === "parent" && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <h2 className="text-xl font-bold text-slate-900 mb-6">Parent Access</h2>

             {/* Info Box */}
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
               <div className="text-blue-500 mt-0.5">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
               </div>
               <div>
                 <h4 className="font-semibold text-blue-900 text-sm">Parent Dashboard Access</h4>
                 <p className="text-sm text-blue-700 mt-1">Enable parent access to allow your parents to view your application progress, exam results, and counselling status in read-only mode.</p>
               </div>
             </div>

             {/* Toggle */}
             <div className="border border-slate-200 p-4 rounded-xl flex items-center justify-between">
               <div>
                 <h4 className="font-semibold text-slate-900 text-sm">Enable Parent Access</h4>
                 <p className="text-xs text-slate-500 mt-1">Allow parents to view your dashboard</p>
               </div>
               <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1 justify-end cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
               </div>
             </div>

             {/* Form Fields */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Name</label>
                 <input type="text" defaultValue="Vijay Sharma" className="w-full bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Phone</label>
                 <input type="text" defaultValue="+91 98765 43211" className="w-full bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Email</label>
                 <input type="email" defaultValue="vijay.sharma@email.com" className="w-full bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Mother's Name</label>
                 <input type="text" defaultValue="Priya Sharma" className="w-full bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Mother's Phone</label>
                 <input type="text" defaultValue="+91 98765 43212" className="w-full bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Mother's Email</label>
                 <input type="email" defaultValue="priya.sharma@email.com" className="w-full bg-white border border-slate-200 text-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600" />
               </div>
             </div>

             {/* Share Link */}
             <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl mt-4">
               <h4 className="font-semibold text-teal-900 text-sm mb-1">Share Access Link</h4>
               <p className="text-sm text-blue-700 mb-4">Generate a secure access link and share it with your parents via email or WhatsApp.</p>
               <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                 Generate & Copy Link
               </button>
             </div>
           </div>
        )}

      </div>
    </div>
  );
}
