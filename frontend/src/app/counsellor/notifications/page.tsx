"use client";

import { 
  Bell, 
  Calendar, 
  FileText, 
  MessageSquare,
  Users
} from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    { type: "session", title: "Session Starting Soon", desc: "Your session with Rahul Kumar starts in 15 minutes.", time: "15 mins ago", icon: Calendar, bg: "bg-blue-100 text-blue-600" },
    { type: "document", title: "New Document Uploaded", desc: "Priya Singh has uploaded their 12th Marksheet for verification.", time: "2 hours ago", icon: FileText, bg: "bg-amber-100 text-amber-600" },
    { type: "message", title: "New Message", desc: "You have a new message from Amit Patel.", time: "4 hours ago", icon: MessageSquare, bg: "bg-emerald-100 text-emerald-600" },
    { type: "student", title: "New Student Assigned", desc: "Neha Gupta has been assigned to you. Package: Elite VIP.", time: "1 day ago", icon: Users, bg: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Notifications</h1>
          <p className="text-slate-500">Stay updated with your students and schedule</p>
        </div>
        <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 px-4 py-2 rounded-xl transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="divide-y divide-slate-100">
          {notifications.map((notif, i) => (
            <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex gap-4 items-start">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.bg}`}>
                <notif.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-slate-900">{notif.title}</h3>
                  <span className="text-xs font-semibold text-slate-400 whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-600">{notif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
