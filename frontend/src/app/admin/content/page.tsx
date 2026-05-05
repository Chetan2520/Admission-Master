"use client";

import { 
  FileEdit, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Trash2, 
  MoreVertical,
  CheckCircle2,
  Clock,
  Edit
} from "lucide-react";
import { useState } from "react";

export default function ContentManagerPage() {
  const [activeTab, setActiveTab] = useState("Blogs");
  const [searchTerm, setSearchTerm] = useState("");

  const contentItems = [
    { id: "CNT-101", title: "How to Prepare for NEET 2026", type: "Blog", author: "Dr. Sharma", date: "24 May 2026", status: "Published", views: "12.4k", initial: "S", bg: "bg-teal-100 text-teal-700" },
    { id: "CNT-102", title: "JEE Main Exam Pattern Updates", type: "Exam News", author: "Admin", date: "23 May 2026", status: "Published", views: "8.2k", initial: "A", bg: "bg-blue-100 text-blue-700" },
    { id: "CNT-103", title: "Top Medical Colleges in Karnataka", type: "Guide", author: "Prof. Verma", date: "22 May 2026", status: "Draft", views: "0", initial: "V", bg: "bg-purple-100 text-purple-700" },
    { id: "CNT-104", title: "CUET 2026 Registration Guide", type: "Blog", author: "Admin", date: "21 May 2026", status: "Scheduled", views: "0", initial: "A", bg: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Content Manager</h1>
          <p className="text-slate-500">Manage all platform blogs and notifications</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create Content
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
             {["Blogs", "Exams", "Notifications"].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                   activeTab === tab ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search content..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Title & ID</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {contentItems.filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <FileEdit className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block truncate max-w-[200px]">{item.title}</span>
                        <span className="text-[11px] text-slate-400 font-bold">{item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-semibold">{item.author}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                       <Eye className="w-3.5 h-3.5" /> {item.views}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      item.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 
                      item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg shadow-sm">
                        <Edit className="w-4 h-4" />
                      </button>
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
