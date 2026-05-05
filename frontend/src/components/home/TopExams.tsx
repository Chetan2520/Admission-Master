"use client";

import React, { useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Building2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const examsData = [
  {
    name: "JEE Main",
    mode: "Online Exam",
    logo: "/jee.jpeg",
    colleges: "1977",
    date: "April 02, 2026",
    level: "National",
    color: "bg-orange-500",
  },
  {
    name: "JEE Advanced",
    mode: "Online Exam",
    logo: "/jee.jpeg",
    colleges: "68",
    date: "May 17, 2026",
    level: "National",
    color: "bg-blue-600",
  },
  {
    name: "CUET",
    mode: "Offline Exam",
    logo: "https://tse1.mm.bing.net/th/id/OIP.h0LVp05iEuHjL6NjJQG0FQHaD0?pid=Api&rs=1&c=1&qlt=95&w=186&h=95",
    colleges: "111",
    date: "May 11, 2026",
    level: "National",
    color: "bg-green-600",
  },
  {
    name: "NEET",
    mode: "Offline Exam",
    logo: "https://tse4.mm.bing.net/th/id/OIP.WDQdUfUfZWzPloYCn8BLxAAAAA?pid=Api&P=0&h=180",
    colleges: "320",
    date: "May 12, 2026",
    level: "State",
    color: "bg-purple-600",
  },
  {
    name: "BITSAT",
    mode: "Online Exam",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/220px-BITS_Pilani-Logo.svg.png",
    colleges: "3",
    date: "May 22, 2026",
    level: "National",
    color: "bg-red-600",
  },
];

export default function TopExams() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentIndex < examsData.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="py-10 px-6 max-w-[1400px] mx-auto" suppressHydrationWarning>
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        {/* Refined Text-Only Left Side */}
        <div className="w-full lg:w-[350px] flex flex-col justify-center py-10 pr-6 border-r border-gray-100">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Live Updates
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Top Entrance <br />
              <span className="text-blue-600">Exams 2026</span>
            </h2>

            <p className="text-gray-500 text-lg font-medium mt-6 leading-relaxed">
              Complete guide to dates, eligibility, and participating colleges
              for India's premier entrance tests.
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= examsData.length - 3}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Right Side Slider */}
        <div className="flex-1 overflow-hidden py-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {examsData.map((exam, i) => (
              <div
                key={i}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white h-full rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                  {/* Card Header Info */}
                  <div className="p-6 flex items-start justify-between border-b border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl border border-gray-100 p-2 flex items-center justify-center bg-white shadow-sm group">
                        <Image
                          src={exam.logo}
                          alt={exam.name}
                          width={64}
                          height={64}
                          className="object-contain transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <div className="px-2 py-0.5 bg-blue-50 text-[10px] font-bold text-blue-600 rounded uppercase tracking-widest inline-block mb-1">
                          {exam.mode}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 leading-none">
                          {exam.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="p-7 space-y-5 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <Building2 size={18} className="text-gray-300" />
                        Participating Colleges
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {exam.colleges}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <Calendar size={18} className="text-gray-300" />
                        Exam Date
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {exam.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <MapPin size={18} className="text-gray-300" />
                        Exam Level
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {exam.level}
                      </span>
                    </div>
                  </div>

                  {/* Links Section */}
                  <div className="mt-auto p-3">
                    <Link
                      href="#"
                      className="flex items-center justify-between p-4 px-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-sm font-bold text-gray-800">
                        Application Process
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center justify-between p-4 px-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-sm font-bold text-gray-800">
                        Exam Info
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
