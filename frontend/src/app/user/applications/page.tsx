"use client";

import { CheckCircle2, Clock, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">My Applications</h1>
        <p className="text-slate-500">Track all your college applications and their status</p>
      </div>

      {/* Top Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { status: "Allotted", count: "1", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle2 },
          { status: "Waitlisted", count: "1", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: Clock },
          { status: "Under Review", count: "1", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: AlertCircle },
          { status: "Rejected", count: "1", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", icon: XCircle },
        ].map((card, i) => (
          <div key={i} className={`${card.bg} border ${card.border} p-5 rounded-2xl`}>
            <div className="flex items-center gap-2 mb-2">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <span className={`text-sm font-semibold ${card.color}`}>{card.status}</span>
            </div>
            <p className={`text-3xl font-bold ${card.color}`}>{card.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">All Applications</h2>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab("All")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'All' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab("Allotted")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Allotted' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Allotted
            </button>
            <button 
              onClick={() => setActiveTab("Waitlisted")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'Waitlisted' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Waitlisted
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Card 1: Allotted */}
          {(activeTab === "All" || activeTab === "Allotted") && (
          <div className="border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Allotted
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">MCC</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">Round 1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">AIIMS Delhi</h3>
                <p className="text-sm text-slate-500">MBBS • General</p>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                View Portal <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-1">Applied Date</p>
                <p className="text-sm font-bold text-slate-900">25 Jun 2024</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p className="text-xs font-semibold text-emerald-700 mb-1">Allotment Date</p>
                <p className="text-sm font-bold text-emerald-900">28 Jun 2024</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                <p className="text-xs font-semibold text-rose-700 mb-1">Reporting Deadline</p>
                <p className="text-sm font-bold text-rose-900">5 Jul 2024</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-1">Course Fees</p>
                <p className="text-sm font-bold text-blue-900">₹5,856</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-full shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="font-bold text-emerald-900 text-sm">Seat Allotted Successfully!</p>
                  <p className="text-xs text-emerald-700">Complete admission process before deadline</p>
                </div>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Start Admission
              </button>
            </div>
          </div>
          )}

          {/* Card 2: Waitlisted */}
          {(activeTab === "All" || activeTab === "Waitlisted") && (
          <div className="border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Waitlisted
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">MCC</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">Round 1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">MAMC Delhi</h3>
                <p className="text-sm text-slate-500">MBBS • General</p>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                View Portal <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-1">Applied Date</p>
                <p className="text-sm font-bold text-slate-900">25 Jun 2024</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 md:col-span-1">
                <p className="text-xs font-semibold text-amber-700 mb-1">Waitlist Position</p>
                <p className="text-sm font-bold text-amber-900">#45</p>
              </div>
            </div>
          </div>
          )}

          {/* Card 3: Under Review */}
          {(activeTab === "All") && (
          <div className="border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Under Review
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">Maharashtra CET</span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">Round 1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">GMC Mumbai</h3>
                <p className="text-sm text-slate-500">MBBS • State Quota</p>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                View Portal <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-1">Applied Date</p>
                <p className="text-sm font-bold text-slate-900">10 Jul 2024</p>
              </div>
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
}
