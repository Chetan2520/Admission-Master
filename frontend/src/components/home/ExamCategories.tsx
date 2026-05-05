"use client";

import React from "react";
import { Stethoscope, Cpu, GraduationCap, Briefcase, MoveRight } from "lucide-react";
import Link from "next/link";

const exams = [
  {
    name: "Medical",
    info: "1.8L+ seats available",
    image: "/doctor.png",
    link: "/exams/neet-ug"
  },
  {
    name: "Engineering",
    info: "1.2L+ seats available",
    image: "/engineering.png",
    link: "/exams/jee"
  },
  {
    name: "Law",
    info: "2.5L+ seats available",
    image: "/law.png",
    link: "/exams/law"
  },
  {
    name: "Management",
    info: "40K+ seats available",
    image: "/mba.png",
    link: "/exams/cat"
  }
];

export default function ExamCategories() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Explore by <span className="text-blue-600">Category</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">Discover your path across various specialized fields</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {exams.map((exam, i) => (
          <Link 
            key={i} 
            href={exam.link}
            className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <img 
              src={exam.image} 
              alt={exam.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              
              
              <h3 className="text-2xl font-bold text-white mb-0">
                {exam.name}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-sm font-medium">
                  {exam.info}
                </span>
                <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
