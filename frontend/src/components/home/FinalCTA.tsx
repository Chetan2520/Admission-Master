"use client";

import React from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="bg-[#0B1120] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden border border-white/5 shadow-2xl">
        {/* Background Graphic Image */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden lg:block  ">
          <img 
            src="/ready.png" 
            alt="Ready" 
            className="w-full h-full object-contain object-right-bottom"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-white rounded-full border border-blue-500/20 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest">Free for all students</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Ready to Secure <br /> Your <span className="text-blue-500 text-shadow-glow">Future?</span>
          </h2>
          
          <p className="text-lg text-gray-400 font-medium mb-10 leading-relaxed">
            Join thousands of students who have already found their perfect college. <br className="hidden md:block" />
            Start your free prediction today and get instant results.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 group">
              Start Prediction Now 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/book-call" className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2 active:scale-95">
              <PhoneCall size={18} /> Book Free Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
