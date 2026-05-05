"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ImageBannerProps {
  image: string;
  heading: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
}

export default function ImageBanner({ image, heading, subtext, ctaText, ctaLink }: ImageBannerProps) {
  return (
    <section className="relative h-[300px] flex items-center overflow-hidden w-full my-4">
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          className="w-full h-full object-cover" 
          alt="Banner background"
        />
        {/* <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-[2px]" /> */}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col    justify-between gap-8">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-blue-950 text-2xl md:text-3xl font-bold mb-3 leading-tight">{heading}</h2>
          <p className="text-blue-950/70 text-base font-medium">{subtext}</p>
            <Link 
          href={ctaLink} 
          className="px-8 py-3 mt-4 bg-blue-950  text-white rounded-lg text-sm font-bold    w-40  tracking-widest   transition-all flex items-center gap-2 shadow-lg"
        >
          {ctaText}  
        </Link>
        </div>
      
      </div>
    </section>
  );
}
