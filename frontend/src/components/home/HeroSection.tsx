"use client";

import React, { useState } from "react";
import { Search, GraduationCap, MapPin, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const { setResults, setLoading, setError, setPagination, isLoading } = useStore();
  
  const [rank, setRank] = useState("");
  const [exam, setExam] = useState("NEET UG");
  const [category, setCategory] = useState("General");

  const handlePredict = async () => {
    if (!rank) return alert("Please enter your rank");

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictor/predict?exam=${exam}&rank=${rank}&category=${category}`);
      const data = await response.json();
      
      if (response.ok) {
        setResults(data.data);
        setPagination({
          totalResults: data.pagination.totalResults,
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages
        });
        router.push(`/colleges?exam=${exam}&rank=${rank}&category=${category}`); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full" suppressHydrationWarning>
      {/* Full-width Image Banner */}
      <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
        <Image 
          src="https://dfhe5ze0n4pxu.cloudfront.net/Sliders/Slider-Banner-1768037723948.webp" 
          fill
          className="object-cover" 
          alt="Hero Banner"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        {/* Hero Content on top of image */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-full border border-green-500/20 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest">Trusted by 50,000+ Students</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight">
            Find Your Dream College
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl font-medium">
            India's most accurate college predictor for NEET, JEE & CUET.
          </p>
          
         <div className="flex gap-5">
           <button 
            onClick={() => router.push('/predictor')}
            className="mt-10 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-100 cursor-pointer transition-all shadow-2xl flex items-center gap-2 active:scale-95 group"
          >
            Predict Your College
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button><button 
            onClick={() => router.push('/colleges')}
            className="mt-10 px-8 py-4 border border-2 text-white  border-white text-slate-900 rounded-xl font-bold text-lg  cursor-pointer transition-all shadow-2xl flex items-center gap-2 active:scale-95 group"
          >
            Find Your College
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
         </div>
        </div>
      </div>
    </section>
  );
}
