"use client";

import { 
  Search, 
  Filter, 
  Plus, 
  Layers, 
  Building2, 
  Users, 
  ShieldCheck,
  Edit,
  Trash2,
  PieChart,
  Target,
  UploadCloud,
  Download
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SeatMatrixPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const seatData = [
    { 
      id: "SM-001", 
      college: "AIIMS Delhi", 
      course: "MBBS",
      branch: "General Medicine",
      totalSeats: "125",
      gen: "51",
      obc: "27",
      sc: "15",
      st: "8",
      ews: "10",
      aiq: "125",
      state: "0",
      initial: "AI"
    },
    { 
      id: "SM-002", 
      college: "IIT Bombay", 
      course: "B.Tech",
      branch: "Computer Science",
      totalSeats: "120",
      gen: "48",
      obc: "32",
      sc: "18",
      st: "9",
      ews: "13",
      aiq: "60",
      state: "60",
      initial: "IIT"
    },
  ];

  return (
    <div className="max-w-none space-y-6 pb-10 px-4 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Seat Matrix Manager</h1>
          <p className="text-slate-500 font-medium text-sm">Manage category-wise and quota-wise seat distribution</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
             <UploadCloud className="w-4 h-4" /> Bulk Upload (CSV)
           </button>
           <Link href="/admin/seat-matrix/add">
             <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/10">
               <Plus className="w-4 h-4" /> Add Seat Entry
             </button>
           </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
               <Layers className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Total Capacity</p>
               <p className="text-2xl font-bold text-slate-900">4,580</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
               <Target className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Verified Matrix</p>
               <p className="text-2xl font-bold text-slate-900">82%</p>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
               <PieChart className="w-6 h-6" />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Reserved Seats</p>
               <p className="text-2xl font-bold text-slate-900">2,140</p>
            </div>
         </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by college or branch..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
             <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50">
               <Download className="w-4 h-4" /> Export
             </button>
             <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50">
               <Filter className="w-4 h-4" /> Filter
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider" rowSpan={2}>College & Program</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center border-l border-slate-200" colSpan={5}>Category-wise Seats</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center border-l border-slate-200" colSpan={2}>Quota-wise</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-center border-l border-slate-200" rowSpan={2}>Total</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider text-right" rowSpan={2}>Actions</th>
              </tr>
              <tr className="bg-slate-50/50 text-[9px] uppercase tracking-widest text-slate-400 border-b border-slate-200">
                 <th className="px-2 py-2 text-center border-l border-slate-100">GEN</th>
                 <th className="px-2 py-2 text-center">OBC</th>
                 <th className="px-2 py-2 text-center">SC</th>
                 <th className="px-2 py-2 text-center">ST</th>
                 <th className="px-2 py-2 text-center">EWS</th>
                 <th className="px-2 py-2 text-center border-l border-slate-100">AIQ</th>
                 <th className="px-2 py-2 text-center">SQ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {seatData.filter(s => 
                s.college.toLowerCase().includes(searchTerm.toLowerCase()) || 
                s.branch.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((seat, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group text-xs">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                       <span className="font-bold text-slate-900">{seat.college}</span>
                       <span className="text-[10px] font-bold text-teal-600 uppercase tracking-tighter">{seat.course} • {seat.branch}</span>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-center border-l border-slate-50">{seat.gen}</td>
                  <td className="px-2 py-4 text-center">{seat.obc}</td>
                  <td className="px-2 py-4 text-center">{seat.sc}</td>
                  <td className="px-2 py-4 text-center">{seat.st}</td>
                  <td className="px-2 py-4 text-center">{seat.ews}</td>
                  <td className="px-2 py-4 text-center font-bold text-indigo-600 border-l border-slate-50">{seat.aiq}</td>
                  <td className="px-2 py-4 text-center font-bold text-emerald-600">{seat.state}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-slate-900 text-white rounded font-black text-[11px]">
                       {seat.totalSeats}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/seat-matrix/edit/${seat.id}`}>
                        <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg shadow-sm">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-1.5 bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 transition-colors rounded-lg shadow-sm">
                        <Trash2 className="w-4 h-4" />
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
