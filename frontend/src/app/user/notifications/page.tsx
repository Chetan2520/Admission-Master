"use client";

import { 
  Bell, 
  Clock, 
  FileText, 
  CalendarDays, 
  Award, 
  Activity,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Notifications</h1>
          <p className="text-slate-500">Stay updated with important alerts and deadlines</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          Mark All as Read
        </button>
      </div>

      {/* Unread Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
          <Bell className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">3 Unread Notifications</h3>
          <p className="text-sm text-slate-500">You have 3 unread notifications</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Deadlines", "Documents", "Counselling", "Allotments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {[
            { 
              title: "Reporting Deadline Approaching", 
              desc: "Your reporting deadline for AIIMS Delhi is on July 5, 2024. Please complete the admission process.", 
              date: "30 Jun 2024", 
              icon: Clock, 
              color: "bg-rose-50 text-rose-500", 
              dot: "bg-rose-500",
              border: "border-teal-200",
              type: "Deadlines"
            },
            { 
              title: "Document Verification Required", 
              desc: "Your Category Certificate has been rejected. Please re-upload a valid certificate.", 
              date: "22 Jun 2024", 
              icon: FileText, 
              color: "bg-amber-50 text-amber-500", 
              dot: "bg-rose-500",
              border: "border-teal-200",
              type: "Documents"
            },
            { 
              title: "Round 2 Registration Open", 
              desc: "MCC NEET UG Round 2 registration is now open. Register before August 20, 2024.", 
              date: "15 Aug 2024", 
              icon: CalendarDays, 
              color: "bg-blue-50 text-blue-500", 
              dot: "bg-amber-500",
              border: "border-slate-100",
              type: "Counselling"
            },
            { 
              title: "Seat Allotted - AIIMS Delhi", 
              desc: "Congratulations! You have been allotted a seat at AIIMS Delhi for MBBS course.", 
              date: "28 Jun 2024", 
              icon: Award, 
              color: "bg-emerald-50 text-emerald-500", 
              dot: "bg-rose-500",
              border: "border-slate-100",
              type: "Allotments"
            },
            { 
              title: "Waitlist Movement", 
              desc: "Your waitlist position for MAMC Delhi has moved from 52 to 45.", 
              date: "2 Jul 2024", 
              icon: Activity, 
              color: "bg-purple-50 text-purple-500", 
              dot: "bg-amber-500",
              border: "border-teal-200",
              type: "Counselling"
            },
          ].filter(notif => activeTab === "All" || notif.type === activeTab).map((notif, i) => (
            <div key={i} className={`flex gap-4 p-5 rounded-2xl border ${notif.border} bg-white transition-colors hover:shadow-sm cursor-pointer`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                <notif.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    {notif.title}
                    {notif.dot && <span className={`w-2 h-2 rounded-full ${notif.dot}`}></span>}
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap ml-4">{notif.date}</span>
                </div>
                <p className="text-sm text-slate-600 truncate md:whitespace-normal">{notif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
