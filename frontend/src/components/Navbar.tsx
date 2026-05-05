"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges" },
    { name: "Predictors", href: "/predictors" },
    { name: "Exams", href: "/exams" },
    { name: "Counselling", href: "/user/counselling" },
    { name: "News", href: "/news" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 inset-x-0 z-[100] bg-white border-b border-gray-100 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="font-bold text-2xl tracking-tighter   text-gray-900">
            Admission Expert
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold uppercase tracking-wider text-gray-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md active:scale-95 ml-4"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-900"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[110] bg-white transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center"
            >
              <span className="font-extrabold text-2xl tracking-tighter uppercase text-gray-900">
                ADMISSION<span className="text-blue-600">EXPERT</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 p-2"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold uppercase tracking-tight text-gray-900 hover:text-blue-600 transition-colors border-b border-gray-50 pb-4"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-blue-600 text-white text-center py-5 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
