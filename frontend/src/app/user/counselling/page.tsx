"use client";

import { CalendarDays, FileText, LayoutGrid, Clock, CheckCircle2, ExternalLink, XCircle, Upload, Download, AlertCircle, Lightbulb, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

export default function CounsellingPage() {
  const [activeTab, setActiveTab] = useState("Timeline");
  const [timelineFilter, setTimelineFilter] = useState("Medical");
  const [expandedMatrix, setExpandedMatrix] = useState<number | null>(1); // Default expand IIT Bombay (index 1)

  const timelineData = [
    {
      title: "NEET UG All India Quota Round 1",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-700",
      statusIcon: Clock,
      exam: "MCC (Medical)",
      type: "Medical",
      dates: [
        { label: "Registration", icon: "Registration", date1: "15 Aug", date2: "to 20 Aug" },
        { label: "Choice Filling", icon: "Choice", date1: "21 Aug", date2: "to 25 Aug" },
        { label: "Allotment", icon: "Allotment", date1: "28 Aug", date2: "" },
        { label: "Reporting", icon: "Reporting", date1: "29 Aug", date2: "to 5 Sept" },
      ]
    },
    {
      title: "JEE Main/Advanced Round 1",
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-700",
      statusIcon: CheckCircle2,
      exam: "JoSAA (Engineering)",
      type: "Engineering",
      dates: [
        { label: "Registration", icon: "Registration", date1: "10 Jun", date2: "to 15 Jun" },
        { label: "Choice Filling", icon: "Choice", date1: "16 Jun", date2: "to 22 Jun" },
        { label: "Allotment", icon: "Allotment", date1: "25 Jun", date2: "" },
        { label: "Reporting", icon: "Reporting", date1: "26 Jun", date2: "to 2 Jul" },
      ]
    },
    {
      title: "UP State Quota Round 1",
      status: "Completed",
      statusColor: "bg-slate-100 text-slate-600",
      statusIcon: CheckCircle2,
      exam: "UP NEET",
      type: "Medical",
      dates: [
        { label: "Registration", icon: "Registration", date1: "1 Jul", date2: "to 5 Jul" },
        { label: "Choice Filling", icon: "Choice", date1: "6 Jul", date2: "to 10 Jul" },
        { label: "Allotment", icon: "Allotment", date1: "12 Jul", date2: "" },
        { label: "Reporting", icon: "Reporting", date1: "13 Jul", date2: "to 18 Jul" },
      ]
    },
    {
      title: "KCET Medical Round 1",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-700",
      statusIcon: Clock,
      exam: "Karnataka KEA",
      type: "Medical",
      dates: [
        { label: "Registration", icon: "Registration", date1: "10 Aug", date2: "to 14 Aug" },
        { label: "Choice Filling", icon: "Choice", date1: "15 Aug", date2: "to 20 Aug" },
        { label: "Allotment", icon: "Allotment", date1: "22 Aug", date2: "" },
        { label: "Reporting", icon: "Reporting", date1: "23 Aug", date2: "to 28 Aug" },
      ]
    },
    {
      title: "MHT-CET Engineering Round 1",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-700",
      statusIcon: Clock,
      exam: "Maharashtra CET",
      type: "Engineering",
      dates: []
    }
  ];

  const filteredTimeline = timelineData.filter(t => timelineFilter === "All" || t.type === timelineFilter);

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">My Counselling</h1>
        <p className="text-slate-500">Manage your counselling process, documents, and seat allocation</p>
      </div>

      <div className="flex bg-white rounded-xl border border-slate-200 p-1 w-max">
        <button 
          onClick={() => setActiveTab("Timeline")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === 'Timeline' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <CalendarDays className="w-4 h-4" /> Counselling Timeline
        </button>
        <button 
          onClick={() => setActiveTab("Documents")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === 'Documents' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <FileText className="w-4 h-4" /> Document Verification
        </button>
        <button 
          onClick={() => setActiveTab("Matrix")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === 'Matrix' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <LayoutGrid className="w-4 h-4" /> Seat Matrix
        </button>
      </div>

      {activeTab === "Timeline" && (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Counselling Timeline</h2>
            <p className="text-sm text-slate-500">Track all counselling rounds and deadlines</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setTimelineFilter("All")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${timelineFilter === 'All' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >All</button>
            <button 
              onClick={() => setTimelineFilter("Medical")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${timelineFilter === 'Medical' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >Medical</button>
            <button 
              onClick={() => setTimelineFilter("Engineering")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${timelineFilter === 'Engineering' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >Engineering</button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredTimeline.map((round, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-6">
               <div className="flex justify-between items-start mb-6">
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <span className={`${round.statusColor} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                       <round.statusIcon className="w-3 h-3" /> {round.status}
                     </span>
                     <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">{round.exam}</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900">{round.title}</h3>
                 </div>
                 <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
                   Visit Portal <ExternalLink className="w-4 h-4" />
                 </button>
               </div>

               {round.dates.length > 0 && (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {round.dates.map((d, j) => (
                     <div key={j} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-1.5 mb-2 text-slate-500">
                          {d.label === "Registration" && <ExternalLink className="w-4 h-4 text-blue-500" />}
                          {d.label === "Choice Filling" && <LayoutGrid className="w-4 h-4 text-purple-500" />}
                          {d.label === "Allotment" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {d.label === "Reporting" && <FileText className="w-4 h-4 text-amber-500" />}
                          <span className="text-xs font-semibold">{d.label}</span>
                        </div>
                        <p className="font-bold text-slate-900">{d.date1}</p>
                        {d.date2 && <p className="text-xs text-slate-500">{d.date2}</p>}
                     </div>
                   ))}
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
      )}

      {activeTab === "Documents" && (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-in fade-in duration-300">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Document Verification</h2>
          <p className="text-sm text-slate-500">Upload and track your document verification status</p>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Verified</span>
            </div>
            <p className="text-3xl font-bold text-emerald-900">4</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">Pending</span>
            </div>
            <p className="text-3xl font-bold text-amber-900">1</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-semibold text-rose-700">Rejected</span>
            </div>
            <p className="text-3xl font-bold text-rose-900">1</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-600">Not Uploaded</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">2</p>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {[
            { name: "Class 10th Marksheet", req: true, status: "Verified", date: "Uploaded: 15/6/2024 Verified: 18/6/2024" },
            { name: "Class 12th Marksheet", req: true, status: "Verified", date: "Uploaded: 15/6/2024 Verified: 18/6/2024" },
            { name: "NEET Admit Card", req: true, status: "Verified", date: "Uploaded: 18/6/2024 Verified: 19/6/2024" },
            { name: "NEET Score Card", req: true, status: "Pending", date: "Uploaded: 20/7/2024" },
            { name: "Category Certificate (OBC)", req: true, status: "Rejected", date: "Uploaded: 20/6/2024 Verified: 22/6/2024", error: "Certificate expired. Please upload valid certificate issued within last 6 months." },
            { name: "Domicile Certificate", req: true, status: "Not Uploaded", date: "" },
            { name: "Aadhar Card", req: true, status: "Verified", date: "Uploaded: 15/6/2024 Verified: 15/6/2024" },
            { name: "Income Certificate", req: false, status: "Not Uploaded", date: "" },
          ].map((doc, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-slate-300">
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 p-2 rounded-lg mt-1">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                    {doc.req && <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-semibold">Required</span>}
                  </div>
                  {doc.date && <p className="text-xs text-slate-500">{doc.date}</p>}
                  {doc.error && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {doc.error}</p>}
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-12 md:ml-0">
                {doc.status === "Verified" && (
                  <>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                    <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </>
                )}
                {doc.status === "Pending" && (
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Pending
                  </span>
                )}
                {doc.status === "Rejected" && (
                  <>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Rejected
                    </span>
                    <button className="flex items-center gap-2 text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                      <Upload className="w-3 h-3" /> Upload
                    </button>
                  </>
                )}
                {doc.status === "Not Uploaded" && (
                  <>
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Not Uploaded
                    </span>
                    <button className="flex items-center gap-2 text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                      <Upload className="w-3 h-3" /> Upload
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      {activeTab === "Matrix" && (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-in fade-in duration-300">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Seat Matrix Visualizer</h2>
          <p className="text-sm text-slate-500">View seat availability and category-wise distribution</p>
        </div>

        <div className="space-y-4">
          {[
            { name: "AIIMS Delhi", branch: "MBBS", total: 125, filled: 125, vacant: 0, percent: "100%" },
            { name: "IIT Bombay", branch: "Computer Science", total: 120, filled: 118, vacant: 2, percent: "98%" },
            { name: "MAMC Delhi", branch: "MBBS", total: 250, filled: 245, vacant: 5, percent: "98%" },
            { name: "IIT Delhi", branch: "Electrical Engineering", total: 100, filled: 98, vacant: 2, percent: "98%" },
            { name: "GMC Mumbai", branch: "MBBS", total: 200, filled: 195, vacant: 5, percent: "98%" },
          ].map((college, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-6 transition-all hover:border-teal-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">{college.name}</h3>
                  <p className="text-sm text-slate-500">{college.branch}</p>
                </div>
                <button 
                  onClick={() => setExpandedMatrix(expandedMatrix === i ? null : i)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  {expandedMatrix === i ? "Hide Details" : "View Details"}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Total Seats</p>
                  <p className="text-2xl font-bold text-slate-900">{college.total}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <p className="text-xs font-semibold text-emerald-700 mb-1">Filled</p>
                  <p className="text-2xl font-bold text-emerald-900">{college.filled}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <p className="text-xs font-semibold text-amber-700 mb-1">Vacant</p>
                  <p className="text-2xl font-bold text-amber-900">{college.vacant}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                  <span>Seat Distribution</span>
                  <span>{college.percent} Filled</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  {/* Mock distribution colors */}
                  <div className="h-full bg-blue-500 w-[50%]"></div>
                  <div className="h-full bg-purple-500 w-[10%]"></div>
                  <div className="h-full bg-emerald-500 w-[25%]"></div>
                  <div className="h-full bg-amber-500 w-[10%]"></div>
                  <div className="h-full bg-rose-500 w-[5%]"></div>
                </div>
              </div>

              {expandedMatrix === i && (
                <div className="mt-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <h4 className="font-bold text-slate-900 text-sm mb-4">Category-wise Breakdown</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-xs font-semibold text-slate-600">General</span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">{(college.total * 0.5).toFixed(0)}</p>
                      <p className="text-xs text-slate-500">50%</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="text-xs font-semibold text-slate-600">EWS</span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">{(college.total * 0.1).toFixed(0)}</p>
                      <p className="text-xs text-slate-500">10%</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-semibold text-slate-600">OBC</span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">{(college.total * 0.27).toFixed(0)}</p>
                      <p className="text-xs text-slate-500">27%</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span className="text-xs font-semibold text-slate-600">SC</span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">{(college.total * 0.15).toFixed(0)}</p>
                      <p className="text-xs text-slate-500">15%</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <span className="text-xs font-semibold text-slate-600">ST</span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">{(college.total * 0.05).toFixed(0)}</p>
                      <p className="text-xs text-slate-500">5%</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-blue-900 text-sm">Cutoff Rank: {college.total === 120 ? '67' : '104'}</h5>
                      <p className="text-xs text-blue-700 mt-1">Last year closing rank for General category</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-teal-600 mt-0.5" />
          <div>
            <h5 className="font-bold text-slate-900 text-sm">Understanding Seat Matrix</h5>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">The seat matrix shows the total number of seats available in each college and their distribution across different categories (General, EWS, OBC, SC, ST). Vacant seats indicate opportunities for admission in subsequent counselling rounds.</p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
