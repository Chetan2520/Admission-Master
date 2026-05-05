"use client";

import React from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function BannerStrip() {
  return (
    <div className="bg-blue-600 py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 text-white font-bold text-sm uppercase tracking-[0.2em]">
            <Zap size={16} className="fill-white" />
            30% OFF ON VIP CAREER COUNSELLING
            <Link href="/register" className="bg-white text-blue-600 px-3 py-1 rounded text-[10px] font-black">CLAIM NOW</Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
