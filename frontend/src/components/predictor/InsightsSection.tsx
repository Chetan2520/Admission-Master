"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { Sparkles, TrendingUp, Target, CreditCard, ShieldCheck } from "lucide-react";

const data = [
  { name: "2021", cutoff: 45000 },
  { name: "2022", cutoff: 52000 },
  { name: "2023", cutoff: 48000 },
  { name: "2024", cutoff: 55000 },
  { name: "2025", cutoff: 61000 },
];

export default function InsightsSection() {
  return (
    <section className="space-y-12 py-20">
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">AI Recommendation Engine</span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Advanced <span className="text-blue-500">AI Insights</span></h2>
           <p className="text-slate-400 text-lg max-w-2xl">Deep-dive into historical trends, cutoff analysis, and neural-modeled seat availability across all premium institutions.</p>
        </div>
      </div>

      {/* Grid of Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cutoff Trend Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-bold text-white tracking-tight">Historical Cutoff Trends</h3>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Based on JEE Main / NEET Data</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                 <TrendingUp className="w-3 h-3" />
                 Rising Trend
              </div>
           </div>

           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCutoff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                    itemStyle={{ color: "#3b82f6" }}
                  />
                  <Area type="monotone" dataKey="cutoff" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCutoff)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* AI Recommendation Cards */}
        <div className="space-y-6">
           {[
             { label: "Best Affordable", title: "NIT Trichy", icon: CreditCard, color: "text-blue-400", bg: "bg-blue-400/10" },
             { label: "Highest Placement", title: "IIT Bombay", icon: Target, color: "text-purple-400", bg: "bg-purple-400/10" },
             { label: "Safest Option", title: "VIT Vellore", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
           ].map((card, idx) => (
             <motion.div 
               key={idx}
               whileHover={{ x: 10 }}
               className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center gap-6 group hover:border-white/20 transition-all cursor-default"
             >
                <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                   <card.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{card.label}</p>
                   <h4 className="text-xl font-bold text-white tracking-tight">{card.title}</h4>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
