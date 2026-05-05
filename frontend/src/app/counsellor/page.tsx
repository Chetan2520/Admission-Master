"use client";

import { 
  Users, 
  CalendarDays, 
  FileText, 
  MessageSquare,
  MoreVertical,
  Video,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function CounsellorDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Counsellor Dashboard</h1>
        <p className="text-slate-500">Manage your assigned students and upcoming sessions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Assigned Students", value: "42", icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "+3 this week" },
          { title: "Today's Sessions", value: "5", icon: CalendarDays, color: "text-emerald-600", bg: "bg-emerald-50", trend: "2 completed" },
          { title: "Pending Documents", value: "12", icon: FileText, color: "text-amber-600", bg: "bg-amber-50", trend: "Needs review" },
          { title: "Unread Messages", value: "8", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50", trend: "From 3 students" }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">{stat.trend}</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Students */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recently Assigned Students</h2>
              <Link href="/counsellor/students" className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Student Name</th>
                    <th className="px-4 py-3">Package</th>
                    <th className="px-4 py-3">Target Exam</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {[
                    { name: "Rahul Kumar", package: "Elite VIP", exam: "NEET UG", status: "Session Pending", statusColor: "bg-amber-50 text-amber-600", initial: "RK" },
                    { name: "Priya Singh", package: "Premium", exam: "JEE Main", status: "Docs Verified", statusColor: "bg-emerald-50 text-emerald-600", initial: "PS" },
                    { name: "Amit Patel", package: "Basic", exam: "NEET UG", status: "Needs Review", statusColor: "bg-rose-50 text-rose-600", initial: "AP" },
                    { name: "Neha Gupta", package: "Elite VIP", exam: "JEE Adv", status: "Ongoing", statusColor: "bg-blue-50 text-blue-600", initial: "NG" },
                    { name: "Vikram Sharma", package: "Premium", exam: "NEET UG", status: "Session Pending", statusColor: "bg-amber-50 text-amber-600", initial: "VS" },
                  ].map((student, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                          {student.initial}
                        </div>
                        <span className="font-bold">{student.name}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          student.package.includes('Elite') ? 'bg-purple-100 text-purple-700' :
                          student.package.includes('Premium') ? 'bg-teal-100 text-teal-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {student.package}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-500">{student.exam}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${student.statusColor}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="p-1.5 text-slate-400 hover:text-teal-600 transition-colors rounded-md hover:bg-teal-50">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Schedule */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Today's Schedule</h2>
              <button className="text-slate-400 hover:text-teal-600">
                <CalendarDays className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Active Session */}
              <div className="border border-teal-200 bg-teal-50/50 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-teal-700 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 11:30 AM - 12:15 PM</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                </div>
                <h4 className="font-bold text-slate-900">Initial Assessment</h4>
                <p className="text-sm text-slate-600 mb-3">with Rahul Kumar (Elite VIP)</p>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors">
                    <Video className="w-4 h-4" /> Join Call
                  </button>
                </div>
              </div>

              {/* Upcoming */}
              <div className="border border-slate-100 bg-slate-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 02:00 PM - 02:45 PM</span>
                </div>
                <h4 className="font-bold text-slate-700">College Shortlisting</h4>
                <p className="text-sm text-slate-500">with Priya Singh (Premium)</p>
              </div>

              {/* Completed */}
              <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-4 opacity-75">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 09:00 AM - 09:45 AM</span>
                </div>
                <h4 className="font-bold text-slate-500 line-through">Document Verification</h4>
                <p className="text-sm text-slate-400">with Amit Patel (Basic)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
