"use client";

import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CreditCard,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Reports & Analytics</h1>
          <p className="text-slate-500">Track platform performance and metrics</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors">
             <Calendar className="w-4 h-4" /> This Year
           </button>
           <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
             <Download className="w-4 h-4" /> Export Report
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Revenue", value: "₹42.5L", trend: "+12%", isUp: true, icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Admissions", value: "1,248", trend: "+8%", isUp: true, icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
          { title: "Sessions", value: "8,240", trend: "-2%", isUp: false, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Success Rate", value: "94%", trend: "+1%", isUp: true, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
               </div>
               <span className={`text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                 {stat.trend}
               </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-xs font-semibold text-slate-400 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Revenue Growth</h3>
              <select className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 outline-none">
                 <option>Last 12 Months</option>
              </select>
           </div>
           <div className="h-[250px] flex items-end justify-between gap-1 px-2">
              {[40, 70, 45, 90, 65, 55, 80, 60, 95, 75, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-teal-500/10 rounded-t-md relative group transition-all hover:bg-teal-500/20">
                   <div className="absolute bottom-0 left-0 right-0 bg-teal-500 rounded-t-md transition-all duration-500" style={{ height: `${h}%` }}></div>
                </div>
              ))}
           </div>
           <div className="flex justify-between mt-4 px-2">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map(m => (
                <span key={m} className="text-[10px] font-bold text-slate-400">{m}</span>
              ))}
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <h3 className="font-bold text-slate-900 mb-6">Course Wise Admissions</h3>
           <div className="space-y-6">
              {[
                { name: "NEET UG", count: 450, percentage: 45, color: "bg-teal-500" },
                { name: "JEE MAIN", count: 380, percentage: 38, color: "bg-blue-500" },
                { name: "CUET", count: 250, percentage: 25, color: "bg-purple-500" },
                { name: "NEET PG", count: 120, percentage: 12, color: "bg-amber-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-400">{item.count}</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
