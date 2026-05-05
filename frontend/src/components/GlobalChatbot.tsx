"use client";

import { useState } from "react";
import { Headset } from "lucide-react";
import Chatbot from "./Chatbot";

export default function GlobalChatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#1e293b] text-teal-400 w-14 h-14 rounded-[20px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          <Headset className="w-6 h-6" />
        </button>
      </div>

      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
