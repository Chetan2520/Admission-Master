"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Clock, LineChart, Award, Heart, Microscope, Trophy, Globe, ExternalLink, PenTool, FileCheck, Mic, CheckCircle2, Map, Quote, ChevronDown, Gift, ChevronRight, Activity, Zap, Sparkles, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ScholarshipsPage() {
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

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white pt-44 pb-20">
      
      {/* Luxury blue Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-blue-600 text-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-blue-600/40 rotate-12"
        >
          <Gift className="w-10 h-10" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 mb-8 tracking-tight leading-tight"
        >
          Funding Your <span className="text-blue-600">Future</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Navigate global education funding with precision. Our AI-driven engine maps your academic pedigree to thousands of active grants, ensuring your talent is never limited by resources.
        </motion.p>
      </div>

      {/* AI Matcher Widget (Glassmorphism) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 border-y border-slate-100/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-600 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-6 block font-heading">AI Synthesis Engine</span>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-8 tracking-tight">Identify Your <span className="text-blue-600">Perfect Protocol</span></h2>
              <p className="text-lg text-slate-500 mb-12 font-medium leading-relaxed italic">"Our proprietary neural network analyzes your academic DNA against high-fidelity requirements to find absolute matches with 99.8% precision."</p>
              
              <div className="space-y-6">
                <div className="flex gap-6 p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-blue-100/50 hover:border-blue-600/30 transition-all group">
                  <div className="w-16 h-16 bg-blue-600 text-slate-900 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-slate-900 mb-2 text-2xl tracking-tight">Absolute Accuracy</h4>
                    <p className="text-base text-slate-500 font-medium">Precision matching based on dynamic eligibility fine-print and institutional overrides.</p>
                  </div>
                </div>
                <div className="flex gap-6 p-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-blue-100/50 hover:border-blue-600/30 transition-all group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 shadow-sm group-hover:-rotate-6 transition-transform">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-slate-900 mb-2 text-2xl tracking-tight">Real-time Directives</h4>
                    <p className="text-base text-slate-500 font-medium">Live sync with global university portals for expiring opportunities and flash grants.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card bg-white p-12 rounded-[3.5rem] shadow-3xl border-blue-50/50"
            >
              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 mb-4 uppercase tracking-[0.2em] font-heading ml-1">Performance Index (GPA)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["3.0 - 3.4", "3.5 - 3.7", "3.8 - 3.9", "4.0+"].map((gpa) => (
                      <button 
                        key={gpa}
                        className={`py-4 px-2 rounded-2xl text-xs font-extrabold transition-all border ${gpa === "3.8 - 3.9" ? 'bg-blue-600 text-slate-900 border-blue-600 shadow-xl shadow-blue-600/20' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-blue-600/30 hover:text-blue-600'}`}
                      >
                        {gpa}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 mb-4 uppercase tracking-[0.2em] font-heading ml-1">Geographic Domain</label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none appearance-none cursor-pointer text-lg">
                      <option>Select Region</option>
                      <option defaultValue="India">India (Global Tier)</option>
                      <option>European Union</option>
                      <option>North America</option>
                      <option>APAC</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 mb-4 uppercase tracking-[0.2em] font-heading ml-1">Academic Level</label>
                  <div className="flex gap-4">
                    <button className="flex-1 py-5 border border-slate-200 bg-slate-50 rounded-2xl font-extrabold text-slate-500 hover:border-blue-600/30 transition-all">Undergraduate</button>
                    <button className="flex-1 py-5 bg-slate-900 text-slate-900 rounded-2xl font-extrabold shadow-2xl hover:bg-slate-800 transition-all">Postgraduate</button>
                  </div>
                </div>
                <button className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-slate-900 rounded-[2rem] font-heading font-extrabold text-xl flex items-center justify-center gap-4 shadow-3xl shadow-blue-600/40 transition-all hover:scale-[1.03] active:scale-95 group">
                  <Activity className="w-6 h-6 group-hover:rotate-12 transition-transform" /> Synthesize Match List
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...fadeInUp}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-black mb-4">Explore by Category</h2>
              <p className="text-slate-600 font-medium text-lg">Whatever your talent or background, there's a funding source tailored to you.</p>
            </div>
            <a className="text-blue-600 font-bold flex items-center gap-1 group hover:underline" href="#">
              View All Categories
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {[
              { icon: Award, title: "Merit", bg: "bg-blue-50", color: "text-blue-600" },
              { icon: Heart, title: "Need", bg: "bg-slate-50", color: "text-black" },
              { icon: Microscope, title: "Research", bg: "bg-blue-50", color: "text-blue-600" },
              { icon: Trophy, title: "Sports", bg: "bg-slate-50", color: "text-black" },
              { icon: Globe, title: "International", bg: "bg-blue-50", color: "text-blue-600" }
            ].map((cat, i) => (
              <motion.div 
                variants={fadeInUp}
                key={i} 
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all text-center group cursor-pointer hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-black text-lg">{cat.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curated Listings (Luxury Cards) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-blue-600 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">Handpicked Protocol</span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">Trending Opportunities</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">High-capital grants closing this academic window with optimized acceptance corridors for elite profiles.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {[
              { title: "Global Excellence Award", univ: "Univ. of British Columbia • Canada", amount: "$65,000", tag: "Full Tuition", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80", match: "98%" },
              { title: "Tech Leaders Fellowship", univ: "Stanford Engineering • USA", amount: "$25,000", tag: "Partial Aid", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", match: "92%" },
              { title: "Chevening Grant", univ: "Government of UK • UK", amount: "Full Ride", tag: "Premium Grant", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", match: "85%" }
            ].map((item, i) => (
              <motion.div variants={fadeInUp} key={i} className="glass-card group bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-blue-600/10 transition-all duration-700 hover:-translate-y-4">
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src={item.img} alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-6 left-6 bg-blue-600 text-slate-900 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest shadow-2xl backdrop-blur-md">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20">
                      <div className="text-[8px] text-blue-400 font-extrabold uppercase tracking-widest mb-0.5">Synthesis Score</div>
                      <div className="text-slate-900 font-heading font-extrabold text-lg">{item.match}</div>
                    </div>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="font-heading font-extrabold text-2xl mb-2 text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-xs font-extrabold tracking-widest uppercase mb-8">{item.univ}</p>
                  <div className="flex items-center justify-between py-6 border-y border-slate-50 mb-8">
                    <div>
                      <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-2">Quantifiable Value</div>
                      <div className="text-slate-900 font-heading font-extrabold text-3xl tracking-tight">{item.amount}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-2">Window</div>
                      <div className="text-blue-600 font-extrabold text-sm uppercase tracking-wide flex items-center gap-1"><Zap className="w-4 h-4" /> Closing Soon</div>
                    </div>
                  </div>
                  <button className="w-full py-5 bg-slate-50 hover:bg-blue-600 text-slate-900 font-extrabold rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 group/btn">
                    Secure Protocol <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expert Guidance (Dark Premium) */}
      <section className="py-40 bg-slate-50 text-slate-900 relative overflow-hidden mt-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="max-w-3xl mb-24">
            <span className="text-blue-400 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-6 block">Strategic Support</span>
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-8 tracking-tight leading-tight">Securing the Win</h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">Discovery is merely the origin. Our strategic consultants navigate you through the high-stakes narrative and compliance hurdles at every node.</p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { icon: PenTool, title: "Narrative Strategy", text: "Crafting personal statements that resonate with institutional mandates. Aligning your trajectory with donor values." },
              { icon: ShieldCheck, title: "Compliance Audit", text: "Zero-error submissions. We rigorousuly verify transcripts and financial credentials for absolute adherence." },
              { icon: Target, title: "Selection Ops", text: "Mock sessions with former board adjudicators to build confidence and polish your response architecture." }
            ].map((step, i) => (
              <motion.div variants={fadeInUp} key={i} className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-blue-600 text-slate-900 rounded-2xl flex items-center justify-center mb-10 shadow-3xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl mb-6 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed opacity-80">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Global Network (Luxury Interactive) */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[4rem] p-12 md:p-20 shadow-3xl border border-slate-100 flex flex-col lg:flex-row items-center gap-24 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
            <div className="lg:w-1/2 relative z-10">
              <span className="inline-block px-5 py-2 rounded-2xl bg-blue-50 text-blue-600 font-extrabold text-[10px] uppercase mb-10 tracking-[0.2em] border border-blue-100">Global Reach</span>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 mb-8 tracking-tight">Institutional <span className="text-blue-600">Diplomacy</span></h2>
              <p className="text-slate-500 font-medium mb-12 text-xl leading-relaxed">Through Admission Master, access exclusive institutional tiers previously closed to independent applicants. Our network spans 150+ top-tier global academies.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Direct Liaisons", text: "Verified channels" },
                  { title: "Waiver Access", text: "Zero filing fees" },
                  { title: "Priority Review", text: "Fast-track status" },
                  { title: "Spot Admissions", text: "Instant adjudications" }
                ].map((perk, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-blue-600 rounded-lg p-1 mt-1">
                      <CheckCircle2 className="text-slate-900 w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-lg tracking-tight">{perk.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{perk.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative w-full group">
              <div className="aspect-square bg-slate-50 rounded-[4rem] overflow-hidden border border-slate-100 relative shadow-2xl">
                <img className="w-full h-full object-cover grayscale opacity-20" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 bg-blue-600/10 rounded-full animate-ping absolute -top-12 -left-12"></div>
                    <div className="w-24 h-24 bg-slate-50 text-slate-900 rounded-[2rem] flex items-center justify-center shadow-3xl shadow-blue-600/20 relative z-10 group-hover:scale-110 transition-transform duration-500">
                      <Map className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-3xl border border-slate-50 flex items-center gap-6"
              >
                <div className="flex -space-x-5">
                  {[1, 2, 3].map((s) => (
                    <img key={s} className="w-16 h-16 rounded-full border-[4px] border-white object-cover shadow-lg" src={`https://i.pravatar.cc/150?u=student${s}`} alt="Student" />
                  ))}
                </div>
                <div className="text-lg font-extrabold text-slate-900 leading-tight">1.2k+ Students<br/><span className="text-blue-600">Funded Globally</span></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories (Luxury Bento) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">Legacy of Success</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">Proof of concept. Meet the students who utilized our protocol to redefine their academic destinies.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            {[
              { name: "Priya Sharma", univ: "MSc Data Science • Edinburgh", quote: "The AI Matcher identified a niche grant that bypassed standard portals. With Admission Master's narrative review, I secured absolute funding.", award: "$42,000", badge: "EDINBURGH UNIV.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
              { name: "James Wilson", univ: "MBA • INSEAD Business School", quote: "I required a strategy that emphasized leadership over standard metrics. The personalized audit was surgical. Total life-shift.", award: "$30,000", badge: "INSEAD", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" }
            ].map((story, i) => (
              <motion.div variants={fadeInUp} key={i} className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-2xl hover:shadow-blue-600/10 transition-all relative group overflow-hidden">
                <Quote className="w-32 h-32 text-slate-50 absolute -top-12 -right-12 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="relative">
                    <img className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-lg" src={story.img} alt={story.name} />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-slate-900 p-2 rounded-lg shadow-lg">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-slate-900 text-2xl tracking-tight">{story.name}</h4>
                    <p className="text-sm font-extrabold text-blue-600 uppercase tracking-widest mt-1">{story.univ}</p>
                  </div>
                </div>
                <p className="text-xl font-medium italic text-slate-700 leading-relaxed mb-10 relative z-10">"{story.quote}"</p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-10 relative z-10">
                  <div className="px-6 py-2.5 rounded-2xl bg-blue-600 text-slate-900 text-[10px] font-extrabold uppercase tracking-widest shadow-xl shadow-blue-600/20">Awarded {story.award}</div>
                  <span className="font-extrabold text-slate-300 tracking-[0.2em] text-xs transition-colors group-hover:text-slate-900">{story.badge}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ (Modern Accordion) */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <span className="text-blue-600 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-4 block">Knowledge Base</span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">Intelligence Briefing</h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              "When is the optimal entry point for applications?",
              "Can I execute multiple scholarship protocols simultaneously?",
              "Does the AI factor in institutional specificities?",
              "What is the average yield on an expert narrative review?"
            ].map((q, i) => (
              <motion.div variants={fadeInUp} key={i} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:bg-white hover:border-blue-600/30 transition-all cursor-pointer group shadow-sm hover:shadow-2xl">
                <button className="w-full flex justify-between items-center text-left">
                  <span className="font-extrabold text-slate-900 text-xl group-hover:text-blue-600 transition-colors tracking-tight">{q}</span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-slate-900 transition-all shadow-sm">
                    <ChevronDown className="w-5 h-5 transition-transform group-hover:rotate-180" />
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
