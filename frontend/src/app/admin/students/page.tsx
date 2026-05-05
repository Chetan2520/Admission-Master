"use client";

import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserPlus, 
  MoreVertical,
  GraduationCap
} from "lucide-react";
import { useState } from "react";

export default function ManageStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    { id: "STU-001", name: "Rahul Kumar", package: "Elite VIP", exam: "NEET UG", status: "Active", counsellor: "Dr. Sharma", initial: "RK", bg: "bg-teal-100 text-teal-700", email: "rahul@example.com" },
    { id: "STU-002", name: "Priya Singh", package: "Premium", exam: "JEE Main", status: "Active", counsellor: "Prof. Verma", initial: "PS", bg: "bg-blue-100 text-blue-700", email: "priya@example.com" },
    { id: "STU-003", name: "Amit Patel", package: "Basic", exam: "NEET UG", status: "Inactive", counsellor: "Unassigned", initial: "AP", bg: "bg-slate-100 text-slate-600", email: "amit@example.com" },
    { id: "STU-004", name: "Neha Gupta", package: "Elite VIP", exam: "JEE Adv", status: "Active", counsellor: "Ms. Desai", initial: "NG", bg: "bg-purple-100 text-purple-700", email: "neha@example.com" },
    { id: "STU-005", name: "Vikram Sharma", package: "Premium", exam: "NEET UG", status: "Pending", counsellor: "Mr. Iyer", initial: "VS", bg: "bg-amber-100 text-amber-700", email: "vikram@example.com" },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Manage Students</h1>
          <p className="text-slate-500">View and manage all registered students</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <UserPlus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search students by name, ID or exam..." 
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
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Exam</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${student.bg}`}>
                        {student.initial}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{student.name}</span>
                        <span className="text-[11px] text-slate-400 font-semibold">{student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      student.package.includes('Elite') ? 'bg-purple-50 text-purple-600' :
                      student.package.includes('Premium') ? 'bg-blue-50 text-blue-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {student.package}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                       <GraduationCap className="w-4 h-4 text-slate-400" />
                       <span className="text-xs font-semibold">{student.exam}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      student.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                      student.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg shadow-sm">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors rounded-lg shadow-sm">
                        <MoreVertical className="w-4 h-4" />
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
