"use client";

import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserPlus,
  Star,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";

export default function ManageCounsellorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const counsellors = [
    { name: "Dr. Sharma", role: "Senior Counsellor", students: 42, rating: "4.9", status: "Active", initial: "S", bg: "bg-teal-100 text-teal-700", email: "dr.sharma@example.com" },
    { name: "Prof. Verma", role: "Career Expert", students: 38, rating: "4.8", status: "Active", initial: "V", bg: "bg-blue-100 text-blue-700", email: "verma@example.com" },
    { name: "Ms. Desai", role: "Admission Specialist", students: 35, rating: "4.7", status: "Active", initial: "D", bg: "bg-purple-100 text-purple-700", email: "desai@example.com" },
    { name: "Mr. Iyer", role: "Senior Counsellor", students: 28, rating: "4.9", status: "On Leave", initial: "I", bg: "bg-amber-100 text-amber-700", email: "iyer@example.com" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage Counsellors</h1>
          <p className="text-slate-500">Add, edit, and monitor your counselling team</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <UserPlus className="w-4 h-4" /> Add Counsellor
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search counsellors..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
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
                <th className="px-6 py-4">Counsellor</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4">Active Students</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {counsellors.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((counsellor, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${counsellor.bg}`}>
                        {counsellor.initial}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{counsellor.name}</span>
                        <span className="text-xs text-slate-500">{counsellor.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{counsellor.role}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[11px] font-bold">
                      {counsellor.students} Assigned
                    </span>
                  </td>
                  <td className="px-6 py-4 text-amber-500 font-bold flex items-center gap-1 mt-3">
                    <Star className="w-4 h-4 fill-amber-500" /> {counsellor.rating}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      counsellor.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {counsellor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors rounded-lg">
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
