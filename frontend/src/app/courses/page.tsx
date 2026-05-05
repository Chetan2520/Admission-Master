"use client";

import { useState, useEffect } from "react";
import { Search, LayoutGrid, HeartPulse, HardHat, Briefcase, Globe, ArrowRight, ChevronDown, Star, Clock, PlayCircle, ChevronRight, Activity, ShieldCheck, BarChart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CoursesPage() {
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
    <div className="min-h-screen bg-white">
      
      {/* Hero Section (Luxury blue Design) */}
      <section className="relative overflow-hidden pt-44 pb-32 bg-slate-50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-extrabold tracking-[0.3em] text-blue-400 bg-blue-500/10 px-6 py-2 rounded-full mb-8 uppercase border border-blue-500/20 shadow-2xl backdrop-blur-md"
          >
            World-Class Preparation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 mb-8 tracking-tight leading-tight"
          >
            Find Your Path to <span className="text-blue-600">Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
          >
            Precision-engineered courses tailored for India's elite competitive examinations and global academic institutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="w-full max-w-5xl glass-card p-3 rounded-[2.5rem] shadow-3xl bg-white/10 border-white/10 flex flex-col md:flex-row items-center gap-3 backdrop-blur-xl"
          >
            <div className="flex-1 flex items-center px-6 w-full">
              <Search className="text-blue-400 mr-4 w-6 h-6 shrink-0" />
              <input 
                className="w-full border-none focus:ring-0 text-slate-900 font-bold bg-transparent py-5 outline-none placeholder-slate-500 text-lg" 
                placeholder="Search for NEET, JEE, GRE, or UPSC..." 
                type="text"
              />
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="flex-none flex items-center px-6 w-full md:w-auto border-t md:border-t-0 border-white/10">
              <LayoutGrid className="text-blue-400 mr-4 w-6 h-6 shrink-0" />
              <select className="border-none focus:ring-0 text-slate-300 font-bold bg-transparent py-5 pr-10 outline-none cursor-pointer appearance-none text-lg">
                <option className="bg-slate-900">All Categories</option>
                <option className="bg-slate-900">Medical</option>
                <option className="bg-slate-900">Engineering</option>
                <option className="bg-slate-900">Management</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-slate-900 px-12 py-5 rounded-[1.8rem] font-extrabold shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
              Search <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Explore Categories (Bento Style) */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-20"
        >
          <span className="text-blue-600 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">Specialized Verticals</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">Explore Categories</h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: HeartPulse, title: "Medical", text: "NEET, AIIMS & International Medical Foundations.", color: "bg-blue-600" },
            { icon: HardHat, title: "Engineering", text: "JEE Main & Advanced, BITSAT, and GATE mastery.", color: "bg-violet-600" },
            { icon: Briefcase, title: "Management", text: "CAT, XAT, GMAT and Premium MBA prep.", color: "bg-blue-800" },
            { icon: Globe, title: "Study Abroad", text: "IELTS, TOEFL, GRE and SAT expertise.", color: "bg-blue-400" }
          ].map((cat, i) => (
            <motion.div 
              variants={fadeInUp}
              key={i} 
              className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-10 hover:border-blue-500/20 transition-all duration-700 hover:shadow-3xl hover:-translate-y-3 cursor-pointer"
            >
              <div className={`w-16 h-16 ${cat.color} text-slate-900 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-transform duration-500`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-3 tracking-tight">{cat.title}</h3>
              <p className="text-slate-500 font-medium text-base mb-8 leading-relaxed">{cat.text}</p>
              <div className="flex items-center text-blue-600 font-extrabold text-xs uppercase tracking-widest group-hover:gap-4 transition-all gap-2">
                Explore Vertical <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Courses (Premium Cards) */}
      <section className="py-32 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div>
              <span className="text-blue-600 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">Handpicked Excellence</span>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">Featured Courses</h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">Our most sought-after programs with documented success rates and expert mentorship.</p>
            </div>
            <button className="font-extrabold text-slate-900 flex items-center bg-white px-8 py-4 rounded-2xl border border-slate-200 shadow-xl hover:border-blue-500 hover:shadow-blue-600/10 transition-all group">
              View All Catalogue <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {/* Course 1 */}
            <motion.div variants={fadeInUp} className="glass-card bg-white rounded-[3rem] overflow-hidden border-slate-100 shadow-2xl hover:shadow-blue-600/10 transition-all duration-700 flex flex-col group hover:-translate-y-4">
              <div className="h-64 w-full relative overflow-hidden bg-slate-200">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" alt="Medical Prep" />
                <div className="absolute top-6 left-6 bg-blue-600 text-slate-900 text-[10px] font-extrabold px-4 py-2 rounded-xl uppercase tracking-widest shadow-2xl backdrop-blur-md">Premium Track</div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase">NEET Masterclass</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-extrabold ml-2 text-sm text-slate-900">4.9</span>
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-4 line-clamp-2 tracking-tight group-hover:text-blue-600 transition-colors">Ultimate NEET 2025: Intensive Success Track</h3>
                <div className="flex items-center gap-6 mb-10 text-slate-500 font-extrabold text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> 12 Months</div>
                  <div className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-blue-600" /> 450+ Assets</div>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-auto">
                  <div className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">₹49,999</div>
                  <button className="bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-extrabold hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    Enroll
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Course 2 */}
            <motion.div variants={fadeInUp} className="glass-card bg-white rounded-[3rem] overflow-hidden border-slate-100 shadow-2xl hover:shadow-blue-600/10 transition-all duration-700 flex flex-col group hover:-translate-y-4">
              <div className="h-64 w-full relative overflow-hidden bg-slate-200">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80" alt="Engineering Prep" />
                <div className="absolute top-6 left-6 bg-blue-600 text-slate-900 text-[10px] font-extrabold px-4 py-2 rounded-xl uppercase tracking-widest shadow-2xl backdrop-blur-md">Bestseller</div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase">JEE Advanced</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-extrabold ml-2 text-sm text-slate-900">4.8</span>
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-4 line-clamp-2 tracking-tight group-hover:text-blue-600 transition-colors">JEE Main & Advanced: Complete Mastery</h3>
                <div className="flex items-center gap-6 mb-10 text-slate-500 font-extrabold text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> 24 Months</div>
                  <div className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-blue-600" /> 900+ Assets</div>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-auto">
                  <div className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">₹84,999</div>
                  <button className="bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-extrabold hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    Enroll
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Course 3 */}
            <motion.div variants={fadeInUp} className="glass-card bg-white rounded-[3rem] overflow-hidden border-slate-100 shadow-2xl hover:shadow-blue-600/10 transition-all duration-700 flex flex-col group hover:-translate-y-4">
              <div className="h-64 w-full relative overflow-hidden bg-slate-200">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80" alt="Study Abroad" />
                <div className="absolute top-6 left-6 bg-blue-600 text-slate-900 text-[10px] font-extrabold px-4 py-2 rounded-xl uppercase tracking-widest shadow-2xl backdrop-blur-md">Global Hub</div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-extrabold tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase">Study Abroad</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-extrabold ml-2 text-sm text-slate-900">5.0</span>
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-4 line-clamp-2 tracking-tight group-hover:text-blue-600 transition-colors">GRE Prep + Admissions Counseling</h3>
                <div className="flex items-center gap-6 mb-10 text-slate-500 font-extrabold text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> 6 Months</div>
                  <div className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-blue-600" /> 200+ Assets</div>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-auto">
                  <div className="text-3xl font-heading font-extrabold text-slate-900 tracking-tight">₹32,500</div>
                  <button className="bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-extrabold hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    Enroll
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Learn from the Best (Luxury Faculty Section) */}
      <section className="py-40 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-blue-600 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">World-Class Faculty</span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">Learn from the Best</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">Our faculty includes Ivy League graduates, top IITians, and industry experts with decades of pedigree.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {[
              { name: "Dr. Rajesh Khanna", role: "Biology Specialist (PhD, Stanford)", text: "Helped over 5,000 students clear NEET with consistent 680+ scores.", tags: ["NEET Expert", "22y Exp"], img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
              { name: "Prof. Ananya Singh", role: "Quantitative Head (IIT Delhi)", text: "Renowned globally for shortcut tricks and logical reasoning mastery at scale.", tags: ["IIT-JEE Lead", "CAT 100%"], img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
              { name: "David Miller", role: "Admissions Concierge (Ex-Ivy)", text: "Expert in GRE verbal strategies and end-to-end Ivy League placement protocols.", tags: ["GRE Expert", "Global Lead"], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" }
            ].map((mentor, i) => (
              <motion.div variants={fadeInUp} key={i} className="glass-card bg-slate-50/50 border-white/50 p-10 rounded-[3rem] text-center shadow-2xl hover:shadow-blue-600/10 transition-all duration-700 group hover:-translate-y-4">
                <div className="w-40 h-40 mx-auto rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl mb-8 relative rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <img className="w-full h-full object-cover" src={mentor.img} alt={mentor.name} />
                </div>
                <h4 className="font-heading font-extrabold text-slate-900 text-2xl mb-2 tracking-tight">{mentor.name}</h4>
                <p className="text-blue-600 font-extrabold mb-6 text-[10px] uppercase tracking-widest">{mentor.role}</p>
                <p className="text-slate-500 text-base font-medium mb-10 leading-relaxed italic">"{mentor.text}"</p>
                <div className="flex justify-center gap-3">
                  {mentor.tags.map((tag, j) => (
                    <span key={j} className="bg-white text-slate-500 px-4 py-2 rounded-xl text-[10px] font-extrabold tracking-widest uppercase border border-slate-100 shadow-sm">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Your Journey to Success (Black & Indigo) */}
      <section className="py-40 bg-slate-50 text-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-32">
            <span className="text-blue-400 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block text-center">Elite Protocol</span>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 tracking-tight">Your Journey to Success</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">From your first diagnostic assessment to the final admission decree, we are with you at every strategic node.</p>
          </motion.div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 z-0"></div>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 relative z-10"
            >
              {[
                { num: "01", title: "Diagnostic", text: "AI-powered assessment to map your academic DNA." },
                { num: "02", title: "Strategic Plan", text: "Custom roadmap designed by industry veterans." },
                { num: "03", title: "Core Mastery", text: "Interactive pedagogy with real-time feedback loops." },
                { num: "04", title: "Simulations", text: "High-fidelity mock environments for stress testing." },
                { num: "05", title: "Final Decree", text: "Pre-admission polishing and interview dominance.", special: true }
              ].map((step, i) => (
                <motion.div variants={fadeInUp} key={i} className="flex flex-col items-center text-center group">
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 ring-[10px] ring-slate-950 font-heading font-extrabold text-2xl transition-all duration-500 ${step.special ? 'bg-blue-600 text-slate-900 shadow-3xl shadow-blue-600/40' : 'bg-white/5 text-blue-400 group-hover:bg-white/10'}`}>
                    {step.num}
                  </div>
                  <h5 className="font-heading font-extrabold text-lg mb-3 tracking-tight">{step.title}</h5>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Bottom (Glassmorphism Luxury) */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[4rem] p-16 md:p-32 relative overflow-hidden flex flex-col items-center text-center shadow-3xl shadow-blue-900/20"
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 max-w-4xl">
              <span className="text-blue-400 font-extrabold uppercase tracking-[0.4em] text-[10px] mb-8 block">Limited Enrollment Open</span>
              <h2 className="text-4xl md:text-7xl font-heading font-extrabold text-slate-900 mb-10 leading-[1.1] tracking-tight">Join 50,000+ Visionaries Already Scaling New Heights</h2>
              <p className="text-slate-500 font-medium text-xl mb-16 opacity-90 max-w-2xl mx-auto">Enroll in our flagship programs today and receive priority VIP career counseling worth ₹25,000 for free.</p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-blue-600 text-slate-900 px-14 py-6 rounded-[2rem] font-heading font-extrabold text-lg shadow-3xl shadow-blue-600/40 hover:bg-blue-500 hover:scale-105 transition-all">
                  Start Your Ascent
                </button>
                <button className="bg-white/5 backdrop-blur-3xl border-2 border-white/10 text-slate-900 px-14 py-6 rounded-[2rem] font-heading font-extrabold text-lg hover:bg-white/10 transition-all">
                  Speak to an Expert
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
