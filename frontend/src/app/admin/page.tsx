"use client";

import { 
  Users, 
  UserSquare2, 
  CreditCard, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Platform Overview</h1>
        <p className="text-slate-500">Monitor overall system metrics and activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Students", value: "1,248", icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "+12%", isUp: true },
          { title: "Active Counsellors", value: "32", icon: UserSquare2, color: "text-purple-600", bg: "bg-purple-50", trend: "+2", isUp: true },
          { title: "Active VIP Packages", value: "486", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+5%", isUp: true },
          { title: "Platform Traffic", value: "42.5K", icon: Activity, color: "text-amber-600", bg: "bg-amber-50", trend: "-2%", isUp: false }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Recent Registrations</h2>
            <Link href="/admin/students" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Target Exam</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {[
                  { name: "Rahul Kumar", exam: "NEET UG", date: "Today, 10:45 AM", initial: "RK" },
                  { name: "Priya Singh", exam: "JEE Main", date: "Today, 09:30 AM", initial: "PS" },
                  { name: "Amit Patel", exam: "NEET UG", date: "Yesterday", initial: "AP" },
                  { name: "Neha Gupta", exam: "JEE Adv", date: "Yesterday", initial: "NG" },
                ].map((student, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {student.initial}
                      </div>
                      <span className="font-bold">{student.name}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{student.exam}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-400">{student.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Counsellors */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Top Counsellors</h2>
            <Link href="/admin/counsellors" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Counsellor</th>
                  <th className="px-6 py-3">Active Students</th>
                  <th className="px-6 py-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {[
                  { name: "Dr. Sharma", students: 42, rating: "4.9/5", initial: "S", bg: "bg-blue-100 text-blue-700" },
                  { name: "Prof. Verma", students: 38, rating: "4.8/5", initial: "V", bg: "bg-blue-100 text-blue-700" },
                  { name: "Ms. Desai", students: 35, rating: "4.7/5", initial: "D", bg: "bg-purple-100 text-purple-700" },
                  { name: "Mr. Iyer", students: 28, rating: "4.9/5", initial: "I", bg: "bg-amber-100 text-amber-700" },
                ].map((counsellor, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${counsellor.bg}`}>
                        {counsellor.initial}
                      </div>
                      <span className="font-bold">{counsellor.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold">
                        {counsellor.students} Assigned
                      </span>
                    </td>
                    <td className="px-6 py-4 text-amber-500 font-bold text-xs">★ {counsellor.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
