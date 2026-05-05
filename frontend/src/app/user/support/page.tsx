"use client";

import { LifeBuoy, Rocket } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="max-w-4xl space-y-8 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
        <LifeBuoy className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Support Center</h1>
      <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-semibold">
        <Rocket className="w-4 h-4 text-teal-600" /> Coming Soon
      </div>
      <p className="text-slate-500 max-w-md mt-4">
        Our dedicated support ticketing system is under development. In the meantime, please use the Chatbot for any queries!
      </p>
    </div>
  );
}
