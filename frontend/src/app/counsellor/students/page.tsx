"use client";

import { 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare, 
  Eye, 
  Mail, 
  Phone 
} from "lucide-react";
import { useState } from "react";

export default function AssignedStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const students = [
    { name: "Rahul Kumar", package: "Elite VIP", exam: "NEET UG", status: "Session Pending", statusColor: "bg-amber-50 text-amber-600", initial: "RK", phone: "+91 98765 43210", email: "rahul@example.com", assignedDate: "Oct 12, 2024" },
    { name: "Priya Singh", package: "Premium", exam: "JEE Main", status: "Docs Verified", statusColor: "bg-emerald-50 text-emerald-600", initial: "PS", phone: "+91 98765 43211", email: "priya@example.com", assignedDate: "Oct 10, 2024" },
    { name: "Amit Patel", package: "Basic", exam: "NEET UG", status: "Needs Review", statusColor: "bg-rose-50 text-rose-600", initial: "AP", phone: "+91 98765 43212", email: "amit@example.com", assignedDate: "Oct 08, 2024" },
    { name: "Neha Gupta", package: "Elite VIP", exam: "JEE Adv", status: "Ongoing", statusColor: "bg-blue-50 text-blue-600", initial: "NG", phone: "+91 98765 43213", email: "neha@example.com", assignedDate: "Oct 05, 2024" },
    { name: "Vikram Sharma", package: "Premium", exam: "NEET UG", status: "Session Pending", statusColor: "bg-amber-50 text-amber-600", initial: "VS", phone: "+91 98765 43214", email: "vikram@example.com", assignedDate: "Oct 01, 2024" },
    { name: "Ananya Desai", package: "Basic", exam: "JEE Main", status: "Completed", statusColor: "bg-slate-100 text-slate-600", initial: "AD", phone: "+91 98765 43215", email: "ananya@example.com", assignedDate: "Sep 28, 2024" },
    { name: "Rohan Verma", package: "Premium", exam: "NEET UG", status: "Ongoing", statusColor: "bg-blue-50 text-blue-600", initial: "RV", phone: "+91 98765 43216", email: "rohan@example.com", assignedDate: "Sep 25, 2024" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Assigned Students</h1>
          <p className="text-slate-500">View and manage all students assigned to you for counselling</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search students by name, email or exam..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
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
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Contact Details</th>
                <th className="px-6 py-4">Package & Exam</th>
                <th className="px-6 py-4">Assigned On</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {student.initial}
                      </div>
                      <span className="font-bold text-slate-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-slate-500 text-xs">
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {student.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {student.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                        student.package.includes('Elite') ? 'bg-purple-100 text-purple-700' :
                        student.package.includes('Premium') ? 'bg-teal-100 text-teal-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {student.package}
                      </span>
                      <div className="text-xs text-slate-500 font-semibold">{student.exam}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-semibold">
                    {student.assignedDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${student.statusColor}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-colors rounded-lg" title="View Profile">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors rounded-lg" title="Message">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors rounded-lg">
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
