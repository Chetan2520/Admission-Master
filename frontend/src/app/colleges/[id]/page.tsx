"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  MapPin, 
  Building2, 
  Star, 
  Trophy, 
  Globe, 
  BookOpen, 
  Calendar, 
  IndianRupee, 
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Users,
  Activity,
  Download,
  Info,
  GraduationCap,
  TrendingUp,
  LayoutDashboard,
  FileText,
  School,
  MessageSquare,
  School2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CollegeData {
  college: {
    _id: string;
    name: string;
    shortName?: string;
    location: string;
    state: string;
    type: string;
    rating: number;
    nirfRank?: number;
    seats?: number;
    averageCourseFees?: string;
    website?: string;
    description?: string;
    logo?: string;
    affiliatedWith?: string;
    entranceExams: string[];
    images: string[];
    hostelFees?: string;
    avgPackage?: string;
    highestPackage?: string;
    establishmentYear?: string;
    courses: {
      name: string;
      branches: {
        name: string;
        duration: string;
        fees: string;
      }[];
    }[];
  };
  cutoffs: any[];
  courseMatrix: Record<string, any[]>;
}

export default function CollegeDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<CollegeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    fetchCollegeDetails();
  }, [id]);

  const fetchCollegeDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/colleges/${id}/full-details`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch college details", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0066cc] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading institution data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">College Not Found</h2>
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#0066cc] text-white rounded-2xl font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { college, courseMatrix, cutoffs } = data;

  // Process cutoffs for the trend table
  const categories = Array.from(new Set(cutoffs.map(c => c.category)));
  const years = Array.from(new Set(cutoffs.map(c => c.year))).sort((a, b) => b - a);

  const tabs = [
    { name: "Overview", icon: Info },
    { name: "Courses & Fees", icon: BookOpen },
    { name: "Admission Process", icon: GraduationCap },
    { name: "Entrance Exams", icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-inter">
      
      {/* Hero Section with Image Background and Overlay */}
      <section className="relative pt-24 pb-12 text-white overflow-hidden min-h-[400px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={college.images?.[0] || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
            alt={college.name}
            fill
            className="object-cover"
            priority
          />
          {/* Black gradient overlay from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white font-bold mb-8 transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Colleges
          </button>


          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Logo Card */}
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl shadow-2xl flex-shrink-0 flex items-center justify-center p-4 border-4 border-white/20">
              {college.logo ? (
                <div className="relative w-full h-full">
                  <Image src={college.logo} alt={college.name} fill className="object-contain" />
                </div>
              ) : (
                <Building2 className="w-16 h-16 text-slate-200" />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
                {college.name}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-3 gap-x-6 text-sm font-bold text-white/90 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/70" /> 
                  <span>{college.location}, {college.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <School2 className="w-4 h-4 text-white/70" />
                  <span>{college.type}</span>
                </div>
                {college.nirfRank && (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-white/70" />
                    <span>NIRF Rank #{college.nirfRank}</span>
                  </div>
                )}
                {college.rating >= 4.5 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-white/70 fill-white/20" />
                    <span>A++ Accreditation</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#0066cc] rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-50 transition-all shadow-lg active:scale-95">
                <Download className="w-4 h-4" /> Download Brochure
              </button>
              {college.website && (
                <a 
                  href={college.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-[#0a8d6e] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#087a5f] transition-all shadow-lg active:scale-95"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
            </div> */}
          </div>
        </div>
      </section>

      {/* Styled Tab Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.name 
                    ? "text-[#0066cc] border-[#0066cc] bg-slate-50" 
                    : "text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50/50"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.name ? "text-[#0066cc]" : "text-slate-400"}`} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            <AnimatePresence mode="wait">
              {activeTab === "Overview" && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8"
                >
                  <div className="  p-8 md:p-10  ">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">About {college.shortName || college.name}</h2>
                    <p className="text-slate-600 leading-relaxed text-base font-medium">
                      {college.description || `${college.name} is a premier educational institution located in ${college.location}, ${college.state}. Established as a center of excellence, the college has consistently maintained its position among the top institutions in India.`}
                    </p>
                    {/* <p className="mt-4 text-slate-600 leading-relaxed text-base font-medium">
                      With a NIRF ranking of #{college.nirfRank || "1"} and A++ accreditation, the institution offers world-class education and research opportunities. The college is known for its outstanding faculty, state-of-the-art infrastructure, and excellent placement records.
                    </p> */}
                  </div>

                  {/* Courses Preview in Overview */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Courses Offered</h2>
                    <div className="space-y-4">
                      {college.courses.map((course, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#0066cc] transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 mb-2">{course.name}</h3>
                              <p className="text-sm text-slate-500 font-medium mb-4">High-quality {course.name} program with a focus on practical skills and academic excellence.</p>
                              <div className="flex flex-wrap items-center gap-6 text-sm font-bold">
                                {course.branches[0]?.duration && (
                                  <span className="flex items-center gap-2 text-slate-600"><Calendar className="w-4 h-4 text-[#0066cc]" /> Duration: {course.branches[0]?.duration} Years</span>
                                )}
                                {college.seats && (
                                  <span className="flex items-center gap-2 text-slate-600"><Users className="w-4 h-4 text-[#0066cc]" /> Seats: {college.seats}</span>
                                )}
                                {(course.branches[0]?.fees || college.averageCourseFees) && (
                                  <span className="flex items-center gap-2 text-slate-600"><IndianRupee className="w-4 h-4 text-[#0066cc]" /> Annual Fees: ₹{course.branches[0]?.fees || college.averageCourseFees}</span>
                                )}
                              </div>
                            </div>
                            <button className="px-8 py-3 bg-[#0a8d6e] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#087a5f] transition-all active:scale-95">
                              Apply Now
                            </button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Courses & Fees" && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                   <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Detailed Fee Structure</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-100">
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-left">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>Course Name</span>
                              </div>
                            </th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-left">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Specialization</span>
                              </div>
                            </th>
                           
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-left">
                              <div className="flex items-center gap-2">
                                <IndianRupee className="w-3.5 h-3.5" />
                                <span>Annual Fees</span>
                              </div>
                            </th>
                             <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-left">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Duration</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {college.courses.flatMap((c) => 
                            c.branches.map((b, i) => (
                              <tr key={`${c.name}-${i}`} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="py-5 px-6 font-bold text-slate-900">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#0066cc]"></div>
                                    {c.name}
                                  </div>
                                </td>
                                <td className="py-5 px-6 font-bold text-slate-600">
                                  <span className="px-3 py-1 bg-slate-100 rounded-sm text-xs uppercase tracking-wider">
                                    {b.name}
                                  </span>
                                </td>
                               
                                <td className="py-5 px-6 font-bold text-[#0066cc] text-lg">
                                  <span className="flex items-center gap-1">
                                    <span className="text-sm">₹</span>{b.fees}
                                  </span>
                                </td>
                                 <td className="py-5 px-6 font-bold text-slate-600">
                                  <div className="flex items-center gap-1.5"> 
                                    {b.duration} Years
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Admission Process" && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-10">Admission Process</h2>
                    <div className="relative pl-12 space-y-12">
                      <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                      
                      {[
                        { step: 1, title: "Entrance Examination", desc: "Appear for the required entrance examination conducted by the institution or relevant national/state bodies.", date: "Varies" },
                        { step: 2, title: "Result Declaration", desc: "Results are declared and candidates are ranked based on their performance.", date: "June" },
                        { step: 3, title: "Counseling Process", desc: "Ranked candidates participate in the centralized counseling sessions.", date: "July" },
                        { step: 4, title: "Seat Allotment", desc: "Seats are allotted based on rank, category, and institutional preference.", date: "August" }
                      ].map((item) => (
                        <div key={item.step} className="relative group">
                          <div className="absolute -left-[51px] top-0 w-10 h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold text-sm z-10 shadow-lg shadow-[#0066cc]/20">
                            {item.step}
                          </div>
                          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                              <span className="px-4 py-1 bg-[#14b5a4]/10 text-[#14b5a4] rounded-full text-[10px] font-bold uppercase">{item.date}</span>
                            </div>
                            <p className="text-slate-500 font-medium text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Entrance Exams" && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Entrance Exams & Eligibility</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#14b5a4]" /> Required Exams
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {college.entranceExams?.length > 0 ? (
                            college.entranceExams.map((exam, idx) => (
                              <span key={idx} className="bg-slate-50 text-[#0f76b5] px-4 py-2 rounded-xl font-bold border border-slate-100 shadow-sm">
                                {exam}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 italic">No specific entrance exams listed. Please check individual course details.</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                          <Info className="w-5 h-5 text-[#14b5a4]" /> General Eligibility
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2" />
                            <span>Completion of 10+2 or equivalent from a recognized board</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2" />
                            <span>Minimum aggregate marks as specified by the respective course</span>
                          </li>
                          <li className="flex items-start gap-3 text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2" />
                            <span>Qualifying score in the relevant national/state level entrance exam</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-10 p-6 bg-[#0f76b5]/5 rounded-2xl border border-[#0f76b5]/10">
                      <div className="flex gap-4 items-start">
                        <div className="bg-[#0f76b5] p-3 rounded-xl shadow-lg shadow-[#0f76b5]/20">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#0f76b5] mb-1">Counselling & Seat Allocation</h4>
                          <p className="text-slate-600 leading-relaxed">
                            Admission to most programs is finalized through centralized counselling based on entrance exam ranks. Candidates must register on the official portal and select {college.shortName || college.name} as their preferred choice.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#0066cc] to-[#004d99] rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                 Quick Stats
              </h3>
              
              <div className="space-y-6">
                {/* Annual Fees */}
                {(college.averageCourseFees || (college.courses[0]?.branches[0]?.fees)) && (
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="text-white/70 font-bold">Avg. Annual Fees</span>
                    <span className="text-xl font-bold">₹{college.averageCourseFees || college.courses[0]?.branches[0]?.fees}</span>
                  </div>
                )}

                {/* Duration */}
                {(college.courses[0]?.branches[0]?.duration) && (
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="text-white/70 font-bold">Course Duration</span>
                    <span className="text-xl font-bold">{college.courses[0]?.branches[0]?.duration} Years</span>
                  </div>
                )}

                {/* Hostel Fees */}
                {college.hostelFees && (
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="text-white/70 font-bold">Hostel Fees</span>
                    <span className="text-xl font-bold">₹{college.hostelFees}</span>
                  </div>
                )}

                {/* Avg Package */}
                {college.avgPackage && (
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="text-white/70 font-bold">Avg Package</span>
                    <span className="text-xl font-bold">₹{college.avgPackage}</span>
                  </div>
                )}

                {/* Highest Package */}
                {college.highestPackage && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 font-bold">Highest Package</span>
                    <span className="text-xl font-bold">₹{college.highestPackage}</span>
                  </div>
                )}

                {/* Fallback if no stats */}
                {!(college.averageCourseFees || college.courses[0]?.branches[0]?.fees || college.courses[0]?.branches[0]?.duration || college.hostelFees || college.avgPackage || college.highestPackage) && (
                   <div className="text-center py-4 text-white/50 text-sm font-bold">
                     Institutional stats not available
                   </div>
                )}
              </div>

              <Link href="/counsellor" className="mt-10 w-full py-5 bg-white text-[#0066cc] rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-lg active:scale-95">
                 Talk to Expert <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">Campus Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0066cc] shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-slate-700">{college.location}, {college.state}</p>
                  </div>
                </div>
                {college.affiliatedWith && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0066cc] shadow-sm">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Affiliation</p>
                      <p className="text-sm font-bold text-slate-700">{college.affiliatedWith}</p>
                    </div>
                  </div>
                )}
                
                {college.establishmentYear && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0066cc] shadow-sm">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Established</p>
                      <p className="text-sm font-bold text-slate-700">{college.establishmentYear}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
