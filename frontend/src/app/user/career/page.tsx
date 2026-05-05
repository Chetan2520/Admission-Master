"use client";

import { Brain, Compass, HelpCircle, Lock, Cpu, Clock, ArrowRight, Bookmark, Send, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CareerIntelligencePage() {
  const [activeTab, setActiveTab] = useState("Psychometric");

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1 }
  };

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/20">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-black mb-1">AI Career Intelligence</h1>
          <p className="text-slate-500 font-medium">Discover your perfect career path with AI-powered insights</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex bg-white rounded-2xl border border-slate-200 p-2 overflow-x-auto hidden-scrollbar shadow-sm"
      >
        <button 
          onClick={() => setActiveTab("Psychometric")}
          className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'Psychometric' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <Brain className="w-4 h-4" /> Psychometric Test
        </button>
        <button className="text-slate-400 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-not-allowed">
          <Compass className="w-4 h-4" /> Interest Mapping <Lock className="w-3 h-3 ml-1" />
        </button>
        <button className="text-slate-400 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg> 
          Stream Recommendation <Lock className="w-3 h-3 ml-1" />
        </button>
        <button className="text-slate-400 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-not-allowed">
          Career Roadmap <Lock className="w-3 h-3 ml-1" />
        </button>
        <button 
          onClick={() => setActiveTab("AI")}
          className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'AI' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <Cpu className="w-4 h-4" /> AI Counsellor
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === "Psychometric" && (
          <motion.div 
            key="psychometric"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-black">Question 1 of 20</span>
              <span className="text-sm font-bold text-blue-600">5% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mb-10 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "5%" }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>

            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold mb-6">
                <Bookmark className="w-3.5 h-3.5" /> Analytical Skills
              </span>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">I enjoy solving complex mathematical problems and puzzles</h2>
                <p className="text-slate-500 text-sm font-medium">Select the option that best describes you</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { id: 1, label: "Strongly Disagree" },
                { id: 2, label: "Disagree" },
                { id: 3, label: "Neutral" },
                { id: 4, label: "Agree" },
                { id: 5, label: "Strongly Agree" },
              ].map((option) => (
                <button key={option.id} className="w-full bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 p-5 rounded-2xl flex items-center justify-between transition-all group shadow-sm">
                  <div className="flex items-center gap-6">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {option.id}
                    </span>
                    <span className="font-bold text-slate-700 group-hover:text-black">{option.label}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "AI" && (
          <motion.div 
            key="ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Cpu className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">AI Career Counsellor</h2>
              <p className="text-slate-500 text-sm font-medium max-w-md mx-auto">Get instant answers about exams, colleges, counselling, and career planning</p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden flex flex-col mb-8 shadow-sm" style={{ height: '600px' }}>
              {/* Chat Messages Area */}
              <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
                <div className="flex items-start gap-4 max-w-[85%]">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">Hello! I am your AI Career Counsellor. I can help you with exam guidance, college selection, career planning, and admission strategies. How can I assist you today?</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold">11:59 AM</p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-slate-200 p-4">
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-500 mb-3 ml-1 uppercase tracking-widest">Quick Questions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: HelpCircle, text: "Tell me about NEET", color: "text-blue-600" },
                      { icon: HelpCircle, text: "JEE Main Information", color: "text-blue-600" },
                      { icon: HelpCircle, text: "Counselling process", color: "text-blue-600" },
                      { icon: HelpCircle, text: "Scholarship options", color: "text-blue-600" },
                    ].map((q, i) => (
                      <button key={i} className="flex items-center gap-2 border border-slate-200 p-2.5 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all text-left group">
                        <q.icon className={`w-4 h-4 ${q.color} flex-shrink-0 group-hover:scale-110 transition-transform`} />
                        <span className="text-xs font-bold text-slate-600 group-hover:text-blue-700 truncate">{q.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask me anything..." 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  />
                  <button className="bg-black hover:bg-slate-800 text-white p-3.5 rounded-xl transition-all shadow-md flex-shrink-0 active:scale-95">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { icon: ShieldCheck, title: "Official Data", text: "Trained on official sources" },
                { icon: Clock, title: "24/7 Available", text: "Instant answers anytime" },
                { icon: Zap, title: "AI-Powered", text: "Smart recommendations" }
              ].map((item, i) => (
                <motion.div variants={fadeInUp} key={i} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-black text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
