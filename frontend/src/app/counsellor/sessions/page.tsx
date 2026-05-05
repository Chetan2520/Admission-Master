"use client";

import { 
  CalendarDays, 
  Video, 
  Clock, 
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function SessionsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Upcoming Sessions</h1>
          <p className="text-slate-500">Manage your scheduled video counselling sessions</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Schedule New Session
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Today, Oct 24</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { time: "11:30 AM", endTime: "12:15 PM", type: "Initial Assessment", student: "Rahul Kumar", pkg: "Elite VIP", status: "Live", bg: "bg-teal-50 border-teal-200" },
            { time: "02:00 PM", endTime: "02:45 PM", type: "College Shortlisting", student: "Priya Singh", pkg: "Premium", status: "Upcoming", bg: "bg-white border-slate-200" },
            { time: "04:30 PM", endTime: "05:15 PM", type: "Doubt Clearing", student: "Vikram Sharma", pkg: "Premium", status: "Upcoming", bg: "bg-white border-slate-200" }
          ].map((session, i) => (
            <div key={i} className={`border rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center ${session.bg} transition-colors hover:shadow-sm`}>
              <div className="w-full md:w-48 flex-shrink-0 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{session.time}</p>
                  <p className="text-xs text-slate-500 font-semibold">{session.endTime}</p>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{session.type}</h3>
                  {session.status === "Live" && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">with <span className="font-bold text-slate-800">{session.student}</span> <span className="text-xs bg-slate-100 px-2 py-0.5 rounded ml-1 font-semibold text-slate-500">{session.pkg}</span></p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                  session.status === "Live" ? "bg-teal-600 hover:bg-teal-700 text-white shadow-sm" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}>
                  <Video className="w-4 h-4" /> {session.status === "Live" ? "Join Call" : "Open Link"}
                </button>
                <button className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
