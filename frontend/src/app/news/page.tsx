"use client";

import React from "react";
import { Newspaper, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function NewsPage() {
  const news = [
    {
      title: "NEET UG 2024 Cut-off Expected to Rise",
      date: "May 10, 2024",
      category: "Medical",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      excerpt: "Experts suggest a significant increase in the qualifying marks for NEET UG this year due to the increased number of applicants."
    },
    {
      title: "JEE Advanced Registration Opens Tomorrow",
      date: "May 08, 2024",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",
      excerpt: "Top 2.5 lakh qualifiers of JEE Main can now register for the Advanced examination through the official portal."
    },
    {
      title: "CUET 2024: New Exam Centers Added",
      date: "May 05, 2024",
      category: "General",
      image: "https://images.unsplash.com/photo-1523050335392-9bc5675e7753?q=80&w=2070&auto=format&fit=crop",
      excerpt: "NTA has announced 50 new exam centers across India to accommodate the record-breaking number of CUET applicants."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Admission <span className="text-blue-600">News & Alerts</span></h1>
            <p className="text-slate-500 text-lg font-medium">Stay updated with the latest happenings in the world of Indian education and admissions.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
            <TrendingUp size={14} /> Live Updates
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <div key={i} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
              <div className="relative h-60 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">
                  <Calendar size={14} /> {item.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed line-clamp-3">{item.excerpt}</p>
                <button className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest group/btn">
                  Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
