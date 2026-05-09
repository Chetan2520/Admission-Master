"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Colleges", href: "/colleges" },
  { name: "Predictors", href: "/predictor" },
  { name: "Exams", href: "/exams" },
  { name: "Counselling", href: "/counselling" },
  { name: "News", href: "/news" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? "text-slate-900" : "text-white"}`}>
            Admission <span className="text-blue-500">Expert</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-all hover:text-blue-500 ${
                isScrolled ? "text-slate-600" : "text-slate-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button className={`text-sm font-bold px-4 py-2 transition-all ${isScrolled ? "text-slate-900" : "text-white"}`}>
            Login
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all active:scale-95">
            VIP Counselling
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="text-white" /> : <Menu className={isScrolled ? "text-slate-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-900 border-t border-white/10 p-6 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white text-lg font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <button className="text-white font-bold py-3">Login</button>
              <button className="bg-blue-600 text-white py-4 rounded-2xl font-bold">VIP Counselling</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
