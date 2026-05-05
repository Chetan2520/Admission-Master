"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  { 
    q: "Is the college predictor completely free?", 
    a: "Yes, our basic predictor tool is free forever for registered users. We use previous year closing ranks to give you the most accurate results." 
  },
  { 
    q: "How accurate are the predictions?", 
    a: "Our predictions are based on 10+ years of historical data and current seat matrix trends. We maintain a 95%+ accuracy rate for round-wise cutoffs." 
  },
  { 
    q: "What do I get after registering?", 
    a: "After registration, you unlock the predictor results, shortlist colleges, and get access to our AI career roadmap tailored to your performance." 
  },
  { 
    q: "What is included in VIP counselling?", 
    a: "VIP plans include 1-on-1 sessions with experts, customized choice-filling lists, and dedicated support until your admission is confirmed." 
  },
  { 
    q: "Which entrance exams are covered?", 
    a: "Currently we cover NEET UG, NEET PG, JEE Main, and CUET. We are constantly adding more state-level entrance examinations." 
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
         
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className={`rounded-3xl border transition-all duration-300 ${openIndex === i ? "bg-white border-blue-100 shadow-xl" : "bg-gray-50 border-transparent"}`}>
            <button 
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="w-full px-8 py-6 flex items-center justify-between text-left"
            >
              <span className="text-lg font-bold text-gray-800">{faq.q}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? "bg-blue-600 text-white rotate-180" : "bg-gray-200 text-gray-400"}`}>
                 {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>
            {openIndex === i && (
              <div className="px-8 pb-8">
                <p className="text-gray-500 font-medium leading-relaxed border-t border-gray-100 pt-6">
                   {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
