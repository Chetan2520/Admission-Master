"use client";

import React, { useRef } from "react";
import { Landmark, Building2, Building, School, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const cities = [
  { name: "Delhi NCR", image: "/cities/New Delhi.svg" },
  { name: "Bangalore", image: "/cities/Bangalore.svg" },
  { name: "Hyderabad", image: "/cities/Hyderabad.svg" },
  { name: "Pune", image: "/cities/Pune.svg" },
  { name: "Mumbai", image: "/cities/Mumbai.svg" },
  { name: "Chennai", image: "/cities/Chennai.svg" },
  { name: "Kolkata", image: "/cities/Kolkata.svg" },
  { name: "Indore", image: "/cities/Indore.svg" },
  { name: "Jaipur", image: "/cities/Jaipur.svg" },
  { name: "Lucknow", image: "/cities/Lucknow.svg" },
  { name: "Ahmedabad", image: "/cities/Mumbai.svg" },
  { name: "Chandigarh", image: "/cities/New Delhi.svg" },
  { name: "Patna", image: "/cities/Kolkata.svg" },
  { name: "Bhopal", image: "/cities/Indore.svg" },
  { name: "Kochi", image: "/cities/Chennai.svg" },
  { name: "Nagpur", image: "/cities/Pune.svg" },
];

export default function TopStudyPlaces() {
  return (
    <section className="py-1 md:py-3 px-6 max-w-7xl mx-auto bg-white" suppressHydrationWarning>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Top Study Places
        </h2>
      </div>

      {/* Grid Layout: 2 Rows, 8 Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-y-8 gap-x-4 md:gap-x-6">
        {cities.map((city, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* White Box Container - Slightly Smaller for 8-col layout */}
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white border border-gray-200 rounded-2xl shadow-sm group-hover:shadow-md group-hover:border-blue-400 transition-all duration-300 p-3 md:p-5 flex items-center justify-center mb-2">
              <Image 
                src={city.image} 
                alt={city.name}
                width={80}
                height={80}
                className="object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* City Name */}
            <h3 className="text-[11px] md:text-xs font-bold text-gray-700 text-center group-hover:text-blue-600 transition-colors leading-tight px-1">
              {city.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
