"use client";

import { 
  User, 
  Bell, 
  Lock, 
  Clock,
  Save
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Settings</h1>
        <p className="text-slate-500">Manage your account preferences and availability</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 space-y-1">
          {[
            { id: "profile", label: "Profile Information", icon: User },
            { id: "availability", label: "Availability", icon: Clock },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === tab.id 
                  ? "bg-teal-50 text-teal-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-teal-600" : "text-slate-400"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
              <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                <div className="w-24 h-24 rounded-full bg-teal-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                  <img src="https://ui-avatars.com/api/?name=Dr+Sharma&background=0d9488&color=fff&size=96" alt="Dr Sharma" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Profile Photo</h3>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors">Change Photo</button>
                    <button className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition-colors">Remove</button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input type="text" defaultValue="Dr. Sharma" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input type="email" defaultValue="dr.sharma@admissionmaster.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Designation</label>
                  <input type="text" defaultValue="Senior Counsellor" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Bio</label>
                  <textarea rows={4} defaultValue="Expert in medical and engineering admissions with 10+ years of experience guiding students to top institutions across India." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"></textarea>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "availability" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 animate-in fade-in duration-300 text-center py-20">
              <Clock className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-2">Set Your Availability</h2>
              <p className="text-slate-500 max-w-md mx-auto">Define your working hours and available slots for students to book counselling sessions.</p>
              <button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors mx-auto block">Configure Schedule</button>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "security") && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 animate-in fade-in duration-300 flex items-center justify-center h-64 text-slate-500 font-medium">
              Coming soon: Settings configuration.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
