"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Mail, Phone, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#02040a] pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[150px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Admission <span className="text-blue-500">Expert</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
              India’s most advanced college admission predictor and counselling platform. Helping students find their perfect academic match since 2021.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Explore</h4>
            <div className="flex flex-col gap-4">
              {["Top Colleges", "Latest News", "Counselling", "Scholarships", "About Us"].map((link) => (
                <Link key={link} href="#" className="text-sm font-bold text-slate-500 hover:text-blue-400 transition-colors">{link}</Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Predictors</h4>
            <div className="flex flex-col gap-4">
              {["JEE Main", "NEET UG", "CUET", "CAT Predictor", "CLAT Predictor"].map((link) => (
                <Link key={link} href="#" className="text-sm font-bold text-slate-500 hover:text-blue-400 transition-colors">{link}</Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Support</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-sm font-bold text-slate-500 leading-relaxed">Noida, Uttar Pradesh, India</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <p className="text-sm font-bold text-slate-500">contact@admissionexpert.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <p className="text-sm font-bold text-slate-500">+91 99999 00000</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black text-slate-600 uppercase tracking-widest">
           <p>© 2026 Admission Expert. All rights reserved.</p>
           <div className="flex items-center gap-8">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
