"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight,
  Mail,
  Lock
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "counsellor" | "admin">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "student") router.push("/user");
    if (role === "counsellor") router.push("/counsellor");
    if (role === "admin") router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-8 left-8"
      >
       
      </motion.div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-100"
      >
        
        {/* Left Side - Image/Info with Ads */}
        <div className="w-full md:w-5/12 bg-black text-white p-10 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Background Image & Overlay */}
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Campus Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
          
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block shadow-lg">Admissions 2025</span>
            <h2 className="text-4xl font-bold mb-3 leading-tight">Welcome Back.</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">Log in to access your personalized dashboard, track applications, and secure your seat.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 w-full overflow-hidden mt-6 mb-6 flex-grow flex flex-col"
          >
             <style dangerouslySetInnerHTML={{__html: `
               @keyframes scroll-up {
                 0% { transform: translateY(0); }
                 100% { transform: translateY(-50%); }
               }
               .animate-scroll-up { animation: scroll-up 20s linear infinite; }
               .animate-scroll-up:hover { animation-play-state: paused; }
             `}} />
             <div className="flex items-center gap-2 mb-3">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
             </div>
             
             {/* Vertical Marquee Ads */}
             <div className="flex-grow relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 w-full h-[200px]">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none rounded-t-2xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none rounded-b-2xl"></div>
                
                <div className="animate-scroll-up flex flex-col gap-3 pb-3">
                  {[1, 2].map((group) => (
                    <div key={group} className="flex flex-col gap-3">
                      {[
                        { title: "VIT Admissions Open", desc: "Apply now for B.Tech programs.", tag: "Featured", color: "bg-blue-600 text-white" },
                        { title: "SRM Placement Drive", desc: "Highest package 50 LPA recorded.", tag: "News", color: "bg-blue-600 text-white" },
                        { title: "NEET UG 2025 Updates", desc: "Check revised syllabus pattern.", tag: "Alert", color: "bg-blue-600 text-white" },
                        { title: "BITS Pilani Direct", desc: "Board toppers direct admission.", tag: "Premium", color: "bg-blue-600 text-white" },
                        { title: "Manipal Entrance", desc: "Slot booking started today.", tag: "Deadline", color: "bg-blue-600 text-white" }
                      ].map((ad, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                           <div className="flex justify-between items-start mb-1.5">
                             <h4 className="font-bold text-sm text-white leading-tight pr-2">{ad.title}</h4>
                             <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${ad.color}`}>{ad.tag}</span>
                           </div>
                           <p className="text-xs text-slate-400 leading-tight">{ad.desc}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 border-t border-white/10 pt-6 mt-auto"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-black" />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-white">Join 50,000+ Users</p>
                <p className="text-xs text-blue-400">Successfully placed in top colleges</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto w-full"
          >
            <h3 className="text-3xl font-bold text-black mb-2">Sign In</h3>
            <p className="text-slate-500 mb-8">Select your role and enter your credentials.</p>

            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { id: "student", label: "Student", icon: GraduationCap },
                { id: "counsellor", label: "Counsellor", icon: Briefcase },
                { id: "admin", label: "Admin", icon: ShieldCheck },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as any)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                    role === r.id 
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" 
                      : "border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <r.icon className={`w-6 h-6 mb-2 ${role === r.id ? "text-blue-600" : "text-slate-400"}`} />
                  <span className="text-xs font-bold">{r.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-black">Password</label>
                  <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</a>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-medium"
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-black hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group mt-4"
              >
                Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don't have an account? <a href="#" className="font-bold text-blue-600 hover:text-blue-700">Sign up here</a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
