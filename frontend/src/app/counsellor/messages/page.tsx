"use client";

import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video
} from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(0);

  const contacts = [
    { name: "Rahul Kumar", status: "Online", unread: 2, msg: "Sir, I have a doubt regarding...", time: "10:30 AM", initial: "RK", bg: "bg-blue-100 text-blue-700" },
    { name: "Priya Singh", status: "Offline", unread: 0, msg: "Thank you for the guidance!", time: "Yesterday", initial: "PS", bg: "bg-emerald-100 text-emerald-700" },
    { name: "Amit Patel", status: "Offline", unread: 0, msg: "When is our next session?", time: "Tuesday", initial: "AP", bg: "bg-amber-100 text-amber-700" },
    { name: "Neha Gupta", status: "Online", unread: 1, msg: "I have uploaded the documents.", time: "Monday", initial: "NG", bg: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col md:flex-row gap-6 pb-4">
      {/* Sidebar Contacts */}
      <div className="w-full md:w-80 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact, i) => (
            <div 
              key={i} 
              onClick={() => setActiveContact(i)}
              className={`p-4 border-b border-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                activeContact === i ? "bg-teal-50" : "hover:bg-slate-50"
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${contact.bg}`}>
                  {contact.initial}
                </div>
                {contact.status === "Online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`text-sm font-bold truncate ${activeContact === i ? "text-teal-900" : "text-slate-900"}`}>
                    {contact.name}
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-400">{contact.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500 truncate pr-2">{contact.msg}</p>
                  {contact.unread > 0 && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col min-w-0">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${contacts[activeContact].bg}`}>
              {contacts[activeContact].initial}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{contacts[activeContact].name}</h3>
              <p className="text-xs text-slate-500">{contacts[activeContact].status}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><Phone className="w-5 h-5" /></button>
            <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><Video className="w-5 h-5" /></button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
          {/* Mock Messages */}
          <div className="flex flex-col gap-4">
            <div className="self-center bg-slate-200 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full">
              Today
            </div>
            
            <div className="self-end max-w-[80%]">
              <div className="bg-teal-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm">
                Hello Rahul, did you check the college list I sent yesterday?
              </div>
              <p className="text-[10px] text-slate-400 text-right mt-1">10:15 AM</p>
            </div>

            <div className="self-start max-w-[80%] flex gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${contacts[activeContact].bg}`}>
                {contacts[activeContact].initial}
              </div>
              <div>
                <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl rounded-tl-sm shadow-sm text-sm">
                  Yes sir, I reviewed it. I have a doubt regarding AIIMS Delhi cutoff for OBC category.
                </div>
                <p className="text-[10px] text-slate-400 mt-1">10:30 AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white rounded-b-2xl">
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder="Type your message here..." 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100 transition-all"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-xl transition-colors shadow-sm flex-shrink-0">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
