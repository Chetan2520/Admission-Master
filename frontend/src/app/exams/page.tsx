"use client";

import { useState, useEffect } from "react";
import { Search, Calculator, HeartPulse, GraduationCap, ArrowRight, ShieldCheck, Clock, FileText, ChevronRight, Zap, Target, BarChart3, Info, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExamsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className={`min-h-screen bg-white pb-20`}>
      
      {/* Search Hero Section (Premium Dark Style) */}
      <section className="bg-black pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] tracking-widest uppercase mb-6 shadow-sm shadow-blue-500/10">
                Exam Intelligence Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Master Every <span className="text-blue-500">Milestone</span>
              </h1>
              <p className="text-lg text-slate-300 font-medium mb-10 leading-relaxed max-w-xl">
                Get real-time insights, expert strategies, and accurate cutoff data for India's most prestigious competitive examinations.
              </p>
              
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-6 pl-16 pr-40 text-white font-bold outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all backdrop-blur-xl" 
                  placeholder="Search exam (e.g. NEET UG, JEE Main...)" 
                  type="text"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-colors text-sm">
                  Find Exam
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 grid grid-cols-2 gap-4 relative"
            >
              <div className="absolute -inset-4 bg-blue-600/10 blur-[60px] rounded-full"></div>
              <div className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-3xl relative">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mock Tests</div>
              </div>
              <div className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-3xl relative mt-8">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">99.8%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prediction Accuracy</div>
              </div>
              <div className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-3xl relative">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expert Support</div>
              </div>
              <div className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-3xl relative mt-8">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Content</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Exams Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Popular Exam Categories</h2>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg">Explore curated data and preparation strategies tailored for your target stream.</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeInUp} className="group p-10 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-500/50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <HeartPulse className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">Medical Entrance</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">Complete guides for NEET UG, PG, AIIMS, and more.</p>
            <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Explore Exams <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="group p-10 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-500/50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Calculator className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">Engineering</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">In-depth insights for JEE Main, Advanced, and BITSAT.</p>
            <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Explore Exams <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="group p-10 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-500/50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">Management</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">Cracking CAT, GMAT, XAT and MBA applications.</p>
            <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Explore Exams <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trending Exams Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Trending Exams</h2>
              <p className="text-slate-600 font-medium text-lg">Key dates and quick links for upcoming examinations.</p>
            </div>
            <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-slate-700 hover:shadow-md transition-all flex items-center gap-2">
              View All Exams <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { name: "NEET UG 2025", status: "Applications Open", date: "May 05, 2025", desc: "Medical entrance for all MBBS/BDS programs.", color: "bg-blue-600", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" },
              { name: "JEE Main 2025", status: "Results Out", date: "April 20, 2025", desc: "Engineering gateway for NITs, IIITs & GFTIs.", color: "bg-blue-600", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80" },
              { name: "CUET UG 2025", status: "Coming Soon", date: "June 15, 2025", desc: "Common portal for Central Universities across India.", color: "bg-black", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80" },
              { name: "CAT 2024", status: "Exam Dec 2024", date: "Nov 24, 2024", desc: "India's premier gateway to the prestigious IIMs.", color: "bg-black", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" },
              { name: "NEET PG 2024", status: "Admit Card Live", date: "Aug 11, 2024", desc: "Specialization portal for medical graduates.", color: "bg-blue-600", img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80" },
              { name: "JEE Advanced", status: "Qualified Only", date: "May 26, 2025", desc: "Ultimate gateway for Indian Institutes of Technology.", color: "bg-blue-600", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80" }
            ].map((exam, i) => (
              <motion.div variants={fadeInUp} key={i} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="h-48 overflow-hidden relative">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={exam.img} alt={exam.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-5 left-6 flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg ${exam.color} text-white text-[10px] font-bold uppercase tracking-wider`}>{exam.status}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-black mb-3">{exam.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed line-clamp-2">{exam.desc}</p>
                  
                  <div className="flex items-center justify-between py-6 border-y border-slate-100 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exam Date</p>
                        <p className="text-sm font-bold text-black">{exam.date}</p>
                      </div>
                    </div>
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Eligibility</button>
                    <button className="py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors shadow-md">Details</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advanced Features Ad */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black rounded-[3rem] p-10 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 font-bold text-xs uppercase mb-8 border border-blue-500/20">
                <ShieldCheck className="w-4 h-4" /> Secure Your Success
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Predict Your College with 99.8% Accuracy</h2>
              <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed">Join 50,000+ students using our AI-driven engine to discover their ideal colleges based on current trends and historical data.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2">
                  Start Prediction <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-2xl font-bold transition-colors text-center">
                  Learn How it Works
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: BarChart3, title: "Detailed Analytics", text: "Deep dive into cutoff trends from last 10 years." },
                { icon: Info, title: "Reservation Insights", text: "Calculate your chances based on specific quotas." },
                { icon: BookOpen, title: "Syllabus Tracker", text: "Real-time tracking of your prep progress." }
              ].map((feat, i) => (
                <div key={i} className="flex gap-6 p-6 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">{feat.title}</h4>
                    <p className="text-slate-400 text-sm font-medium">{feat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Expert Assistance Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Expert Assistance</h2>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg">Confused about the process? Talk to our counselors who have guided 10,000+ students to their dream institutions.</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeInUp} className="bg-white border border-slate-200 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all">
            <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden group">
               <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" alt="Counselor" />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-black mb-2">1-on-1 Strategy Call</h3>
               <p className="text-slate-500 font-medium mb-8">Personalized exam plan with a senior counselor (Ex-IIT/AIIMS faculty).</p>
               <button className="text-blue-600 font-bold flex items-center hover:gap-2 transition-all">
                  Book Free Session <ArrowRight className="w-5 h-5 ml-2" />
               </button>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white border border-slate-200 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all">
            <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden group">
               <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" alt="Counselor" />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-black mb-2">Document Assistance</h3>
               <p className="text-slate-500 font-medium mb-8">Guidance on state-level certificates, reservation proofs, and domicile.</p>
               <button className="text-blue-600 font-bold flex items-center hover:gap-2 transition-all">
                  Connect Now <ArrowRight className="w-5 h-5 ml-2" />
               </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
