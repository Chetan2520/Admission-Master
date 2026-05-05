"use client";

import { 
  FileText, 
  Building2, 
  Award, 
  CalendarDays, 
  Search, 
  Plus, 
  Calendar, 
  HeadphonesIcon,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1 }
  };

  return (
    <div className="max-w-6xl space-y-8 pb-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome back, Rahul!</h1>
        <p className="text-slate-500 font-medium">Here's your admission journey overview</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="whileInView"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: FileText, title: "Applications", count: "12", subtext: "+3 this week", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Building2, title: "Shortlisted Colleges", count: "24", subtext: "Based on your rank", color: "text-slate-900", bg: "bg-slate-50" },
          { icon: Award, title: "Scholarships", count: "8", subtext: "Eligible for you", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: CalendarDays, title: "Counselling", count: "3", subtext: "Upcoming rounds", color: "text-slate-900", bg: "bg-slate-50" }
        ].map((stat, i) => (
          <motion.div 
            variants={fadeInUp}
            key={i} 
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.count}</h3>
            <p className="text-sm font-bold text-slate-700 mb-1">{stat.title}</p>
            <p className="text-xs text-slate-500 font-medium">{stat.subtext}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Search, title: "College Predictor", sub: "Find best colleges", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Plus, title: "New Application", sub: "Apply to college", color: "text-slate-900", bg: "bg-slate-100" },
            { icon: Calendar, title: "Book Counselling", sub: "Schedule session", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Award, title: "Find Scholarships", sub: "Get financial aid", color: "text-slate-900", bg: "bg-slate-100" }
          ].map((action, i) => (
            <button key={i} className={`${action.bg} p-5 rounded-xl text-left hover:scale-[1.02] transition-transform flex flex-col items-start gap-4`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
              <div>
                <p className={`text-sm font-bold ${action.color}`}>{action.title}</p>
                <p className={`text-xs ${action.color} opacity-80 mt-0.5 font-medium`}>{action.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: "AIIMS Delhi", course: "MBBS", date: "2024-01-15", status: "Under Review", sColor: "text-slate-600 bg-slate-50" },
              { name: "IIT Bombay", course: "B.Tech Computer Science", date: "2024-01-12", status: "Submitted", sColor: "text-blue-600 bg-blue-50" },
              { name: "BITS Pilani", course: "B.E. Electronics", date: "2024-01-10", status: "Shortlisted", sColor: "text-blue-600 bg-blue-50" },
              { name: "NIT Trichy", course: "B.Tech Mechanical", date: "2024-01-05", status: "Document Pending", sColor: "text-slate-600 bg-slate-50" },
            ].map((app, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{app.name}</h4>
                    <p className="text-xs text-slate-500 mb-1 font-medium">{app.course}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 font-medium"><CalendarDays className="w-3 h-3" /> {app.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${app.sColor}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
        >
           <h2 className="text-lg font-bold text-slate-900 mb-6">Upcoming Deadlines</h2>
           <div className="space-y-4">
            {[
              { title: "NEET UG Counselling Round 2", date: "2024-01-25", left: "6 days left", type: "Counselling", bg: "bg-slate-50 border-slate-100", dot: "bg-blue-500" },
              { title: "JEE Main Application", date: "2024-01-20", left: "0 days left", type: "Application", bg: "bg-slate-50 border-slate-100", dot: "bg-slate-400" },
              { title: "Document Verification - AIIMS", date: "2024-02-01", left: "12 days left", type: "Document", bg: "bg-slate-50 border-slate-100", dot: "bg-slate-400" },
              { title: "Scholarship Form Submission", date: "2024-02-05", left: "16 days left", type: "Scholarship", bg: "bg-blue-50 border-blue-100", dot: "bg-blue-500" },
            ].map((d, i) => (
              <div key={i} className={`p-4 border rounded-xl relative ${d.bg}`}>
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${d.dot}`}></div>
                <h4 className="font-bold text-slate-900 text-sm pr-6 mb-1">{d.title}</h4>
                <p className="text-xs text-slate-500 mb-3 font-medium">{d.date}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 bg-white px-2 py-1 rounded-md">{d.type}</span>
                  <span className="text-xs font-bold text-slate-500">{d.left}</span>
                </div>
              </div>
            ))}
           </div>
           <button className="w-full text-center text-sm font-bold text-blue-600 mt-4 py-2 hover:text-blue-700">View All Deadlines</button>
        </motion.div>
      </div>

      {/* VIP Banner */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden flex items-center justify-between shadow-xl shadow-blue-600/20"
      >
        <div className="absolute right-0 top-0 opacity-10">
          <HeadphonesIcon className="w-64 h-64 -mt-10 -mr-10" />
        </div>
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
            <Award className="w-4 h-4" /> VIP COUNSELLING
          </div>
          <h2 className="text-2xl font-bold">Get Personal Admission Guidance</h2>
          <p className="text-blue-50 font-medium">Expert counsellors, cutoff strategy, scholarship assistance, and guaranteed admission support</p>
          <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-lg">
            Explore VIP Packages <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

    </div>
  );
}
