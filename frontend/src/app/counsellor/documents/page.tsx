"use client";

import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download,
  AlertCircle,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  BookOpen
} from "lucide-react";
import { useState } from "react";

export default function DocumentsPage() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const documents = [
    { student: "Amit Patel", type: "10th Marksheet", date: "Oct 24, 2024", status: "Pending Review", statusColor: "bg-amber-50 text-amber-600 border-amber-200", profile: { phone: "+91 98765 43212", email: "amit@example.com", package: "Basic", exam: "NEET UG", location: "Ahmedabad, Gujarat", scores: "10th: 88%, 12th: 85%" } },
    { student: "Amit Patel", type: "12th Marksheet", date: "Oct 24, 2024", status: "Pending Review", statusColor: "bg-amber-50 text-amber-600 border-amber-200", profile: { phone: "+91 98765 43212", email: "amit@example.com", package: "Basic", exam: "NEET UG", location: "Ahmedabad, Gujarat", scores: "10th: 88%, 12th: 85%" } },
    { student: "Priya Singh", type: "Category Certificate", date: "Oct 23, 2024", status: "Approved", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", profile: { phone: "+91 98765 43211", email: "priya@example.com", package: "Premium", exam: "JEE Main", location: "Lucknow, UP", scores: "10th: 92%, 12th: 90%" } },
    { student: "Rahul Kumar", type: "NEET Admit Card", date: "Oct 22, 2024", status: "Rejected", statusColor: "bg-rose-50 text-rose-600 border-rose-200", profile: { phone: "+91 98765 43210", email: "rahul@example.com", package: "Elite VIP", exam: "NEET UG", location: "New Delhi", scores: "10th: 95%, 12th: 94%" } },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Document Verification</h1>
          <p className="text-slate-500">Review and verify student uploaded documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Pending Review</p>
            <h3 className="text-2xl font-bold text-amber-900">12</h3>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Approved Today</p>
            <h3 className="text-2xl font-bold text-emerald-900">5</h3>
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">Rejected Today</p>
            <h3 className="text-2xl font-bold text-rose-900">1</h3>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Document Type</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Uploaded On</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {documents.map((doc, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-900">{doc.type}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">{doc.student}</td>
                <td className="px-6 py-4 text-slate-500 text-xs font-semibold">{doc.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${doc.statusColor}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setSelectedStudent(doc)}
                      className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors rounded-lg" 
                      title="View Student Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-colors rounded-lg" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                    {doc.status === "Pending Review" && (
                      <>
                        <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors rounded-lg text-xs font-bold" title="Approve">
                          Approve
                        </button>
                        <button className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors rounded-lg text-xs font-bold" title="Reject">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" /> Student Profile
              </h3>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 font-bold text-xl flex items-center justify-center">
                  {selectedStudent.student.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{selectedStudent.student}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">{selectedStudent.profile.package}</span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">{selectedStudent.profile.exam}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</p>
                  <p className="text-sm font-bold text-slate-900">{selectedStudent.profile.phone}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</p>
                  <p className="text-sm font-bold text-slate-900 truncate" title={selectedStudent.profile.email}>{selectedStudent.profile.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location</p>
                  <p className="text-sm font-bold text-slate-900">{selectedStudent.profile.location}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Academics</p>
                  <p className="text-sm font-bold text-slate-900">{selectedStudent.profile.scores}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mt-4">
                <h5 className="text-sm font-bold text-amber-900 mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Current Document
                </h5>
                <p className="text-sm text-amber-700">You are reviewing: <strong>{selectedStudent.type}</strong></p>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2.5 text-slate-600 font-semibold text-sm hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
              <button className="px-5 py-2.5 bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 rounded-xl transition-colors">
                Message Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
