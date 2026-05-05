"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { 
    name: "Rahul Sharma", 
    college: "AIIMS Delhi", 
    exam: "NEET UG", 
    rank: "Rank 450",
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
    text: "The AI predictor was 99% accurate! It helped me stay focused on AIIMS when others were doubtful. The personalized suggestions were a lifesaver.",
    stars: 5
  },
  { 
    name: "Priya Verma", 
    college: "IIT Bombay", 
    exam: "JEE Mains", 
    rank: "Rank 1,200",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    text: "The VIP counselling was a lifesaver during the choice filling rounds. I got exactly the branch I wanted. Highly recommended for every serious aspirant.",
    stars: 5
  },
  { 
    name: "Arjun Iyer", 
    college: "SRCC Delhi", 
    exam: "CUET", 
    rank: "Rank 98",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    text: "Clean, simple and fast. Got exactly the college I wanted without any stress. The placement trends analysis was extremely helpful for my decision.",
    stars: 5
  },
  { 
    name: "Ananya Das", 
    college: "IIM Ahmedabad", 
    exam: "CAT", 
    rank: "99.8 Percentile",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    text: "The comparison tool is brilliant. Comparing ROI and placements between top IIMs helped me make an informed choice for my MBA journey.",
    stars: 4
  }
];

export default function Testimonials() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3 block">Real Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Loved by 50,000+ <span className="text-blue-600">Students</span>
          </h2>
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => scroll("left")} className="p-3 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll("right")} className="p-3 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
          >
            <div className="h-full p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 relative mt-8">
              {/* Overlapping Avatar */}
              <div className="absolute -top-8 left-8 w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <img src={t.img} className="w-full h-full object-cover" alt={t.name} />
              </div>

              <div className="pt-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star 
                      key={starIdx} 
                      size={14} 
                      className={starIdx < t.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
                    />
                  ))}
                </div>

                <p className="text-gray-600 font-medium leading-relaxed mb-6 italic min-h-[80px]">
                  &quot;{t.text}&quot;
                </p>

                <div className="border-t border-gray-50 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{t.name}</h4>
                  <p className="text-blue-600 font-bold text-[11px] uppercase tracking-wider mb-2">
                    Admitted to {t.college}
                  </p>
                  <div className="inline-flex px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {t.exam} · {t.rank}
                  </div>
                </div>

                <div className="absolute top-8 right-8 opacity-[0.1]">
                   <Quote size={40} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
