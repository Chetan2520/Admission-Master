"use client";

import React from "react";
import { Award, ShieldCheck, Users, Target, Rocket } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              We Are <span className="text-blue-600">Admission Expert.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl leading-relaxed">
              Empowering students with data-driven insights and expert guidance to secure their future in India's premier educational institutions.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-4xl font-black text-slate-900">50K+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Students Helped</p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900">1.2K+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Institutions</p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900">15+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Years Experience</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-xs -rotate-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <p className="font-bold text-slate-900">100% Verified Data</p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Every piece of information on our platform is cross-verified with official government records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-black mb-4 uppercase tracking-widest">Our Mission</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">To democratize access to high-quality education by providing transparent, accurate, and accessible admission information.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { title: "Transparency", icon: ShieldCheck, desc: "Total clarity in admission process and data." },
            { title: "Accuracy", icon: Target, desc: "99.9% precise cut-off predictions." },
            { title: "Expertise", icon: Award, desc: "Decades of experience in academic counseling." },
            { title: "Innovation", icon: Rocket, desc: "AI-powered matching for students." }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-500">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
