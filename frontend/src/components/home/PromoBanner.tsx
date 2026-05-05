"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="relative rounded-[3rem] overflow-hidden bg-blue-900 p-12 md:p-24 flex flex-col md:flex-row items-center gap-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400" 
            className="w-full h-full object-cover opacity-20" 
            alt="Scholarship Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/80 to-transparent" />
        </div>

        <div className="relative z-10 flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            Admission Master Institute
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-none mb-8">
            Scholarship Up To <span className="text-blue-500">100%</span>
          </h2>
          <p className="text-xl text-blue-100/60 font-medium mb-12 max-w-xl">
            Don't let financial constraints stop you from your dream career. Apply for our nationwide scholarship test today.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/scholarship" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-900 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link href="/scholarship-details" className="text-white font-bold text-sm uppercase tracking-widest hover:underline">
              View Eligibility
            </Link>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block w-1/3">
           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">1</div>
                 <p className="text-white font-bold uppercase tracking-widest text-xs">Register for Test</p>
              </div>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">2</div>
                 <p className="text-white font-bold uppercase tracking-widest text-xs">Attempt Online</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl">3</div>
                 <p className="text-white font-bold uppercase tracking-widest text-xs">Get Scholarship</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
