import { useState, useRef, useEffect } from 'react';
import { X, RefreshCcw, Send, Mic, Headset, MessageSquare } from 'lucide-react';

export default function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let reply = "Thank you for your inquiry. Our AI is processing your request and will get back to you shortly with relevant admission details.";
      if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
        reply = "Hello there! Welcome to Admission Master. How can I assist you with your college journey today?";
      } else if (lowerInput.includes('college') || lowerInput.includes('admission')) {
        reply = "We have data on over 500+ top colleges! You can use our Quick Predictor to see which colleges match your rank, or explore the Colleges tab for detailed info.";
      } else if (lowerInput.includes('exam') || lowerInput.includes('neet') || lowerInput.includes('jee')) {
        reply = "We track all major entrance exams including NEET, JEE Main, CUET, and more. What specific exam are you preparing for?";
      } else if (lowerInput.includes('scholarship')) {
        reply = "We maintain a database of National, State, and Merit-based scholarships. Head over to the Scholarships section to find financial aid that you qualify for.";
      } else if (lowerInput.includes('fee') || lowerInput.includes('price')) {
        reply = "College fees vary widely. We provide exact fee structures in our College Details pages. Is there a specific college you have in mind?";
      }

      setMessages(prev => [...prev, { 
        text: reply, 
        isUser: false 
      }]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden font-inter">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="text-teal-500">
            <Headset className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">Talk with Us</h3>
            <p className="text-xs text-slate-500">Choose voice or text</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setMessages([])}>
            <RefreshCcw className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 h-80 bg-slate-50/50 p-4 overflow-y-auto flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500">Use voice or text to communicate</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.isUser 
                    ? 'bg-teal-500 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..." 
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-teal-200/50 hover:bg-teal-200 text-teal-600 rounded-xl flex items-center justify-center transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 bg-teal-500 hover:bg-teal-600 text-white rounded-xl flex items-center justify-center transition-colors">
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
