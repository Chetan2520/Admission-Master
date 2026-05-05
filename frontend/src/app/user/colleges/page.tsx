"use client";

import { 
  Building2, 
  Calculator, 
  Info, 
  Filter, 
  Eye, 
  ExternalLink,
  ChevronDown,
  MapPin,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const allColleges = [
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    type: "Government",
    naac: "NAAC A++",
    nirf: "NIRF Rank #1",
    placement: "98% Placement",
    fees: "₹0.07L",
    cutoff: "Rank 50",
    seats: "125",
    pkg: "₹18.5L",
    logo: "https://ui-avatars.com/api/?name=AI&background=0284c7&color=fff&rounded=true&font-size=0.4",
    trend: [
      { year: "2020", value: "98" },
      { year: "2021", value: "85" },
      { year: "2022", value: "72" },
      { year: "2023", value: "63" },
      { year: "2024", value: "50" },
    ]
  },
  {
    id: "kgmu-lucknow",
    name: "King George Medical University",
    location: "Lucknow, Uttar Pradesh",
    type: "Government",
    naac: "NAAC A+",
    nirf: "NIRF Rank #12",
    placement: "94% Placement",
    fees: "₹0.26L",
    cutoff: "Rank 198",
    seats: "200",
    pkg: "₹15.5L",
    logo: "https://ui-avatars.com/api/?name=KG&background=1e293b&color=fff&font-size=0.4",
    trend: [
      { year: "2020", value: "318" },
      { year: "2021", value: "288" },
      { year: "2022", value: "258" },
      { year: "2023", value: "228" },
      { year: "2024", value: "198" },
    ]
  },
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government",
    naac: "NAAC A++",
    nirf: "NIRF Rank #3",
    placement: "99% Placement",
    fees: "₹8.00L",
    cutoff: "Rank 68",
    seats: "1360",
    pkg: "₹21.8L",
    logo: "https://ui-avatars.com/api/?name=IIT+B&background=e11d48&color=fff&font-size=0.4",
    trend: [
      { year: "2020", value: "66" },
      { year: "2021", value: "67" },
      { year: "2022", value: "61" },
      { year: "2023", value: "67" },
      { year: "2024", value: "68" },
    ]
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    type: "Private",
    naac: "NAAC A",
    nirf: "NIRF Rank #25",
    placement: "96% Placement",
    fees: "₹24.5L",
    cutoff: "Score 330",
    seats: "1040",
    pkg: "₹19.2L",
    logo: "https://ui-avatars.com/api/?name=BITS&background=4338ca&color=fff&font-size=0.4",
    trend: [
      { year: "2020", value: "310" },
      { year: "2021", value: "315" },
      { year: "2022", value: "320" },
      { year: "2023", value: "325" },
      { year: "2024", value: "330" },
    ]
  },
  {
    id: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    type: "Government",
    naac: "NAAC A++",
    nirf: "NIRF Rank #2",
    placement: "97% Placement",
    fees: "₹8.50L",
    cutoff: "Rank 118",
    seats: "1209",
    pkg: "₹20.5L",
    logo: "https://ui-avatars.com/api/?name=IIT+D&background=ea580c&color=fff&font-size=0.4",
    trend: [
      { year: "2020", value: "105" },
      { year: "2021", value: "100" },
      { year: "2022", value: "115" },
      { year: "2023", value: "118" },
      { year: "2024", value: "118" },
    ]
  }
];

