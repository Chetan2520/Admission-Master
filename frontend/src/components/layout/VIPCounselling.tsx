"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, PhoneCall, ArrowRight } from "lucide-react";

export default function VIPCounselling() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#3b82f620_0%,transparent_70%)] blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 backdrop-blur-2xl p-12 md:p-20 rounded-[3rem] text-center space-y-10 relative overflow-hidden"
        >
          {/* Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />

          <div className="space-y-6 max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Premium Mentorship</span>
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-tight">
               Need <span className="text-blue-500">Expert</span> Guidance?
             </h2>
             <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
               Connect with India’s top admission mentors and maximize your chances of getting into your dream institution with personalized strategy.
             </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
             <motion.button 
               whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
               whileTap={{ scale: 0.95 }}
               className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all"
             >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
               whileTap={{ scale: 0.95 }}
               className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all"
             >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                Talk to Expert
             </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
