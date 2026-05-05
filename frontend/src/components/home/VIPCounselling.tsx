"use client";

import React from "react";
import { CheckCircle2, PhoneCall } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const benefits = [
  "Personal career counselling sessions",
  "College selection & choice filling strategy",
  "Complete admission planning & support",
  "College visit and documentation help",
  "Scholarship assistance and matching",
  "Dedicated expert counsellor assigned"
];

export default function VIPCounselling() {
  return (
    <section className="py-20 bg-white px-6" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden shadow-md border border-gray-100 aspect-square">
            <Image 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800" 
              fill
              className="object-cover" 
              alt="Counselling"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-xl shadow-xl hidden md:block">
            <div className="text-white font-bold text-3xl mb-1">30% OFF</div>
            <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Early Bird Discount</p>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight">
              Get Your Personal <span className="text-blue-600">Admission Expert</span>
            </h2>
            <p className="text-sm text-gray-500 mt-4 font-medium leading-relaxed max-w-lg">
              Join our VIP program to get end-to-end support throughout your admission journey. Our mentors ensure you get the best possible institution for your rank.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/vip-plans" className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
               View VIP Plans
            </Link>
            <Link href="/book-call" className="w-full sm:w-auto px-10 py-4 border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
               <PhoneCall size={16} /> Book Free Call
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