export default function CollegePredictorPage() {
  const [filterType, setFilterType] = useState("All");

  const filteredColleges = allColleges.filter(c => {
    if (filterType === "All") return true;
    if (filterType === "Government") return c.type.includes("Government");
    if (filterType === "Private") return c.type.includes("Private");
    if (filterType === "Medical") return c.type.includes("Medical");
    if (filterType === "Engineering") return c.type.includes("Engineering");
    return true;
  });
  return (
    <div className="max-w-[1400px] space-y-6 pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">College Predictor</h1>
          <p className="text-slate-500">Find your best college matches with AI-powered predictions</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
          <Calculator className="w-4 h-4" /> Probability Calculator
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-700" />
            <h2 className="font-bold text-slate-900">Filters</h2>
          </div>

          {[
            { label: "Exam Type", icon: "Exam", default: "All Exams", type: "select", options: ["All Exams", "NEET UG", "JEE Main", "JEE Advanced", "BITSAT"] },
            { label: "Your Rank", icon: "Rank", default: "Enter your rank", type: "input" },
            { label: "Category", icon: "Category", default: "General", type: "select", options: ["General", "OBC", "SC", "ST", "EWS"] },
            { label: "State/Location", icon: "Location", default: "All India", type: "select", options: ["All India", "Delhi", "Maharashtra", "Tamil Nadu", "Rajasthan"] },
            { label: "College Type", icon: "Type", default: filterType, type: "select", options: ["All", "Government", "Private", "Medical", "Engineering"], value: filterType, onChange: (e: any) => setFilterType(e.target.value) },
          ].map((filter, i) => (
            <div key={i}>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                {filter.label === "Your Rank" ? <Calculator className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                {filter.label}
              </label>
              {filter.type === "input" ? (
                <input 
                  type="text" 
                  placeholder={filter.default} 
                  className="w-full bg-white border border-slate-200 text-slate-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              ) : (
                <div className="relative">
                  <select 
                    className="w-full bg-white border border-slate-200 text-slate-600 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={filter.value || undefined}
                    onChange={filter.onChange}
                  >
                    {filter.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              )}
            </div>
          ))}
          
          <button className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            Reset Filters
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 space-y-6 min-w-0">
          <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">{filteredColleges.length}</span> colleges</p>
          
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
               <p className="text-sm font-bold text-blue-900 mb-1">Official Data Sources</p>
               <p className="text-xs text-blue-700/80 mb-2">Cutoff data from MCC (Medical Counselling Committee) • JoSAA (Joint Seat Allocation Authority) • AICTE (All India Council for Technical Education) • NMC (National Medical Commission)</p>
               <div className="flex gap-4 text-xs font-semibold text-blue-600">
                 <a href="#" className="hover:underline">mcc.nic.in</a>
                 <a href="#" className="hover:underline">josaa.nic.in</a>
                 <a href="#" className="hover:underline">aicte-india.org</a>
                 <a href="#" className="hover:underline">nmc.org.in</a>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredColleges.map((college, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-16 h-16 bg-slate-50 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                    <img src={college.logo} alt={college.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{college.name}</h3>
                    <p className="text-sm text-slate-500 mb-3 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" /> {college.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-semibold">{college.type}</span>
                      <span className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-md text-xs font-semibold">{college.naac}</span>
                      <span className="bg-teal-50 text-teal-600 px-2.5 py-1 rounded-md text-xs font-semibold">{college.nirf}</span>
                      <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-semibold">{college.placement}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Total Fees</p>
                    <p className="text-[17px] font-bold text-slate-900">{college.fees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">2024 Cutoff</p>
                    <p className="text-[17px] font-bold text-slate-900">{college.cutoff}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Total Seats</p>
                    <p className="text-[17px] font-bold text-slate-900">{college.seats}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Avg Package</p>
                    <p className="text-[17px] font-bold text-slate-900">{college.pkg}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[13px] font-semibold text-slate-600 mb-6">5-Year Cutoff Trend (General)</p>
                  <div className="flex justify-between items-end max-w-2xl px-12">
                    {college.trend.map((t, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <span className="text-[13px] font-bold text-slate-800">{t.value}</span>
                          <span className="text-[13px] text-slate-400">{t.year}</span>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <Link href={`/user/colleges/${college.id}`} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors">
                    <Eye className="w-4 h-4" /> View Details
                  </Link>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Compare
                  </button>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors">
                    <ExternalLink className="w-4 h-4" /> Website
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
