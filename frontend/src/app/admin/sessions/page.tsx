"use client";

import { 
  Search, 
  Filter, 
  Activity, 
  Video, 
  Mic, 
  MessageSquare, 
  Clock, 
  ShieldAlert,
  ChevronRight,
  Monitor
} from "lucide-react";
import { useState } from "react";

export default function LiveSessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const activeSessions = [
    { id: "SES-9821", student: "Rahul Kumar", counsellor: "Dr. Sharma", type: "Video Call", duration: "12:45", status: "Live", initial: "RK", bg: "bg-teal-100 text-teal-700" },
    { id: "SES-9822", student: "Priya Singh", counsellor: "Prof. Verma", type: "Audio Call", duration: "05:12", status: "Live", initial: "PS", bg: "bg-blue-100 text-blue-700" },
    { id: "SES-9823", student: "Amit Patel", counsellor: "Ms. Desai", type: "Chat", duration: "25:30", status: "Waiting", initial: "AP", bg: "bg-purple-100 text-purple-700" },
    { id: "SES-9824", student: "Neha Gupta", counsellor: "Mr. Iyer", type: "Video Call", duration: "02:15", status: "Live", initial: "NG", bg: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Live Session Monitor</h1>
          <p className="text-slate-500">Real-time tracking of active counselling consultations</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-100 shadow-sm">
           <Activity className="w-4 h-4 animate-pulse" />
           4 Active Sessions
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by student or counsellor..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Session ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Counsellor</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {activeSessions.map((session, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-400 text-xs">{session.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${session.bg}`}>
                        {session.initial}
                      </div>
                      <span className="font-bold text-slate-900">{session.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{session.counsellor}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       {session.type === 'Video Call' && <Video className="w-4 h-4 text-blue-500" />}
                       {session.type === 'Audio Call' && <Mic className="w-4 h-4 text-purple-500" />}
                       {session.type === 'Chat' && <MessageSquare className="w-4 h-4 text-amber-500" />}
                       <span className="text-xs font-semibold">{session.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 w-fit">
                        <Clock className="w-3 h-3" /> {session.duration}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      session.status === 'Live' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg shadow-sm">
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 transition-colors rounded-lg shadow-sm">
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
