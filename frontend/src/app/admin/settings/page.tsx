"use client";

import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  Mail,
  Save
} from "lucide-react";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  const menuItems = [
    { name: "General", icon: Settings },
    { name: "Profile", icon: User },
    { name: "Security", icon: Lock },
    { name: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">System Settings</h1>
          <p className="text-slate-500 font-medium">Configure platform parameters and admin profile</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center justify-between p-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.name 
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/10" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.name}
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === item.name ? "text-white" : "text-slate-300"}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
             <div className="pb-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5 text-teal-600" />
                   {activeTab} Settings
                </h3>
             </div>

             <div className="space-y-6 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Admin Name</label>
                      <input 
                        type="text" 
                        defaultValue="Super Admin"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">System Email</label>
                      <div className="relative">
                         <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                         <input 
                           type="email" 
                           defaultValue="admin@admissionmaster.com"
                           className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                         />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Platform Language</label>
                   <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 transition-all">
                      <option>English (United States)</option>
                      <option>Hindi (India)</option>
                   </select>
                </div>

                <div className="h-px bg-slate-100"></div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                   <div>
                      <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                      <p className="text-xs font-medium text-slate-500">Only admins can access the platform</p>
                   </div>
                   <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
