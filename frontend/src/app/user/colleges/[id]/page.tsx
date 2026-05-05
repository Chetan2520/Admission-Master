"use client";

import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  MapPin, 
  Building2, 
  Award, 
  CheckCircle2,
  Users,
  Banknote,
  Send,
  Clock,
  BookOpen,
  CalendarDays,
  TrendingUp,
  Trophy,
  BarChart,
  Home,
  Wifi,
  Coffee,
  Bus,
  Library,
  Stethoscope,
  Lightbulb,
  Building,
  MonitorPlay,
  Globe,
  Briefcase,
  Star,
  ThumbsUp,
  Flag,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CollegeProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Overview");

  // In a real app, you'd fetch data based on params.id
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
      website: "https://www.aiims.edu"
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
      website: "https://kgmu.org"
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
      website: "https://www.iitb.ac.in"
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
      website: "https://www.bits-pilani.ac.in"
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
      website: "https://home.iitd.ac.in"
    }
  ];

  const college = allColleges.find(c => c.id === params.id) || allColleges[0];
  const tabs = [
    "Overview", 
    "Courses & Fees", 
    "Admission Process", 
    "Cutoff Trends", 
    "Placements", 
    "Facilities", 
    "Reviews"
  ];

  return (
    <div className="-m-6 md:-m-8 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0f76b5] text-white pt-8 pb-10 px-6 md:px-12">
        <Link href="/user/colleges" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Colleges
        </Link>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2 flex-shrink-0">
            <img src={college.logo} alt={college.name} className="w-full h-full object-cover rounded-md" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{college.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {college.location}</span>
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {college.type}</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> {college.nirf}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> {college.naac}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="bg-white text-[#0f76b5] hover:bg-slate-50 px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> Download Brochure
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <ExternalLink className="w-4 h-4" /> Visit Website
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 md:px-12 sticky top-0 z-10 shadow-sm overflow-x-auto hidden-scrollbar">
        <div className="flex items-center gap-8 min-w-max">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab 
                  ? "border-teal-600 text-teal-600" 
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab === "Overview" && <InfoIcon />}
              {tab === "Courses & Fees" && <BookIcon />}
              {tab === "Admission Process" && <ClipboardIcon />}
              {tab === "Cutoff Trends" && <TrendingIcon />}
              {tab === "Placements" && <BriefcaseIcon />}
              {tab === "Facilities" && <BuildingIcon />}
              {tab === "Reviews" && <StarIcon />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Content) */}
        <div className="flex-1 space-y-8 min-w-0">
          
          {activeTab === "Overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">About {college.name.split(' ')[0]}</h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>{college.name} is a premier institution located in {college.location}. Established as a center of excellence, the college has consistently maintained its position among the top institutions in India.</p>
                  <p>With a {college.nirf} ranking and {college.naac} accreditation, the institution offers world-class education and research opportunities. The college is known for its outstanding faculty, state-of-the-art infrastructure, and excellent placement records.</p>
                  <p>The institution provides a conducive learning environment with modern facilities including advanced laboratories, well-stocked libraries, comfortable hostels, and comprehensive sports facilities. Students benefit from industry collaborations, research opportunities, and a vibrant campus life.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Key Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">NIRF Ranking</p>
                      <p className="text-xs text-slate-500">{college.nirf}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">NAAC Grade</p>
                      <p className="text-xs text-slate-500">{college.naac}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Total Seats</p>
                      <p className="text-xs text-slate-500">{college.seats} seats available</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                      <BriefcaseIcon />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Placement Rate</p>
                      <p className="text-xs text-slate-500">{college.placement}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Accreditations & Approvals</h2>
                <div className="flex flex-wrap gap-4">
                   <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold">
                     <CheckCircle2 className="w-4 h-4" /> NAAC A++
                   </span>
                   <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold">
                     <CheckCircle2 className="w-4 h-4" /> NMC Approved
                   </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Courses & Fees" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Courses Offered</h2>
                <div className="space-y-6">
                  {[
                    { name: "MBBS", desc: "Bachelor of Medicine and Bachelor of Surgery - comprehensive medical education program", dur: "5.5 Years", seats: "125", fees: "₹1,464", elig: "NEET UG qualified with minimum 50% in PCB" },
                    { name: "MD", desc: "Doctor of Medicine - postgraduate specialization in various medical fields", dur: "3 Years", seats: "50", fees: "₹2,196", elig: "MBBS degree with NEET PG qualification" },
                    { name: "MS", desc: "Master of Surgery - postgraduate surgical specialization program", dur: "3 Years", seats: "37", fees: "₹2,196", elig: "MBBS degree with NEET PG qualification" },
                  ].map((course, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{course.name}</h3>
                          <p className="text-xs text-slate-500 mt-1">{course.desc}</p>
                        </div>
                        <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">Apply Now</button>
                      </div>
                      <div className="flex flex-wrap items-center gap-6 mt-4 text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> Duration: {course.dur}</span>
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400" /> Seats: {course.seats}</span>
                        <span className="flex items-center gap-1.5"><Banknote className="w-4 h-4 text-slate-400" /> Annual Fees: {course.fees}</span>
                      </div>
                      <div className="mt-4 bg-slate-50 p-4 rounded-lg text-sm text-slate-600">
                        <span className="font-bold text-slate-900">Eligibility:</span> {course.elig}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Fee Structure Breakdown</h2>
                <div className="overflow-hidden border border-slate-200 rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Fee Component</th>
                        <th className="px-6 py-4 text-right">Amount (Annual)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      <tr><td className="px-6 py-4">Tuition Fees</td><td className="px-6 py-4 text-right">₹1,024</td></tr>
                      <tr><td className="px-6 py-4">Development Fees</td><td className="px-6 py-4 text-right">₹219</td></tr>
                      <tr><td className="px-6 py-4">Library & Lab Fees</td><td className="px-6 py-4 text-right">₹146</td></tr>
                      <tr><td className="px-6 py-4">Other Fees</td><td className="px-6 py-4 text-right">₹73</td></tr>
                      <tr className="bg-emerald-50 text-emerald-700 font-bold border-y border-emerald-100"><td className="px-6 py-4">Total Annual Fees</td><td className="px-6 py-4 text-right">₹1,464</td></tr>
                      <tr><td className="px-6 py-4">Hostel Fees (Optional)</td><td className="px-6 py-4 text-right">₹2,400</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Admission Process" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-8">Admission Process</h2>
                <div className="relative pl-4 md:pl-0">
                  {/* Vertical Line */}
                  <div className="hidden md:block absolute left-[28px] top-4 bottom-4 w-0.5 bg-blue-100"></div>
                  
                  <div className="space-y-6">
                    {[
                      { step: "1", title: "NEET UG Examination", desc: "Appear for NEET UG conducted by NTA. Minimum qualifying percentile required.", time: "May" },
                      { step: "2", title: "Result Declaration", desc: "NEET UG results announced. Check your All India Rank and category rank.", time: "June" },
                      { step: "3", title: "Counselling Registration", desc: "Register for MCC counselling or state counselling based on your preference.", time: "July" },
                      { step: "4", title: "Choice Filling", desc: "Fill your college and course preferences in order of priority.", time: "July-August" },
                      { step: "5", title: "Seat Allotment", desc: "Seats allotted based on rank, preferences, and availability.", time: "August" },
                      { step: "6", title: "Document Verification", desc: "Submit original documents for verification at the allotted college.", time: "August-September" },
                      { step: "7", title: "Fee Payment & Admission", desc: "Pay admission fees and complete the admission formalities.", time: "September" },
                    ].map((item, i) => (
                      <div key={i} className="relative flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-[#0f76b5] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md z-10 hidden md:flex">
                          {item.step}
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex-1 relative">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-slate-900">{item.title}</h3>
                            <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold">{item.time}</span>
                          </div>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Required Documents</h2>
                  <ul className="space-y-4">
                    {["10th Mark Sheet & Certificate", "12th Mark Sheet & Certificate", "NEET UG Admit Card & Score Card", "Category Certificate (if applicable)", "Domicile Certificate", "Migration Certificate", "Passport Size Photographs"].map((doc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                        <span className="text-sm font-semibold text-slate-600">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Important Links</h2>
                  <div className="space-y-4">
                    <a href="#" className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 p-4 rounded-xl transition-colors border border-slate-100">
                      <span className="text-sm font-semibold text-slate-700">NTA Official Website</span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                    <a href="#" className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 p-4 rounded-xl transition-colors border border-slate-100">
                      <span className="text-sm font-semibold text-slate-700">MCC Counselling</span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Cutoff Trends" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Cutoff Trends (Last 5 Years)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-4">Category</th>
                        <th className="px-4 py-4 text-center">2024</th>
                        <th className="px-4 py-4 text-center">2023</th>
                        <th className="px-4 py-4 text-center">2022</th>
                        <th className="px-4 py-4 text-center">2021</th>
                        <th className="px-4 py-4 text-center">2020</th>
                        <th className="px-4 py-4 text-right">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                      <tr>
                        <td className="px-4 py-5">GENERAL</td>
                        <td className="px-4 py-5 text-center">50</td>
                        <td className="px-4 py-5 text-center">63</td>
                        <td className="px-4 py-5 text-center">72</td>
                        <td className="px-4 py-5 text-center">85</td>
                        <td className="px-4 py-5 text-center">98</td>
                        <td className="px-4 py-5 text-right text-emerald-600 flex items-center justify-end gap-1"><TrendingUp className="w-4 h-4" /> Easier</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-5">OBC</td>
                        <td className="px-4 py-5 text-center">118</td>
                        <td className="px-4 py-5 text-center">145</td>
                        <td className="px-4 py-5 text-center">168</td>
                        <td className="px-4 py-5 text-center">195</td>
                        <td className="px-4 py-5 text-center">220</td>
                        <td className="px-4 py-5 text-right text-emerald-600 flex items-center justify-end gap-1"><TrendingUp className="w-4 h-4" /> Easier</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-5">SC</td>
                        <td className="px-4 py-5 text-center">890</td>
                        <td className="px-4 py-5 text-center">1050</td>
                        <td className="px-4 py-5 text-center">1200</td>
                        <td className="px-4 py-5 text-center">1380</td>
                        <td className="px-4 py-5 text-center">1520</td>
                        <td className="px-4 py-5 text-right text-emerald-600 flex items-center justify-end gap-1"><TrendingUp className="w-4 h-4" /> Easier</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-5">ST</td>
                        <td className="px-4 py-5 text-center">1850</td>
                        <td className="px-4 py-5 text-center">2100</td>
                        <td className="px-4 py-5 text-center">2350</td>
                        <td className="px-4 py-5 text-center">2600</td>
                        <td className="px-4 py-5 text-center">2850</td>
                        <td className="px-4 py-5 text-right text-emerald-600 flex items-center justify-end gap-1"><TrendingUp className="w-4 h-4" /> Easier</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Seat Distribution</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2"><span>GENERAL</span><span>63 seats (50.4%)</span></div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50.4%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2"><span>OBC</span><span>34 seats (27.2%)</span></div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '27.2%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2"><span>SC</span><span>19 seats (15.2%)</span></div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="bg-blue-400 h-2.5 rounded-full" style={{ width: '15.2%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2"><span>ST</span><span>9 seats (7.2%)</span></div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="bg-blue-300 h-2.5 rounded-full" style={{ width: '7.2%' }}></div></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-6">Cutoff Analysis</h2>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                      <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4" /> Improving Trend</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">Cutoff ranks have been improving over the years, indicating increased competition and better student quality.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                      <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2 mb-2"><BarChart className="w-4 h-4" /> Category Wise</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">Reserved category cutoffs are significantly relaxed compared to general category, providing better opportunities.</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                      <h4 className="font-bold text-purple-900 text-sm flex items-center gap-2 mb-2"><Lightbulb className="w-4 h-4" /> Pro Tip</h4>
                      <p className="text-xs text-purple-700 leading-relaxed">Aim for a rank 10-15% better than the closing rank to have a safe chance of admission.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Placements" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#10b981] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
                  <Trophy className="w-6 h-6 text-white/80 absolute top-6 right-6" />
                  <p className="font-bold text-sm text-white/90 text-right">Highest Package</p>
                  <div>
                    <h3 className="text-3xl font-bold">₹32.0L</h3>
                    <p className="text-xs text-white/80 mt-1">Per Annum</p>
                  </div>
                </div>
                <div className="bg-[#3b82f6] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
                  <BarChart className="w-6 h-6 text-white/80 absolute top-6 right-6" />
                  <p className="font-bold text-sm text-white/90 text-right">Average Package</p>
                  <div>
                    <h3 className="text-3xl font-bold">₹18.5L</h3>
                    <p className="text-xs text-white/80 mt-1">Per Annum</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#c026d3] to-[#9333ea] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden">
                  <Users className="w-6 h-6 text-white/80 absolute top-6 right-6" />
                  <p className="font-bold text-sm text-white/90 text-right">Placement Rate</p>
                  <div>
                    <h3 className="text-3xl font-bold">98%</h3>
                    <p className="text-xs text-white/80 mt-1">Students Placed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Placement Highlights</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0"><Building className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Top Companies</h4>
                      <p className="text-xs text-slate-500">Leading organizations from various sectors recruit from campus</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0"><Globe className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">International Opportunities</h4>
                      <p className="text-xs text-slate-500">Students get placed in leading global companies and institutions</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0"><CalendarDays className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Placement Season</h4>
                      <p className="text-xs text-slate-500">Campus placements typically start from December onwards</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0"><MonitorPlay className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Startup Culture</h4>
                      <p className="text-xs text-slate-500">Many alumni have founded successful startups and ventures</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0"><Briefcase className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Training & Support</h4>
                      <p className="text-xs text-slate-500">Comprehensive training programs and career guidance provided</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center flex-shrink-0"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Career Growth</h4>
                      <p className="text-xs text-slate-500">Strong alumni network ensures excellent career progression</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Top Recruiters</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Medanta", "AIIMS", "PGIMER", "Manipal Hospitals", "Narayana Health", "Columbia Asia", "Cloudnine Hospitals", "Aster DM Healthcare", "Artemis Hospital"].map((recruiter, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-center text-center hover:shadow-sm transition-shadow">
                      <span className="font-bold text-slate-700 text-xs">{recruiter}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#0f76b5] to-blue-600 rounded-2xl p-8 text-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Excellent Placement Record</h3>
                  <p className="text-sm text-white/80 max-w-2xl">AIIMS Delhi has consistently maintained a placement rate of over 98% with top companies offering competitive packages to graduates.</p>
                </div>
                <button className="bg-white text-blue-600 hover:bg-slate-50 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap">
                  <Download className="w-4 h-4" /> Download Placement Report
                </button>
              </div>
            </div>
          )}

          {activeTab === "Facilities" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Campus Facilities</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: Stethoscope, color: "bg-blue-50 text-blue-600", title: "Multi-Specialty Hospital", desc: "State-of-the-art hospital with 1000+ beds, modern equipment, and all major departments for comprehensive clinical training.", bullets: ["24/7 Emergency Services", "ICU & CCU", "Operation Theaters", "Diagnostic Center"] },
                    { icon: Library, color: "bg-teal-50 text-teal-600", title: "Central Library", desc: "Extensive collection of books, journals, and digital resources with comfortable reading spaces and study areas.", bullets: ["50,000+ Books", "E-Library Access", "Research Journals", "Digital Resources"] },
                    { icon: Home, color: "bg-indigo-50 text-indigo-600", title: "Hostel Accommodation", desc: "Separate hostels for boys and girls with modern amenities, security, and comfortable living spaces.", bullets: ["24/7 Security", "Wi-Fi Enabled", "Mess Facility", "Recreation Room"] },
                    { icon: Trophy, color: "bg-emerald-50 text-emerald-600", title: "Sports Complex", desc: "Comprehensive sports facilities including indoor and outdoor games for physical fitness and recreation.", bullets: ["Indoor Stadium", "Outdoor Grounds", "Gymnasium", "Yoga Center"] },
                    { icon: Coffee, color: "bg-amber-50 text-amber-600", title: "Cafeteria & Dining", desc: "Hygienic cafeteria serving nutritious meals with varied menu options for students and staff.", bullets: ["Vegetarian Options", "Non-Veg Options", "Snacks Counter", "Clean Environment"] },
                    { icon: Bus, color: "bg-rose-50 text-rose-600", title: "Transportation", desc: "Well-maintained bus fleet covering major routes for convenient commute of students and staff.", bullets: ["Multiple Routes", "GPS Tracking", "Safe & Secure", "Affordable Fees"] },
                    { icon: Stethoscope, color: "bg-cyan-50 text-cyan-600", title: "Medical Facilities", desc: "On-campus medical center with qualified doctors and nurses for emergency and routine healthcare.", bullets: ["First Aid", "Regular Checkups", "Emergency Care", "Health Insurance"] },
                    { icon: Wifi, color: "bg-purple-50 text-purple-600", title: "Wi-Fi Campus", desc: "High-speed internet connectivity across the entire campus for seamless online learning and research.", bullets: ["High Speed", "Full Coverage", "Secure Network", "24/7 Access"] },
                    { icon: MonitorPlay, color: "bg-fuchsia-50 text-fuchsia-600", title: "Auditorium", desc: "Modern auditorium with advanced audio-visual systems for seminars, conferences, and cultural events.", bullets: ["500+ Seating", "AC Hall", "Sound System", "Projector"] },
                    { icon: Lightbulb, color: "bg-yellow-50 text-yellow-600", title: "Innovation Center", desc: "Dedicated space for innovation, entrepreneurship, and startup incubation with mentorship support.", bullets: ["Incubation Support", "Mentorship", "Funding Assistance", "Networking Events"] },
                    { icon: Users, color: "bg-orange-50 text-orange-600", title: "Counselling Services", desc: "Professional counselling services for academic guidance, career planning, and personal development.", bullets: ["Career Guidance", "Personal Counselling", "Skill Development", "Placement Support"] },
                    { icon: Building2, color: "bg-blue-50 text-blue-600", title: "Banking & ATM", desc: "On-campus banking facilities and ATMs for convenient financial transactions.", bullets: ["Bank Branch", "ATM Services", "Fee Payment", "Scholarship Processing"] },
                  ].map((facility, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors">
                      <div className="flex gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${facility.color}`}>
                          <facility.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1">{facility.title}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed">{facility.desc}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                        {facility.bullets.map((bullet, j) => (
                          <div key={j} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-teal-500 flex-shrink-0" />
                            <span className="text-[10px] font-semibold text-slate-600">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 px-1">Campus Life</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500 shadow-sm"><Users className="w-6 h-6" /></div>
                    <h4 className="font-bold text-slate-900 mb-2">Student Clubs</h4>
                    <p className="text-xs text-slate-600">Active student clubs for cultural, technical, and social activities</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 shadow-sm"><CalendarDays className="w-6 h-6" /></div>
                    <h4 className="font-bold text-slate-900 mb-2">Annual Events</h4>
                    <p className="text-xs text-slate-600">Regular fests, competitions, and cultural programs throughout the year</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500 shadow-sm"><Globe className="w-6 h-6" /></div>
                    <h4 className="font-bold text-slate-900 mb-2">Global Exposure</h4>
                    <p className="text-xs text-slate-600">International collaborations and exchange programs with foreign universities</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-80 space-y-6">
          
          {/* Quick Stats */}
          <div className="bg-[#1e78a6] text-white rounded-2xl p-6 shadow-md bg-gradient-to-br from-[#1e78a6] to-[#0f6096]">
            <h3 className="font-bold text-lg mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-sm text-white/80">Annual Fees</span>
                <span className="font-bold">{college.fees}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-sm text-white/80">2024 Cutoff</span>
                <span className="font-bold">{college.cutoff}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-sm text-white/80">Avg Package</span>
                <span className="font-bold">{college.pkg}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Total Seats</span>
                <span className="font-bold">{college.seats}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">Address</p>
                  <p className="text-xs text-slate-500">{college.location}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ExternalLink className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">Website</p>
                  <a href={college.website} className="text-xs text-teal-600 hover:underline">{college.website}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Now */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Apply Now</h3>
            <p className="text-xs text-slate-500 mb-6">Get personalized counselling and admission guidance for AIIMS Delhi</p>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <Send className="w-4 h-4" /> Request Callback
            </button>
          </div>

          {activeTab === "Reviews" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Student Reviews</h2>
                
                <div className="flex flex-col md:flex-row gap-8 mb-10">
                  {/* Rating Overview */}
                  <div className="bg-gradient-to-br from-teal-600 to-blue-600 text-white rounded-2xl p-8 flex flex-col items-center justify-center min-w-[240px] shadow-sm">
                    <h3 className="text-5xl font-bold mb-2">4.5</h3>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4].map((star) => <Star key={star} className="w-5 h-5 fill-current text-yellow-400" />)}
                      <Star className="w-5 h-5 fill-current text-yellow-400/50" />
                    </div>
                    <p className="text-sm font-medium text-white/80">Based on 234 reviews</p>
                  </div>
                  
                  {/* Rating Bars */}
                  <div className="flex-1 space-y-3 justify-center flex flex-col">
                    {[
                      { stars: "5 Star", pct: 65, color: "bg-teal-600" },
                      { stars: "4 Star", pct: 25, color: "bg-blue-500" },
                      { stars: "3 Star", pct: 8, color: "bg-blue-400" },
                      { stars: "2 Star", pct: 2, color: "bg-blue-300" },
                      { stars: "1 Star", pct: 0, color: "bg-slate-300" },
                    ].map((bar, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-slate-600 w-12">{bar.stars}</span>
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 w-8 text-right">{bar.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-4 mb-8">
                  {[
                    { name: "Rahul Sharma", course: "MBBS 2023", initial: "R", color: "bg-[#0f76b5]", date: "December 2023", rating: 5, text: "Excellent college with great faculty and infrastructure. The placement support is outstanding and the campus life is vibrant. Highly recommended for aspiring students." },
                    { name: "Priya Patel", course: "MD 2022", initial: "P", color: "bg-[#0f76b5]", date: "November 2023", rating: 4, text: "Good college with experienced professors and modern facilities. The hostel accommodation is comfortable and the library resources are extensive. Could improve on sports facilities." },
                    { name: "Amit Kumar", course: "MBBS 2021", initial: "A", color: "bg-[#0f76b5]", date: "October 2023", rating: 5, text: "One of the best colleges in the country. The academic environment is excellent and the research opportunities are abundant. Great placement records and alumni network." },
                    { name: "Sneha Reddy", course: "MS 2020", initial: "S", color: "bg-[#0f76b5]", date: "September 2023", rating: 4, text: "Very good college with quality education and practical exposure. The faculty is supportive and the campus is well-maintained. Food quality in mess could be better." },
                  ].map((review, i) => (
                    <div key={i} className="border border-slate-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0 ${review.color}`}>
                          {review.initial}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                          <p className="text-xs text-slate-500 mb-1">{review.course}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-current text-yellow-400' : 'text-slate-200 fill-slate-200'}`} />
                              ))}
                            </div>
                            <span className="text-[10px] text-slate-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{review.text}</p>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({(5 - i) * 12 + 5})
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                          <Flag className="w-3.5 h-3.5" /> Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" /> Write a Review
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// Simple icons for tabs to match the UI
const InfoIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const BookIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const ClipboardIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const TrendingIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>;
const BriefcaseIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const BuildingIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>;
const StarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
